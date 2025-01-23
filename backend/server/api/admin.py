from .auth import get_current_admin_user
from .models import User
import logging
from fastapi import APIRouter, HTTPException, Depends, Request

from database import (create_user, get_user, delete_user, block_user,
                      modify_admin, get_transcription_by_username, get_configuration, edit_configuration)

admin_router = APIRouter()


@admin_router.get("/admin/users/")
async def get_users_api(current_admin: dict = Depends(get_current_admin_user)):
    users = await get_user()
    return [{"username": user["username"], "role": user["role"], "is_active": user["is_active"]} for user in users]


@admin_router.post("/admin/transcriptions/")
async def get_users_api(request: Request, current_admin: dict = Depends(get_current_admin_user)):
    message = await request.json()
    transcriptions = await get_transcription_by_username(message['username'])
    return transcriptions


@admin_router.post("/admin/users/add/")
async def add_user_api(user: User, current_admin: dict = Depends(get_current_admin_user)):
    db_user = await get_user(user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="User already exists")
    await create_user(user.username, user.password, user.email)
    return {"message": "User added successfully"}


@admin_router.put("/admin/users/{username}/block/")
async def block_user_api(username: str, current_admin: dict = Depends(get_current_admin_user)):
    await block_user(username, False)
    return {"message": f"User {username} blocked"}


@admin_router.put("/admin/users/{username}/unblock/")
async def block_user_api(username: str, current_admin: dict = Depends(get_current_admin_user)):
    await block_user(username, True)
    return {"message": f"User {username} unblocked"}


@admin_router.put("/admin/users/{username}/make_admin/")
async def make_admin_api(username: str, current_admin: dict = Depends(get_current_admin_user)):
    await modify_admin(username, 'admin')
    return {"message": f"User {username} promoted to admin"}


@admin_router.put("/admin/users/{username}/remove_admin/")
async def remove_admin_api(username: str, current_admin: dict = Depends(get_current_admin_user)):
    await modify_admin(username, 'user')
    return {"message": f"User {username} promoted to admin"}


@admin_router.delete("/admin/users/{username}/delete/")
async def delete_user_api(username: str, current_admin: dict = Depends(get_current_admin_user)):
    await delete_user(username)
    return {"message": f"User {username} deleted"}


@admin_router.get("/admin/prompt")
async def get_prompt_api(current_admin: dict = Depends(get_current_admin_user)):
    prompt = await get_configuration('prompt')
    return {"prompt": prompt['prompt']}


@admin_router.get("/admin/model/whisper")
async def get_model_whisper_api(current_admin: dict = Depends(get_current_admin_user)):
    model = await get_configuration("whisper_model")
    return {"whisper": model['whisper_model']}


@admin_router.get("/admin/model/llm")
async def get_model_llm_api(current_admin: dict = Depends(get_current_admin_user)):
    model = await get_configuration("llm_model")
    return {"llm": model['llm_model']}


@admin_router.post("/admin/prompt")
async def edit_prompt_api(request: Request, current_admin: dict = Depends(get_current_admin_user)):
    message = await request.json()
    await edit_configuration("prompt", message['prompt'])
    return {"message": f"Success"}


@admin_router.post("/admin/model/whisper")
async def edit_model_whisper_api(request: Request, current_admin: dict = Depends(get_current_admin_user)):
    message = await request.json()
    logging.info(message)
    await edit_configuration("whisper_model", message['whisper'])
    return {"message": f"Success"}


@admin_router.post("/admin/model/llm")
async def edit_model_llm_api(request: Request, current_admin: dict = Depends(get_current_admin_user)):
    message = await request.json()
    await edit_configuration("llm_model", message['llm'])
    return {"message": f"Success"}
