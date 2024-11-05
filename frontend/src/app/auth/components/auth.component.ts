import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ILoginModel } from '../interfaces/login-model';
import sha256 from 'crypto-js/sha256';

@Component({
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.scss'],
})
export class AuthComponent {

  constructor(
    private _apiService: ApiService,
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


  public onSubmit(): void {
    if (this.authForm.valid) {
      const authFormValue: ILoginModel = this.authForm.value as ILoginModel;

      authFormValue.password = sha256(this.authForm.value.password || '').toString();
      this._apiService.login(authFormValue).subscribe();
    }
  }
}
