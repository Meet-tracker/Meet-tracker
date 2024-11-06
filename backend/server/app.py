import logging

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import routers
from data.config import conf
from data.functions import create_bucket
from database.init import init_db
import ollama

app = FastAPI()
for router in routers:
    app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.on_event("startup")
async def startup():
    await init_db()
    await create_bucket()
    await ollama.AsyncClient(host=f'http://{conf.OLLAMA_NAME}:11434').pull(conf.OLLAMA_MODEL)

if __name__ == "__main__":
    logging.basicConfig(level=1)
    logging.getLogger().setLevel(logging.INFO)
    uvicorn.run(app, host="0.0.0.0", port=conf.SERVER_PORT)
