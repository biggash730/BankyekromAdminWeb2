import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription, Subject } from 'rxjs';
import { Lookup } from 'src/app/shared/common-entities.model';
import { SeasonsService } from '../shared/season.service';
import { FarmerService } from '../../farmer/shared/farmer.service';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { RouteNames } from 'src/app/shared/constants';
import { MessageDialog } from 'src/app/shared/message_helper';
import { Season } from '../shared/season.model';
import { SettingsService } from 'src/app/app-settings/settings/settings.service';
import { shareReplay, takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-season-form',
  templateUrl: './season-form.component.html',
  styleUrls: ['./season-form.component.scss']
})
export class SeasonFormComponent implements OnInit, OnDestroy {

  form: FormGroup
  varieties$: Observable<any[]>
  farms$: Observable<any[]>
  unsubscribe$ = new Subject<void>();
  @BlockUI() blockUi: NgBlockUI
  loadingFarms: boolean
  loadingVarieties: boolean

  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seasonsService: SeasonsService,
    private settingsService: SettingsService,
    private farmerService: FarmerService) { }

  ngOnInit() {
    this.setupForm()
    this.loadVarieties()
    this.loadFarms()
    const id = +this.activatedRoute.snapshot.paramMap.get('id')
    if (id) { this.findSeason(id) }
    this.disableControls()
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  save(formData: any) {
    const params = formData
    this.blockUi.start('Saving...')
    this.seasonsService.saveSeason(formData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.blockUi.stop()
        if (res.success) { this.closeForm() }
      }, () => this.blockUi.stop())
  }

  closeForm() {
    this.router.navigateByUrl(`${RouteNames.season}/${RouteNames.seasonList}`)
  }

  get id() { return this.form.get('id') }
  get farmId() { return this.form.get('farmId') }
  get varietyId() { return this.form.get('varietyId') }
  get datePlanted() { return this.form.get('datePlanted') }
  get notes() { return this.form.get('notes') }

  private setupForm() {
    this.form = this.fb.group({
      id: new FormControl(''),
      farmId: new FormControl(null, Validators.required),
      varietyId: new FormControl(null, Validators.required),
      notes: new FormControl(''),
      datePlanted: new FormControl(null, Validators.required),
      createdAt: new FormControl(null),
      createdBy: new FormControl(null),
      modifiedAt: new FormControl(null),
      modifiedBy: new FormControl(null)
    })
  }

  private loadVarieties() {
    this.varieties$ = this.settingsService.fetch2('varieties')
  }

  private loadFarms() {
    this.farms$ = this.farmerService.fetchFarms()
  }

  private findSeason(id: number) {
    this.blockUi.start('Loading...')
    this.seasonsService.findSeason(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.blockUi.stop()
        this.form.patchValue(data)
        this.form.patchValue({
          projectedHarvestDate: new Date(data.projectedHarvestDate).toISOString().substring(0, 10),
          harvestDate: new Date(data.harvestDate).toISOString().substring(0, 10),
          datePlanted: new Date(data.datePlanted).toISOString().substring(0, 10)
        })
      }, () => this.blockUi.stop())
  }

  private disableControls() {
  }

}
