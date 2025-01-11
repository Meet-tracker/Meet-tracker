import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { VideoModel } from '../list-videos/models/video.model';

@Component({
  selector: 'app-components',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {

  public showAdminPanel: boolean = false;

  constructor(
    private _apiService: ApiService,
    private readonly _router: Router,
  ) {
    this.showAdminPanel = this._apiService.isAdmin();
  }

  public toVideoInf(video: VideoModel): void {
    this._router.navigate([`main/video/${video.Id}`]);
  }
}
