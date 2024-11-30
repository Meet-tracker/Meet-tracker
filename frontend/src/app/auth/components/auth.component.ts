import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ILoginModel } from '../interfaces/login-model';
import sha256 from 'crypto-js/sha256';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.scss'],
})
export class AuthComponent{

  constructor(
    private _apiService: ApiService,
    private _router: Router,
  ) {
  }

  protected readonly authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ])
  });

  public message: string = '';

  public onSubmit(): void {
    if (this.authForm.valid) {
      this._apiService.logout();
      const authFormValue: ILoginModel = this.authForm.value as ILoginModel;

      authFormValue.password = sha256(this.authForm.value.password + '').toString();
      this._apiService.login(authFormValue)
        .subscribe(
          {
            next: () => {
              this._router.navigate(['main']);
            },
            error: (error: Error) => {
              this.message = 'Не удалось войти'
            }
          }
        );
    }
  }
}
