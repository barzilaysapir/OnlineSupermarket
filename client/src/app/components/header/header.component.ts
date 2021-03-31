// NG
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// SERVICES
import { CartsService } from 'src/app/services/carts.service';
import { StateService } from 'src/app/services/state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(
    public usersService: UsersService,
    private stateService: StateService,
    private cartsService: CartsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usersService.userFirstName = localStorage.getItem('userFirstName');
  }

  public logout(): void {
    let token = localStorage.getItem('token');    

    let observable = this.usersService.logout(token);
    observable.subscribe(() => {

      // Reset all states & clear all data 
      this.cartsService.cart = {};
      this.cartsService.cartItems = [];
      this.cartsService.total = 0;

      this.stateService.showSuccessCover = false;
      this.stateService.isLoggedIn = false;
      this.stateService.isOrdering = false;

      this.usersService.userFirstName = '';
      this.usersService.userDetails = {};
      this.usersService.firstStepRegisterCompleted = false;

      localStorage.clear();
      this.router.navigate(["/home"]);
    },

      serverErrorResponse => alert(serverErrorResponse.error.error));
  }

}
