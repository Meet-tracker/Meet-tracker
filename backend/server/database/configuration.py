import asyncpg

from .db_connection import with_postgres_connection


@with_postgres_connection
async def get_configuration(
        db_connection: asyncpg.Connection,
        name,
):
    records = await db_connection.fetchrow(
        f'''
        SELECT {name} FROM configuration
        '''
    )
    return records


@with_postgres_connection
async def edit_configuration(
        db_connection: asyncpg.Connection,
        name,
        text
):
    await db_connection.execute(
        f'''
        UPDATE configuration 
        SET {name} = $1
        ''', text
    )


@with_postgres_connection
async def add_configuration(
        db_connection: asyncpg.Connection,
        whisper_model, llm_model, prompt
):
    await db_connection.execute(
        '''
        INSERT INTO configuration (whisper_model, llm_model, prompt)
        VALUES ($1, $2, $3)
        ''', whisper_model, llm_model, prompt
    )
