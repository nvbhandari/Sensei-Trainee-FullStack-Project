import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Trainee } from '../trainee';


@Component({
  selector: 'update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  updateForm!: FormGroup;

  id: number;
  name: string;
  trainee: Trainee;

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.updateForm = this.formBuilder.group({
      name: '',
      emailId: '',
      contactNo: '',
      dateOfBirth: '',
      city: '',
      aboutUs: '',
      password: ''
    })
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.authService.getTrainee(this.id).subscribe(data => {
      this.trainee = data; // Assuming the data received matches the Trainee interface
      this.updateForm.patchValue(this.trainee)
    }, error => console.log(error));
  }

  submitForm() {
    if (this.updateForm && this.trainee) {
      const updateApplication = { ...this.trainee, ...this.updateForm.value };
      console.log('Update Application:', updateApplication);
  
      this.authService.updateTrainee(this.id, updateApplication).subscribe(() => {
        console.log('API Response:'); // Check the response from the API
        // this.trainee = data;
        window.alert('Successfully Updated!');
        this.router.navigate(['/members']);
      });
    }
  }
  
  goBackTo(){
    this.router.navigate(['/members']);
}
  
}
