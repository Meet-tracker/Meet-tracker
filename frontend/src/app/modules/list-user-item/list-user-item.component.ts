import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UserModel } from '../../main/components/list-users/models/user.model';

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
    private _router: Router,
    private _apiService: ApiService,
    private _cdr: ChangeDetectorRef,
  ) {
  }

  // public toVideoInf(event: Event): void {
  //   if (event.defaultPrevented) {
  //     return
  //   }
  //   event.preventDefault();
  //   this._router.navigate([`main/video/${this.model.Id}`]);
  // }
  //
  // public deleteItem(event: Event): void {
  //   if (event.defaultPrevented) {
  //     return
  //   }
  //   event.preventDefault();
  //   this.isDeleted = true;
  //   this._apiService.deleteVideo(this.model.Id).subscribe();
  //   this._cdr.detectChanges();
  // }
}
