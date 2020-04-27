import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { Post } from 'src/app/Models/post.model';
import { DomSanitizer } from '@angular/platform-browser';
import { img } from 'src/app/Models/img.model';
import { NewsfeedService, get_youtube_id_from_url } from 'src/app/Services/adminpanel/newsfeed.service';
import { environment } from 'src/environments/environment';
//import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  
})
export class PostComponent implements OnInit {

  endpoint = environment.endpoint;

  image:img['image'];
  len:number;
  imgRight=true;
  state = 'show'
  small :boolean;
  substr:string;


  @Input() post:Post;
  @Input() index:number;


  @HostListener('window:resize', ['$event'])
  onResize(event){
    if (window.innerWidth <= 770) {
      this.small = true;
    } else {
      this.small = false;
    }

  }
  constructor(private sanitizer:DomSanitizer,public el:ElementRef,private newsfeedService:NewsfeedService) {

    if (window.innerWidth <= 770) {
      this.small = true;
    } else {
      this.small = false;
    }
  }
  

  ngOnInit() {
    //console.log(this.post);
    if(this.index%2==0){
      this.imgRight=false;
    }
    if(this.post.image != null){
      this.len =this.post.image.length-1;
      //console.log(this.post.image[this.post.image.length-1]);
      this.image=this.post.image[this.len]['image'];
      //console.log(this.image);
    }

  }
  embedUrl(post){
  
  // return  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+this.substr);
  return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+get_youtube_id_from_url(post.video)+'?rel=0');

  }
}
