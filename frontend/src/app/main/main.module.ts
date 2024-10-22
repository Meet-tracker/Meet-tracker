import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './main.routes';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ListVideosComponent } from './components/list-videos/list-videos.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    ListVideosComponent,
  ],
  imports: [
    CommonModule,
    routing
  ]
})
export class MainModule { }
