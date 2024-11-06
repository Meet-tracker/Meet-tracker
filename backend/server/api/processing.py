import logging
import os
import uuid

import aiohttp
import librosa
import soundfile as sf
from api.auth import get_current_user
from data.config import conf
from data.functions import upload_file, generate_llm_answer
from fastapi import APIRouter, Request, File, UploadFile, Depends

from database import upsert_transcription, upsert_transcription_text, get_transcription_text_by_id


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


async def send_post_request(data):
    url = f"http://{conf.WHISPER_NAME}:8001/transcribe"
    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=data) as response:
            if response.status != 200:
                return Exception
            return await response.text()


processing_router = APIRouter()


@processing_router.post("/upload")
async def upload(
        file: UploadFile = File(...),
        current_user: dict = Depends(get_current_user)
):
    task_id = str(uuid.uuid4())
    tmp_path = f"/var/lib/audio_tmp/{task_id}.mp4"

    contents = await file.read()

    with open(tmp_path, "wb") as f:
        f.write(contents)

    audio_path = f"/var/lib/audio_tmp/{task_id}.wav"

    audio, sr = librosa.load(tmp_path, sr=None)
    sf.write(audio_path, audio, sr)

    os.remove(tmp_path)

    await upload_file(f'{task_id}.audio', audio_path)

    await upsert_transcription(current_user['username'], task_id, 'Processing')

    await send_post_request({'task_id': task_id, 'tmp_path': audio_path})

    return {
        "answer": 'ok',
    }


@processing_router.post("/whisper/result")
async def get_result(request: Request):
    message = await request.json()
    transcript = message['text']
    task_id = message['task_id']
    status = message['status']

    text = await generate_llm_answer(transcript)

    await upsert_transcription_text(task_id, text, status)

    return {"success": True}


@processing_router.post("/result")
async def get_result(request: Request, current_user: dict = Depends(get_current_user)):
    message = await request.json()
    task_id = message['id']

    text = await get_transcription_text_by_id(task_id)

    return {"result": text['text']}
