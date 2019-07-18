import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteNames } from '../shared/constants';
import { FarmerComponent } from './farmer.component';
import { AuthGuard } from '../auth-guard.service';
import { FarmerListComponent } from './farmer-list/farmer-list.component';
import { FarmerFormComponent } from './farmer-form/farmer-form.component';
import { FarmerDetailsComponent } from './farmer-details/farmer-details.component';

const routes: Routes = [
  {
    path: RouteNames.farmer,
    redirectTo: `${RouteNames.farmer}/${RouteNames.farmerList}`,
    pathMatch: 'full'
  },
  {
    path: RouteNames.farmer,
    component: FarmerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: RouteNames.farmerList,
        component: FarmerListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.farmerForm,
        component: FarmerFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.farmerFormEdit,
        component: FarmerFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.farmerDetailsId,
        component: FarmerDetailsComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmerRoutingModule { }
