import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  sponsers: any[] = [{

  }]

  constructor(private http: HttpClient) { }


  getSponsers() {
    return this.http.get<any[]>("api/sponsers/")
  }

  ngOnInit() {
    // this.getSponsers().subscribe(response => {
    //   this.sponsers = response;
    // })
  }

}
