from fastapi import APIRouter, Request

database_router = APIRouter()


@database_router.post('/database/')
async def database(request: Request):
    message = await request.json()
    message['answer'] = 'success database'
    return message
