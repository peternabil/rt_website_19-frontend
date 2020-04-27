import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AdminpanelService } from 'src/app/Services/adminpanel/adminpanel.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  @Input() sidebar_status = false;

  constructor(private adminpanelService: AdminpanelService) { }

  ngOnInit() {
  }

  admin_sidebar_toggle(){
    this.adminpanelService.admin_sidebar_toggle();
  }

  show(page_to_be_accessed: string){
    return this.adminpanelService.permission_authorized(page_to_be_accessed);
  }

}
