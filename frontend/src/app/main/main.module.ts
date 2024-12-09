import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './main.routes';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ListVideosComponent } from './components/list-videos/list-videos.component';
import {
  TuiButton,
  TuiDropdownDirective,
  TuiDropdownOpen,
  TuiDropdownOptionsDirective,
  TuiIcon,
  TuiLink, TuiOptGroup, TuiOption
} from '@taiga-ui/core';
import {
  TuiAccordion,
  TuiAccordionDirective,
  TuiAccordionItem,
  TuiAvatar, TuiBadge,
  TuiChevron,
  TuiDataListDropdownManager,
  TuiFile,
  TuiFileRejectedPipe,
  TuiFilesComponent,
  TuiInputFiles,
  TuiInputFilesDirective, TuiLineClamp, TuiStatus
} from '@taiga-ui/kit';
import { ContentBlockComponent } from './components/content-block/content-block.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListVideosItemComponent } from '../modules/list-videos-item/list-videos-item.component';
import { ListUserItemComponent } from '../modules/list-user-item/list-user-item.component';
import { TuiInputModule, TuiInputNumberModule } from '@taiga-ui/legacy';

@NgModule({
  declarations: [
    MainLayoutComponent,
    ContentBlockComponent,
    ListUsersComponent,
    ListVideosComponent,
    ListVideosItemComponent,
    ListUserItemComponent,
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
        TuiChevron,
        TuiDropdownOptionsDirective,
        TuiLink,
        TuiDropdownDirective,
        TuiDropdownOpen,
        TuiDataListDropdownManager,
        TuiOptGroup,
        TuiOption,
        TuiLineClamp,
        TuiBadge,
        TuiStatus,
        TuiInputModule,
        TuiInputNumberModule,
    ],
})
export class MainModule {
}
