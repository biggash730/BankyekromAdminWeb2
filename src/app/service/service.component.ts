import { Component, OnInit } from '@angular/core';
import { RouteNames, Privileges } from '../shared/constants';
// import {} from 'googlemaps';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  submenus: any

  constructor() { }

  ngOnInit() {
    this.submenus = [
      { label: 'Service Requests', route: RouteNames.requestList, icon: 'fa fa-external-link-square', privilege: Privileges.CanViewRequests },
      { label: 'Service Providers', route: RouteNames.providerList, icon: 'fa fa-external-link-square', privilege: Privileges.CanViewServiceProviders },
      { label: 'Processors', route: RouteNames.processorList, icon: 'fa fa-external-link-square', privilege: Privileges.CanViewProcessors },
      { label: 'Partners Map', route: RouteNames.partnerMap, icon: 'fa fa-map', privilege: Privileges.CanViewProcessors }
    ]
  }

}
