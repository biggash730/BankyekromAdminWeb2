import { Component, OnInit } from '@angular/core';
import { finalize, shareReplay } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceRequestsService } from '../shared/service.service';
import { Observable } from 'rxjs';
import { Processor } from '../shared/service.model';
import { RouteNames } from 'src/app/shared/constants';
import { DateHelpers } from 'src/app/shared/utils';

@Component({
  selector: 'app-processor-details',
  templateUrl: './processor-details.component.html',
  styleUrls: ['./processor-details.component.scss']
})
export class ProcessorDetailsComponent implements OnInit {

  @BlockUI() blockUi: NgBlockUI
  processor$: Observable<Processor>

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private serviceRequestsService: ServiceRequestsService) { }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.getDetails(id)
    }
  }

  closeForm() {
    this.router.navigateByUrl(`${RouteNames.service}/${RouteNames.processorList}`)
  }

  editForm(id: number) {
    this.router.navigateByUrl(`${RouteNames.service}/${RouteNames.processorForm}/${id}`);
  }


  private getDetails(id: number) {
    this.blockUi.start('Loading...')
    this.processor$ = this.serviceRequestsService.findProcessor(id)
      .pipe(
        finalize(() => this.blockUi.stop())
      )
  }
}
