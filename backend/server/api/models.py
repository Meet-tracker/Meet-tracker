from typing import Optional

from pydantic import BaseModel


class User(BaseModel):
    username: str
    password: str
    email: str


class AuthUser(BaseModel):
    username: str
    password: str


class AdminUser(BaseModel):
    username: str
    role: Optional[str] = "user"
    is_active: Optional[bool] = True
