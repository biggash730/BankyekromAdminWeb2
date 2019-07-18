import { Component, OnInit } from '@angular/core';
import { IMenuItem } from '../shared/common-entities.model';
import { RouteNames, Privileges } from '../shared/constants';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  submenus: IMenuItem[]

  constructor() { }

  ngOnInit() {
    this.submenus = [
      { label: 'Outbound Campaigns', route: RouteNames.outbound, icon: 'fa fa-folder', privilege: Privileges.CanViewCampaigns },
      // { label: "Schedules Campaigns", route: RouteNames.subscriberGroupList, icon: "" },
      // { label: "Active Campaigns", route: RouteNames.subscriberImport, icon: "" },
      // { label: "Inbound Campaigns", route: RouteNames.subscriberExport, icon: "fa fa-folder" }
    ]
  }

}
