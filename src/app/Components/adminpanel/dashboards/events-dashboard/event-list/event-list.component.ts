import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/Models/event.interface';
import { EventsService } from 'src/app/Services/adminpanel/events.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events_list:Event[] = [ ]
  filter:string = 'all';

  constructor(private eventsService:EventsService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.eventsService.fetch_Events().subscribe(events=>{
      this.events_list = events;

      this.activatedRoute.queryParams.subscribe(params=>{
        if(params.filter == 'active'){
          this.filter = 'active';
          this.events_list = this.eventsService.get_active();
        }else{
          this.filter = 'all';
          this.events_list = events;
        }
      });
    });

  }

}
