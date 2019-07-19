import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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
  selector: 'app-farms-map',
  templateUrl: './farms-map.component.html',
  styleUrls: ['./farms-map.component.scss']
})
export class FarmsMapComponent implements OnInit, OnDestroy {
  lat = 5.55602;
  lng = -0.1969;
  form: FormGroup
  farms$: Observable<Farm[]>;
  @BlockUI() blockUi: NgBlockUI;
  unsubscribe$ = new Subject<void>();
  filter = <FarmsQuery>{};
  lastFilter: FarmsQuery;
  totalRecords = 0;
  areas$: Observable<any>
  districts$: Observable<any>
  regions$: Observable<any>

  constructor(private fb: FormBuilder, private router: Router,
    private farmerService: FarmerService,
    private settingsService: SettingsService) { }

  ngOnInit() {
    this.setupForm()
    this.loadDistricts()
    this.loadRegions()
    this.loadAreas()
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  get size() { return this.form.get('size') }
  get regionId() { return this.form.get('regionId') }
  get districtId() { return this.form.get('districtId') }
  get town() { return this.form.get('town') }
  get name() { return this.form.get('name') }
  get areaId() { return this.form.get('areaId') }

  private setupForm() {
    this.form = this.fb.group({
      regionId: new FormControl(null),
      districtId: new FormControl(null),
      town: new FormControl(''),
      name: new FormControl(''),
      areaId: new FormControl(null),
      size: new FormControl(50, Validators.required)
    })
  }

  view(id: number) {
    this.router.navigateByUrl(`${RouteNames.farmer}/${RouteNames.farmDetails}/${id}`);
  }

  getFarms(filter: any) {
    this.lastFilter = Object.assign({}, filter);
    this.blockUi.start('Loading...');
    this.farms$ = this.farmerService.queryMapFarms(filter).pipe(
      finalize(() => {
        this.totalRecords = this.farmerService.totalFarms
        this.blockUi.stop()
      })
    );
  }

  private loadDistricts() {
    this.districts$ = this.settingsService.fetch2('districts')
  }

  private loadRegions() {
    this.regions$ = this.settingsService.fetch2('regions')
  }

  private loadAreas() {
    this.areas$ = this.settingsService.fetch2('catchmentareas')
  }
}
