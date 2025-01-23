import asyncio

from fastapi import APIRouter, Request, File, UploadFile, Depends

from data.functions import generate_llm_answer, bot, download_file
from data.functions import process
from database import upsert_transcription, upsert_transcription_text, get_transcription_text_by_id, get_telegram
from .auth import get_current_user, get_current_admin_user


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
    asyncio.create_task(process(id, tmp_path, current_user['username']))
    return {"id": id}


@processing_router.get("/download/{file_name}")
async def download(
        file_name: str,
        current_admin: dict = Depends(get_current_admin_user)
):
    return await download_file(f"{file_name}.wav")


@processing_router.post("/whisper/result")
async def get_result(request: Request):
    message = await request.json()
    text = None
    if message['status'] != "Failed":
        try:
            text = await generate_llm_answer(message['text'])
        except:
            message['status'] = "Failed"
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
