import { Component, OnInit, ElementRef, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'countdown-timer',
  templateUrl: './date-countdown-timer.component.html',
  styleUrls: ['./date-countdown-timer.component.css']
})
export class DateCountdownTimerComponent implements OnInit, OnDestroy {

  private future: Date;
  private futureString: string;
  private counter$: Observable<number>;
  private subscription: Subscription;
  message: string;
 

  @Input() inputDate: Date;

  constructor(elm: ElementRef) {
    this.futureString = elm.nativeElement.getAttribute('inputDate');
  }

  dhms(t) {
    var days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
      days + 'D',
      hours + 'H',
      minutes + 'M',
      seconds + 'S'
    ].join(' ');
  }


  ngOnInit() {
    
    this.future = new Date(this.inputDate.toString());
    this.counter$ = Observable.interval(1000).map((x) => {
      return Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
    });

    this.subscription = this.counter$.subscribe((x) => this.message = this.dhms(x));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}