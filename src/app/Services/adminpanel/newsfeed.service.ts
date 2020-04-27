import { Injectable } from '@angular/core';
import { Article } from 'src/app/Models/article.interface';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {

  private articles:Article[] = [];
  private onChangeArticles = new Subject<Article[]>();
  private onReceiveOneArticle = new Subject<Article>();
  private onReachMaxPages = new Subject<boolean>();

  private current_page_number = 0;
  private pages_number;

  constructor(private http:HttpClient,
              private toastr:ToastrService) { }

  get_page_prop(){
    return {
      num_pages: this.pages_number,
      current_page: this.current_page_number
    }
  }

  fetch_articles_page(page_number:Number = 1){
    this.onReachMaxPages.next(this.current_page_number == this.pages_number);
    if(page_number <= this.current_page_number){
      /** if requested page same current page next articles without send new request */
      setTimeout(() => {
        this.onChangeArticles.next(this.articles); 
      });
    }else{
      /** fetch from backend then append to articles and next */
      this.http.get<{
        num_pages:Number,
        articles:Article[]
      }>('api/news-feed/'+page_number+'/').subscribe(
        (res:any) => {
          this.pages_number = res.num_pages;
          this.current_page_number++;
          this.onReachMaxPages.next(this.current_page_number == this.pages_number);

          this.articles = this.articles.concat(res.articles)
          this.onChangeArticles.next(this.articles);
        },
        (err) =>{
          if ('msg' in err.error) {
            this.toastr.error(err.error.msg, "Error")
          }
          else {
            this.toastr.error("Something went wrong", "Error")
          }
        }
      )
    }
    return this.onChangeArticles;
  }

  reach_max(){
    return this.onReachMaxPages;
  }

  get_article_by_id(id:Number){
    if(this.articles.length > 0){
      let article = this.articles.find(x=> x.id == id);
      if(article){
        setTimeout(() => {
          this.onReceiveOneArticle.next(article);
        });
        return this.onReceiveOneArticle;
      }
    }
    /** else no articles before or required id does not exist */
    this.http.get<Article>('api/edit-news-feed/'+id+'/').subscribe(
      (article:Article)=>{
        this.onReceiveOneArticle.next(article);
      },
      (err:any) =>{
        if ('msg' in err.error) {
          this.toastr.error(err.error.msg, "Error")
        }
        else {
          this.toastr.error("Something went wrong", "Error")
        }
      }
    );
    return this.onReceiveOneArticle;
  }

  post_article(data){
    this.articles = [];
    this.current_page_number = 0;
    this.onReachMaxPages.next(false);
    return this.http.post('api/news-feed/',{
      title: data.title,
      description:  data.description,
      date: data.date,
      status: false,
      article_type: data.article_type,
      image: data.image != '' ? data.image : '',
      video: data.video != '' ? data.video : ''
    })
  }

  update_article(id:Number, data){
    this.articles = [];
    this.current_page_number = 0;
    this.onReachMaxPages.next(false);
    return this.http.put('api/edit-news-feed/'+id+'/',{
      title: data.title,
      description:  data.description,
      date: data.date,
      status: false,
      article_type: data.article_type,
      image: data.image != '' ? data.image : '',
      video: data.video != '' ? data.video : ''
    })
  }

  delete_article(id:Number){
    this.http.delete('api/edit-news-feed/'+ id +'/').subscribe(
      (res:any)=>{
        this.toastr.success(res.msg,"Success");
        
        let article_index = this.articles.findIndex(x=> x.id == id);
        this.articles.splice(article_index,1);
      },
      (err)=>{
        if ('msg' in err.error) {
          this.toastr.error(err.error.msg, "Error")
        }
        else {
          this.toastr.error("Something went wrong", "Error")
        }
      });
  }

}


export function get_youtube_id_from_url(url){
  let regex = new RegExp(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
  // let match = regex.test(url);
  let match = regex.exec(url)
  return (match&&match[7])? match[7] : false;
}