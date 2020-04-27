import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SponsorsService } from 'src/app/Services/adminpanel/sponsors.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sponsors-create',
  templateUrl: './sponsors-create.component.html',
  styleUrls: ['./sponsors-create.component.css']
})
export class SponsorsCreateComponent implements OnInit {
  endpoint = environment.endpoint;

  submitted:boolean = false;

  sponsor_form = this.formBuilder.group({
    url: [null,[Validators.required]],
    image: [,[Validators.required]]
  })

  constructor(private formBuilder:FormBuilder,
              private sponsorService: SponsorsService,
              private toastr:ToastrService) { }

  ngOnInit() {
  }

  change_sponsor_img($event:any){
    let image = $event.target.files[0];
    let reader = new FileReader();
    if (!image.type.match(/image-*/)) {
      alert('Select valid Image');
      return;
    }
    reader.onload = ((e:any)=>{
      let base64 = 'data:image/png;base64,' + btoa(e.target.result);
      this.sponsor_form.patchValue({
        image: base64
      })
    })
    reader.readAsBinaryString(image);
  }

  delete_img(){
    this.sponsor_form.patchValue({
      image: null
    })
  }

  onSubmit(){
    this.submitted = true;
    this.sponsorService.post_sponsor({
      url: this.sponsor_form.value.url,
      image: this.sponsor_form.value.image
    }).subscribe(
      (res:any) => {
        this.toastr.success(res.msg,"Success");
        this.sponsorService.update();
        this.sponsor_form.patchValue({
          image:null,
          url:null
        })
        this.submitted = false;
      }, err =>{
        if ('msg' in err.error) {
          this.toastr.error(err.error.msg, "Error")
        }
        else {
          this.toastr.error("Something went wrong", "Error")
        }
        this.submitted = false;
      }
    )
  }

}
