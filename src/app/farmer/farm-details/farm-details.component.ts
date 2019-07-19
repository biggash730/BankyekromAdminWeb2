import { Component, OnInit } from '@angular/core';
import { finalize, shareReplay } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { FarmerService } from '../shared/farmer.service';
import { Observable } from 'rxjs';
import { Farm } from '../shared/farmer.model';
import { RouteNames } from 'src/app/shared/constants';
import { DateHelpers } from 'src/app/shared/utils';

@Component({
  selector: 'app-farm-details',
  templateUrl: './farm-details.component.html',
  styleUrls: ['./farm-details.component.scss']
})
export class FarmDetailsComponent implements OnInit {

  @BlockUI() blockUi: NgBlockUI
  farm$: Observable<Farm>

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private farmerService: FarmerService) { }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.getFarmDetails(id)
    }
  }

  closeForm() {
    this.router.navigateByUrl(`${RouteNames.farmer}/${RouteNames.farmList}`)
  }

  editForm(id: number) {
    this.router.navigateByUrl(`${RouteNames.farmer}/${RouteNames.farmForm}/${id}`);
  }


  private getFarmDetails(id: number) {
    this.blockUi.start('Loading...')
    this.farm$ = this.farmerService.findFarm(id)
      .pipe(
        finalize(() => this.blockUi.stop())
      )
  }
}
