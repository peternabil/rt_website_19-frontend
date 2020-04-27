import { Component, OnInit } from '@angular/core';
import { Sponsor } from 'src/app/Models/sponsor.interface';
import { SponsorsService } from 'src/app/Services/adminpanel/sponsors.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sponsors-list',
  templateUrl: './sponsors-list.component.html',
  styleUrls: ['./sponsors-list.component.css']
})
export class SponsorsListComponent implements OnInit {
  endpoint = environment.endpoint;

  sponsers_list:Sponsor[] = []

  constructor(private sponsorsService:SponsorsService) { }

  ngOnInit() {
    this.sponsorsService.fetch_sponsors().subscribe(
      sponsors => {
        this.sponsers_list = sponsors;
      }
    );
  }

  delete_sponsor(id:Number){
    if(confirm('Are you sure to delete this ?')){
      this.sponsorsService.delete_sponsor(id);
    }
  }

}
