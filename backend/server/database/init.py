import asyncpg

from .db_connection import with_postgres_connection


@with_postgres_connection
async def init_db(db_connection: asyncpg.Connection) -> None:
    await db_connection.execute(
        '''
        CREATE TABLE IF NOT EXISTS users 
        (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50),
        password VARCHAR(64),
        email VARCHAR(100),
        chat_id BIGINT,
        role VARCHAR(20) DEFAULT 'user',
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
        )
        '''
    )
    await db_connection.execute(
        '''
        CREATE TABLE IF NOT EXISTS transcriptions
        (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50),
        text TEXT,
        uploaded_file_id TEXT,
        status TEXT, 
        created_at timestamp DEFAULT CURRENT_TIMESTAMP
        )
        '''
    )
    return