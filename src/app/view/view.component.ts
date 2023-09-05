import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Trainee } from '../trainee';

@Component({
  selector: 'view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  id: number;
  trainee: Trainee;
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);

    this.trainee = new Trainee();
    this.authService.getTrainee(id).subscribe((data: Trainee) => {
      this.trainee = data;
    });

  }
  goBackTo() {
    this.router.navigate(['/members']);
  }
}
