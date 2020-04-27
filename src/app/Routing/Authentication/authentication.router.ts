import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SignupComponent } from 'src/app/Components/authentication/signup/signup.component';
import { SigninComponent } from 'src/app/Components/authentication/signin/signin.component';
import { ChangePasswordComponent } from 'src/app/Components/authentication/change-password/change-password.component';
import { ForgetPasswordComponent } from 'src/app/Components/authentication/forget-password/forget-password.component';
import { AuthenticationComponent } from 'src/app/Components/authentication/authentication.component';
import { ChangePasswordGuardService } from './auth-guard.service';

export const router = [
  {
    path: 'auth', component: AuthenticationComponent, children: [
      { path: '', redirectTo: 'login', pathMatch:'full' },
      { path: 'login', component: SigninComponent },
      { path: 'register', component: SignupComponent },
      { path: 'forget-password', component: ForgetPasswordComponent },
      { path: 'change-password/:token', component: ChangePasswordComponent, canActivate: [ChangePasswordGuardService] },
      { path: 'change-password', component: ChangePasswordComponent, canActivate: [ChangePasswordGuardService] },
    ]
  },
  //{ path: '**', redirectTo: '/' },
  //{ path: '', redirectTo: '/', pathMatch: 'full' }
]


/* Exporting routes variable so we can use in the app.module.ts */
export const AuthenticationRoutesModule: ModuleWithProviders = RouterModule.forRoot(router);
