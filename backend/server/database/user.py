import asyncpg

from .db_connection import with_postgres_connection


@with_postgres_connection
async def create_user(
        db_connection: asyncpg.Connection,
        username: str,
        password: str,
        email: str,
        role: str = "user"
):
    await db_connection.execute(
        '''
        INSERT INTO users (username, password, email, role)
        VALUES ($1, $2, $3, $4)
        ''',
        username, password, email, role
    )


@with_postgres_connection
async def add_telegram(
        db_connection: asyncpg.Connection,
        username: str,
        chat_id: int,
):
    await db_connection.execute(
        '''
        UPDATE users
        SET chat_id = $2
        WHERE username = $1
        ''',
        username, chat_id
    )


@with_postgres_connection
async def get_telegram(
        db_connection: asyncpg.Connection,
        username: str
):
    chat_id = await db_connection.fetchrow(
        '''
        SELECT chat_id
        FROM users
        WHERE username = $1
        ''',
        username
    )
    return chat_id['chat_id'] if chat_id else None
