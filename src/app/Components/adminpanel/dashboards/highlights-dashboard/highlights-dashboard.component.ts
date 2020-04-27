import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-highlights-dashboard',
  templateUrl: './highlights-dashboard.component.html',
  styleUrls: ['./highlights-dashboard.component.css']
})
export class HighlightsDashboardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    // this.router.navigate(['./',{filter:'all'}])
  }

}
