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

  public showAdminPanel: boolean = false;

  constructor(
    private _apiService: ApiService,
  ) {
    this.showAdminPanel = this._apiService.isAdmin();
  }
}
