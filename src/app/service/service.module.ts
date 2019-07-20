import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { ServiceRoutingModule } from './service-routing.module';
import { ServiceComponent } from './service.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceFormComponent } from './service-form/service-form.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceProviderListComponent } from './provider-list/provider-list.component';
import { ServiceProviderFormComponent } from './provider-form/provider-form.component';
import { ServiceProviderDetailsComponent } from './provider-details/provider-details.component';
import { ProcessorListComponent } from './processor-list/processor-list.component';
import { ProcessorFormComponent } from './processor-form/processor-form.component';
import { ProcessorDetailsComponent } from './processor-details/processor-details.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    ServiceComponent,
    ServiceListComponent,
    ServiceFormComponent,
    ServiceDetailsComponent,
    ServiceProviderListComponent,
    ServiceProviderFormComponent,
    ServiceProviderDetailsComponent,
    ProcessorListComponent,
    ProcessorFormComponent,
    ProcessorDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    InternationalPhoneNumberModule,
    NgbTabsetModule,
    ServiceRoutingModule,
    BlockUIModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDGIvGsTpPG12ioffl1t5dK3I9KfeCee1g'
    })
  ]
})
export class ServiceModule { }
