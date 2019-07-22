import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteNames } from '../shared/constants';
import { SeasonComponent } from './season.component';
import { AuthGuard } from '../auth-guard.service';
import { SeasonListComponent } from './season-list/season-list.component';
import { SeasonFormComponent } from './season-form/season-form.component';
import { SeasonDetailsComponent } from './season-details/season-details.component';
import { SeasonsMapComponent } from './seasons-map/seasons-map.component';

const routes: Routes = [
  {
    path: RouteNames.season,
    redirectTo: `${RouteNames.season}/${RouteNames.seasonList}`,
    pathMatch: 'full'
  },
  {
    path: RouteNames.season,
    component: SeasonComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: RouteNames.seasonList,
        component: SeasonListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.seasonForm,
        component: SeasonFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.seasonFormEdit,
        component: SeasonFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.seasonDetailsId,
        component: SeasonDetailsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.seasonActiveStats,
        component: SeasonListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteNames.seasonActiveMap,
        component: SeasonsMapComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeasonRoutingModule { }
