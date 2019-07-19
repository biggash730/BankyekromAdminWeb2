import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouteNames } from 'src/app/shared/constants';
import { FarmerService } from '../shared/farmer.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { Farm, FarmsQuery } from '../shared/farmer.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize, takeUntil } from 'rxjs/operators';
import { MessageDialog } from 'src/app/shared/message_helper';
import { Lookup } from 'src/app/shared/common-entities.model';
import { SettingsService } from 'src/app/app-settings/settings/settings.service';

@Component({
  selector: 'app-farm-list',
  templateUrl: './farm-list.component.html',
  styleUrls: ['./farm-list.component.scss']
})
export class FarmListComponent implements OnInit, OnDestroy {

  farms$: Observable<Farm[]>;
  @BlockUI() blockUi: NgBlockUI;
  unsubscribe$ = new Subject<void>();
  filter = <FarmsQuery>{};
  name = ''
  lastFilter: FarmsQuery;
  pageSizes = [10, 20, 50, 100]
  totalRecords = 0;
  currentPage = 1;
  size = this.pageSizes[1];
  areas$: Observable<any>
  districts$: Observable<any>
  regions$: Observable<any>

  constructor(private router: Router,
    private farmerService: FarmerService,
    private settingsService: SettingsService) { }

  ngOnInit() {
    this.getFarms(<FarmsQuery>{});
    this.loadDistricts()
    this.loadRegions()
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  openForm() {
    this.router.navigateByUrl(RouteNames.farmForm);
  }

  editForm(id: number) {
    this.router.navigateByUrl(`${RouteNames.farmer}/${RouteNames.farmForm}/${id}`);
  }

  delete(id: number) {
    MessageDialog.confirm('Delete Farm', 'Are you sure you want to delete this farm?').then(confirm => {
      if (confirm.value) {
        this.blockUi.start('Deleting...');
        this.farmerService.deleteFarm(id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(res => {
            this.blockUi.stop();
            this.getFarms(<FarmsQuery>{});
          }, () => this.blockUi.stop());
      }
    });
  }

  view(id: number) {
    this.router.navigateByUrl(`${RouteNames.farmer}/${RouteNames.farmDetails}/${id}`);
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.lastFilter.pager.page = page;
    this.blockUi.start('Loading...');
    this.farms$ = this.farmerService.queryFarms(this.lastFilter).pipe(
      finalize(() => this.blockUi.stop())
    );
  }

  getFarms(filter: FarmsQuery) {
    filter.pager = filter.pager || { page: 1, size: this.size };
    this.lastFilter = Object.assign({}, filter);
    this.blockUi.start('Loading...');
    this.farms$ = this.farmerService.queryFarms(filter).pipe(
      finalize(() => {
        this.totalRecords = this.farmerService.totalFarms
        this.blockUi.stop()
      })
    );
  }

  pageSizeChangeEvent() {
    this.filter.pager = { page: 1, size: this.size }
    this.getFarms(this.filter)
  }


  private loadDistricts() {
    this.districts$ = this.settingsService.fetch2('districts')
  }

  private loadRegions() {
    this.regions$ = this.settingsService.fetch2('regions')
  }
}
