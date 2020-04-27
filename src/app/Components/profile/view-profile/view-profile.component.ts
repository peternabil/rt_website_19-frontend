import { Component, OnInit } from '@angular/core';
import { Profile } from '../../../Models/profile.model';
import Swal from 'sweetalert2';
import 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../../Services/Profile/profile.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  NullImage: boolean = true;
  pro: Profile = new Profile('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  loaded = false;

  constructor(private profileservice: ProfileService, private route: ActivatedRoute, private router: Router) { }

  getProfile() {
    this.profileservice.fetchProfile().subscribe(
      (profile) => {
        this.pro = profile['0'];
        this.profileservice.setProfile(this.pro);
        this.loaded = true;
        // console.log(this.pro.profile_pic)

        if (this.pro.profile_pic == null || this.pro.profile_pic == '') {
          this.NullImage = true
        }
        else {
          this.NullImage = false;
          this.pro.profile_pic = this.baseUrlBackTest + this.pro.profile_pic
        }
      },
      error => {
        this.router.navigate(["profile/create"]);
        Swal.fire({
          title: 'Create profile first!',
        })
      }
    )
  }
  ngOnInit() {

    this.getProfile();

  }

  onEdit() {
    this.router.navigate(['../profile/create']);
  }
  baseUrlBackTest = "http://localhost:8000";
  previewNational_ID_Front() {
    Swal.fire({
      // title: 'National ID',
      imageUrl: this.baseUrlBackTest + this.pro.national_front,
      // imageWidth: 400,
      // imageHeight: 200,
      imageAlt: 'Custom image',
      animation: true
    })
  }
  previewPassport_ID() {
    Swal.fire({
      // title: 'Passport ID',
      imageUrl: this.baseUrlBackTest + this.pro.passport_img,
      // imageWidth: 400,
      // imageHeight: 200,
      imageAlt: 'Custom image',
      animation: true
    })
  }
  previewNational_ID_Back() {
    Swal.fire({
      // title: 'National ID',
      imageUrl: this.baseUrlBackTest + this.pro.national_back,
      // imageWidth: 400,
      // imageHeight: 200,
      imageAlt: 'Custom image',
      animation: true
    })
  }
}
