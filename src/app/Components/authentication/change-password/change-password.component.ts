import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator, AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { User } from 'src/app/Models/user';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  private userMail:User;
  private token:string;

  changePasswordForm:FormGroup = this.formBuilder.group({
    password1: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    password2: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
  },{validators:[passwordMatchValidator]});

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    if(this.activatedRoute.snapshot.url[1]){
      this.token = JSON.stringify(this.activatedRoute.snapshot.url[1].path);
    }else{
      this.token = localStorage.getItem('token');
    }
    
    this.userMail = this.authService.tokenDecode(this.token).email;
  }

  get f() { return this.changePasswordForm.controls; }

  onSubmit(){
    this.authService.changePassword({
      email: this.userMail,
      token: this.token,
      password: this.changePasswordForm.value.password1
    }).subscribe(
      response =>{
        if( 'done' in response ){
          this.toastr.success('Your password changed successfully');
        }else {
          this.toastr.error('Something wrong. Please try again.');
        }
        this.router.navigate(['/']);
      },
      err => {
        if( 'error' in err.error ){
          this.toastr.error(err.error.error);
        }else{
          this.toastr.error('Something wrong. Please try again.');
        }
      }
    );
  }

}
