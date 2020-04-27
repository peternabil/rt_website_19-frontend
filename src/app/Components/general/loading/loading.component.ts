import { Component, OnInit } from '@angular/core';
import { LoadingScreenService } from 'src/app/Services/General/general.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  public loadingScreenFlag = false;
  constructor(loadingService:LoadingScreenService){
    loadingService.loadingStatus().subscribe((status)=>{
      this.loadingScreenFlag = status;
    });
  }
  ngOnInit() {
  }
}
