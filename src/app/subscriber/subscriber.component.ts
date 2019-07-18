import { Component, OnInit } from '@angular/core';
import { RouteNames, Privileges } from '../shared/constants';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.scss']
})
export class SubscriberComponent implements OnInit {

  submenus: any

  constructor() {}

  ngOnInit() {
    this.submenus = [
      { label: 'Subscribers', route: RouteNames.subscriberList, icon: 'fa fa-folder', privilege: Privileges.CanViewSubscribers },
      { label: 'Groups', route: RouteNames.subscriberGroupList, icon: 'fa fa-folder', privilege: Privileges.CanViewGroups },
      { label: 'Import', route: RouteNames.subscriberImport, icon: 'fa fa-upload', privilege: Privileges.CanUploadSubscribers },
      // { label: "Export", route: RouteNames.subscriberExport, icon: "" },
      // { label: "Subscribers Properties", route: RouteNames.subscriberList, icon: "fa fa-folder" }
    ]
  }

}
