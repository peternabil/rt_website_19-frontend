import { Injectable } from '@angular/core';
import { FAQ } from 'src/app/Models/FAQ.interface';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FAQService {

  private FAQ:FAQ[] = [];
  private onChangeFAQ = new Subject<FAQ[]>();


  constructor(private http:HttpClient,
              private toastr:ToastrService) { }

  fetch_FAQ(){
    if(this.FAQ.length > 0){
      setTimeout(() => {
        this.onChangeFAQ.next(this.FAQ); 
      });
    }else{
      this.http.get<FAQ[]>('api/faq/').subscribe(
        (FAQ:FAQ[]) => {
          this.FAQ = FAQ;
          this.onChangeFAQ.next(this.FAQ);
        },
        (err:any) => {
          if ('msg' in err.error) {
            this.toastr.error(err.error.msg, "Error")
          }
          else {
            this.toastr.error("Something went wrong", "Error")
          }
        }
      );
    }
    return this.onChangeFAQ;
  }

  update(){
    this.FAQ = [];
    this.fetch_FAQ();
  }

  post_FAQ(data){
    return this.http.post('api/faq/',{
      question: data.question,
      answer: data.answer
    })
  }

  delete_FAQ(id:Number){
    this.http.delete('api/faq/'+id+'/').subscribe(
      (res:any)=>{
        this.toastr.success(res.msg,"Success");

        /** delete from local array */
        let index = this.FAQ.findIndex(el => el.id == id);
        this.FAQ.splice(index,1);
      },(err)=>{
        if ('msg' in err.error) {
          this.toastr.error(err.error.msg, "Error")
        }
        else {
          this.toastr.error("Something went wrong", "Error")
        }
      }
    )
  }

}
