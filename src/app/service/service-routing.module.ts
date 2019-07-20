import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteNames } from '../shared/constants';
import { ServiceComponent } from './service.component';
import { AuthGuard } from '../auth-guard.service';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceFormComponent } from './service-form/service-form.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceProviderListComponent } from './provider-list/provider-list.component';
import { ServiceProviderFormComponent } from './provider-form/provider-form.component';
import { ServiceProviderDetailsComponent } from './provider-details/provider-details.component';
import { ProcessorListComponent } from './processor-list/processor-list.component';
import { ProcessorFormComponent } from './processor-form/processor-form.component';
import { ProcessorDetailsComponent } from './processor-details/processor-details.component';

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
      },
      {
        path: RouteNames.providerList,
        component: ServiceProviderListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.providerForm,
        component: ServiceProviderFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.providerFormEdit,
        component: ServiceProviderFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.providerDetailsId,
        component: ServiceProviderDetailsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.processorList,
        component: ProcessorListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.processorForm,
        component: ProcessorFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.processorFormEdit,
        component: ProcessorFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.processorDetailsId,
        component: ProcessorDetailsComponent,
        canActivate: [AuthGuard]
      },
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
