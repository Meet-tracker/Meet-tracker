from miniopy_async import Minio
from ollama import AsyncClient
from aiogram import Bot

from database import get_configuration, add_configuration
from data.config import conf


async def upload_file(name, file_path):
    try:
        await minio.fput_object(
            conf.MINIO_BUCKET_NAME,
            name,
            file_path
        )
    except Exception as e:
        print(f"Failed to upload {name}: {e}")


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
