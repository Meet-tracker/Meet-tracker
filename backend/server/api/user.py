from api.auth import create_access_token
from api.models import AuthUser, User
from fastapi import APIRouter, HTTPException

from database import create_user, get_user

user_router = APIRouter()


@user_router.post("/register/")
async def register_api(user: User):
    db_user = await get_user(user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    await create_user(user.username, user.password, user.email)
    return {"message": "User registered successfully"}


@user_router.post("/login/")
async def login_api(auth_data: AuthUser):
    user = await get_user(auth_data.username)
    if not user or auth_data.password != user["password"]:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    access_token = create_access_token(data={"sub": auth_data.username})
    return {"access_token": access_token, "token_type": "bearer", "role": user['role']}
