import { VideoStatus } from '../enums/video-status.enum';

export interface IVideoResponseModel {
  created_at: string;
  /** id транскрипции */
  id: string
  status: VideoStatus
  text: string
  /** id Файла */
  uploaded_file_id: string
  username: string
}
