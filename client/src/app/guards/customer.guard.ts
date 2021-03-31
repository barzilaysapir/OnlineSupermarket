import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class CustomerGuard implements CanActivate {

    public constructor(private router: Router) { }

    public canActivate(): boolean {
        const isLoggedIn = localStorage.getItem("token");
        const userFirstName = localStorage.getItem("userFirstName");

        if (isLoggedIn && userFirstName !== "admin") {
            return true;
        }

        this.router.navigateByUrl("/home");
        alert("Access Denied");
        return false;
    }

}
