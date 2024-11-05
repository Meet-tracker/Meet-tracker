import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { IResultModel } from '../interfaces/result.model';

@Component({
  templateUrl: 'result.component.html',
  standalone: true,
  styleUrls: ['result.component.scss'],
})
export class ResultComponent implements OnInit{

  public text: string = 'Пусто!!!!'

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _apiService: ApiService,
  ) {}

  public ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.initialize(params['id']);
      }
      else {
        this._router.navigate(['main']);
      }
    })
  }

  public initialize(id: string): void {
    this._apiService.getResult(id)
      .subscribe({
        next: (result: IResultModel) => {
          this.text = result.result;
        },
      })
  }
}
