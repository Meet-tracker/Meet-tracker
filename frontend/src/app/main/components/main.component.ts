import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor(private _apiService: ApiService) {

    forkJoin([
      this._apiService.getAdmin(),
      this._apiService.getUser(),
      this._apiService.getDatabase(),
      this._apiService.getProcessing(),
    ]).subscribe();
  }
}
