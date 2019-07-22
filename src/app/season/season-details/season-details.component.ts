import { Component, OnInit } from '@angular/core';
import { finalize, shareReplay } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { SeasonsService } from '../shared/season.service';
import { Observable } from 'rxjs';
import { Season } from '../shared/season.model';
import { RouteNames } from 'src/app/shared/constants';
import { DateHelpers } from 'src/app/shared/utils';

@Component({
  selector: 'app-season-details',
  templateUrl: './season-details.component.html',
  styleUrls: ['./season-details.component.scss']
})
export class SeasonDetailsComponent implements OnInit {

  @BlockUI() blockUi: NgBlockUI
  season$: Observable<Season>

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private seasonsService: SeasonsService) { }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.getSeasonDetails(id)
    }
  }

  closeForm() {
    this.router.navigateByUrl(`${RouteNames.season}/${RouteNames.seasonList}`)
  }

  editForm(id: number) {
    this.router.navigateByUrl(`${RouteNames.season}/${RouteNames.seasonForm}/${id}`);
  }

  private getSeasonDetails(id: number) {
    this.blockUi.start('Loading...')
    this.season$ = this.seasonsService.findSeason(id)
      .pipe(
        finalize(() => this.blockUi.stop())
      )
  }
}
