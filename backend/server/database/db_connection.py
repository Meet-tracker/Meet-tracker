import asyncpg
from functools import wraps
from typing import Any, Callable

from data.config import conf

pool: asyncpg.Pool = None


async def init_db_pool():
    global pool
    if not pool:
        pool = await asyncpg.create_pool(
            user=conf.POSTGRES_USER,
            password=conf.POSTGRES_PASSWORD,
            database=conf.POSTGRES_DATABASE,
            host=conf.POSTGRES_HOST,
            min_size=2,
            max_size=10
        )


def with_postgres_connection(asyncpg_func: Callable) -> Callable:
    @wraps(asyncpg_func)
    async def call_with_connection(*args, **kwargs):
        if not pool:
            await init_db_pool()
        async with pool.acquire() as connection:
            try:
                asyncpg_func_result: Any = await asyncpg_func(
                    connection,
                    *args,
                    **kwargs
                )
            except Exception as e:
                print(f"Ошибка в {asyncpg_func.__name__}: {e}")
                raise
            return asyncpg_func_result

    return call_with_connection
