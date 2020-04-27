import { Component, OnInit } from '@angular/core';
import { FAQ } from 'src/app/Models/FAQ.interface';
import { FAQService } from 'src/app/Services/adminpanel/faq.service';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.css']
})
export class FAQListComponent implements OnInit {

  FAQ_list:FAQ[] = [ ];

  constructor(private FAQService: FAQService) { }

  ngOnInit() {
    this.FAQService.fetch_FAQ().subscribe(
      FAQ => {
        this.FAQ_list = FAQ;
      }
    );
  }

  delete_QA(id:Number){
    if(confirm('Are you sure to delete this?')){
      this.FAQService.delete_FAQ(id);
    }
  }

}
