import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UserModel } from '../../main/components/list-users/models/user.model';
import { take, tap } from 'rxjs';

@Component({
  templateUrl: 'list-user-item.component.html',
  styleUrls: ['list-user-item.scss'],
  selector: 'list-users-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUserItemComponent {

  @Input() model!: UserModel;

  public open: boolean = false;
  public isDeleted: boolean = false;

  constructor(
    private _apiService: ApiService,
    private _cdr: ChangeDetectorRef,
  ) {
  }

  public blockUser(event: Event): void {
    this.open = false;
    if (event.defaultPrevented) {
      return
    }
    event.preventDefault();
    this._apiService.blockUser(this.model.Username).pipe(take(1)).subscribe();
    this.model.isActive = false;
    this._cdr.detectChanges();
  }

  public deleteUser(event: Event): void {
    this.open = false;
    if (event.defaultPrevented) {
      return
    }
    event.preventDefault();
    this.isDeleted = true;
    this._apiService.deleteUser(this.model.Username).pipe(take(1)).subscribe();
    this._cdr.detectChanges();
  }

  public makeAdminUser(event: Event): void {
    this.open = false;
    if (event.defaultPrevented) {
      return
    }
    event.preventDefault();
    this._apiService.makeAdminUser(this.model.Username).pipe(take(1)).subscribe();
    this.model.Role = 'admin';
    this._cdr.detectChanges();
  }

  public removeAdminUser(event: Event): void {
    this.open = false;
    if (event.defaultPrevented) {
      return
    }
    event.preventDefault();
    this._apiService.removeAdminUser(this.model.Username).pipe(take(1)).subscribe();
    this.model.Role = 'user';
    this._cdr.detectChanges();
  }
}
