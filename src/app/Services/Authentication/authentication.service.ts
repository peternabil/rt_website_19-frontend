import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';

import { Observable, Subject, empty } from 'rxjs';

import * as jwt_decode from "jwt-decode";
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient
  ) { }

  signup(data) {
    /**
     * data -> {email,password}
     * api/auth/auth -> path = "/api/auth/auth/register"
     */
    let request_body = {
      email: data.email.toLowerCase(),
      password: data.password
    }
    return this.http.post<{ email: string, password: string }>("api/auth/register/", request_body);
  }

  login(data = null, provider: string = 'email-login') {
    /**
     * provider -> email-login , facebook , google
     * api/auth/auth -> path = "/api/auth/auth/login"
     * api/auth/auth -> path = "/api/auth/auth/social"
     * data changes between providers
     */
    let request_body = {};

    if (provider == 'google' || provider == 'facebook') {
      request_body = {
        'social_id': data.social_id,
        'name': data.name,
        'email': data.email.toLowerCase(),
        'provider': data.provider,
      };
      return this.http.post<any>('api/auth/social/', request_body);
    } else {
      request_body = {
        email: data.email.toLowerCase(),
        password: data.password,
        remember_me: data.remember_me
      }
      return this.http.post<any>('api/auth/login/', request_body);
    }
  }

  userIsExist(email: string) {
    /**
     * Check if this email exists before
     * api/auth/auth -> path = "/api/auth/auth/user-exist"
     */

    let request_body = {
      email: email.toLowerCase()
    }
    return this.http.post<any>("api/auth/user-exist/", request_body);
  }

  tokenDecode(token: string): any {
    /**
     * Decode JWT
     */
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  verifyLoggedIn: Subject<boolean> = new Subject();

  isLoggedIn() {
    /**
     * Check if user logged in and verify token
     *
     *
     * @returns Subject<boolean> Of loggedin status
     */
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : null;


    if(token == null){
      setTimeout(() => {
        this.verifyLoggedIn.next(false);
      });
    }else {
      this.tokenVerify(token).
        subscribe(
          (Response) => {
            if (!!Response.token) {
              this.verifyLoggedIn.next(true);
            }
            else {
              this.verifyLoggedIn.next(false);
              this.logout();
            }
          },
          (err) => {
            this.verifyLoggedIn.next(false);
            this.logout();
          }
        )
    }

    return this.verifyLoggedIn;
  }

  tokenVerify(token: string) {
    let request_body = {
      token: JSON.parse(token)
    }
    return this.http.post<any>("api/auth/token-verify/", request_body)
  }

  storeToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
    this.verifyLoggedIn.next(true);
  }

  logout() {
    /**
     * Clear JWT from local storage
     */
    localStorage.removeItem('token');
    this.verifyLoggedIn.next(false);
  }

  forgetPassword(email: string) {
    let request_body = {
      "email": email.toLowerCase(),
    }
    return this.http.post<any>("api/auth/forget-password/", request_body)
  }

  changePassword(body: any) {
    let request_body = {
      email: body.email.toLowerCase(),
      token: JSON.parse(body.token),
      password: body.password
    }
    return this.http.post<any>("api/auth/change-password/", request_body);
  }


}

/**
 * Functions
 */

export function passwordMatchValidator(ac: AbstractControl) {
    let isValid = ac.get('password1').value === ac.get('password2').value;
    return isValid ? null : {
      passwordMatch: true
    }
}


/**
 * Authentication Interceptors
 */

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = null;

    if(localStorage.getItem('token') === null){
      token = null;
    }
    else{
      //console.log(token)
      token = JSON.parse(localStorage.getItem('token'));
      // token = localStorage.getItem('token');
    }


    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}


@Injectable()
export class APIInterceptor implements HttpInterceptor {
  // baseUrl = 'http://127.0.0.1:8000/';
  //baseUrl = 'http://localhost:3000/';
  // baseUrl ='https://domain-name.com/';
  baseUrl = `${environment.endpoint}/`;
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    req = req.clone({
      url: this.baseUrl + req.url
    });
    return next.handle(req);
  }
}
