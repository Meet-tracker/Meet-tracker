import logging

import asyncpg

from .db_connection import with_postgres_connection


@with_postgres_connection
async def get_user(
        db_connection: asyncpg.Connection,
        username=None,
):
    query = '''
        SELECT * FROM users
        '''

    if username is not None:
        query += f" WHERE username = '{username}'"

    records = await db_connection.fetch(query)

    if len(records) == 1:
        return records[0]

    return records


@with_postgres_connection
async def block_user(
        db_connection: asyncpg.Connection,
        username: str,
):
    await db_connection.execute(
        '''
        UPDATE users
        SET is_active = FALSE
        WHERE username = $1
        ''',
        username
    )


@with_postgres_connection
async def delete_user(
        db_connection: asyncpg.Connection,
        username: str,
):
    await db_connection.execute(
        '''
        DELETE FROM users
        WHERE username = $1
        ''',
        username
    )


@with_postgres_connection
async def make_admin(
        db_connection: asyncpg.Connection,
        username: str,
):
    await db_connection.execute(
        '''
        UPDATE users 
        SET role = 'admin'
        WHERE username = $1
        ''',
        username
    )
