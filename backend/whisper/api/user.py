from fastapi import APIRouter, Request

user_router = APIRouter()


@user_router.post('/user')
async def user(request: Request):
    message = await request.json()
    message['answer'] = 'success user'
    return message
