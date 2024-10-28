import asyncio
import json
import logging
import os
import aiohttp

from config import conf
from whisper import transcribe_audio


async def send_post_request(data):
    url = f"http://url/result/"
    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=data) as response:
            if response.status != 200:
                return Exception
            return await response.text()


async def process_message(message, executor):
    try:
        result = await asyncio.get_running_loop().run_in_executor(executor, transcribe_audio,
                                                                  message["data"]["file_path"])
        message["status"] = "обработано"
        message['data']['result'] = result
        await send_post_request(message)
        message['data']['result'] = ''
    except Exception as e:
        message["status"] = "ошибка обработки"


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=conf.WHISPER_PORT)
