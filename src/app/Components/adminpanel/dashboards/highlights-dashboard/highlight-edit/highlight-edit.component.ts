import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Highlight } from 'src/app/Models/highlight.interface';
import { HighlightsService } from 'src/app/Services/adminpanel/highlights.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { AdminpanelService } from 'src/app/Services/adminpanel/adminpanel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-highlight-edit',
  templateUrl: './highlight-edit.component.html',
  styleUrls: ['./highlight-edit.component.css']
})
export class HighlightEditComponent implements OnInit {
  endpoint = environment.endpoint;

  /** For Edit Mode */
  editmode = {
    flag: false,
    current_card_id: null,
    current_img:{
      updated: false,
      id: null
    }
  };

  submitted:boolean = false;

  /** Card Form */
  cropper = {
    show: false,
    croppedImage: null,
  }
  imageChangedEvent:any = null;
  onImgChange(event: any): void {
    /**
     * Image input change event to be cropped
     */
    this.imageChangedEvent = event;
    this.cropper.show = true;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.cropper.croppedImage = event.base64;
      this.card_form.patchValue({
        image:this.cropper.croppedImage
      });
      this.editmode.current_img.updated = true;
  }
  loadImageFailed() {
    // show message
    this.cropper.show = false;
    this.toastr.error('Select Valied Image','Error');
  }

  card_form:FormGroup = this.formBuilder.group({
    title: [null, [Validators.required]],
    description:[null,[Validators.required]],
    image:[null,[Validators.required]],
    url:[null,[Validators.required]],
    active:[false,[Validators.required]]
  })

  constructor(private activatedRoute:ActivatedRoute,
              private highlightsServices:HighlightsService,
              private formBuilder:FormBuilder,
              private toastr:ToastrService,
              private adminpanelService:AdminpanelService) {}

  ngOnInit() {
    if(this.activatedRoute.snapshot.params['id']){
      this.editmode.flag = true;
      this.highlightsServices.get_highlights_by_id(this.activatedRoute.snapshot.params['id']).subscribe(
        card=>{
          this.editmode.current_card_id = card.id;
          this.card_form.patchValue({
            title: card.title,
            description: card.description,
            url: card.url,
            active: card.active,
            image: card.image[card.image.length -1].image,
        });
        this.editmode.current_img.id = card.image[card.image.length -1].id;
      })
    }
  }

  onSubmit(){
    this.submitted = true;

    if(this.editmode.flag){
      if(this.editmode.current_img.updated){
        this.adminpanelService.delete_image_from('highlight',this.editmode.current_card_id,this.editmode.current_img.id);
      }
      this.highlightsServices.update_highlight(this.editmode.current_card_id,{
        title:this.card_form.value.title,
        description:this.card_form.value.description,
        image: (this.cropper.croppedImage) ? this.card_form.value.image : '',
        url:this.card_form.value.url,
        active:this.card_form.value.active
      }).subscribe(
        (res:any) => {
          this.toastr.success(res.msg,"Success");
          this.submitted = false;
        },
        (err:any) => {
          if ('msg' in err.error) {
            this.toastr.error(err.error.msg, "Error")
          }
          else {
            this.toastr.error("Something went wrong", "Error")
          }
          this.submitted = false;
        }
      )
    }else{
      this.highlightsServices.post_highlight({
        title:this.card_form.value.title,
        description:this.card_form.value.description,
        image:this.card_form.value.image,
        url:this.card_form.value.url,
        active:this.card_form.value.active
      }).subscribe((res:any) => {
        this.toastr.success(res.msg,"Success");
        this.submitted = false;
      }, err =>{
        if ('msg' in err.error) {
          this.toastr.error(err.error.msg, "Error")
        }
        else {
          this.toastr.error("Something went wrong", "Error")
        }
        this.submitted = false;
      });
    }


  }

}
