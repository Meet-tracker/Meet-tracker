import asyncpg

from .db_connection import with_postgres_connection


@with_postgres_connection
async def upsert_user(
        db_connection: asyncpg.Connection,
        chat_id: int,
        name: str = None,
        email: str = None
) -> None:
    existing_user = await db_connection.fetchrow(
        '''
        SELECT email 
        FROM users 
        WHERE chat_id = $1
        ''',
        chat_id
    )

    if existing_user is None:
        await db_connection.execute(
            '''
            INSERT INTO users (chat_id, name, email) 
            VALUES ($1, $2, $3)
            ''',
            chat_id, name, email
        )
    elif email is None or existing_user['email'] != email:
        await db_connection.execute(
            '''
            UPDATE users 
            SET name = $2, email = $3 
            WHERE chat_id = $1
            ''',
            chat_id, name, email
        )


@with_postgres_connection
async def get_user_email(
        db_connection: asyncpg.Connection,
        chat_id: int
) -> str:
    user = await db_connection.fetchrow(
        '''
        SELECT email 
        FROM users 
        WHERE chat_id = $1
        ''',
        chat_id
    )
    return user['email'] if user else None


@with_postgres_connection
async def get_users(
        db_connection: asyncpg.Connection
):
    users = await db_connection.fetch(
        '''
        SELECT chat_id 
        FROM users
        '''
    )
    return users
