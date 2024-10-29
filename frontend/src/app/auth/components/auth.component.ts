import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.scss'],
})
export class AuthComponent {

  protected readonly authForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ])
  });


  public onSubmit(): void {
    if (this.authForm.valid) {
      const authFormValue = this.authForm.value;

      console.log(authFormValue);
    }
  }
}
