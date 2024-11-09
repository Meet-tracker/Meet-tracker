import asyncpg

from .db_connection import with_postgres_connection


@with_postgres_connection
async def upsert_transcription(
        db_connection: asyncpg.Connection,
        username: str,
        uploaded_file_id: str,
        status: str
):
    await db_connection.execute(
        '''
        INSERT INTO transcriptions (username, uploaded_file_id, status) 
        VALUES ($1, $2, $3)
        ''',
        username, uploaded_file_id, status
    )


@with_postgres_connection
async def upsert_transcription_text(
        db_connection: asyncpg.Connection,
        uploaded_file_id: str,
        text: str,
        status: str
):
    await db_connection.execute(
        '''
        UPDATE transcriptions
        SET text = $2, 
            status = $3
        WHERE uploaded_file_id = $1
        ''',
        uploaded_file_id, text, status
    )


@with_postgres_connection
async def get_transcription_text_by_id(
        db_connection: asyncpg.Connection,
        uploaded_file_id: str
) -> str:
    transcription_text = await db_connection.fetchrow(
        f'''
                SELECT text
                FROM transcriptions
                WHERE uploaded_file_id = $1
                ''',
        uploaded_file_id
    )
    return transcription_text['text'] if transcription_text else None
