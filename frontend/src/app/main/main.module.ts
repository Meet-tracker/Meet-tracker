import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './main.routes';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ListVideosComponent } from './components/list-videos/list-videos.component';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';

@NgModule({
  declarations: [
    MainLayoutComponent,
    ListVideosComponent,
  ],
    imports: [
        CommonModule,
        routing,
        TuiButton,
        TuiAvatar,
        TuiIcon
    ]
})
export class MainModule { }
