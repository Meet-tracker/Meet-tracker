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


  public deleteItem(event: Event): void {
    if (event.defaultPrevented) {
      return
    }
    event.preventDefault();
    this.isDeleted = true;
    this._apiService.deleteVideo(this.model.Id).subscribe();
    this._cdr.detectChanges();
  }


  public downloadAudio(event: Event): void {
    if (event.defaultPrevented) {
      return;
    }
    event.preventDefault();

    this._apiService.downloadAudio(this.model.Id).subscribe({
      next: (blob: Blob) => {
        const fileName = `audio_${this.model.Id}.mp3`;
        const downloadLink = document.createElement('a');
        const url = window.URL.createObjectURL(blob);

        downloadLink.href = url;
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(url);
      }
    });
    this._cdr.detectChanges();
  }
}
