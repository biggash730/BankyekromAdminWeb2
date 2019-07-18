import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleComponent } from './role/role.component';
import { ResetComponent } from './reset/reset.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AdminRoutingModule
  ],
  declarations: [RoleComponent, UserComponent, AdminComponent, ResetComponent]
})
export class AdminModule { }
