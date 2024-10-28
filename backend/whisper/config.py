from dataclasses import dataclass
from environs import Env

env = Env()
env.read_env(".env")


@dataclass
class Configuration:
    whisper_model = env.str("WHISPER_MODEL", "large-v3")
    device = env.str("DEVICE", "cuda")
    compute_type = env.str("COMPUTE_TYPE", "float16")
    batch_size = env.int("BATCH_SIZE", "16")
    language_code = env.str("LANGUAGE_CODE", "ru")
    hf_api_key = env.str("HF_API_KEY", "")
    WHISPER_PORT = env.int("WHISPER_PORT", 8001)


conf = Configuration()
