import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from 'src/app/Models/event.interface';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private events:Event[] = [];
  private onChangeEvents = new Subject<Event[]>();
  private onReceive = new Subject<Event>();

  constructor(private http:HttpClient,
              private toastr:ToastrService) { }

  fetch_Events(){
    /**
     * Fetch events from database
     * if events fetched before next without send another request
     */
    if(this.events.length > 0){
      setTimeout(() => {
        this.onChangeEvents.next(this.events);
      });
    }else{
      this.http.get<Event[]>('api/events/all/').subscribe(events=>{
        this.events = events;
        this.onChangeEvents.next(this.events);
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
    return this.onChangeEvents;
  }

  get_events(){
    return this.events.slice();
  }

  get_active(){
    return this.events.filter(el=> el.status);
  }



  get_events_by_id(id:Number){
    if(this.events.length > 0){
      let index = this.events.findIndex(x=>x.id == id);
      setTimeout(() => {
        this.onReceive.next(this.events[index]);
      });
    }else{
      this.http.get<Event>('api/events/'+id+'/').subscribe(resp=>{
        this.onReceive.next(resp);
      },err=>{
        if ('msg' in err.error) {
          this.toastr.error(err.error.msg, "Error")
        }
        else {
          this.toastr.error("Something went wrong", "Error")
        }
      })
    }
    return this.onReceive;
  }

  post_event(data){
    this.events = [];
    return this.http.post('api/events/',{
      name:data.name,
      description:data.description,
      image:data.image,
      status:data.status,
      event_type:data.event_type,
      date:data.date
    });
  }

  // id:Number,
  // name:string,
  // date:Date,
  // description:string,
  // status:boolean,
  // image:string,
  // event_type:string

  update_event(id:Number,data){
    this.events = [];
    return this.http.put('api/events/'+id+'/',{
      name:data.name,
      description:data.description,
      image:data.image,
      status:data.status,
      event_type:data.event_type,
      date:data.date
    });
  }

  delete_event(id:Number){
    this.http.delete('api/events/'+ id +'/').subscribe((res:any)=>{
      this.toastr.success(res.msg,"Success");
      /**
       * delete from local array
       */
      let index = this.events.findIndex(el => el.id == id);
      this.events.splice(index,1);
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
