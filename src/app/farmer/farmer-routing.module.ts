import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteNames } from '../shared/constants';
import { FarmerComponent } from './farmer.component';
import { AuthGuard } from '../auth-guard.service';
import { FarmerListComponent } from './farmer-list/farmer-list.component';
import { FarmerFormComponent } from './farmer-form/farmer-form.component';
import { FarmerDetailsComponent } from './farmer-details/farmer-details.component';
import { FarmListComponent } from './farm-list/farm-list.component';
import { FarmFormComponent } from './farm-form/farm-form.component';
import { FarmDetailsComponent } from './farm-details/farm-details.component';

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
      },
      {
        path: RouteNames.farmList,
        component: FarmListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.farmForm,
        component: FarmFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.farmFormEdit,
        component: FarmFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.farmDetailsId,
        component: FarmDetailsComponent,
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
