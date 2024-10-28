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


conf = Configuration()
