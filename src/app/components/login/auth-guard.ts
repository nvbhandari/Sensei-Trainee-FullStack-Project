import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn : 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        const isLoggedIn = localStorage.getItem('isLoggedIn'); // Get the value for Local Storage

        if (isLoggedIn === "true") {
            return true;
        } else {
            this.router.navigate(['/home']);
            return false;
        }

    }
}
