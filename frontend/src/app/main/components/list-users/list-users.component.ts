import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'list-users',
  templateUrl: 'list-users.component.html',
  styleUrls: ['list-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUsersComponent {

}
