import { NgModule } from '@angular/core';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgsRevealModule } from 'ngx-scrollreveal';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [],
  imports: [
    NgbModalModule,
    NgsRevealModule,
    NgbModule.forRoot(),
    SlickCarouselModule,
  ],
  exports: [
    NgbModalModule,
    NgsRevealModule,
    NgbModule,
    SlickCarouselModule
  ]
})
export class SharedModule { }
