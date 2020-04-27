import { Component, OnInit } from '@angular/core';
import { HighlightsService } from 'src/app/Services/adminpanel/highlights.service';
import { ActivatedRoute } from '@angular/router';
import { Highlight } from 'src/app/Models/highlight.interface';

@Component({
  selector: 'app-highlights-list',
  templateUrl: './highlights-list.component.html',
  styleUrls: ['./highlights-list.component.css']
})
export class HighlightsListComponent implements OnInit {

  highlights_list:Highlight[] = [ ]

  filter:string = 'all';

  constructor(private highlightsService:HighlightsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.highlightsService.fetch_highlights().subscribe(highlights=>{
      this.highlights_list = highlights;

      this.activatedRoute.queryParams.subscribe(params=>{
        if(params.filter == 'active'){
          this.filter = 'active';
          this.highlights_list = this.highlightsService.get_active();
        }else{
          this.filter = 'all';
          this.highlights_list = highlights;
        }
      });
    });
  }
}
