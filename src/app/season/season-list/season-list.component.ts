import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouteNames } from 'src/app/shared/constants';
import { SeasonsService } from '../shared/season.service';
import { FarmerService } from '../../farmer/shared/farmer.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { Season, SeasonsQuery } from '../shared/season.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize, takeUntil } from 'rxjs/operators';
import { MessageDialog } from 'src/app/shared/message_helper';
import { Lookup } from 'src/app/shared/common-entities.model';
import { SettingsService } from 'src/app/app-settings/settings/settings.service';

@Component({
  selector: 'app-season-list',
  templateUrl: './season-list.component.html',
  styleUrls: ['./season-list.component.scss']
})
export class SeasonListComponent implements OnInit, OnDestroy {

  seasons$: Observable<Season[]>;
  @BlockUI() blockUi: NgBlockUI;
  unsubscribe$ = new Subject<void>();
  filter = <SeasonsQuery>{};
  name = ''
  lastFilter: SeasonsQuery;
  pageSizes = [10, 20, 50, 100]
  totalRecords = 0;
  currentPage = 1;
  size = this.pageSizes[1];
  farms$: Observable<any>
  varieties$: Observable<any>
  districts$: Observable<any>
  regions$: Observable<any>

  constructor(private router: Router,
    private serviceRequestsService: SeasonsService,
    private settingsService: SettingsService,
    private farmerService: FarmerService) { }

  ngOnInit() {
    this.getSeasons(<SeasonsQuery>{});
    this.loadFarms()
    this.loadVarieties()
    this.loadDistricts()
    this.loadRegions()
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  openForm() {
    this.router.navigateByUrl(RouteNames.seasonForm);
  }

  editForm(id: number) {
    this.router.navigateByUrl(`${RouteNames.season}/${RouteNames.seasonForm}/${id}`);
  }

  delete(id: number) {
    MessageDialog.confirm('Delete Planting Seasons', 'Are you sure you want to delete this record?').then(confirm => {
      if (confirm.value) {
        this.blockUi.start('Deleting...');
        this.serviceRequestsService.deleteSeason(id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(res => {
            this.blockUi.stop();
            this.getSeasons(<SeasonsQuery>{});
          }, () => this.blockUi.stop());
      }
    });
  }

  view(id: number) {
    this.router.navigateByUrl(`${RouteNames.season}/${RouteNames.seasonDetails}/${id}`);
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.lastFilter.pager.page = page;
    this.blockUi.start('Loading...');
    this.seasons$ = this.serviceRequestsService.querySeasons(this.lastFilter).pipe(
      finalize(() => this.blockUi.stop())
    );
  }

  getSeasons(filter: SeasonsQuery) {
    filter.pager = filter.pager || { page: 1, size: this.size };
    this.lastFilter = Object.assign({}, filter);
    this.blockUi.start('Loading...');
    this.seasons$ = this.serviceRequestsService.querySeasons(filter).pipe(
      finalize(() => {
        this.totalRecords = this.serviceRequestsService.totalSeasons
        this.blockUi.stop()
      })
    );
  }

  pageSizeChangeEvent() {
    this.filter.pager = { page: 1, size: this.size }
    this.getSeasons(this.filter)
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

  private loadFarms() {
    this.farms$ = this.farmerService.fetchFarms()
  }

  private loadVarieties() {
    this.varieties$ = this.settingsService.fetch2('varieties')
  }

  private loadRegions() {
    this.regions$ = this.settingsService.fetch2('regions')
  }

  private loadDistricts() {
    this.districts$ = this.settingsService.fetch2('districts')
  }

}
