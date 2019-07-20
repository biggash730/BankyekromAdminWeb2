import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription, Subject } from 'rxjs';
import { Lookup } from 'src/app/shared/common-entities.model';
import { ServiceRequestsService } from '../shared/service.service';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { RouteNames } from 'src/app/shared/constants';
import { MessageDialog } from 'src/app/shared/message_helper';
import { SettingsService } from 'src/app/app-settings/settings/settings.service';
import { shareReplay, takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-processor-form',
  templateUrl: './processor-form.component.html',
  styleUrls: ['./processor-form.component.scss']
})
export class ProcessorFormComponent implements OnInit, OnDestroy {

  form: FormGroup
  districts$: Observable<any[]>
  unsubscribe$ = new Subject<void>();
  @BlockUI() blockUi: NgBlockUI
  loadingDistricts: boolean

  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private serviceRequestsService: ServiceRequestsService,
    private settingsService: SettingsService) { }

  ngOnInit() {
    this.setupForm()
    this.loadDistricts()
    const id = +this.activatedRoute.snapshot.paramMap.get('id')
    if (id) { this.findProcessor(id) }
    this.disableControls()
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  save(formData: any) {
    const params = formData
    this.blockUi.start('Saving...')
    this.serviceRequestsService.saveProcessor(formData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.blockUi.stop()
        if (res.success) { this.closeForm() }
      }, () => this.blockUi.stop())
  }

  closeForm() {
    this.router.navigateByUrl(`${RouteNames.service}/${RouteNames.processorList}`)
  }

  get id() { return this.form.get('id') }
  get districtId() { return this.form.get('districtId') }
  get name() { return this.form.get('name') }
  get contactPerson() { return this.form.get('contactPerson') }
  get phoneNumber() { return this.form.get('phoneNumber') }
  get email() { return this.form.get('email') }
  get address() { return this.form.get('address') }
  get town() { return this.form.get('town') }
  get longitude() { return this.form.get('longitude') }
  get latitude() { return this.form.get('latitude') }
  get ghanaPostGps() { return this.form.get('ghanaPostGps') }

  private setupForm() {
    this.form = this.fb.group({
      id: new FormControl(''),
      districtId: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      contactPerson: new FormControl(null),
      phoneNumber: new FormControl(null, Validators.required),
      email: new FormControl(''),
      address: new FormControl(''),
      town: new FormControl(''),
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

  private findProcessor(id: number) {
    this.blockUi.start('Loading...')
    this.serviceRequestsService.findProcessor(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.blockUi.stop()
        this.form.patchValue(data)
      }, () => this.blockUi.stop())
  }

  private disableControls() {
  }

}
