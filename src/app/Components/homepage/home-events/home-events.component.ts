import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Event } from 'src/app/Models/event.interface';
import { EventsService } from 'src/app/Services/adminpanel/events.service'
import { Router } from '@angular/router';

import{responsiveService} from 'src/app/Services/Events/responsive.service'
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home-events',
  templateUrl: './home-events.component.html',
  styleUrls: ['./home-events.component.css'],
})
export class HomeEventsComponent implements OnInit {

  endpoint = environment.endpoint;

  events: Event[] = [
    {
      id: 1,
      name: "FSUK",
      date: new Date("May 20 2019 21:00"),
      description: "ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam",
      status: true,
      image: [{ id: 1, image: "https://vid.alarabiya.net/images/2018/02/16/0a91af4a-384a-4d65-9c48-59bb767fa13e/0a91af4a-384a-4d65-9c48-59bb767fa13e_16x9_788x442.jpg" }],
      event_type: "string"
    },
    {
      id: 2,
      name: "Shell Eco Marathon",
      date: new Date("May 15 2019 21:00"),
      description: "f ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalamf ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam",
      status: true,
      image: [{ id: 1, image: "https://vid.alarabiya.net/images/2018/02/16/0a91af4a-384a-4d65-9c48-59bb767fa13e/0a91af4a-384a-4d65-9c48-59bb767fa13e_16x9_788x442.jpg" }],
      event_type: "string"
    },
  ]
  constructor(private eventsService: EventsService, private router:Router , private responsiveService:responsiveService) { }

  ngOnInit() {
    this.eventsService.fetch_Events().subscribe(response => {
      this.events = response.filter(el => el.status);
    });

      this.responsiveService.getMobileStatus().subscribe( isMobile =>{
        if(isMobile){
          // console.log('Mobile device detected')
        }
        else{
          // console.log('Desktop detected')
        }



    });
    this.onResize();
    }
onview(i:number){
    this.router.navigate(['/events',this.events[i].id]);
  }
  onResize(){
    this.responsiveService.checkWidth();
  }
  }
