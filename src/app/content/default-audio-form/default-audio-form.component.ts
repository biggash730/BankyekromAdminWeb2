import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Lookup } from 'src/app/shared/common-entities.model';
import { MediaService } from '../shared/media.service';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { RouteNames } from 'src/app/shared/constants';
import { MessageDialog } from 'src/app/shared/message_helper';

@Component({
  selector: 'app-default-audio-form',
  templateUrl: './default-audio-form.component.html',
  styleUrls: ['./default-audio-form.component.scss']
})
export class DefaultAudioFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  media$: Observable<any[]>;
  @BlockUI() blockUi: NgBlockUI;
  saveSubscription: Subscription;
  findSubscription: Subscription;
  formType: string;

  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private mediaService: MediaService) { }

  ngOnInit() {
    this.setupForm();
    this.loadMedia();
    this.formType = 'New';
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.findDefaultAudio(id);
      this.formType = 'Update';
    }
  }

  ngOnDestroy() {
    if (this.saveSubscription) { this.saveSubscription.unsubscribe(); }
    if (this.findSubscription) { this.findSubscription.unsubscribe(); }
  }

  save(formData: any) {
    const params = formData;
    this.blockUi.start('Saving Record...');
    this.saveSubscription = this.mediaService.saveDefaultAudio(params).subscribe(res => {
      this.blockUi.stop();
      if (res.success) { this.closeForm(); }
    }, () => this.blockUi.stop());
  }

  closeForm() {
    this.router.navigateByUrl(`${RouteNames.content}/${RouteNames.defaultAudio}`);
  }

  get id() { return this.form.get('id'); }
  get title() { return this.form.get('title'); }
  get mediaId() { return this.form.get('mediaId'); }

  private setupForm() {
    this.form = this.fb.group({
      id: new FormControl(''),
      title: new FormControl('', Validators.required),
      mediaId: new FormControl('', Validators.required),
      createdAt: new FormControl(null),
      createdBy: new FormControl(null),
      modifiedAt: new FormControl(null),
      modifiedBy: new FormControl(null)
    });
  }

  private loadMedia() {
    this.media$ = this.mediaService.fetchMedia();
  }

  private findDefaultAudio(id: number) {
    this.blockUi.start('Loading...');
    this.findSubscription = this.mediaService.findDefaultAudio(id).subscribe(res => {
      this.blockUi.stop();
      if (res.success) {
        const data = res.data;
        this.form.patchValue(data);
        /*this.form.patchValue({
          // patch tags
          // startDate: new Date(data.startDate).toISOString().substring(0, 10),
          languageId: data.language.id,
        });*/
      }
    }, () => this.blockUi.stop());
  }

}
