import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './main.routes';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ListVideosComponent } from './components/list-videos/list-videos.component';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import {
  TuiAccordion,
  TuiAccordionDirective, TuiAccordionItem,
  TuiAvatar, TuiFile, TuiFileRejectedPipe, TuiFilesComponent, TuiInputFiles, TuiInputFilesDirective
} from '@taiga-ui/kit';
import { ContentBlockComponent } from './components/content-block/content-block.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainLayoutComponent,
    ContentBlockComponent,
    ListUsersComponent,
    ListVideosComponent
  ],
  imports: [
    CommonModule,
    routing,
    TuiButton,
    TuiAvatar,
    TuiIcon,
    TuiAccordionDirective,
    TuiAccordionItem,
    [TuiAccordion],
    TuiFilesComponent,
    TuiFile,
    TuiInputFiles,
    TuiInputFilesDirective,
    ReactiveFormsModule,
    TuiFileRejectedPipe,
  ],
})
export class MainModule {
}
