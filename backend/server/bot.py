import asyncio
import logging

from aiogram import Dispatcher, types
from aiogram.filters import Command

from data.config import conf
from data.functions import bot
from database import add_telegram

logging.basicConfig(level=conf.LOGGING_LEVEL)
logging.getLogger().setLevel(logging.INFO)

dp = Dispatcher()


@dp.message(Command('start'))
async def cmd_start(message: types.Message):
    command_text = message.text.split(maxsplit=1)[1] if len(message.text.split()) > 1 else None
    if command_text:
        try:
            await add_telegram(command_text, int(message.chat.id))
            await message.answer(f"{command_text}, привязка прошла успешно!")
        except:
            await message.answer(f"Ошибка привязки.{command_text}")


if __name__ == '__main__':
    asyncio.run(dp.start_polling(bot, skip_updates=True))


