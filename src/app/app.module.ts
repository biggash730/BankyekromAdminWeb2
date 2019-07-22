import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';
import { AppComponent } from './app.component';
import { LoadingComponent } from './shared/loading.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { LoginComponent } from './auth/login.component';
import { Interceptor } from './shared/interceptor';
import { AuthService } from './auth/auth.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ProfileModule } from './profile/profile.module';
import { AdminModule } from './admin/admin.module';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { AppSettingsModule } from './app-settings/app-settings.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReportModule } from './report/report.module';
import { FarmerModule } from './farmer/farmer.module';
import { ServiceModule } from './service/service.module';
import { SeasonModule } from './season/season.module';

import { SubscriberModule } from './subscriber/subscriber.module';
import { ContentModule } from './content/content.module';
import { CampaignModule } from './campaign/campaign.module';



@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    PageNotFoundComponent,
    LoginComponent,
    AppSettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AdminModule,
    ProfileModule,
    FarmerModule,
    ServiceModule,
    AppSettingsModule,
    DashboardModule,
    ReportModule,
    SeasonModule,
    CoreModule,
    BlockUIModule.forRoot(),


    SubscriberModule,
    ContentModule,
    CampaignModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
