import asyncpg

from .db_connection import with_postgres_connection


@with_postgres_connection
async def init_db(db_connection: asyncpg.Connection) -> None:
    await db_connection.execute(
        '''
        CREATE TABLE IF NOT EXISTS users
        (
        chat_id BIGINT,
        email VARCHAR(120),
        isAdmin BOOLEAN,
        login TEXT,
        password TEXT,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP
        )
        '''
    )
    await db_connection.execute(
        '''
        CREATE TABLE IF NOT EXISTS transcriptions
        (
        id SERIAL PRIMARY KEY,
        chat_id BIGINT, 
        text TEXT,
        uploaded_file_id TEXT,
        status TEXT, 
        created_at timestamp DEFAULT CURRENT_TIMESTAMP
        )
        '''
    )
    return