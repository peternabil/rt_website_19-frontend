import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NewsfeedService, get_youtube_id_from_url } from 'src/app/Services/adminpanel/newsfeed.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { AdminpanelService } from 'src/app/Services/adminpanel/adminpanel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  endpoint = environment.endpoint;
  
  /** ِcurrent article */
  article_type:string = 'text';
  croppedImage:string = null;
  
  /** for editing article */
  editmode = {
    flag: false,
    current_article_id: null,
    current_article_image: {
      updated: false,
      id: null
    }
  }
  // editmode:boolean = false;
  // updating_article_id:Number;
  
  /** Flags */
  submitted:boolean = false;
  cropper_show = false;
  
  /** DOM */
  article_form:FormGroup = this.formBuilder.group({
    title:[null,[Validators.required]],
    description:[null,[Validators.required]],
    date:[formatDate(new Date(), 'yyyy-MM-dd', 'en')],
    image:[null],
    video:[null]
  });
  video_embedd_link:any = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed');
  
  
  /** Image cropper */
  imageChangedEvent: any = null;
  onImgChange($event){
    /**
     * After select image to crop
     */
    this.imageChangedEvent = event;
    this.cropper_show = true; /** trigger cropper */
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.article_form.patchValue({
      image:this.croppedImage
    });
    this.editmode.current_article_image.updated = true;
  }
  loadImageFailed() {
    // show message
    this.cropper_show = false;
    this.toastr.error('Select Valied Image','Error');
  }

  constructor(private formBuilder:FormBuilder,
              private activatedRoute:ActivatedRoute,
              private newsfeedService:NewsfeedService,
              private sanitizer:DomSanitizer,
              private toastr:ToastrService,
              private adminpanelService:AdminpanelService) { }

  ngOnInit() {
    if(this.activatedRoute.snapshot.params['id']){
      /**
       * If id exists in URL
       *  -trigger edit mode
       *  -get article and update form with old data
       */
      this.editmode.flag = true;
      this.newsfeedService.get_article_by_id(this.activatedRoute.snapshot.params['id']).subscribe(
        article =>{
          this.editmode.current_article_id = article.id;
          this.article_form.patchValue({
            title: article.title,
            description: article.description,
            date: article.date,
            image: article.image[article.image.length -1].image,
            video: article.video
          });

          this.editmode.current_article_image.id = article.image[article.image.length -1].id;
          this.article_type = article.article_type;
          if(article.video != ''){
            /**
             * Update iframe with video embedd link
             */
            this.video_embedd_link = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+get_youtube_id_from_url(article.video)+'?rel=0');
          }

        }
      );
    }

    this.article_form.controls.video.valueChanges.subscribe(val=>{
      /**
       * Update iframe with new video url
       */
      this.video_embedd_link = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+get_youtube_id_from_url(val)+'?rel=0');
    })
    
  }

  change_type(type:string){
    /**
     * Change article type from DOM
     */
    this.article_type = type;
    if(type == 'video'){
      this.article_form.controls.image.setValidators(null);
      this.article_form.controls.video.setValidators([Validators.required]);
      this.article_form.controls.image.updateValueAndValidity();
      this.article_form.controls.video.updateValueAndValidity();
    }else if(type == 'image'){
      this.article_form.controls.video.setValidators(null);
      this.article_form.controls.image.setValidators([Validators.required]);
      this.article_form.controls.image.updateValueAndValidity();
      this.article_form.controls.video.updateValueAndValidity();
    }else {
      this.article_form.controls.video.setValidators(null);
      this.article_form.controls.image.setValidators(null);
      this.article_form.controls.image.updateValueAndValidity();
      this.article_form.controls.video.updateValueAndValidity();
    }
  }

  onSubmit(){
    this.submitted = true;
    if(this.editmode.flag){
      
      if(this.editmode.current_article_image.updated){
        /**
         * Delete old image
         */
        this.adminpanelService.delete_image_from('news-feed',this.editmode.current_article_id,this.editmode.current_article_image.id);
      }

      let article_data = {
        title: this.article_form.value.title,
        description:  this.article_form.value.description,
        date: this.article_form.value.date,
        status: false,
        article_type: this.article_type,
        /**
         * Add image/video field only if image/video type and image selected/video link provided
         */
        image: this.article_type == 'image' && this.croppedImage != null ? this.croppedImage : '',
        video: this.article_type == 'video' && this.article_form.value.video != null ? this.article_form.value.video : ''
      }
      this.newsfeedService.update_article(this.editmode.current_article_id,article_data).subscribe(
        (res:any) => {
          this.toastr.success(res.msg,"Success");
          /**
           * TODO: navigate
           */
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
      );
    }else{
      /** create new article */
      let article_data = {
        title: this.article_form.value.title,
        description:  this.article_form.value.description,
        date: this.article_form.value.date,
        status: false,
        article_type: this.article_type,
        /**
         * Add image/video field only if image/video type and image selected/video link provided
         */
        image: this.article_type == 'image' && this.croppedImage != null ? this.croppedImage : '',
        video: this.article_type == 'video' && this.article_form.value.video != null ? this.article_form.value.video : ''
      }
      this.newsfeedService.post_article(article_data).subscribe(
        (res:any) => {
          this.toastr.success(res.msg,"Success");
          /**
           * TODO: navigate
           */
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
      );
    }
  }
  
}
