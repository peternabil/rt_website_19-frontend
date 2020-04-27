import { Component, OnInit } from '@angular/core';
import { EventService } from '../../Services/Events/events.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Evnt } from '../../Models/event.model';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  endpoint = environment.endpoint;

  events: Evnt[] = [{
    id: 1,
    name: "String",
    description: "String",
    date: "15-7-1998",
    image: [{
      id: 1, image: "https://dummyimage.com/1920x400/000/fff"
    }],
    event_type: "anything",
    status: true
  }];
  event: Evnt = new Evnt(null, '', '', '', [{ image: null, id: null }], '', null);
  view: boolean = false;
  constructor(private eventService: EventService, private router: Router, private toastr: ToastrService,
    config: NgbCarouselConfig) {
    config.interval = 4000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  ngOnInit() {

    this.eventService.getEvents().subscribe(
      (events) => {

        this.events = events.filter(el => el.status);
        this.eventService.setEvents(this.events);
      },
      err => {
        if ('msg' in err.error) {
          this.toastr.error(err.error.msg, "Error");
          this.router.navigate(['../']);
        }
        else {
          this.toastr.error("Something went wrong", "Error")
        }
      }
    );

    //   $('#recipeCarousel').carousel({
    //     interval: 4000
    //   })
    //   $('.carousel .carousel-item').each(function(){
    //     var next = $(this).next();
    //     if (!next.length) {
    //     next = $(this).siblings(':first');
    //     }
    //     next.children(':first-child').clone().appendTo($(this));

    //     for (var i=0;i<4;i++) {
    //         next=next.next();
    //         if (!next.length) {
    //         	next = $(this).siblings(':first');
    //       	}

    //         next.children(':first-child').clone().appendTo($(this));
    //       }
    // });
    //     $('.carousel').carousel({
    //       pause: "false"
    //     });


  }
  onview(i: number) {
    this.event = this.events[i];
    this.router.navigate(['/events', this.events[i].id]);
  }


}
