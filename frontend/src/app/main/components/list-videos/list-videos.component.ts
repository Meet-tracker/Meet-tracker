import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { VideoModel } from './models/video.model';
import { map } from 'rxjs';
import { IVideoResponseModel } from './interfaces/video-response-model.interface';
import { VideoStatus } from './enums/video-status.enum';

@Component({
  selector: 'list-videos',
  templateUrl: 'list-videos.component.html',
  styleUrls: ['list-videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListVideosComponent implements OnInit {
  public listVideos: VideoModel[] = [];

  constructor(
    private _apiService: ApiService,
    private _cdr: ChangeDetectorRef,
  ) {

  }

  public ngOnInit(): void {
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

  protected readonly VideoStatus = VideoStatus;
}
