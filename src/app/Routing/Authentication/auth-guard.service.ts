import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class IsLoggedInGuardService implements CanActivate {

  /**
   * Auth Guard to check logged in user
   * * Verify user token
   */

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn()
            .pipe(
              map(
                status => {
                  if(!!status){
                    return true;
                  }else{
                    this.toastr.info('You need to login fisrt.');
                    this.router.navigate(['/auth/login']);
                    return false;
                  }
                },
                err => {
                  this.toastr.info('Something wrong. Please try again.');
                  this.router.navigate(['/auth/login']);
                  return false;
                }
              )
            );
  }
}



@Injectable()
export class ChangePasswordGuardService implements CanActivate {

  /**
   * Change Password Component Guard
   * * Verify user token
   * * GET token from URL for Forget Password
   * * or GET local storage token to change logged in user password 
   */

  constructor(
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let token:string = null;
    let from_password_reset_link:boolean = false;

    if(next.url[1]){
      token = JSON.stringify(next.url[1].path);
      from_password_reset_link = true;
    }else{
      token = localStorage.getItem('token');
    }

    if(token != null){
      return this.authService.tokenVerify(token)
      .pipe(
        map(
          (response: any)=>{
            if(!!response.token){
              return true;
            }else{
              if(from_password_reset_link){
                this.toastr.info('Error in password reset link. Please try again.');
              }else{
                this.toastr.info('You need to signin first to change your password');
              }
              this.router.navigate(['/auth/login']);
              return false;
            }
          }
          ),
          catchError(
            (err: any) => {
            this.toastr.error('Something wrong. Please try again.');
            this.router.navigate(['/auth/login']);
            return throwError(err);
          }
        )
      )
    }else{
      if(from_password_reset_link){
        this.toastr.info('Error in password reset link. Please try again.');
      }else{
        this.toastr.info('You need to signin first to change your password');
      }
      this.router.navigate(['/auth/login']);
      return false;
    }
      
  }

}
