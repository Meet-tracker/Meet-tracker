import { Component } from '@angular/core';
import { HeaderComponent } from '../modules/header/header.component';
import { MainModule } from '../main/main.module';
import { NgIf } from '@angular/common';
import { UserModel } from '../main/components/list-users/models/user.model';
import { VideoModel } from '../main/components/list-videos/models/video.model';
import { ApiService } from '../services/api.service';

@Component({
  standalone: true,
  templateUrl: 'users.component.html',
  imports: [
    HeaderComponent,
    MainModule,
    NgIf
  ],
  styleUrls: ['users.scss']
})
export class UsersComponent {
  public currentUser: UserModel | null = null;
  public videoText: string = '';

  constructor(
    private readonly _apiService: ApiService,
  ) {
  }

  setCurrentUser(user: UserModel) {
    this.currentUser = user;
  }

  setSelectVideo(video: VideoModel) {
    this._apiService.getResult(video.Id)
      .subscribe({
        next: result => {
          this.videoText = result.result;
        }
      })
  }
}
