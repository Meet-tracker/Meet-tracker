from typing import Optional

from pydantic import BaseModel


# Модель пользователя
class User(BaseModel):
    username: str
    password: str
    email: str


# Модель для аутентификации
class AuthUser(BaseModel):
    username: str
    password: str


class AdminUser(BaseModel):
    username: str
    role: Optional[str] = "user"
    is_active: Optional[bool] = True
