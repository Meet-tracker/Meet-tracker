import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { VideoModel } from './models/video.model';
import { map } from 'rxjs';
import { IVideoResponseModel } from './interfaces/video-response-model.interface';

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
  ) {

  }

  public ngOnInit(): void {
    this._apiService.getListVideos()
      .pipe(
        map((result: IVideoResponseModel[]) => {
          result.forEach((video: IVideoResponseModel) => {
            this.listVideos.push(new VideoModel(video));
          })
        })
      )
      .subscribe()
  }
}
