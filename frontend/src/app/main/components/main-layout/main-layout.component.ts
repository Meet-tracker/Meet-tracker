import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-components',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {

  constructor(private _apiService: ApiService) { }

  public getTgBotLink(): string {
    return `tg://resolve?domain=meet_tracker_bot&start=${this._apiService.getToken()}`
  }
}
