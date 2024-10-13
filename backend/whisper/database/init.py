import asyncpg

from .db_connection import with_postgres_connection


@with_postgres_connection
async def init_db(db_connection: asyncpg.Connection) -> None:
    await db_connection.execute(
        '''
        CREATE TABLE IF NOT EXISTS users
        (
        chat_id BIGINT PRIMARY KEY,
        name TEXT,
        email VARCHAR(120),
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
        title TEXT,
        uploaded_file_id TEXT,
        drive_id CHAR(33),
        status TEXT, 
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(chat_id) REFERENCES users(chat_id)
        )
        '''
    )
    return