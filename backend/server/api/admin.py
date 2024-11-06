from typing import List

from api.models import AdminUser, User
from fastapi import APIRouter, HTTPException

from database import create_user, get_user, delete_user, block_user, make_admin

admin_router = APIRouter()


@admin_router.get("/admin/users/", response_model=List[AdminUser])
async def get_users_api():
    users = await get_user()
    return [{"username": user["username"], "role": user["role"], "is_active": user["is_active"]} for user in users]


@admin_router.post("/admin/users/add/")
async def add_user_api(user: User):
    db_user = await get_user(user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="User already exists")
    await create_user(user.username, user.password, user.email)
    return {"message": "User added successfully"}


@admin_router.put("/admin/users/{username}/block/")
async def block_user_api(username: str):
    await block_user(username)
    return {"message": f"User {username} blocked"}


@admin_router.put("/admin/users/{username}/make_admin/")
async def make_admin_api(username: str):
    await make_admin(username)
    return {"message": f"User {username} promoted to admin"}


@admin_router.delete("/admin/users/{username}/delete/")
async def delete_user_api(username: str):
    await delete_user(username)
    return {"message": f"User {username} deleted"}
