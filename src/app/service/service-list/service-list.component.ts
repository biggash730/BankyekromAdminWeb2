import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouteNames } from 'src/app/shared/constants';
import { ServiceRequestsService } from '../shared/service.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { ServiceRequest, ServiceRequestsQuery } from '../shared/service.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize, takeUntil } from 'rxjs/operators';
import { MessageDialog } from 'src/app/shared/message_helper';
import { Lookup } from 'src/app/shared/common-entities.model';
import { SettingsService } from 'src/app/app-settings/settings/settings.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit, OnDestroy {

  requests$: Observable<ServiceRequest[]>;
  @BlockUI() blockUi: NgBlockUI;
  unsubscribe$ = new Subject<void>();
  filter = <ServiceRequestsQuery>{};
  name = ''
  lastFilter: ServiceRequestsQuery;
  pageSizes = [10, 20, 50, 100]
  totalRecords = 0;
  currentPage = 1;
  size = this.pageSizes[1];
  services$: Observable<any>
  serviceProviders$: Observable<any>

  constructor(private router: Router,
    private serviceRequestsService: ServiceRequestsService,
    private settingsService: SettingsService) { }

  ngOnInit() {
    this.getRequests(<ServiceRequestsQuery>{});
    this.loadServices()
    this.loadServiceProviders()
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  openForm() {
    this.router.navigateByUrl(RouteNames.requestForm);
  }

  editForm(id: number) {
    this.router.navigateByUrl(`${RouteNames.service}/${RouteNames.requestForm}/${id}`);
  }

  delete(id: number) {
    MessageDialog.confirm('Delete Request', 'Are you sure you want to delete this request?').then(confirm => {
      if (confirm.value) {
        this.blockUi.start('Deleting...');
        this.serviceRequestsService.deleteServiceRequest(id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(res => {
            this.blockUi.stop();
            this.getRequests(<ServiceRequestsQuery>{});
          }, () => this.blockUi.stop());
      }
    });
  }

  view(id: number) {
    this.router.navigateByUrl(`${RouteNames.service}/${RouteNames.requestDetails}/${id}`);
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.lastFilter.pager.page = page;
    this.blockUi.start('Loading...');
    this.requests$ = this.serviceRequestsService.queryServiceRequests(this.lastFilter).pipe(
      finalize(() => this.blockUi.stop())
    );
  }

  getRequests(filter: ServiceRequestsQuery) {
    filter.pager = filter.pager || { page: 1, size: this.size };
    this.lastFilter = Object.assign({}, filter);
    this.blockUi.start('Loading...');
    this.requests$ = this.serviceRequestsService.queryServiceRequests(filter).pipe(
      finalize(() => {
        this.totalRecords = this.serviceRequestsService.totalServiceRequests
        this.blockUi.stop()
      })
    );
  }

  pageSizeChangeEvent() {
    this.filter.pager = { page: 1, size: this.size }
    this.getRequests(this.filter)
  }

  setStatusColor(status: string) {
    switch (status) {
      case 'Pending': return 'badge badge-danger'
      case 'Started': return 'badge badge-info'
      case 'Completed': return 'badge badge-success'
      default: return 'badge badge-default'
    }
  }

  private loadServices() {
    this.services$ = this.settingsService.fetch2('services')
  }

  private loadServiceProviders() {
    this.serviceProviders$ = this.serviceRequestsService.fetchServiceProviders()
  }

}
