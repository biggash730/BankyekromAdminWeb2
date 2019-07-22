import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteNames } from 'src/app/shared/constants';
import { ServiceRequestsService } from '../shared/service.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize, takeUntil } from 'rxjs/operators';
import { MessageDialog } from 'src/app/shared/message_helper';
import { Lookup } from 'src/app/shared/common-entities.model';
import { SettingsService } from 'src/app/app-settings/settings/settings.service';

@Component({
  selector: 'app-partners-map',
  templateUrl: './partners-map.component.html',
  styleUrls: ['./partners-map.component.scss']
})
export class PartnersMapComponent implements OnInit, OnDestroy {
  lat = 5.55602;
  lng = -0.1969;
  form: FormGroup
  partners: any[];
  @BlockUI() blockUi: NgBlockUI;
  unsubscribe$ = new Subject<void>();
  filter = <any>{};
  lastFilter: any;
  totalRecords = 0;
  districts$: Observable<any>
  regions$: Observable<any>
  types = [{name: 'Processors'}, {name: 'Service Providers'}];

  constructor(private fb: FormBuilder, private router: Router,
    private serviceRequestsService: ServiceRequestsService,
    private settingsService: SettingsService) { }

  ngOnInit() {
    this.partners = <any>[]
    this.setupForm()
    this.loadDistricts()
    this.loadRegions()
    this.getPartners(this.filter);
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
  get contactPerson() { return this.form.get('contactPerson') }
  get phoneNumber() { return this.form.get('phoneNumber') }
  get type() { return this.form.get('type') }

  private setupForm() {
    this.form = this.fb.group({
      regionId: new FormControl(null),
      districtId: new FormControl(null),
      town: new FormControl(''),
      name: new FormControl(''),
      contactPerson: new FormControl(''),
      phoneNumber: new FormControl(''),
      type: new FormControl(null),
      size: new FormControl(50, Validators.required)
    })
  }

  getPartners(filter: any) {
    const self = this;
    this.lastFilter = Object.assign({}, filter);
    this.blockUi.start('Loading...');
    this.serviceRequestsService.queryMapPartners(filter)
    .toPromise()
    .then(x => {
      x.forEach(function (v) {
        v.latitude = Number(v.latitude);
        v.longitude = Number(v.longitude);
        console.log(v)
        self.partners.push(v);
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
}
