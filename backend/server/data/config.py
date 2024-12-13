from dataclasses import dataclass
from environs import Env

env = Env()
env.read_env(".env")


@dataclass
class Configuration:
    BOT_TOKEN = env.str("BOT_TOKEN")
    LOGGING_LEVEL = env.int("LOGGING_LEVEL", 1)

    POSTGRES_USER = env.str("POSTGRES_USER")
    POSTGRES_PASSWORD = env.str("POSTGRES_PASSWORD")
    POSTGRES_DATABASE = env.str("POSTGRES_DB")
    POSTGRES_HOST = env.str("POSTGRES_NAME")

    SERVER_PORT = env.int("SERVER_PORT")

    JWT_SECRET_KEY = env.str("JWT_SECRET_KEY")
    JWT_ALGORITHM = env.str("JWT_ALGORITHM")

    MINIO_NAME = env.str("MINIO_NAME")
    MINIO_ACCESS_KEY = env.str("MINIO_ACCESS_KEY")
    MINIO_SECRET_KEY = env.str("MINIO_SECRET_KEY")
    MINIO_BUCKET_NAME = env.str("MINIO_BUCKET_NAME")

    WHISPER_NAME = env.str("WHISPER_NAME")
    WHISPER_MODEL = env.str("WHISPER_MODEL")

    OLLAMA_NAME = env.str("OLLAMA_NAME")
    OLLAMA_MODEL = env.str("OLLAMA_MODEL")

    PROMPT = env.str("PROMPT")


conf = Configuration()
