import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { VideoModel } from '../../main/components/list-videos/models/video.model';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import e from 'express';

@Component({
  templateUrl: 'list-videos-item.component.html',
  styleUrls: ['list-videos-item.scss'],
  selector: 'list-videos-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListVideosItemComponent {

  @Input() model!: VideoModel;

  public open: boolean = false;

  public isDeleted: boolean = false;

  constructor(
    private _router: Router,
    private _apiService: ApiService,
    private _cdr: ChangeDetectorRef,
  ) {
  }

  public toVideoInf(event: Event): void {
    if (event.defaultPrevented) {
      return
    }
    event.preventDefault();
    this._router.navigate([`main/video/${this.model.Id}`]);
  }

  public deleteItem(event: Event): void {
    if (event.defaultPrevented) {
      return
    }
    event.preventDefault();
    this.isDeleted = true;
    this._apiService.deleteVideo(this.model.Id).subscribe();
    this._cdr.detectChanges();
  }
}
