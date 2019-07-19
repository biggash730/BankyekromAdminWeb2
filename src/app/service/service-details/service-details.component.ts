import { Component, OnInit } from '@angular/core';
import { finalize, shareReplay } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { FarmerService } from '../shared/farmer.service';
import { Observable } from 'rxjs';
import { Farmer } from '../shared/farmer.model';
import { RouteNames } from 'src/app/shared/constants';
import { DateHelpers } from 'src/app/shared/utils';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {

  @BlockUI() blockUi: NgBlockUI
  farmer$: Observable<Farmer>

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private farmerService: FarmerService) { }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.getFarmerDetails(id)
    }
  }

  closeForm() {
    this.router.navigateByUrl(`${RouteNames.farmer}/${RouteNames.farmerList}`)
  }

  editForm(id: number) {
    this.router.navigateByUrl(`${RouteNames.farmer}/${RouteNames.farmerForm}/${id}`);
  }


  private getFarmerDetails(id: number) {
    this.blockUi.start('Loading...')
    this.farmer$ = this.farmerService.findFarmer(id)
      .pipe(
        finalize(() => this.blockUi.stop())
      )
  }
}
