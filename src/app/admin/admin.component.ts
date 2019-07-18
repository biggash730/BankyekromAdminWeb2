import { Component, OnInit } from '@angular/core';
import { IMenuItem } from '../shared/common-entities.model';
import { RouteNames, Privileges } from '../shared/constants';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  submenus: IMenuItem[]

  constructor() { }

  ngOnInit() {
    this.submenus = [
      { label: 'Users', route: RouteNames.users, icon: 'fa fa-folder', privilege: Privileges.CanManageAccounts},
      { label: 'Roles', route: RouteNames.roles, icon: 'fa fa-folder', privilege: Privileges.CanManageAccounts },
      { label: 'Reset Password', route: RouteNames.reset, icon: 'fa fa-refresh', privilege: Privileges.CanManageAccounts },
      // { label: "Active Campaigns", route: RouteNames.subscriberImport, icon: "" },
      // { label: "Inbound Campaigns", route: RouteNames.subscriberExport, icon: "fa fa-folder" }
    ]
  }

}
