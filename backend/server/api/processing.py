import os

import aiohttp
import librosa
import soundfile as sf
from .auth import get_current_user, get_current_admin_user
from data.config import conf
from data.functions import upload_file, generate_llm_answer, bot, download_file
from fastapi import APIRouter, Request, File, UploadFile, Depends, HTTPException
from fastapi.responses import StreamingResponse

from database import upsert_transcription, upsert_transcription_text, get_transcription_text_by_id, get_telegram


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
    id = await upsert_transcription(current_user['username'], 'Processing')
    tmp_path = f"/var/lib/audio_tmp/{id}.mp4"
    contents = await file.read()
    with open(tmp_path, "wb") as f:
        f.write(contents)
    audio_path = f"/var/lib/audio_tmp/{id}.wav"
    audio, sr = librosa.load(tmp_path, sr=None)
    sf.write(audio_path, audio, sr)
    os.remove(tmp_path)
    await upload_file(f'{id}.wav', audio_path)
    await send_post_request({'task_id': id, 'tmp_path': audio_path, 'user': current_user['username']})
    return {"id": id}


@processing_router.get("/download/{file_name}")
async def download(
        file_name: str,
        #current_admin: dict = Depends(get_current_admin_user)
):
    try:
        file = await download_file(f"{file_name}.wav")
        return StreamingResponse(file.stream(), media_type="application/octet-stream")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Не удалось загрузить {file_name}: {e}")


@processing_router.post("/whisper/result")
async def get_result(request: Request):
    message = await request.json()
    text = await generate_llm_answer(message['text'])
    telegram = await get_telegram(message['user'])
    if telegram:
        await bot.send_message(chat_id=int(telegram), text=f"http://localhost:4000/main/video/{message['task_id']}")
    await upsert_transcription_text(message['task_id'], text, message['status'])
    return {"success": True}


@processing_router.post("/result")
async def get_result(request: Request, current_user: dict = Depends(get_current_user)):
    message = await request.json()
    text = await get_transcription_text_by_id(message['id'])
    if text:
        return {"result": text}
    return {"result": "False"}
