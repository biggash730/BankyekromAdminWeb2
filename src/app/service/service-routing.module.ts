import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteNames } from '../shared/constants';
import { ServiceComponent } from './service.component';
import { AuthGuard } from '../auth-guard.service';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceFormComponent } from './service-form/service-form.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';

const routes: Routes = [
  {
    path: RouteNames.service,
    redirectTo: `${RouteNames.service}/${RouteNames.requestList}`,
    pathMatch: 'full'
  },
  {
    path: RouteNames.service,
    component: ServiceComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: RouteNames.requestList,
        component: ServiceListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.requestForm,
        component: ServiceFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.requestFormEdit,
        component: ServiceFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.requestDetailsId,
        component: ServiceDetailsComponent,
        canActivate: [AuthGuard]
      }
      // },
      // {
      //   path: RouteNames.farmList,
      //   component: FarmListComponent,
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: RouteNames.farmForm,
      //   component: FarmFormComponent,
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: RouteNames.farmFormEdit,
      //   component: FarmFormComponent,
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: RouteNames.farmDetailsId,
      //   component: FarmDetailsComponent,
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: RouteNames.farmMap,
      //   component: FarmsMapComponent,
      //   canActivate: [AuthGuard]
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
