import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AdminGuard implements CanActivate {

    public constructor(private router: Router) { }

    public canActivate(): boolean {
        const isLoggedIn = localStorage.getItem("token");
        const userType = localStorage.getItem("userFirstName");

        if (isLoggedIn && userType == "admin") {
            return true;
        }

        this.router.navigateByUrl("/home");
        alert("Access Denied");
        return false;
    }

}
