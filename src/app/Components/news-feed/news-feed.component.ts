import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/Models/post.model';
import { NewsFeedService } from 'src/app/Services/NewsFeed/news-feed.service';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  posts :Post[];
  pageID:number=1;
  //prev:number;
  //next:number;
  //prevExist=false;
  nextExist=false;
  numPages:number;
  loaded=false;
  subscription :Subscription;
  constructor(private newsService:NewsFeedService,private route :ActivatedRoute,private router :Router ) { }

  ngOnInit() {
    // this.route.params.subscribe(
    //   (params)=>{
    //     this.pageID=+params['id']
    //     this.newsService.setPageId(params['id']);
    //   }
    // );
    this.newsService.getPosts().subscribe(
      (news)=>{
        this.posts=news['articles'];
        this.loaded=true;
        //console.log(news);
        this.numPages=+news['num_pages']
        if(this.pageID<this.numPages)
        {
          this.nextExist=true;
        }
        // if(this.pageID>1){
        //   this.prevExist=true;
        // }
        //console.log(news);
        //console.log(this.posts);
        //console.log(this.posts[0].video);

      }
    );
  }


  // onPrevious(){
  //   this.prev=parseInt(this.pageID+'') - 1;
  //   this.router.navigate(['news/'+this.prev]);
  // }
  // onNext(){
  //   this.next=parseInt(this.pageID+'') + 1;
  //   this.router.navigate(['news/'+this.next]);
  // }
  seeMore(){
    this.pageID +=1;
    //console.log(this.pageID);
    //console.log(this.numPages);
    if(this.pageID==this.numPages)
        {
          this.nextExist=false;
        }
    this.newsService.setPageId(this.pageID);
    this.newsService.getPosts().subscribe(
      (news)=>{
        for (let i in news['articles']) {
          this.posts.push(news['articles'][i]);
          //console.log(news['articles'][i]);
       }

        //console.log(this.posts);
      }
    );

  }
}
