import { Evnt } from '../../Models/event.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class EventService{

private events:Evnt[] =[];
private onReceive = new Subject<Evnt>();
constructor (private http:HttpClient,private toastr:ToastrService,private router:Router){}


getEvents (){
    return this.http.get<Evnt[]>('api/events/all/');
}
setEvents (events:Evnt[]){
     this.events =events;
}

get_events_by_id(id:Number){
    if(this.events.length > 0){
      let index = this.events.findIndex(x=>x.id == id);
      setTimeout(() => {
        this.onReceive.next(this.events[index]);
      });
    }else{
      this.http.get<Evnt>('api/events/'+id+'/').subscribe(resp=>{
        this.onReceive.next(resp);
      },err=>{
        if ('msg' in err.error) {
          this.toastr.error(err.error.msg, "Error");
          this.router.navigate(['../']);
        }
        else {
          this.toastr.error("Something went wrong", "Error")
        }
      })
    }
    return this.onReceive;
  }

 }