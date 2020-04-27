import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Highlight } from 'src/app/Models/highlight.interface'
import { HighlightsService } from 'src/app/Services/adminpanel/highlights.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-highlights',
  templateUrl: './home-highlights.component.html',
  styleUrls: ['./home-highlights.component.css']
})
export class HomeHighlightsComponent implements OnInit {

  endpoint = environment.endpoint;

  highlights: Highlight[] = [
    {
      id: 1,
      title: "String",
      description: "String",
      image: [{
        id: 1, image: "https://dummyimage.com/1920x400/fff/000"
      }],
      url: "",
      active: true
    },
        {
      id: 1,
          title: "String String",
      description: "String",
      image: [{
        id: 1, image: "https://dummyimage.com/1920x720/fff/000"
      }],
      url: "",
      active: true
    }
  ]

  constructor(private router:Router, private toastr: ToastrService, config: NgbCarouselConfig, private highlightsService: HighlightsService) {
    // customize default values of carousels used by this component tree
    config.interval = 4000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  ngOnInit() {
    this.highlightsService.fetch_highlights().subscribe(response => {
      this.highlights = response.filter(el => el.active);
      for (var highlight of this.highlights) {
        highlight.description = highlight.description.substring(0, 30);
      }
    },
    err => {
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


}
