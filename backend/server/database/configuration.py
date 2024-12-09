import asyncpg

from .db_connection import with_postgres_connection


@with_postgres_connection
async def get_configuration(
        db_connection: asyncpg.Connection,
        name=None,
):
    records = await db_connection.fetchrow(
        f'''
        SELECT {name} FROM configuration
        '''
    )
    return records[name]
