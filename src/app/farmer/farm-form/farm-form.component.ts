import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription, Subject } from 'rxjs';
import { Lookup } from 'src/app/shared/common-entities.model';
import { FarmerService } from '../shared/farmer.service';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { RouteNames } from 'src/app/shared/constants';
import { MessageDialog } from 'src/app/shared/message_helper';
import { Farmer } from '../shared/farmer.model';
import { SettingsService } from 'src/app/app-settings/settings/settings.service';
import { shareReplay, takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-farm-form',
  templateUrl: './farm-form.component.html',
  styleUrls: ['./farm-form.component.scss']
})
export class FarmFormComponent implements OnInit, OnDestroy {

  form: FormGroup
  areas$: Observable<any[]>
  unsubscribe$ = new Subject<void>();
  @BlockUI() blockUi: NgBlockUI
  loadingAreas: boolean

  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private farmerService: FarmerService,
    private settingsService: SettingsService) { }

  ngOnInit() {
    this.setupForm()
    this.loadAreas()
    const id = +this.activatedRoute.snapshot.paramMap.get('id')
    if (id) { this.findFarmer(id) }
    this.disableControls()
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  save(formData: any) {
    const params = formData
    this.blockUi.start('Saving...')
    this.farmerService.saveFarmer(formData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.blockUi.stop()
        if (res.success) { this.closeForm() }
      }, () => this.blockUi.stop())
  }

  closeForm() {
    this.router.navigateByUrl(`${RouteNames.farmer}/${RouteNames.farmerList}`)
  }

  get id() { return this.form.get('id') }
  get phoneNumber() { return this.form.get('phoneNumber') }
  get name() { return this.form.get('name') }
  get areaId() { return this.form.get('areaId') }
  get gender() { return this.form.get('gender') }
  get residentialAddress() { return this.form.get('residentialAddress') }
  get town() { return this.form.get('town') }
  get ghanaPostGps() { return this.form.get('ghanaPostGps') }
  get dateOfBirth() { return this.form.get('dateOfBirth') }

  private setupForm() {
    this.form = this.fb.group({
      id: new FormControl(''),
      phoneNumber: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      areaId: new FormControl(null, Validators.required),
      gender: new FormControl('Male', Validators.required),
      residentialAddress: new FormControl(''),
      town: new FormControl(''),
      ghanaPostGps: new FormControl(''),
      dateOfBirth: new FormControl(null),
      createdAt: new FormControl(null),
      createdBy: new FormControl(null),
      modifiedAt: new FormControl(null),
      modifiedBy: new FormControl(null)
    })
  }

  private loadAreas() {
    this.areas$ = this.settingsService.fetch2('catchmentareas')
  }

  private findFarmer(id: number) {
    this.blockUi.start('Loading...')
    this.farmerService.findFarmer(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.blockUi.stop()
        this.form.patchValue(data)
        this.form.patchValue({
          dateOfBirth: new Date(data.dateOfBirth).toISOString().substring(0, 10)
        })
      }, () => this.blockUi.stop())
  }

  private disableControls() {
  }

}
