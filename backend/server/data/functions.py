import logging

from aiogram import Bot
from starlette.background import BackgroundTask
from database import get_configuration, add_configuration
from fastapi import HTTPException
from miniopy_async import Minio
from ollama import AsyncClient

from .config import conf

import os
from fastapi.responses import FileResponse


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
        logging.info(e)
        raise HTTPException(status_code=500, detail=str(e))


async def cleanup(temp_file_path: str):
    if os.path.exists(temp_file_path):
        os.remove(temp_file_path)
        logging.info(f"Temporary file {temp_file_path} removed")


async def create_bucket():
    exists = await minio.bucket_exists(conf.MINIO_BUCKET_NAME)
    if not exists:
        await minio.make_bucket(conf.MINIO_BUCKET_NAME)
        print(f"Bucket '{conf.MINIO_BUCKET_NAME}' created successfully.")
    else:
        print(f"Bucket '{conf.MINIO_BUCKET_NAME}' already exists.")


minio = Minio(
    f"{conf.MINIO_NAME}:9000",
    access_key=conf.MINIO_ACCESS_KEY,
    secret_key=conf.MINIO_SECRET_KEY,
    secure=False
)


async def generate_llm_answer(text):
    configuration = await get_configuration('llm_model, prompt')
    answer = await ollama.generate(model=configuration['llm_model'],
                                   prompt=configuration['prompt'].format(text=text))
    return answer['response']


async def init_configuration():
    configuration = await get_configuration('*')
    if configuration is None:
        await add_configuration(conf.WHISPER_MODEL, conf.OLLAMA_MODEL, conf.PROMPT)


ollama = AsyncClient(host=f'http://{conf.OLLAMA_NAME}:11434')

bot = Bot(token=conf.BOT_TOKEN)
