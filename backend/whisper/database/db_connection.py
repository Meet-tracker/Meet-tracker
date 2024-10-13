import asyncpg
from functools import wraps
from typing import Any, Callable

from data.config import conf


def with_postgres_connection(asyncpg_func: Callable) -> Callable:
    @wraps(asyncpg_func)
    async def call_with_connection(*args, **kwargs):
        connection: asyncpg.Connection = await asyncpg.connect(
            user=conf.POSTGRES_USER,
            password=conf.POSTGRES_PASSWORD,
            database=conf.POSTGRES_DATABASE,
            host=conf.POSTGRES_HOST
        )

        try:
            asyncpg_func_result: Any = await asyncpg_func(
                connection,
                *args,
                **kwargs
            )
        finally:
            await connection.close()
        return asyncpg_func_result

    return call_with_connection
