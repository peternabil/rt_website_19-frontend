import { Injectable } from '@angular/core';
import { Post } from 'src/app/Models/post.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {
  pageId:number=1;

  constructor(private http:HttpClient) { }

  getPosts(){
    //return this.http.get('news/'+this.pageId+'/');//testing route
    return this.http.get('api/news-feed/'+this.pageId+'/');

  }

  setPageId(pageid){
    this.pageId=pageid;
  }


}
