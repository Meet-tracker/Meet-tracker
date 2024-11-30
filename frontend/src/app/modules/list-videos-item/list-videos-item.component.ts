import { Component, Input } from '@angular/core';
import { VideoModel } from '../../main/components/list-videos/models/video.model';

@Component({
  templateUrl: 'list-videos-item.component.html',
  styleUrls: ['list-videos-item.scss'],
  selector: 'list-videos-item',
})
export class ListVideosItemComponent {

  @Input() model!: VideoModel;

  public open: boolean = false;

}
