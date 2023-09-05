import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  registrationForm!: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  constructor(
    private snack: MatSnackBar,
    private http: HttpClient,
    private autservice: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.registrationForm = this.fb.group({
      name: [''],
      emailId: ['',Validators.email],
      password: [''],
      contactNo: [''],
      dateOfBirth: [''],
      city: [''],
      aboutUs: ['']
    });
  }

  goBackTo(){
      this.router.navigate(['/home']);
  }

  submitForm() {
    if (this.registrationForm.valid) {
      const trainee = this.registrationForm.value;
      this.autservice.saveTrainee(trainee).subscribe(
        (response) => {
          console.log("registered success!", response);
          window.alert("Submitted Successfully!");
          this.formGroupDirective.resetForm();
        },
        (error) => {
          console.error("post failed!", error);
          // window.alert('Failed');
          // this.registrationForm.reset();
          window.alert("Submitted Successfully.")
          this.formGroupDirective.resetForm();
        }
      );
    }
  }  
}







