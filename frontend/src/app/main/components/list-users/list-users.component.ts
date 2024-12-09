import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { map } from 'rxjs';
import { UserModel } from './models/user.model';
import { IUserResponseModel } from './interfaces/user-response-model.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILoginModel } from '../../../auth/interfaces/login-model';
import { IUserRequestModel } from './interfaces/user-request-model.interface';
import sha256 from 'crypto-js/sha256';

@Component({
  selector: 'list-users',
  templateUrl: 'list-users.component.html',
  styleUrls: ['list-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUsersComponent implements OnInit {

  public listUsers: UserModel[] = [];

  public openAddMenu: boolean = false;

  constructor(
    private _apiService: ApiService,
    private _cdr: ChangeDetectorRef,
  ) {
    this._apiService.getUsers().subscribe();
  }

  protected readonly addForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ])
  });

  public ngOnInit(): void {
    this._apiService.getUsers()
      .pipe(
        map((result: IUserResponseModel[]) => {
          return result.map((user: IUserResponseModel) => new UserModel(user))
        })
      )
      .subscribe(
        {
          next: ((result: UserModel[]) => {
            this.listUsers = result;
            this._cdr.detectChanges();
          })
        }
      )
  }


  public onSubmit(): void {
    if (!this.addForm.valid) {
      return;
    }

    this.openAddMenu = false;

    const addFormValue: IUserRequestModel = this.addForm.value as IUserRequestModel;

    addFormValue.password = sha256(this.addForm.value.password + '').toString();
    this._apiService.addUser(addFormValue).subscribe({
      next: ({message}) => {
        console.log(message);
      }
    });
    this._cdr.detectChanges();
  }
}
