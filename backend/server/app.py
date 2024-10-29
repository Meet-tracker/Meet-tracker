import uvicorn
import asyncio

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import routers
from data.config import conf
from database.init import init_db

app = FastAPI()
for router in routers:
    app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods='*'.split(','),
    allow_headers='*'.split(','),
)


@app.on_event("startup")
async def startup():
    await init_db()


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=conf.SERVER_PORT)
