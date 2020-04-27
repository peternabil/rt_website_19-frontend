import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReadVarExpr } from '@angular/compiler';
import { TeamsService } from 'src/app/Services/adminpanel/teams.service';
import { ActivatedRoute } from '@angular/router';
import { AdminpanelService } from 'src/app/Services/adminpanel/adminpanel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {

  endpoint = environment.endpoint;

  submitted:boolean = false;

  editmode = {
    flag: false,
    current_team_id: null,
  }

  images = {
    achievements_imgs:[],
    team_imgs:[]
  }

  /** Team form */
  team_form:FormGroup = this.formBuilder.group({
    team_name: [null,[Validators.required]],
    team_type: ['Technical',[Validators.required]],
    team_description: [null,[Validators.required]],
    image: this.formBuilder.array([]),
    achievements: this.formBuilder.array([
      this.formBuilder.group({
        id:[null,[Validators.required]],
        title:[null,[Validators.required]],
        position:[null,[Validators.required]],
        description:[null,[Validators.required]],
        year:[null,[Validators.required]],
        image:[null,[Validators.required]]
      })
    ])
  });

  get get_form_achievements(){
    return this.team_form.get('achievements') as FormArray;
  }

  get get_form_images(){
    return this.team_form.get('image') as FormArray;
  }

  add_form_image(value:string=null,id:Number=null){
    this.get_form_images.push(
      this.formBuilder.group({
        id:id,
        image: value,
      })
      );
    }

  add_form_achievement(achievement:any=null){
    this.get_form_achievements.push(
      this.formBuilder.group({
        id:         [(achievement != null ? achievement.id       : null),[Validators.required]],
        title:      [(achievement != null ? achievement.title       : null),[Validators.required]],
        position:   [(achievement != null ? achievement.position    : null),[Validators.required]],
        description:[(achievement != null ? achievement.description : null),[Validators.required]],
        year:       [(achievement != null ? achievement.year        : null),[Validators.required]],
        image:      [(achievement != null ? achievement.image       : null),[Validators.required]]
      })
      );
    }
  /** ./Team form */


  constructor(private formBuilder: FormBuilder,
              private toastr:ToastrService,
              private teamService:TeamsService,
              private activatedRoute:ActivatedRoute,
              private adminpanelService:AdminpanelService) { }

  ngOnInit() {

    if(this.activatedRoute.snapshot.params['id']){
      /**
       * If id exists in URL
       *  -trigger edit mode
       *  -get Team and update form with old data
       */
      this.editmode.flag = true;

      this.teamService.get_team_by_id(this.activatedRoute.snapshot.params['id']).subscribe(
        team =>{
          this.editmode.current_team_id = team.id;

          // update form date
          this.team_form.patchValue({
            team_name: team.name,
            team_description: team.description,
            team_type: team.team_type,
          });

          for(let img of team.image){
            this.add_form_image(img.image,img.id);
          }

          // delete first array index -empty one- and push incomming achievements
          this.get_form_achievements.removeAt(0);
          for(let achievement of team.achievement){
            this.add_form_achievement(achievement);
          }
        }
      );
    }

  }


  achievement_image_change($event,index){
    /**
     * Read Achievement image field and update form value to new image base64
     */
    let image = $event.target.files[0];
    let reader = new FileReader();
    if (!image.type.match(/image-*/)) {
      alert('Select valid Image');
      return;
    }
    reader.onload = ((e:any)=>{
      let base64 = 'data:image/png;base64,' + btoa(e.target.result);
      if(this.editmode.flag){
        /**
         * Add image to achievements_imgs to send in request
         */
        this.images.achievements_imgs[index] = base64;
      }
      this.get_form_achievements.at(index).patchValue({ // to display in DOM
        image: base64
      });
    })
    reader.readAsBinaryString(image);
  }

  team_images_change($event:any){
    /**
     * Read all files and push to team image array
     */
    let images:any = $event.target.files;

    if(images){
      for(let img of images){
        if (!img.type.match(/image-*/)) {
          alert('Select valid Images');
          return;
        }
      }

      for(let img of images){
        let reader = new FileReader();
        reader.onload = (e:any) => {
          let base64 = 'data:image/png;base64,' + btoa(e.target.result);
          if(this.editmode.flag){
            this.images.team_imgs.push({image:base64})
          }
          this.add_form_image(base64); // to display in DOM
        }
        reader.readAsBinaryString(img);
      }
    }else{
      alert('Select Images');
      return;
    }
  }

  delete_image(type:string,index:number,image_id:Number=null){
    if(confirm("Are you sure to delete this")){
      if(type == 'achievement'){
        this.get_form_achievements.at(index).patchValue({
          image:null
        });
        if(index in this.images.achievements_imgs){
          this.images.achievements_imgs.splice(index,1);
        }
      }else if(type == 'team'){
        if(this.editmode.flag){
          // delete from DB
          this.adminpanelService.delete_image_from('team',this.editmode.current_team_id,image_id);
        }
        this.get_form_images.removeAt(index);
      }
    }
  }

  delete_team(){
    if(confirm("Are you sure to delete this")){
      this.teamService.delete_team(this.editmode.current_team_id);
    }
  }

  delete_achievement(index:number,achievement_id:Number){
    if(this.editmode.flag){
      this.teamService.delete_achievement_by_id(this.editmode.current_team_id,achievement_id).subscribe(
        res => {
          this.toastr.success('Achievement Deleted');
          this.get_form_achievements.removeAt(index);
        },
        err =>{
          this.toastr.error('Something went wrong');
        }
      );
      return;
    }
    this.get_form_achievements.removeAt(index);
  }

  onSubmit(){
    this.submitted = true;
    if(this.editmode.flag){
      /**
       * add updated image to achievement request and make old images empty
       */
      let updated_achievement = this.get_form_achievements.value.slice();
      updated_achievement.forEach((element,index) => {
        if(index in this.images.achievements_imgs){
          element.image = this.images.achievements_imgs[index];
        }else{
          element.image = '';
        }
      });

      let team_data = {
        name:this.team_form.value.team_name,
        description:this.team_form.value.team_description,
        team_type:this.team_form.value.team_type,
        images: (this.images.team_imgs.length > 0) ? this.images.team_imgs : '',
        achievement: updated_achievement,
      };

      this.teamService.update_team(this.editmode.current_team_id,team_data).subscribe(
        (res:any) => {
          this.toastr.success(res.msg,"Success");
          this.teamService.update_fetched_data();
          // TODO: Resirect
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
      let team_data = {
        name:this.team_form.value.team_name,
        description:this.team_form.value.team_description,
        team_type:this.team_form.value.team_type,
        images:this.get_form_images.value,
        achievement:this.get_form_achievements.value,
      }
      /** Post new team */
      this.teamService.post_team(team_data).subscribe(
        (res:any) => {
          this.toastr.success(res.msg,"Success");
          this.teamService.update_fetched_data();
          // TODO redirect
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
