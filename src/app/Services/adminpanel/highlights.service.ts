import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Highlight } from 'src/app/Models/highlight.interface';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HighlightsService {

  private highlights:Highlight[] = [];
  private onChangeHighlights = new Subject<Highlight[]>();
  private onReceiveOneHighlight = new Subject<Highlight>();

  constructor(private http:HttpClient,
              private toastr:ToastrService) { }

  fetch_highlights(){
    /**
     * Fetch highlights from database 
     * if highlights fetched before next without send another request
     */
    if(this.highlights.length > 0){
      setTimeout(() => {
        this.onChangeHighlights.next(this.highlights); 
      });
    }else{
      this.http.get<Highlight[]>('api/highlights/all/').subscribe(highlights=>{
        this.highlights = highlights;
        this.onChangeHighlights.next(this.highlights);
      },
      err=>{
        if ('msg' in err.error) {
          this.toastr.error(err.error.msg, "Error")
        }
        else {
          this.toastr.error("Something went wrong", "Error")
        }
      })
    }
    return this.onChangeHighlights;
  }

  get_highlights(){
    return this.highlights.slice();
  }

  get_active(){
    return this.highlights.filter(el=> el.active);
  }

  get_highlights_by_id(id:Number){
    if(this.highlights.length > 0){
      let index = this.highlights.findIndex(x=>x.id == id);
      setTimeout(() => {
        this.onReceiveOneHighlight.next(this.highlights[index]); 
      });
    }else{
      this.http.get<Highlight>('api/highlights/'+id+'/').subscribe(resp=>{
        this.onReceiveOneHighlight.next(resp);
      },err=>{
        if ('msg' in err.error) {
          this.toastr.error(err.error.msg, "Error")
        }
        else {
          this.toastr.error("Something went wrong", "Error")
        }
      })
    }
    return this.onReceiveOneHighlight;
  }

  post_highlight(data){
    this.highlights = [];
    return this.http.post('api/highlights/',{
      title:data.title,
      description:data.description,
      image:data.image,
      url:data.url,
      active:data.active
    });
  }
  
  update_highlight(id:Number,data){
    this.highlights = [];
    return this.http.put('api/highlights/'+id+'/',{
      title:data.title,
      description:data.description,
      image:data.image,
      url:data.url,
      active:data.active
    });
  }

  delete_highlight(id:Number){
    this.http.delete('api/highlights/'+ id +'/').subscribe((res:any)=>{
      this.toastr.success(res.msg,"Success");
      /** 
       * delete from local array
       */
      let index = this.highlights.findIndex(el => el.id == id);
      this.highlights.splice(index,1);
    },(err)=>{
      if ('msg' in err.error) {
        this.toastr.error(err.error.msg, "Error")
      }
      else {
        this.toastr.error("Something went wrong", "Error")
      }
    })
  }

}
