import { Component, OnInit } from '@angular/core';
import { finalize, shareReplay } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceRequestsService } from '../shared/service.service';
import { Observable } from 'rxjs';
import { ServiceProvider } from '../shared/service.model';
import { RouteNames } from 'src/app/shared/constants';
import { DateHelpers } from 'src/app/shared/utils';

@Component({
  selector: 'app-provider-details',
  templateUrl: './provider-details.component.html',
  styleUrls: ['./provider-details.component.scss']
})
export class ServiceProviderDetailsComponent implements OnInit {

  @BlockUI() blockUi: NgBlockUI
  provider$: Observable<ServiceProvider>

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
    this.router.navigateByUrl(`${RouteNames.service}/${RouteNames.providerList}`)
  }

  editForm(id: number) {
    this.router.navigateByUrl(`${RouteNames.service}/${RouteNames.providerForm}/${id}`);
  }


  private getDetails(id: number) {
    this.blockUi.start('Loading...')
    this.provider$ = this.serviceRequestsService.findServiceProvider(id)
      .pipe(
        finalize(() => this.blockUi.stop())
      )
  }
}
