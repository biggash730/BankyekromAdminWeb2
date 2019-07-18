import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouteNames } from 'src/app/shared/constants';
import { MediaService } from '../shared/media.service';
import { Observable, Subscription } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { MessageDialog } from 'src/app/shared/message_helper';
import { Lookup } from 'src/app/shared/common-entities.model';

@Component({
  selector: 'app-default-audio',
  templateUrl: './default-audio.component.html',
  styleUrls: ['./default-audio.component.scss']
})
export class DefaultAudioComponent implements OnInit, OnDestroy {

  records$: Observable<any[]>;
  @BlockUI() blockUi: NgBlockUI;
  deleteRecord: Subscription;
  lastFilter: any;
  pageSizes = [10, 20, 50, 100]
  totalRecords = 0;
  currentPage = 1;
  size = this.pageSizes[1];
  currentRecId: number;

  constructor(private router: Router,
    private mediaService: MediaService) { }

  ngOnInit() {
    this.getDefaultAudio(<any>{});
  }

  ngOnDestroy() {
    if (this.deleteRecord) { this.deleteRecord.unsubscribe(); }
  }

  openForm() {
    this.router.navigateByUrl(RouteNames.defaultAudioForm);
  }

  open(id: number) {
    this.router.navigateByUrl(`${RouteNames.content}/${RouteNames.defaultAudioDets}/${id}`);
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.lastFilter.pager.page = page;
    this.blockUi.start('Loading Records...');
    this.records$ = this.mediaService.queryDefaultAudio(this.lastFilter).pipe(
      finalize(() => this.blockUi.stop())
    );
  }

  getDefaultAudio(filter: any) {
    filter.pager = filter.pager || { page: 1, size: this.size };
    this.lastFilter = Object.assign({}, filter);
    this.blockUi.start('Loading Records...');
    this.records$ = this.mediaService.queryDefaultAudio(this.lastFilter).pipe(
      finalize(() => this.blockUi.stop())
    );
  }

  pageSizeChangeEvent() {
    this.lastFilter.pager = { page: 1, size: this.size }
    this.getDefaultAudio(this.lastFilter)
  }

  delete(id: number) {
    MessageDialog.confirm(`Delete Record`, `Are you sure you want to delete this record?`).then(confirm => {
      if (confirm.value) {
        this.blockUi.start('Please wait...')
        this.mediaService.deleteDefaultAudio(id)
        .pipe(
          finalize(() => this.blockUi.stop())
        )
        .subscribe(res => {
          if (res.success) {
            this.blockUi.stop()
            this.getDefaultAudio(<any>{});
          }
        })
      }
    })
  }

}
