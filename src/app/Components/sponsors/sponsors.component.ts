import { Component, OnInit, ViewChild } from '@angular/core';
import { Sponsor } from 'src/app/Models/sponsor.interface'
import { SponsorsService } from 'src/app/Services/adminpanel/sponsors.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit {

  endpoint = environment.endpoint;

  sponsors: Sponsor[] = []

  constructor(private router:Router, private toastr: ToastrService, private sponsorsService: SponsorsService) { }

  ngOnInit() {
    this.sponsorsService.fetch_sponsors().subscribe(response => {
      this.sponsors = response;
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

  slideConfig = {
    "slidesToShow": 5, "slidesToScroll": 1, "infinite": true, "autoplay": true, "responsive": [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]

  };

}
