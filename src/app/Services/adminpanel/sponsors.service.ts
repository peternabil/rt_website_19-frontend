import { Injectable } from '@angular/core';
import { Sponsor } from 'src/app/Models/sponsor.interface';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SponsorsService {
  private sponsors:Sponsor[] = [];
  private onChangeSponsers = new Subject<Sponsor[]>()

  constructor(private http:HttpClient,
              private toastr:ToastrService) { }

  fetch_sponsors(){
    if(this.sponsors.length > 0){
      setTimeout(() => {
        this.onChangeSponsers.next(this.sponsors); 
      });
    }else{
      this.http.get<Sponsor[]>('api/sponsors/all/').subscribe(
        (sponsors:Sponsor[]) => {
          this.sponsors = sponsors;
          this.onChangeSponsers.next(this.sponsors);
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
    return this.onChangeSponsers;
  }

  delete_sponsor(id:Number){
    this.http.delete('api/sponsors/'+id+'/').subscribe(
      (res:any)=>{
        this.toastr.success(res.msg,"Success");

        /** delete from local array */
        let index = this.sponsors.findIndex(el => el.id == id);
        this.sponsors.splice(index,1);
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

  post_sponsor(data){
    return this.http.post('api/sponsors/',{
      url: data.url,
      image: data.image
    })
  }

  update(){
    this.sponsors = [];
    this.fetch_sponsors();
  }

}
