from .admin import admin_router
from .processing import processing_router
from .user import user_router
from .database import database_router

routers = (admin_router, processing_router, user_router, database_router)