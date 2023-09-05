import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
// import { Observable } from 'rxjs/dist/types/internal/Observable';
import { Trainee } from '../trainee';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs/dist/types/internal/Observable';
// import { Observable } from 'rxjs/dist/types/internal/Observable';
// import { Observable } from 'rxjs/dist/types/internal/Observable';
// import { Observable } from 'rxjs/dist/types/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/trainee';

  constructor(private http: HttpClient, private router:Router) { }

  public isLoggedIn: boolean = false;

  saveTrainee(trainee: any): Observable<any> {
    const url = `${this.apiUrl}/save`;
    return this.http.post(url, trainee);
  }

  login(emailId: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const body = { emailId, password };
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn',JSON.stringify(this.isLoggedIn));
    return this.http.post(url, body);
  }

  isLoggedInUser() {
    return this.isLoggedIn;
  }

  getAllTrainees(): Observable<Trainee[]> {
    return this.http.get<Trainee[]>(`${this.apiUrl}/getall`);
  }

  getTrainee(id: number): Observable<Trainee> {
    return this.http.get<Trainee>(`${this.apiUrl}/get?id=${id}`);
  }

  deleteTraineee(id: number): Observable<object> {
    return this.http.delete<Trainee>(`${this.apiUrl}/delete?id=${id}`)
  }

  updateTrainee(id: number, trainee: Trainee): Observable<object> {
    return this.http.put<Trainee>(`${this.apiUrl}/update?id=${id}`, trainee);
  }

  logOut() {
    this.isLoggedIn = false;
    localStorage.clear();
    console.log("Logged Out");
    window.alert("Logging out!")
    this.router.navigate(['/home']);
  }
}
