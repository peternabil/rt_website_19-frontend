import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { AdminpanelService } from 'src/app/Services/adminpanel/adminpanel.service';

@Injectable({
  providedIn: 'root'
})
export class GroupPermissionGuard implements CanActivate {
  
  constructor(
    private adminpanelService: AdminpanelService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let route_to_be_accessed = next.routeConfig.path;
      
      if(next.routeConfig.path === ""){
        // get parent route
        route_to_be_accessed = next.parent.routeConfig.path;
      }

      if(this.adminpanelService.permission_authorized(route_to_be_accessed)){
        return true;
      }else {
        this.toastr.error('You do not have access permissions');
        this.router.navigate(['/']);
      }
      return false;
    }

}
