import { IVideoResponseModel } from '../interfaces/video-response-model.interface';

export class VideoModel {
  public Created_at: Date;
  public Id: string;
  public Status: string;
  public Text: string;
  public UploadedFileId: string;
  public Username: string;

  constructor(data: IVideoResponseModel) {
    this.Created_at = new Date(data.created_at);
    this.Id = data.id;
    this.Status = data.status;
    this.Text = data.text;
    this.UploadedFileId = data.uploaded_file_id;
    this.Username = data.username;
  }
}
