import os
import requests

from queue import Queue
from threading import Thread
from fastapi import FastAPI, Request

from config import conf
from whisper import transcribe_audio

app = FastAPI()
trancription_tasks_queue = Queue()


def seconds_to_hms(seconds):
    total_seconds = int(seconds)

    hours = total_seconds // 3600
    minutes = (total_seconds % 3600) // 60
    secs = total_seconds % 60

    return f"[{hours:02}:{minutes:02}:{secs:02}]"


def send_post_request(data):
    url = f"http://MeetTracker-server:8000/whisper/result"
    try:
        response = requests.post(url, json=data)
        if response.status_code != 200:
            return Exception
        return response.text
    except requests.RequestException as e:
        return Exception


def worker():
    while True:
        task_id, tmp_path = trancription_tasks_queue.get()

        try:
            result = transcribe_audio(tmp_path)

            transcript = ''
            last_speaker = 'Участник не определен'
            for segment in result['segments']:
                speaker = segment.get('speaker', 'Участник не определен').replace('SPEAKER_', 'Участник ')
                hms = seconds_to_hms(segment['start'])
                if speaker == last_speaker:
                    transcript += f"{hms} {segment['text']}"
                else:
                    if len(transcript) > 0:
                        transcript += "\n"
                    transcript += f"{hms} {speaker}: {segment['text']}"

                last_speaker = speaker

            print(send_post_request(data={"text": transcript, 'status': 'Transcribed', "task_id": task_id}))
        except Exception as e:
            print(send_post_request(data={"text": 'Произошла ошибка во время обработки.', 'status': 'Failed', "task_id": task_id}))

        finally:
            trancription_tasks_queue.task_done()
            os.remove(tmp_path)


@app.on_event("startup")
async def startup_event():
    Thread(target=worker, daemon=True).start()


@app.post("/transcribe")
async def create_upload_file(
        request: Request
):
    message = await request.json()
    task_id = message['task_id']
    tmp_path = message['tmp_path']
    trancription_tasks_queue.put((task_id, tmp_path))

    return {
        "answer": 'ok',
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=conf.WHISPER_PORT)
