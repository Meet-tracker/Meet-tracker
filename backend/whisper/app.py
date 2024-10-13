from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import routers


app = FastAPI()
for router in routers:
    app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins="localhost:*,127.0.0.1:*".split(','),
    allow_credentials=True,
    allow_methods='*'.split(','),
    allow_headers='*'.split(','),
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
