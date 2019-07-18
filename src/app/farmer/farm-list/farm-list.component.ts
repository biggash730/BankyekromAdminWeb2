import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouteNames } from 'src/app/shared/constants';
import { FarmerService } from '../shared/farmer.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { Farmer, FarmersQuery } from '../shared/farmer.model';
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

  farmers$: Observable<Farmer[]>;
  @BlockUI() blockUi: NgBlockUI;
  unsubscribe$ = new Subject<void>();
  filter = <FarmersQuery>{};
  name = ''
  lastFilter: FarmersQuery;
  pageSizes = [10, 20, 50, 100]
  totalRecords = 0;
  currentPage = 1;
  size = this.pageSizes[1];
  gender = ['Female', 'Male']
  areas$: Observable<any>
  districts$: Observable<any>
  regions$: Observable<any>

  constructor(private router: Router,
    private farmerService: FarmerService,
    private settingsService: SettingsService) { }

  ngOnInit() {
    this.getFarmers(<FarmersQuery>{});
    this.loadAreas()
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
    this.router.navigateByUrl(`${RouteNames.farmer}/${RouteNames.farmerForm}/${id}`);
  }

  delete(id: number) {
    MessageDialog.confirm('Delete Farmer', 'Are you sure you want to delete this farmer?').then(confirm => {
      if (confirm.value) {
        this.blockUi.start('Deleting...');
        this.farmerService.deleteFarmer(id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(res => {
            this.blockUi.stop();
            this.getFarmers(<FarmersQuery>{});
          }, () => this.blockUi.stop());
      }
    });
  }

  view(id: number) {
    this.router.navigateByUrl(`${RouteNames.farmer}/${RouteNames.farmerDetails}/${id}`);
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.lastFilter.pager.page = page;
    this.blockUi.start('Loading...');
    this.farmers$ = this.farmerService.queryFarmers(this.lastFilter).pipe(
      finalize(() => this.blockUi.stop())
    );
  }

  getFarmers(filter: FarmersQuery) {
    filter.pager = filter.pager || { page: 1, size: this.size };
    this.lastFilter = Object.assign({}, filter);
    this.blockUi.start('Loading...');
    this.farmers$ = this.farmerService.queryFarmers(filter).pipe(
      finalize(() => {
        this.totalRecords = this.farmerService.totalFarmers
        this.blockUi.stop()
      })
    );
  }

  pageSizeChangeEvent() {
    this.filter.pager = { page: 1, size: this.size }
    this.getFarmers(this.filter)
  }

  setStatusColor(status: string) {
    switch (status) {
      case 'Active': return 'badge badge-success'
      case 'Inactive': return 'badge badge-secondary'
      default: return 'badge badge-danger'
    }
  }

  private loadAreas() {
    this.areas$ = this.settingsService.fetch2('catchmentareas')
  }

  private loadDistricts() {
    this.districts$ = this.settingsService.fetch2('districts')
  }

  private loadRegions() {
    this.regions$ = this.settingsService.fetch2('regions')
  }
}
