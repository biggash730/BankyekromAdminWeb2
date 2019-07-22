import { Component, OnInit } from '@angular/core';
import { RouteNames, Privileges } from '../shared/constants';
// import {} from 'googlemaps';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss']
})
export class SeasonComponent implements OnInit {

  submenus: any

  constructor() { }

  ngOnInit() {
    this.submenus = [
      { label: 'Planting Seasons', route: RouteNames.seasonList, icon: 'fa fa-external-link-square', privilege: Privileges.CanViewSeasons },
      { label: 'Active Seasons Statistics', route: RouteNames.seasonActiveStats, icon: 'fa fa-external-link-square', privilege: Privileges.CanViewSeasons },
      { label: 'Active Seasons Map', route: RouteNames.seasonActiveMap, icon: 'fa fa-map', privilege: Privileges.CanViewSeasons }
    ]
  }

}
