import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/Models/article.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { NewsfeedService, get_youtube_id_from_url } from 'src/app/Services/adminpanel/newsfeed.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  endpoint = environment.endpoint;

  @Input() article:Article = null;

  video_embedd_link = null;
  image_url:string = null;
  constructor(private sanitizer: DomSanitizer,
              private newsfeedService:NewsfeedService) { }
  ngOnInit() {
    if(this.article.article_type == 'video' && this.article.video != ''){
      this.video_embedd_link = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+get_youtube_id_from_url(this.article.video)+'?rel=0');
    }
  }

  delete_article(){
    if(confirm("Are you sure to delete this")) {
      this.newsfeedService.delete_article(this.article.id);
    }
  }

}


