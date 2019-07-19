import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { FarmerRoutingModule } from './farmer-routing.module';
import { FarmerComponent } from './farmer.component';
import { FarmerListComponent } from './farmer-list/farmer-list.component';
import { FarmerFormComponent } from './farmer-form/farmer-form.component';
import { FarmerDetailsComponent } from './farmer-details/farmer-details.component';
import { FarmListComponent } from './farm-list/farm-list.component';
import { FarmFormComponent } from './farm-form/farm-form.component';
import { FarmDetailsComponent } from './farm-details/farm-details.component';
import { FarmsMapComponent } from './farms-map/farms-map.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    FarmerComponent,
    FarmerListComponent,
    FarmerFormComponent,
    FarmerDetailsComponent,
    FarmListComponent,
    FarmFormComponent,
    FarmDetailsComponent,
    FarmsMapComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    InternationalPhoneNumberModule,
    NgbTabsetModule,
    FarmerRoutingModule,
    BlockUIModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDGIvGsTpPG12ioffl1t5dK3I9KfeCee1g'
    })
  ]
})
export class FarmerModule { }
