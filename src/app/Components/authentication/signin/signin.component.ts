import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../Services/Authentication/authentication.service';
import { ToastrService } from 'ngx-toastr'

import {
  AuthService as SocialAuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['./signin.component.css']
}
)

export class SigninComponent implements OnInit {

  submitted = false;
  returnUrl: string;

  /**
     * HTML Elements
  **/
  loginForm: FormGroup = this.formBuilder.group({
    /**
     * TODO: Validate email is exists
     */
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    password: ['', [Validators.required,]],
    remember_me: ['',]

  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private socialAuthService: SocialAuthService,
    private toastr: ToastrService
  ) { }


  ngOnInit() {
    
    this.authenticationService.isLoggedIn().pipe(take(1)).subscribe(
      status => {
          if(status){ 
              this.toastr.info("You need to logout first.");
              this.router.navigate(['/']);
          }
      },
      err => {
          this.toastr.error("Somethins goes wrong. Please try again.");
      }
    );

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.toastr.error("Login form is invalid");
      return;
    }

    this.authenticationService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      remember_me: (this.loginForm.value.remember_me) ? '1' : '0'
    }, 'email-login')
      .subscribe(
        response => {
          if (response.token) {
            this.authenticationService.storeToken(response.token);
            this.toastr.success("Welcome to ASU Racing Team website, We've been expecting you.", 'Hi!')
            this.router.navigate([this.returnUrl]);
          }
        },
        err => {
          if ('error' in err.error) {
            this.toastr.error(err.error.Error, "Error")
          }
          else {
            this.toastr.error("Something went wrong", "Error")
          }
        });
  }

  public socialSignIn(socialPlatform: string) {

    let request_body = {}

    if (socialPlatform == 'google' || socialPlatform == 'facebook') {
      let socialPlatformProvider;
      if (socialPlatform == 'google') {
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      } else if (socialPlatform == 'facebook') {
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      }

      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          if (userData.provider == 'google') {
            request_body = {
              'social_id': userData.id,
              'name': userData.name,
              'email': userData.email.toLowerCase(),
              'provider': userData.provider,
            };

          } else if (userData.provider == 'facebook') {
            request_body = {
              'social_id': userData.id,
              'name': userData.name,
              'email': userData.email.toLowerCase(),
              'provider': userData.provider,
            };
          }
        
          this.authenticationService.login(request_body, socialPlatform).subscribe(
            response => {
              if (response.token) {
                this.authenticationService.storeToken(response.token);
                this.toastr.success('Logged in successfuly');
                this.router.navigate([this.returnUrl]);
              }
            },
            err => {
              if ('error' in err.error) {
                this.toastr.error(err.error.Error, "Error")
              }
              else {
                this.toastr.error("Something went wrong", "Error")
              }
            }
          );

        }
        );
    }
  }
}