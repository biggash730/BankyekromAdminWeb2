import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouteNames } from 'src/app/shared/constants';
import { ServiceRequestsService } from '../shared/service.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { ServiceProvider, ServiceProvidersQuery } from '../shared/service.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize, takeUntil } from 'rxjs/operators';
import { MessageDialog } from 'src/app/shared/message_helper';
import { Lookup } from 'src/app/shared/common-entities.model';
import { SettingsService } from 'src/app/app-settings/settings/settings.service';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss']
})
export class ServiceProviderListComponent implements OnInit, OnDestroy {

  providers$: Observable<ServiceProvider[]>;
  @BlockUI() blockUi: NgBlockUI;
  unsubscribe$ = new Subject<void>();
  filter = <ServiceProvidersQuery>{};
  name = ''
  lastFilter: ServiceProvidersQuery;
  pageSizes = [10, 20, 50, 100]
  totalRecords = 0;
  currentPage = 1;
  size = this.pageSizes[1];
  services$: Observable<any>
  districts$: Observable<any>
  regions$: Observable<any>

  constructor(private router: Router,
    private serviceRequestsService: ServiceRequestsService,
    private settingsService: SettingsService) { }

  ngOnInit() {
    this.getProviders(<ServiceProvidersQuery>{});
    this.loadServices()
    this.loadRegions()
    this.loadDistricts()
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  openForm() {
    this.router.navigateByUrl(RouteNames.providerForm);
  }

  editForm(id: number) {
    this.router.navigateByUrl(`${RouteNames.service}/${RouteNames.providerForm}/${id}`);
  }

  delete(id: number) {
    MessageDialog.confirm('Delete Service Provider', 'Are you sure you want to delete this provider?').then(confirm => {
      if (confirm.value) {
        this.blockUi.start('Deleting...');
        this.serviceRequestsService.deleteServiceProvider(id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(res => {
            this.blockUi.stop();
            this.getProviders(<ServiceProvidersQuery>{});
          }, () => this.blockUi.stop());
      }
    });
  }

  view(id: number) {
    this.router.navigateByUrl(`${RouteNames.service}/${RouteNames.providerDetails}/${id}`);
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.lastFilter.pager.page = page;
    this.blockUi.start('Loading...');
    this.providers$ = this.serviceRequestsService.queryServiceProviders(this.lastFilter).pipe(
      finalize(() => this.blockUi.stop())
    );
  }

  getProviders(filter: ServiceProvidersQuery) {
    filter.pager = filter.pager || { page: 1, size: this.size };
    this.lastFilter = Object.assign({}, filter);
    this.blockUi.start('Loading...');
    this.providers$ = this.serviceRequestsService.queryServiceProviders(filter).pipe(
      finalize(() => {
        this.totalRecords = this.serviceRequestsService.totalServiceProviders
        this.blockUi.stop()
      })
    );
  }

  pageSizeChangeEvent() {
    this.filter.pager = { page: 1, size: this.size }
    this.getProviders(this.filter)
  }

  setStatusColor(status: string) {
    switch (status) {
      case 'Pending': return 'badge badge-primary'
      case 'Started': return 'badge badge-info'
      case 'Cancelled': return 'badge badge-danger'
      case 'Completed': return 'badge badge-success'
      default: return 'badge badge-default'
    }
  }

  private loadServices() {
    this.services$ = this.settingsService.fetch2('services')
  }

  private loadRegions() {
    this.regions$ = this.settingsService.fetch2('regions')
  }

  private loadDistricts() {
    this.districts$ = this.settingsService.fetch2('districts')
  }
}
