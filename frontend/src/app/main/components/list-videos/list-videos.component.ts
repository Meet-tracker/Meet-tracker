import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges
} from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { VideoModel } from './models/video.model';
import { map } from 'rxjs';
import { IVideoResponseModel } from './interfaces/video-response-model.interface';
import { VideoStatus } from './enums/video-status.enum';
import { UserModel } from '../list-users/models/user.model';

@Component({
  selector: 'list-videos',
  templateUrl: 'list-videos.component.html',
  styleUrls: ['list-videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListVideosComponent implements OnInit, OnChanges {
  @Input() currentUser!: UserModel | null;
  @Output() selectVideo: EventEmitter<VideoModel> = new EventEmitter<VideoModel>();

  public listVideos: VideoModel[] = [];

  constructor(
    private _apiService: ApiService,
    private _cdr: ChangeDetectorRef,
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.currentUser) {
      this.getListByUser(this.currentUser);
    }
  }

  public ngOnInit(): void {
      this.getDefaultList();
  }

  private getDefaultList(): void {
    this._apiService.getListVideos()
      .pipe(
        map((result: IVideoResponseModel[]) => {
          return result.map((video: IVideoResponseModel) => new VideoModel(video))
        })
      )
      .subscribe(
        {
          next: ((result: VideoModel[]) => {
            this.listVideos = result;
            this._cdr.detectChanges();
          })
        }
      )
  }

  private getListByUser(user: UserModel): void {
    this._apiService.getListVideosByUser(user.Username)
      .pipe(
        map((result: IVideoResponseModel[]) => {
          return result.map((video: IVideoResponseModel) => new VideoModel(video))
        })
      )
      .subscribe(
        {
          next: ((result: VideoModel[]) => {
            this.listVideos = result;
            this._cdr.detectChanges();
          })
        }
      )
  }

  protected readonly VideoStatus = VideoStatus;
}
