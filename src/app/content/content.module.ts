import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { SharedModule } from '../shared/shared.module';
import { TreeListComponent } from './tree-list/tree-list.component';
import { TreeFormComponent } from './tree-form/tree-form.component';
import { TreeDetailsComponent } from './tree-details/tree-details.component';
import { MediaLibraryComponent } from './media-library/media-library.component';
import { MediaFormComponent } from './media-form/media-form.component';
import { MediaDetailsComponent } from './media-details/media-details.component';
import { TreeStudioComponent } from './tree-studio/tree-studio.component';
import { DefaultAudioComponent } from './default-audio/default-audio.component';
import { DefaultAudioFormComponent } from './default-audio-form/default-audio-form.component';


@NgModule({
  declarations: [
    ContentComponent,
    TreeListComponent,
    TreeStudioComponent,
    TreeFormComponent,
    TreeDetailsComponent,
    MediaLibraryComponent,
    MediaFormComponent,
    MediaDetailsComponent,
    DefaultAudioComponent,
    DefaultAudioFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContentRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContentModule { }
