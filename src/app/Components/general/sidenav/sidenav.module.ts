import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { SidenavService, SidenavTogglerDirective } from 'src/app/Services/General/general.service';

@NgModule({
  declarations: [
    SidenavComponent,
    SidenavTogglerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidenavComponent,
    SidenavTogglerDirective
  ],
  providers:[
    SidenavService
  ]
})
export class SidenavModule { }
