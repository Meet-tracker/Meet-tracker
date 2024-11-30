import asyncpg

from .db_connection import with_postgres_connection


@with_postgres_connection
async def upsert_transcription(
        db_connection: asyncpg.Connection,
        username: str,
        status: str
):
    await db_connection.execute(
        '''
        INSERT INTO transcriptions (username, status) 
        VALUES ($1, $2)
        RETURNING id
        ''',
        username, status
    )


@with_postgres_connection
async def upsert_transcription_text(
        db_connection: asyncpg.Connection,
        transcription_id: str,
        text: str,
        status: str
):
    await db_connection.execute(
        '''
        UPDATE transcriptions
        SET text = $2, 
            status = $3
        WHERE id = $1
        ''',
        transcription_id, text, status
    )


@with_postgres_connection
async def get_transcription_text_by_id(
        db_connection: asyncpg.Connection,
        transcription_id: str
) -> str:
    transcription_text = await db_connection.fetchrow(
        f'''
                SELECT text
                FROM transcriptions
                WHERE id = $1
                ''',
        transcription_id
    )
    return transcription_text['text'] if transcription_text else None


@with_postgres_connection
async def get_transcription_by_username(
        db_connection: asyncpg.Connection,
        username: str
) -> str:
    transcriptions = await db_connection.fetch(
        f'''
                SELECT id, status, created_at
                FROM transcriptions
                WHERE username = $1
                ''',
        username
    )
    return transcriptions


@with_postgres_connection
async def delete_transcription(
        db_connection: asyncpg.Connection,
        transcription_id: int
) -> None:
    await db_connection.execute(
        '''
        UPDATE transcriptions
        SET status = 'Deleted'
        WHERE id = $1
        ''',
        transcription_id
    )