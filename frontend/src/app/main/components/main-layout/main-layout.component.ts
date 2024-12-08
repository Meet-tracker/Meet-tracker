import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-components',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {

  constructor(
    private _apiService: ApiService,
    private _router: Router,
  ) {

  }

  public getTgBotLink(): string {
    return `tg://resolve?domain=meet_tracker_bot&start=${this._apiService.getToken()}`
  }

  public logOut(): void {
    this._apiService.logout();
    this._router.navigate(['auth']);
  }
}
