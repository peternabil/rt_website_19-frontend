import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../Authentication/authentication.service';


/**
 * index name should be the same as route name
 * 
 * All permissions
 * 
 * APC
 * Business Development -Senior Officer
 * Business Development -Specialist
 * GOA
 * 
 * HR Development -Senior Officer
 * HR Development -Specialist
 * HR Recruitment - Officer
 * HR Recruitment -Senior Officer
 * HR Recruitment -Specialist
 * HR Supervisor
 * 
 * IT -SeniorOfficer
 * IT -Specialist
 * 
 * Manufacturing -Senior Officer
 * 
 * Multimedia -Senior Officer
 * Multimedia -Specialist
 * Operations -Senior Officer
 * 
 * PR & Social Media -Senior Officer
 * PR & Social Media -Specialist
 * 
 */

const permissions: { [index: string]: string[] } = {
  "adminpanel": [
    'APC',
    'Business Development -Senior Officer',
    'Business Development -Specialist',
    'GOA',
    'HR Development -Senior Officer',
    'HR Development -Specialist',
    'HR Recruitment - Officer',
    'HR Recruitment -Senior Officer',
    'HR Recruitment -Specialist',
    'HR Supervisor',
    'IT -SeniorOfficer',
    'IT -Specialist',
    'Manufacturing -Senior Officer',
    'Multimedia -Senior Officer',
    'Multimedia -Specialist',
    'Operations -Senior Officer',
    'PR & Social Media -Senior Officer',
    'PR & Social Media -Specialistt'
  ],
  "users": [
    'IT -Specialist',
    'IT -SeniorOfficer',

    'HR Recruitment -Specialist',
    'HR Recruitment -Senior Officer',
    'HR Recruitment - Officer',
    'HR Supervisor'
  ],
  "highlights": [
    'IT -Specialist',
    'IT -SeniorOfficer',

    'PR & Social Media -Specialist',
    'PR & Social Media -Senior Officer',
    'Multimedia -Specialist'
  ],
  "events": [
    'IT -Specialist',
    'IT -SeniorOfficer',

    'PR & Social Media -Specialist',
    'PR & Social Media -Senior Officer',
    'Multimedia -Specialist'
  ],
  "news-feed": [
    'IT -Specialist',
    'IT -SeniorOfficer',

    'PR & Social Media -Specialist',
    'PR & Social Media -Senior Officer',
    'Multimedia -Specialist'
  ],
  "teams": [
    'IT -Specialist',
    'IT -SeniorOfficer',

    'PR & Social Media -Specialist',
    'PR & Social Media -Senior Officer',
    'Multimedia -Specialist'
  ],
  "sponsors": [
    'IT -Specialist',
    'IT -SeniorOfficer',

    'PR & Social Media -Specialist',
    'PR & Social Media -Senior Officer',
    'Multimedia -Specialist'
  ],
  "FAQ": [
    'IT -Specialist',
    'IT -SeniorOfficer',

    'PR & Social Media -Specialist',
    'PR & Social Media -Senior Officer',
    'Multimedia -Specialist'
  ],
}


@Injectable({
  providedIn: 'root'
})
export class AdminpanelService {

  constructor(private http: HttpClient,
    private authService: AuthenticationService,
    private toastr: ToastrService) { }

  /** General */

  /** Sidebar */
  private admin_sidebar_status = true;
  private admin_sidebar_status_emmitter = new Subject<boolean>();
  admin_sidebar_toggle() {
    this.admin_sidebar_status = !this.admin_sidebar_status;
    this.admin_sidebar_status_emmitter.next(this.admin_sidebar_status);
  }
  get_sidebar_status() {
    return this.admin_sidebar_status_emmitter;
  }
  /** ./Sidebar */

  /** For All services */
  delete_image_from(img_type: string, obj_id: Number, img_id: Number) {
    let type_id = (img_type == 'team') ? 0 :
      (img_type == 'event') ? 2 :
        (img_type == 'highlight') ? 3 :
          (img_type == 'news-feed') ? 4 : null;

    /** change get request to delete */
    return this.http.get('api/remove-from/' + type_id + '/' + obj_id + '/' + img_id + '/').subscribe(
      resonse => {
        this.toastr.info('Old image deleted');
      },
      err => {
        this.toastr.error('Something went wrong while deleting old image');
      }
    );
  }

  permission_authorized(page_to_be_accessed: string) {
    let user_token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

    if (user_token == null)
      return false;

    let user_position: string = this.authService.tokenDecode(user_token).position;

    if (permissions[page_to_be_accessed].indexOf(user_position) == -1) {
      // not exist
      return false
    }

    return true;
  }

}
