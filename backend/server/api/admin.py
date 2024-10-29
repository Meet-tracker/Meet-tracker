from typing import List

from api.models import AdminUser, User
from fastapi import APIRouter, HTTPException, Depends, status

from database import create_user, get_user, delete_user, block_user, make_admin

from api.auth import get_current_user, pwd_context

admin_router = APIRouter()


async def get_current_admin_user(user=Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return user


@admin_router.get("/admin/users/", response_model=List[AdminUser])
async def get_users_api(admin=Depends(get_current_admin_user)):
    users = await get_user()
    return [{"username": user["username"], "role": user["role"], "is_active": user["is_active"]} for user in users]


@admin_router.post("/admin/users/add/")
async def add_user_api(user: User, admin=Depends(get_current_admin_user)):
    db_user = await get_user(user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="User already exists")
    await create_user(user.username, pwd_context.hash(user.password), user.email)
    return {"message": "User added successfully"}


@admin_router.put("/admin/users/{username}/block/")
async def block_user_api(username: str, admin=Depends(get_current_admin_user)):
    await block_user(username)
    return {"message": f"User {username} blocked"}


@admin_router.put("/admin/users/{username}/make_admin/")
async def make_admin_api(username: str, admin=Depends(get_current_admin_user)):
    await make_admin(username)
    return {"message": f"User {username} promoted to admin"}


@admin_router.delete("/admin/users/{username}/delete/")
async def delete_user_api(username: str, admin=Depends(get_current_admin_user)):
    await delete_user(username)
    return {"message": f"User {username} deleted"}
