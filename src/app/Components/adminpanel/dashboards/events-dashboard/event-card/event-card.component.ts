import { Component, OnInit, Input } from '@angular/core';
import { Event } from 'src/app/Models/event.interface';
import { EventsService } from 'src/app/Services/adminpanel/events.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  endpoint = environment.endpoint;
  @Input() card:Event;
  constructor(private eventss:EventsService) { }

  ngOnInit() {
  }
  delete_event(){
    if(confirm("Are you sure to delete this")) {
      this.eventss.delete_event(this.card.id);
    }
  }
}
