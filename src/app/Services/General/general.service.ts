import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Directive, HostListener, ElementRef } from '@angular/core';
import { tap } from 'rxjs/operators';


/**
 * Services ***************************************************
 */

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }
}

/**
 * LoadingScreen Service
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {
  private loadingEmmiter: Subject<boolean> = new Subject();
  constructor(private router:Router) { 
    router.events.subscribe(( event: RouterEvent )=>{
      if(event instanceof NavigationStart){
        this.showLoading();
      }
      if(event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError){
        this.hideLoading();
      }
    })
  }
  loadingStatus(){
    return this.loadingEmmiter;
  }
  showLoading(){
    this.loadingEmmiter.next(true);
  }
  hideLoading(){
    this.loadingEmmiter.next(false);
  }
}


/**
 * Sidenav Service
 */

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sidenaveExpanded:Subject<boolean> = new Subject();
  private lastStatus = false;
  constructor() {}
  sidenavToggle(){
    this.sidenaveExpanded.next(!this.lastStatus);
    this.lastStatus = ! this.lastStatus;
  }
  sidenavStatus(){
    return this.sidenaveExpanded;
  }
}


/**
 * Directives ***************************************************
 */

@Directive({
  selector: '[appSidenavToggler]'
})
export class SidenavTogglerDirective {
  constructor(private el: ElementRef, private sidenavService: SidenavService) { }
  @HostListener('click') onClick($event){
    this.sidenavService.sidenavToggle();
  }
}

/**
 * Interceptors ***************************************************
 */

/**
 * LoadingScreen Interseptor
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingHttpInterseptorService implements HttpInterceptor {
  constructor(private loadingService: LoadingScreenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      this.loadingService.showLoading();
    return next.handle(req).pipe( tap((event:HttpEvent<any>)=>{
      if(event instanceof HttpResponse){
        this.loadingService.hideLoading();
      }
    }, (err:any)=>{
      this.loadingService.hideLoading();
    }) );
  }
}
