export interface IVideoResponseModel {
  created_at: string;
  /** id транскрипции */
  id: string
  status: string
  text: string
  /** id Файла */
  uploaded_file_id: string
  username: string
}
