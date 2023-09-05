import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor(private snack: MatSnackBar) { }

  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  btnClick() {
    console.log("btnClick");
    this.snack.open("Welcome to Sensei App!", "OK", { duration: 4000 })
  }

}
