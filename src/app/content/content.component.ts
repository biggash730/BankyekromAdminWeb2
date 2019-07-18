import { Component, OnInit } from '@angular/core';
import { RouteNames, Privileges } from '../shared/constants';
import { IMenuItem } from '../shared/common-entities.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  submenus: IMenuItem[];

  constructor() { }

  ngOnInit() {
    this.submenus = [
      { label: 'Trees', route: RouteNames.treeList, icon: 'fa fa-sitemap', privilege: Privileges.CanViewTrees },
      { label: 'Media Library', route: RouteNames.mediaLibrary, icon: 'fa fa-folder', privilege: Privileges.CanViewMedia },
      { label: 'Default Audio Files', route: RouteNames.defaultAudio, icon: 'fa fa-folder', privilege: Privileges.CanViewMedia }
      /* { label: 'Messages', route: RouteNames.subscriberGroupList, icon: 'fa fa-folder' },
      { label: 'Language Selector', route: RouteNames.subscriberExport, icon: '' },
      { label: 'Response Prompts', route: RouteNames.subscriberList, icon: 'fa fa-folder' },
      { label: 'Content Recorders', route: RouteNames.subscriberList, icon: 'fa fa-folder' },
      { label: 'Languages', route: RouteNames.subscriberList, icon: 'fa fa-folder' },
      { label: 'Exports Library', route: RouteNames.subscriberList, icon: 'fa fa-folder' }*/
    ];
  }

}
