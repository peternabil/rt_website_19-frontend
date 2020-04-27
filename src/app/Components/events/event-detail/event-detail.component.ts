import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../Services/Events/events.service';
import { Evnt } from '../../../Models/event.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  endpoint = environment.endpoint;

  event: Evnt = new Evnt(null, '', '', '', [{ image: null, id: null }], '', null);
  event_date: Date = null;
  id: number;
  events2: Evnt[] = [];
  constructor(private eventservice: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {

      this.id = +params['id'];
      if (this.route.snapshot.params['id']) {
        this.eventservice.get_events_by_id(this.id).subscribe(
          (event) => {

            this.event = event;
            this.event_date = new Date(event.date);
          }, err => {
            if ('msg' in err.error) {
              this.toastr.error(err.error.msg, "Error");
              //this.router.navigate(['../']);
            }
            else {
              this.toastr.error("Something went wrong", "Error")
            }
          }
        );
      }

    });

  }

}
