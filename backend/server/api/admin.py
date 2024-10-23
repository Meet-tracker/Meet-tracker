from fastapi import APIRouter, Request

admin_router = APIRouter()


@admin_router.post('/admin/')
async def admin(request: Request):
    message = await request.json()
    message['answer'] = 'success admin'
    return message
