import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouteNames } from 'src/app/shared/constants';
import { ServiceRequestsService } from '../shared/service.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { Processor, ProcessorsQuery } from '../shared/service.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize, takeUntil } from 'rxjs/operators';
import { MessageDialog } from 'src/app/shared/message_helper';
import { Lookup } from 'src/app/shared/common-entities.model';
import { SettingsService } from 'src/app/app-settings/settings/settings.service';

@Component({
  selector: 'app-processor-list',
  templateUrl: './processor-list.component.html',
  styleUrls: ['./processor-list.component.scss']
})
export class ProcessorListComponent implements OnInit, OnDestroy {

  processors$: Observable<Processor[]>;
  @BlockUI() blockUi: NgBlockUI;
  unsubscribe$ = new Subject<void>();
  filter = <ProcessorsQuery>{};
  name = ''
  lastFilter: ProcessorsQuery;
  pageSizes = [10, 20, 50, 100]
  totalRecords = 0;
  currentPage = 1;
  size = this.pageSizes[1];
  districts$: Observable<any>
  regions$: Observable<any>

  constructor(private router: Router,
    private serviceRequestsService: ServiceRequestsService,
    private settingsService: SettingsService) { }

  ngOnInit() {
    this.getProcessors(<ProcessorsQuery>{});
    this.loadRegions()
    this.loadDistricts()
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  openForm() {
    this.router.navigateByUrl(RouteNames.processorForm);
  }

  editForm(id: number) {
    this.router.navigateByUrl(`${RouteNames.service}/${RouteNames.processorForm}/${id}`);
  }

  delete(id: number) {
    MessageDialog.confirm('Delete Processor', 'Are you sure you want to delete this processor?').then(confirm => {
      if (confirm.value) {
        this.blockUi.start('Deleting...');
        this.serviceRequestsService.deleteProcessor(id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(res => {
            this.blockUi.stop();
            this.getProcessors(<ProcessorsQuery>{});
          }, () => this.blockUi.stop());
      }
    });
  }

  view(id: number) {
    this.router.navigateByUrl(`${RouteNames.service}/${RouteNames.processorDetails}/${id}`);
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.lastFilter.pager.page = page;
    this.blockUi.start('Loading...');
    this.processors$ = this.serviceRequestsService.queryProcessors(this.lastFilter).pipe(
      finalize(() => this.blockUi.stop())
    );
  }

  getProcessors(filter: ProcessorsQuery) {
    filter.pager = filter.pager || { page: 1, size: this.size };
    this.lastFilter = Object.assign({}, filter);
    this.blockUi.start('Loading...');
    this.processors$ = this.serviceRequestsService.queryProcessors(filter).pipe(
      finalize(() => {
        this.totalRecords = this.serviceRequestsService.totalProcessors
        this.blockUi.stop()
      })
    );
  }

  pageSizeChangeEvent() {
    this.filter.pager = { page: 1, size: this.size }
    this.getProcessors(this.filter)
  }

  private loadRegions() {
    this.regions$ = this.settingsService.fetch2('regions')
  }

  private loadDistricts() {
    this.districts$ = this.settingsService.fetch2('districts')
  }
}
