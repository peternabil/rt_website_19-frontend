import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileRoutingModule } from '../../Routing/Profile/profile.router';
import { ProfileComponent } from './profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SidenavModule } from '../general/sidenav/sidenav.module';

@NgModule({
  declarations: [
    ProfileComponent,
    ViewProfileComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProfileRoutingModule,
    SidenavModule,
    ImageCropperModule
  ]
 
})
export class ProfileModule { }
