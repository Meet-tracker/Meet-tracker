import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'content-block',
  templateUrl: 'content-block.component.html',
  styleUrls: ['content-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentBlockComponent {

}
