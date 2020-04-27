import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AdminpanelService } from 'src/app/Services/adminpanel/adminpanel.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminpanelComponent implements OnInit {

  /** Sidebar */
  sidebar_status = false;

  constructor(private adminpanelService: AdminpanelService) { }

  ngOnInit() {

    /** Sidebar */
    this.adminpanelService.get_sidebar_status().subscribe(status=>{
      this.sidebar_status = status;
    })
    
  }

  admin_sidebar_toggle(){
    this.adminpanelService.admin_sidebar_toggle();
  }

}
