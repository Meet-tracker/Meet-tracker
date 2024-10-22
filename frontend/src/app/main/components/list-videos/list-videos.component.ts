import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'list-videos',
  templateUrl: 'list-videos.component.html',
  styleUrls: ['list-videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListVideosComponent {

}
