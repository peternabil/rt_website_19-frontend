import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../animation';
import { NgsRevealConfig } from 'ngx-scrollreveal';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css'],
  animations: [
    slideInAnimation,
  ],
  providers: [NgsRevealConfig]
})
export class WebsiteComponent implements OnInit {

  constructor(config: NgsRevealConfig) {
  // customize default values of ngx-scrollreveal directives used by this component tree
  config.duration = 4000;
  config.easing = 'cubic-bezier(0,0,1,1.01)';

  //other options here
}

  ngOnInit() {
  }

}
