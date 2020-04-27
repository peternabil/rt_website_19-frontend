import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsComponent } from './events.component';
import { EventRoutingModule } from 'src/app/Routing/Events/events.router';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared.module';
import { DateCountdownTimerComponent } from '../general/date-countdown-timer/date-countdown-timer.component';





@NgModule({
    declarations: [
      EventsComponent,
      EventDetailComponent,
      // DateCountdownTimerComponent
    ],
    imports: [
      CommonModule,
      EventRoutingModule,
      SharedModule
    ]

  })
  export class EventsModule { }
