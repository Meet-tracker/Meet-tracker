from data.config import conf
from miniopy_async import Minio
from ollama import AsyncClient


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
    answer = await ollama.generate(model='llama3.1:8b', prompt=f"Текст:\n{text}\nВыведи резюме по каждому участнику встречи.")
    return answer['response']


ollama = AsyncClient(host=f'http://{conf.OLLAMA_NAME}:11434')
