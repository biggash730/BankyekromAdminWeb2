import { Component, OnInit } from '@angular/core';
import { finalize, shareReplay } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceRequestsService } from '../shared/service.service';
import { Observable } from 'rxjs';
import { ServiceRequest } from '../shared/service.model';
import { RouteNames } from 'src/app/shared/constants';
import { DateHelpers } from 'src/app/shared/utils';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {

  @BlockUI() blockUi: NgBlockUI
  request$: Observable<ServiceRequest>

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private serviceRequestsService: ServiceRequestsService) { }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.getServiceRequestDetails(id)
    }
  }

  closeForm() {
    this.router.navigateByUrl(`${RouteNames.service}/${RouteNames.requestList}`)
  }

  editForm(id: number) {
    this.router.navigateByUrl(`${RouteNames.service}/${RouteNames.requestForm}/${id}`);
  }


  private getServiceRequestDetails(id: number) {
    this.blockUi.start('Loading...')
    this.request$ = this.serviceRequestsService.findServiceRequest(id)
      .pipe(
        finalize(() => this.blockUi.stop())
      )
  }
}
