import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteNames } from 'src/app/shared/constants';
import { SeasonsService } from '../shared/season.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize, takeUntil } from 'rxjs/operators';
import { MessageDialog } from 'src/app/shared/message_helper';
import { Lookup } from 'src/app/shared/common-entities.model';
import { SettingsService } from 'src/app/app-settings/settings/settings.service';
import { FarmerService } from 'src/app/farmer/shared/farmer.service';

@Component({
  selector: 'app-seasons-map',
  templateUrl: './seasons-map.component.html',
  styleUrls: ['./seasons-map.component.scss']
})
export class SeasonsMapComponent implements OnInit, OnDestroy {
  lat = 5.55602;
  lng = -0.1969;
  form: FormGroup
  seasons: any[];
  @BlockUI() blockUi: NgBlockUI;
  unsubscribe$ = new Subject<void>();
  filter = <any>{size: 50};
  lastFilter: any;
  totalRecords = 0;
  districts$: Observable<any>
  regions$: Observable<any>
  farms$: Observable<any>
  varieties$: Observable<any>

  constructor(private fb: FormBuilder, private router: Router,
    private seasonsService: SeasonsService,
    private settingsService: SettingsService,
    private farmerService: FarmerService) { }

  ngOnInit() {
    this.seasons = <any>[]
    this.setupForm()
    this.loadDistricts()
    this.loadRegions()
    this.loadFarms()
    this.loadVarieties()
    this.getSeasons(this.filter);
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  get size() { return this.form.get('size') }
  get regionId() { return this.form.get('regionId') }
  get districtId() { return this.form.get('districtId') }
  get farmId() { return this.form.get('farmId') }
  get varietyId() { return this.form.get('varietyId') }
  get farmCode() { return this.form.get('farmCode') }

  private setupForm() {
    this.form = this.fb.group({
      regionId: new FormControl(null),
      districtId: new FormControl(null),
      farmCode: new FormControl(''),
      varietyId: new FormControl(null),
      farmId: new FormControl(null),
      size: new FormControl(50, Validators.required)
    })
  }

  getSeasons(filter: any) {
    const self = this;
    this.lastFilter = Object.assign({}, filter);
    this.blockUi.start('Loading...');
    this.seasonsService.queryActiveSeasonsMap(filter)
    .toPromise()
    .then(x => {
      x.forEach(function (v) {
        v.latitude = Number(v.latitude);
        v.longitude = Number(v.longitude);
        self.seasons.push(v);
      });
      this.blockUi.stop();
    });
  }

  private loadDistricts() {
    this.districts$ = this.settingsService.fetch2('districts')
  }

  private loadRegions() {
    this.regions$ = this.settingsService.fetch2('regions')
  }

  private loadVarieties() {
    this.districts$ = this.settingsService.fetch2('varieties')
  }

  private loadFarms() {
    this.farms$ = this.farmerService.fetchFarms()
  }
}
