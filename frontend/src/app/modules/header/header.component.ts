import { Component } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.scss'],
  imports: [
    TuiIcon
  ],
  standalone: true
})
export class HeaderComponent {

  constructor(
    private _apiService: ApiService,
    private _router: Router,
  ) {
  }

  public getTgBotLink(): string {
    return `tg://resolve?domain=meet_tracker_bot&start=${this._apiService.getUserName()}`
  }

  public logOut(): void {
    this._apiService.logout();
    this._router.navigate(['auth']);
  }

  public toServerSettings(): void {
    this._router.navigate(['server-settings']);
  }

  public toMain(): void {
    this._router.navigate(['main']);
  }
}
