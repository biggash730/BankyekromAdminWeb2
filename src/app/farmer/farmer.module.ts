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
// import { SubscriberGroupListComponent } from './subscriber-group-list/subscriber-group-list.component';
// import { SubscriberGroupFormComponent } from './subscriber-group-form/subscriber-group-form.component';
// import { SubscriberImportComponent } from './subscriber-import/subscriber-import.component';
// import { SubscriberExportComponent } from './subscriber-export/subscriber-export.component';
// import { SubscriberDetailsComponent } from './subscriber-details/subscriber-details.component';


@NgModule({
  declarations: [
    FarmerComponent,
    FarmerListComponent,
    FarmerFormComponent
    // SubscriberFormComponent,
    // SubscriberGroupFormComponent,
    // SubscriberImportComponent,
    // SubscriberExportComponent,
    // SubscriberDetailsComponent
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
    BlockUIModule.forRoot()
  ]
})
export class FarmerModule { }
