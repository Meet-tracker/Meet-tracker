import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor(private _apiService: ApiService) {
  }


}
