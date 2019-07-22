import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { SeasonRoutingModule } from './season-routing.module';
import { SeasonComponent } from './season.component';
import { SeasonListComponent } from './season-list/season-list.component';
import { SeasonFormComponent } from './season-form/season-form.component';
import { SeasonDetailsComponent } from './season-details/season-details.component';
import { SeasonsMapComponent } from './seasons-map/seasons-map.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    SeasonComponent,
    SeasonListComponent,
    SeasonFormComponent,
    SeasonDetailsComponent,
    SeasonsMapComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    InternationalPhoneNumberModule,
    NgbTabsetModule,
    SeasonRoutingModule,
    BlockUIModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDGIvGsTpPG12ioffl1t5dK3I9KfeCee1g'
    })
  ]
})
export class SeasonModule { }
