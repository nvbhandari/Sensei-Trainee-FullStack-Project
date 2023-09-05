import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  emailID: string;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      emailId: [''],
      password: ['']
    });
  }
  
  goBackTo() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { emailId, password } = this.loginForm.value;
      this.authService.login(emailId, password).subscribe(
        (response: any) => {
          window.alert("Login successfull");
          console.log("login Successfull...");
          if (this.authService.isLoggedIn) {
            this.emailID = emailId;
            this.router.navigate(['/members']);
          } else {
            window.alert("Invalid Input!");
            this.router.navigate(['/login']);
          }
        }
      );
    }
    else {
      window.alert("Invalid Input!");
      console.log('login failed');
    }
  }
}

