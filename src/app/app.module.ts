// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Componens Modules
import { AuthenticationModule } from './Components/authentication/authentication.module';



// Services
import { AuthenticationService, JwtInterceptor, APIInterceptor } from './Services/Authentication/authentication.service';
import { GeneralService, LoadingHttpInterseptorService } from './Services/General/general.service';
import { ProfileService } from './Services/Profile/profile.service';
import { EventsService } from './Services/adminpanel/events.service';
import { EventService } from './Services/Events/events.service';
import { responsiveService }from './Services/Events/responsive.service'

// Routers
import { GeneralRoutesModule } from './Routing/General/general.service';



//AuthGuard
import { IsLoggedInGuardService } from './Routing/Authentication/auth-guard.service';


//Pipes


// Components
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './Components/authentication/authentication.component';
import { GeneralComponent } from './Components/general/general.component';
import { LoadingComponent } from './Components/general/loading/loading.component';
import { NewsFeedService } from './Services/NewsFeed/news-feed.service';

//others
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { GroupPermissionGuard } from './Routing/adminpanel/group-permission.guard';
import { SharedModule } from './shared.module';



@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    GeneralComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      enableHtml: true,
      positionClass: 'toast-bottom-right',
    }),
    AuthenticationModule,
    RouterModule.forRoot([
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '', loadChildren: './Components/website/website.module#WebsiteModule' },
      { path: 'profile', loadChildren: './Components/profile/profile.module#ProfileModule', data: {animation: 'profile'} },
      { path: 'adminpanel', loadChildren: './Components/adminpanel/adminpanel.module#AdminpanelModule', canActivate: [IsLoggedInGuardService] },
      { path: '**', redirectTo: '', data: {animation: 'whatever'} }
    ]),
  ],
  providers: [
    AuthenticationService,
    GeneralService,
    ProfileService,
    EventsService,
    EventService,
    EventsService,
    IsLoggedInGuardService,
    NewsFeedService,
    GroupPermissionGuard,
    responsiveService,

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingHttpInterseptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
