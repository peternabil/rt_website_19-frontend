import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from '../../Components/events/events.component';
import { EventDetailComponent } from '../../Components/events/event-detail/event-detail.component';

const EventRoutes: Routes = [
    {
      path: '', component: EventsComponent,  children: [

        { path: ':id', component: EventDetailComponent },
        { path: '**', redirectTo: '/events/0' },

      ]
    },
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(EventRoutes)
    ],
    exports: [RouterModule],

  })
  export class EventRoutingModule { }
