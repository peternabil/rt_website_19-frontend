import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  /**
     * HTML Elements
  **/
  forgetpasswordForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.forgetpasswordForm.controls; }

  onSubmit() {
    this.authService.forgetPassword(this.forgetpasswordForm.value.email)
      .subscribe(
        (response: any) => {
          this.toastr.success("We've sent you an email to change your password.", 'Success!')
          this.router.navigate(['/']);
        },
        (err) => {
          if ('error' in err.error) {
            this.toastr.error(err.error.error, "Error")
          }
          else {
            this.toastr.error("Something went wrong", "Error")
          }
        }
      )
  }
}
