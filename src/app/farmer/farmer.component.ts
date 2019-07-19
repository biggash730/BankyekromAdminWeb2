import { Component, OnInit } from '@angular/core';
import { RouteNames, Privileges } from '../shared/constants';

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.scss']
})
export class FarmerComponent implements OnInit {

  submenus: any

  constructor() { }

  ngOnInit() {
    this.submenus = [
      { label: 'Farmers', route: RouteNames.farmerList, icon: 'fa fa-external-link-square', privilege: Privileges.CanViewFarmers },
      { label: 'Farms', route: RouteNames.farmList, icon: 'fa fa-external-link-square', privilege: Privileges.CanViewFarms },
      { label: 'Farms Map', route: RouteNames.farmMap, icon: 'fa fa-map', privilege: Privileges.CanViewFarms }
    ]
  }

}
