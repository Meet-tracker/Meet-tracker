import { Component } from '@angular/core';
import { ApiService } from '../../../api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-components',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  constructor(private _apiService: ApiService) {

    forkJoin([
      this._apiService.getAdmin(),
      this._apiService.getUser(),
      this._apiService.getDatabase(),
    ]).subscribe();
  }
}
