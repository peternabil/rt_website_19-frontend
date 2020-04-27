import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { EventsService } from 'src/app/Services/adminpanel/events.service';
import { AdminpanelService } from 'src/app/Services/adminpanel/adminpanel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  endpoint = environment.endpoint;

  editmode = {
    flag: false,
    current_card_id: null,
    current_card_img: {
      updated: false,
      id: null
    }
  };

  submitted:boolean = false;

  /** Card Form */
  cropper_show = false;
  imageChangedEvent: any = null;
  croppedImage: any = null;
  onImgChange(event: any): void {
    this.imageChangedEvent = event;
    /** trigger cropper */
    this.cropper_show = true;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      this.card_form.patchValue({
      image:this.croppedImage
    });
    this.editmode.current_card_img.updated = true;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
    this.cropper_show = false;
    this.toastr.error('Select Valied Image','Error');
  }

  card_form:FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    description:[null,[Validators.required]],
    image:[null,[Validators.required]],
    event_type:[null,[Validators.required]],
    date:[null,[Validators.required]],
    status:[false,[Validators.required]]
  })

  constructor(private activatedRoute:ActivatedRoute,
              private eventsServices:EventsService,
              private formBuilder:FormBuilder,
              private toastr:ToastrService,
              private adminpanelService:AdminpanelService) {}

  ngOnInit() {
    if(this.activatedRoute.snapshot.params['id']){
      this.editmode.flag = true;
      this.eventsServices.get_events_by_id(this.activatedRoute.snapshot.params['id']).subscribe(card=>{
        this.editmode.current_card_id = card.id;
        this.card_form.patchValue({
          name: card.name,
          description: card.description,
          event_type: card.event_type,
          date: card.date,
          status: card.status,
          image: card.image[card.image.length -1].image,
        });
        this.editmode.current_card_img.id = card.image[card.image.length -1].id;
      })
    }
  }

  onSubmit(){
    this.submitted = true;

    if(this.editmode.flag){

      if(this.editmode.current_card_img.updated){
        /**
         * delete old image
         */
        this.adminpanelService.delete_image_from('event',this.editmode.current_card_id,this.editmode.current_card_img.id);
      }

      this.eventsServices.update_event(this.editmode.current_card_id,{
        name:this.card_form.value.name,
        description:this.card_form.value.description,
        image: (this.croppedImage) ? this.card_form.value.image : '',
        event_type:this.card_form.value.event_type,
        date:this.card_form.value.date,
        status:this.card_form.value.status
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
      this.eventsServices.post_event({
        name:this.card_form.value.name,
        description:this.card_form.value.description,
        image:this.card_form.value.image,
        event_type:this.card_form.value.event_type,
        date:this.card_form.value.date,
        status:this.card_form.value.status
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
