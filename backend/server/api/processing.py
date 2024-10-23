import os
import uuid
from dataclasses import dataclass

from environs import Env
from fastapi import HTTPException, BackgroundTasks, APIRouter, status, Request

env = Env()
env.read_env(".env")


# @dataclass
# class Configuration:
#     whisper_model = env.str("WHISPER_MODEL", "large-v3")
#     device = env.str("DEVICE", "cuda")
#     device_2 = env.str("DEVICE_2", "cuda")
#     compute_type = env.str("COMPUTE_TYPE", "float16")
#     batch_size = env.int("BATCH_SIZE", "16")
#     language_code = env.str("LANGUAGE_CODE", "auto")
#     hf_api_key = env.str("HF_API_KEY")
#     bot_url = f'{env.str("BOT_NAME")}:{"5000"}'
#
#
# settings = Configuration()


class MaxBodySizeException(Exception):
    def __init__(self, body_len: int):
        self.body_len = body_len


class MaxBodySizeValidator:
    def __init__(self, max_size: int):
        self.body_len = 0
        self.max_size = max_size

    def __call__(self, chunk: bytes):
        self.body_len += len(chunk)
        if self.body_len > self.max_size:
            raise MaxBodySizeException(self.body_len)


processing_router = APIRouter()


@processing_router.post("/transcribe/")
async def create_upload_file(
        request: Request,
        background_tasks: BackgroundTasks
) -> dict:
    message = await request.json()
    message['answer'] = 'success admin'
    return message
    #task_id = str(uuid.uuid4())
    #tmp_path = f"{settings.tmp_dir}/{task_id}.audio"
    #
    #body_validator = MaxBodySizeValidator(settings.max_request_body_size_mb * 1024 * 1024)
    #
    # try:
    #     file_target = FileTarget(
    #         tmp_path,
    #         validator=MaxSizeValidator(settings.max_file_size_mb * 1024 * 1024)
    #     )
    #     parser = StreamingFormDataParser(headers=request.headers)
    #     parser.register('file', file_target)
    #     async for chunk in request.stream():
    #         body_validator(chunk)
    #         parser.data_received(chunk)
    #
    # except MaxBodySizeException as e:
    #     raise HTTPException(
    #         status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
    #         detail=f"Maximum request body size limit exceeded: {e.body_len} bytes"
    #     )
    #
    # except Exception as e:
    #     if os.path.exists(tmp_path):
    #         os.remove(tmp_path)
    #     raise HTTPException(
    #         status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
    #         detail=f"Error processing upload: {str(e)}"
    #     )
    #
    # if not file_target.multipart_filename:
    #     if os.path.exists(tmp_path):
    #         os.remove(tmp_path)
    #     raise HTTPException(
    #         status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
    #         detail='No file was uploaded'
    #     )

#
# @processing_router.get("/transcribe/status/{task_id}")
# async def get_task_status(task_id: str) -> dict:
#
#     return {
#         "task_id": task_id
#     }
#
#
# @processing_router.get("/transcribe/result/{task_id}")
# async def get_task_result(task_id: str) -> dict:
#     return {
#         "task_id": task_id
#     }
