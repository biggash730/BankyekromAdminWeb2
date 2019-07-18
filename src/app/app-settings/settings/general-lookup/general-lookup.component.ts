import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LookUps, SettingsService } from '../settings.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageDialog } from '../../../shared/message_helper';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable, Subject } from 'rxjs';
import { Lookup } from 'src/app/shared/common-entities.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-general-lookup',
  templateUrl: './general-lookup.component.html',
  styleUrls: ['./general-lookup.component.css']
})
export class GeneralLookupComponent implements OnInit, OnDestroy {

  title: string;
  modelName: string;
  model: any;
  showForm: boolean;
  formGroup: FormGroup
  records: any;
  record: any;
  saving: boolean;
  deleting: boolean;
  selectedRecord: any;
  @BlockUI() blockForm: NgBlockUI;
  regions$: Observable<Lookup[]>
  districts$: Observable<Lookup[]>
  unsubscribe$ = new Subject<void>()

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private settingsService: SettingsService) {
    this.formGroup = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      regionId: new FormControl(''),
      districtId: new FormControl(''),
      notes: new FormControl(''),
      code: new FormControl(''),
      harvestPeriod: new FormControl(15),
      createdAt: new FormControl(null),
      createdBy: new FormControl(null),
      modifiedAt: new FormControl(null),
      modifiedBy: new FormControl(null)
    });
  }

  ngOnInit() {
    this.modelName = this.activatedRoute.snapshot.paramMap.get('model');
    this.model = LookUps.models.find(model => model.name === this.modelName)
    this.fetchRecords();
    if (this.modelName === 'districts') { this.loadRegions() }
    if (this.modelName === 'catchmentareas') { this.loadDistricts() }
  }
  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  openForm() {
    this.title = 'New ' + this.model.label;
    this.showForm = true;
  }

  closeForm() {
    this.title = 'New ' + this.model.label;
    this.showForm = false;
    this.formGroup.reset();
  }

  selectRow(record: any) {
    this.formGroup.patchValue(record)
    this.title = 'Edit ' + this.model.label;
    this.showForm = true;
    if (this.modelName === 'districts') { this.formGroup.patchValue({ regionId: record.region.id }) }
  }

  save() {
    this.record = this.formGroup.value;
    this.blockForm.start('Saving...');
    this.settingsService.save(this.modelName, this.record)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((res) => {
      this.blockForm.stop();
      if (res.success) {
        this.closeForm()
        this.fetchRecords();
      }
    }, err => {
      this.blockForm.stop();
      console.log('Error -> ' + err);
    });
  }

  remove(id: number) {
    MessageDialog.confirm('Delete Item', 'Are you sure you want to delete this item').then((confirm) => {
      if (confirm.value) {
        this.blockForm.start('Deleting...')
        this.settingsService.destroy(this.modelName, id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
          this.blockForm.stop()
          if (res.success) {
            this.closeForm()
            this.fetchRecords();
          }
        }, err => {
          this.blockForm.stop();
          console.log('Error -> ' + err.message);
        });
      }
    }).catch((err) => { });
  }

  private fetchRecords() {
    this.blockForm.start('Loading')
    this.settingsService.fetch(this.model.name)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((res) => {
      this.blockForm.stop()
      if (res.success) {
        this.records = res.data;
      }
    }, () => this.blockForm.stop());
  }

  private loadRegions() {
    this.regions$ = this.settingsService.fetch2('regions')
  }

  private loadDistricts() {
    this.districts$ = this.settingsService.fetch2('districts')
  }
}
