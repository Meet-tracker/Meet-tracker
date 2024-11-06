import gc
import torch
import whisperx

from typing import Any
from dataclasses import dataclass

from config import conf


@dataclass
class WhisperXModels:
    whisper_model: Any
    diarize_pipeline: Any
    align_model: Any
    align_model_metadata: Any


whisperx_models = WhisperXModels(
    whisper_model=None,
    diarize_pipeline=None,
    align_model=None,
    align_model_metadata=None
)

whisperx_models.whisper_model = whisperx.load_model(
    whisper_arch=conf.whisper_model,
    device=conf.device,
    compute_type=conf.compute_type,
    language=conf.language_code if conf.language_code != "auto" else None
)

whisperx_models.diarize_pipeline = whisperx.DiarizationPipeline(
    use_auth_token=conf.hf_api_key,
    device=conf.device
)

if conf.language_code != "auto":
    (
        whisperx_models.align_model,
        whisperx_models.align_model_metadata
    ) = whisperx.load_align_model(
        language_code=conf.language_code,
        device=conf.device
    )


def transcribe(audio):
    try:

        result = whisperx_models.whisper_model.transcribe(
            audio,
            batch_size=int(conf.batch_size),
        )

        if conf.language_code == "auto":
            language = result["language"]
            (
                whisperx_models.align_model,
                whisperx_models.align_model_metadata
            ) = whisperx.load_align_model(
                language_code=language,
                device=conf.device
            )

        aligned_result = whisperx.align(
            result["segments"],
            whisperx_models.align_model,
            whisperx_models.align_model_metadata,
            audio,
            conf.device,
            return_char_alignments=False
        )
        return result, aligned_result
    finally:
        try:
            del result, aligned_result
        except:
            pass


def diarize(audio):
    return whisperx_models.diarize_pipeline(audio)


def transcribe_audio(audio_file_path):
    try:
        audio = whisperx.load_audio(audio_file_path)
        transcription_result, aligned_result = transcribe(audio)
        diarize_segments = diarize(audio)

        final_result = whisperx.assign_word_speakers(
            diarize_segments,
            aligned_result
        )

        return final_result
    finally:
        try:
            del audio, transcription_result, aligned_result, diarize_segments, final_result
        except:
            pass
        finally:
            gc.collect()

            torch.cuda.empty_cache()
