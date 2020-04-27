import { Component, OnInit } from '@angular/core';
import { FAQService } from 'src/app/Services/adminpanel/faq.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-faq-create',
  templateUrl: './faq-create.component.html',
  styleUrls: ['./faq-create.component.css']
})
export class FAQCreateComponent implements OnInit {

  FAQ_form = this.formBuilder.group({
    question:[,[Validators.required]],
    answer:[,[Validators.required]]
  })

  constructor(private FAQService:FAQService,
              private formBuilder: FormBuilder,
              private toastr:ToastrService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.FAQService.post_FAQ({
      question: this.FAQ_form.value.question,
      answer: this.FAQ_form.value.answer
    }).subscribe(
      (res:any) => {
        this.toastr.success(res.msg,"Success");
        this.FAQService.update();
        this.FAQ_form.patchValue({
          question:null,
          answer:null
        })
      }, err =>{
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
