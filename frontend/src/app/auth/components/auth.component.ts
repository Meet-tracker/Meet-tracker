import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';

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
    const authFormValue = this.authForm.value;

    this._apiService.login(authFormValue).subscribe();

    console.log(authFormValue);
  }
}
