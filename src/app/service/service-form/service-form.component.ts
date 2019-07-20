import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription, Subject } from 'rxjs';
import { Lookup } from 'src/app/shared/common-entities.model';
import { ServiceRequestsService } from '../shared/service.service';
import { FarmerService } from '../../farmer/shared/farmer.service';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { RouteNames } from 'src/app/shared/constants';
import { MessageDialog } from 'src/app/shared/message_helper';
import { ServiceRequest } from '../shared/service.model';
import { SettingsService } from 'src/app/app-settings/settings/settings.service';
import { shareReplay, takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit, OnDestroy {

  form: FormGroup
  services$: Observable<any[]>
  serviceProviders$: Observable<any[]>
  farms$: Observable<any[]>
  unsubscribe$ = new Subject<void>();
  @BlockUI() blockUi: NgBlockUI
  loadingServices: boolean
  loadingServiceProviders: boolean
  loadingFarms: boolean

  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private serviceRequestsService: ServiceRequestsService,
    private settingsService: SettingsService,
    private farmerService: FarmerService) { }

  ngOnInit() {
    this.setupForm()
    this.loadServices()
    this.loadServiceProviders()
    this.loadFarms()
    const id = +this.activatedRoute.snapshot.paramMap.get('id')
    if (id) { this.findRequest(id) }
    this.disableControls()
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  save(formData: any) {
    const params = formData
    this.blockUi.start('Saving...')
    this.serviceRequestsService.saveServiceRequest(formData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.blockUi.stop()
        if (res.success) { this.closeForm() }
      }, () => this.blockUi.stop())
  }

  closeForm() {
    this.router.navigateByUrl(`${RouteNames.service}/${RouteNames.requestList}`)
  }

  get id() { return this.form.get('id') }
  get farmId() { return this.form.get('farmId') }
  get notes() { return this.form.get('notes') }
  get charge() { return this.form.get('charge') }
  get serviceId() { return this.form.get('serviceId') }
  get assignedToId() { return this.form.get('assignedToId') }
  get serviceDate() { return this.form.get('serviceDate') }

  private setupForm() {
    this.form = this.fb.group({
      id: new FormControl(''),
      farmId: new FormControl(null, Validators.required),
      serviceId: new FormControl(null, Validators.required),
      assignedToId: new FormControl(null),
      serviceDate: new FormControl(null, Validators.required),
      notes: new FormControl(''),
      charge: new FormControl(0),
      createdAt: new FormControl(null),
      createdBy: new FormControl(null),
      modifiedAt: new FormControl(null),
      modifiedBy: new FormControl(null)
    })
  }

  private loadServices() {
    this.services$ = this.settingsService.fetch2('services')
  }

  private loadFarms() {
    this.farms$ = this.farmerService.fetchFarms()
  }

  private loadServiceProviders() {
    this.serviceProviders$ = this.serviceRequestsService.fetchServiceProviders()
  }

  private findRequest(id: number) {
    this.blockUi.start('Loading...')
    this.serviceRequestsService.findServiceRequest(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.blockUi.stop()
        this.form.patchValue(data)
        this.form.patchValue({
          serviceDate: new Date(data.serviceDate).toISOString().substring(0, 10)
        })
      }, () => this.blockUi.stop())
  }

  private disableControls() {
  }

}
