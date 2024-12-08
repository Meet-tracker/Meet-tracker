import { IVideoResponseModel } from '../interfaces/video-response-model.interface';
import { VideoStatus } from '../enums/video-status.enum';

export class VideoModel {
  public CreatedAtDate: string;
  public CreatedAtTime: string;
  public Id: string;
  public Status: VideoStatus;
  public Text: string;
  public UploadedFileId: string;
  public Username: string;

  constructor(data: IVideoResponseModel) {
    this.CreatedAtDate = this.makeDate(new Date(data.created_at));
    this.CreatedAtTime = this.makeTime(new Date(data.created_at));
    this.Id = data.id;
    this.Status = data.status;
    this.Text = data.text;
    this.UploadedFileId = data.uploaded_file_id;
    this.Username = data.username;
  }

  private makeDate(value: Date): string {
    return value.getFullYear() + '-' + value.getMonth() + '-' + value.getDate();
  }

  private makeTime(value: Date): string {
    return value.getHours() + ':' + value.getMinutes();
  }
}
