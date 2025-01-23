import os

from aiogram import Bot
from database import get_configuration, add_configuration
from fastapi import HTTPException
from fastapi.responses import FileResponse
from miniopy_async import Minio
from ollama import AsyncClient
from starlette.background import BackgroundTask
import librosa
import soundfile as sf
import aiohttp

from .config import conf


async def send_post_request(data):
    url = f"http://{conf.WHISPER_NAME}:8001/transcribe"
    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=data) as response:
            if response.status != 200:
                return Exception
            return await response.text()


async def upload_file(name, file_path):
    try:
        await minio.fput_object(
            conf.MINIO_BUCKET_NAME,
            name,
            file_path
        )
    except Exception as e:
        print(f"Failed to upload {name}: {e}")


async def download_file(name):
    temp_file_path = f"tmp/{name}"

    try:
        await minio.fget_object(
            conf.MINIO_BUCKET_NAME,
            name,
            temp_file_path
        )

        return FileResponse(temp_file_path, filename=name, media_type='application/octet-stream',
                            background=BackgroundTask(cleanup, temp_file_path))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def cleanup(temp_file_path: str):
    if os.path.exists(temp_file_path):
        os.remove(temp_file_path)


async def create_bucket():
    exists = await minio.bucket_exists(conf.MINIO_BUCKET_NAME)
    if not exists:
        await minio.make_bucket(conf.MINIO_BUCKET_NAME)
        print(f"Bucket '{conf.MINIO_BUCKET_NAME}' created successfully.")
    else:
        print(f"Bucket '{conf.MINIO_BUCKET_NAME}' already exists.")


async def generate_llm_answer(text):
    configuration = await get_configuration('llm_model, prompt')
    answer = await ollama.generate(model=configuration['llm_model'],
                                   prompt=configuration['prompt'].format(text=text))
    return answer['response']


async def process(id, tmp_path, username):
    audio_path = f"/var/lib/audio_tmp/{id}.wav"
    audio, sr = librosa.load(tmp_path, sr=None)
    sf.write(audio_path, audio, sr)
    os.remove(tmp_path)
    await upload_file(f'{id}.wav', audio_path)
    await send_post_request({'task_id': id, 'tmp_path': audio_path, 'user': username})


async def init_configuration():
    configuration = await get_configuration('*')
    if configuration is None:
        await add_configuration(conf.WHISPER_MODEL, conf.OLLAMA_MODEL, conf.PROMPT)


minio = Minio(
    f"{conf.MINIO_NAME}:9000",
    access_key=conf.MINIO_ACCESS_KEY,
    secret_key=conf.MINIO_SECRET_KEY,
    secure=False
)

ollama = AsyncClient(host=f'http://{conf.OLLAMA_NAME}:11434')

bot = Bot(token=conf.BOT_TOKEN)
