import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/Models/article.interface';
import { NewsfeedService } from 'src/app/Services/adminpanel/newsfeed.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  reach_max_pages:boolean = false;

  articles_list:Article[] = []

  constructor(private newsfeedService: NewsfeedService) { }

  ngOnInit() {
    this.newsfeedService.reach_max().subscribe(isMax => this.reach_max_pages = isMax);
    
    this.newsfeedService.fetch_articles_page().subscribe(
      (articles:Article[]) => {
        this.articles_list = articles;
      }
    );
    
  }

  load_more(){
    this.newsfeedService.fetch_articles_page( this.newsfeedService.get_page_prop().current_page +1 ).subscribe(
      (articles:Article[]) => {
        this.articles_list = articles;
      }
    );
  }

}
