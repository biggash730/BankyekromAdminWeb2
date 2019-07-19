import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription, Subject } from 'rxjs';
import { Lookup } from 'src/app/shared/common-entities.model';
import { FarmerService } from '../shared/farmer.service';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { RouteNames } from 'src/app/shared/constants';
import { MessageDialog } from 'src/app/shared/message_helper';
import { Farm } from '../shared/farmer.model';
import { SettingsService } from 'src/app/app-settings/settings/settings.service';
import { shareReplay, takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-farm-form',
  templateUrl: './farm-form.component.html',
  styleUrls: ['./farm-form.component.scss']
})
export class FarmFormComponent implements OnInit, OnDestroy {

  form: FormGroup
  districts$: Observable<any[]>
  farmers$: Observable<any[]>
  unsubscribe$ = new Subject<void>();
  @BlockUI() blockUi: NgBlockUI
  loadingDistricts: boolean
  loadingFarmers: boolean

  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private farmerService: FarmerService,
    private settingsService: SettingsService) { }

  ngOnInit() {
    this.setupForm()
    this.loadDistricts()
    this.loadFarmers()
    const id = +this.activatedRoute.snapshot.paramMap.get('id')
    if (id) { this.findFarm(id) }
    this.disableControls()
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  save(formData: any) {
    const params = formData
    this.blockUi.start('Saving...')
    this.farmerService.saveFarm(formData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.blockUi.stop()
        if (res.success) { this.closeForm() }
      }, () => this.blockUi.stop())
  }

  closeForm() {
    this.router.navigateByUrl(`${RouteNames.farmer}/${RouteNames.farmList}`)
  }

  get id() { return this.form.get('id') }
  get code() { return this.form.get('code') }
  get farmerId() { return this.form.get('farmerId') }
  get districtId() { return this.form.get('districtId') }
  get town() { return this.form.get('town') }
  get location() { return this.form.get('location') }
  get numberOfAcres() { return this.form.get('numberOfAcres') }
  get longitude() { return this.form.get('longitude') }
  get latitude() { return this.form.get('latitude') }
  get ghanaPostGps() { return this.form.get('ghanaPostGps') }

  private setupForm() {
    this.form = this.fb.group({
      id: new FormControl(''),
      farmerId: new FormControl(null, Validators.required),
      districtId: new FormControl(null, Validators.required),
      town: new FormControl(''),
      location: new FormControl(''),
      numberOfAcres: new FormControl(0),
      longitude: new FormControl(0),
      latitude: new FormControl(0),
      ghanaPostGps: new FormControl(''),
      createdAt: new FormControl(null),
      createdBy: new FormControl(null),
      modifiedAt: new FormControl(null),
      modifiedBy: new FormControl(null)
    })
  }

  private loadDistricts() {
    this.districts$ = this.settingsService.fetch2('districts')
  }

  private loadFarmers() {
    this.farmers$ = this.farmerService.fetchFarmers()
  }

  private findFarm(id: number) {
    this.blockUi.start('Loading...')
    this.farmerService.findFarm(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.blockUi.stop()
        this.form.patchValue(data)
      }, () => this.blockUi.stop())
  }

  private disableControls() {
  }

}
