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
