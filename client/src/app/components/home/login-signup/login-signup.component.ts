// NG
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// MODELS
import { Cart } from 'src/app/models/Cart';
// SERVICES
import { StateService } from 'src/app/services/state.service';
import { UsersService } from 'src/app/services/users.service';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})

export class LoginSignupComponent implements OnInit {

  public loginFormGroup: FormGroup;
  public idFormControl: FormControl;
  public emailFormControl: FormControl;
  public passwordFormControl: FormControl;
  public confirmPasswordFormControl: FormControl;

  public state: string;
  public errorMsg: string;

  constructor(
    public stateService: StateService,
    public cartsService: CartsService,
    public usersService: UsersService,
    private router: Router
  ) {
    this.state = 'login';
    this.errorMsg = '';
  }

  ngOnInit(): void {
    // Not logged in
    if (!this.stateService.isLoggedIn) {
      // Auto reconnect
      if (localStorage.getItem("userId")) {
        let userId = +JSON.parse(localStorage.getItem("userId"));
        this.login(userId);
      
      } else {
        return;
      }
    }

    // Admin logged in
    if (localStorage.getItem('userFirstName') == 'admin') {
      this.router.navigate(["/admin"]);
    }

    // Customer logged in
    else {
      this.stateService.showSuccessCover = true;

      // Reset after order completed
      if (this.stateService.isOrderCompleted) {
        this.stateService.isOrderCompleted = false;
        this.getCart();
      }
    }
  }

  // PUBLICS
  public onSubmit(): void {
    this.state == 'login' ? this.login() : this.signupValidations();
  }

  public signupValidations(): void {
    let observable = this.usersService.signupValidations(this.usersService.userDetails);

    observable.subscribe(() => {
      this.errorMsg = '';
      this.stateService.showSuccessCover = true;

      // Hide success cover
      setTimeout(() => {
        this.usersService.firstStepRegisterCompleted = true;
        this.stateService.showSuccessCover = false;
      }, 700)

    }, serverErrorResponse => this.errorMsg = serverErrorResponse.error.error);
  }

  public signup(): void {
    let observable = this.usersService.addUser(this.usersService.userDetails);

    observable.subscribe(() => this.login(),
      serverErrorResponse => alert(serverErrorResponse.error.error));
  }

  public switchState(): void {
    this.state == 'login' ? this.state = 'signup' : this.state = 'login';

    // Back to login from registration 2nd step
    if (this.usersService.firstStepRegisterCompleted == true) {
      this.usersService.firstStepRegisterCompleted = false;
    }
  }

  // PRIVATES
  private login(userId?: number): void {
    let observable = this.usersService.login(this.usersService.userDetails, userId);

    observable.subscribe(successfulServerRequestData => {
      this.errorMsg = '';
      localStorage.setItem("token", "Bearer " + successfulServerRequestData.token);
      
      if (successfulServerRequestData.userType == "CUSTOMER") {

        localStorage.setItem("userFirstName", successfulServerRequestData.userDetails.firstName);
        localStorage.setItem("userId", JSON.stringify(successfulServerRequestData.userDetails.id));  

        this.stateService.showSuccessCover = true;
        this.stateService.isLoggedIn = true;
        this.getCart();

      } else {
        localStorage.setItem("userFirstName", 'admin');
        this.router.navigate(["/admin"]);
      }

      this.usersService.userFirstName = localStorage.getItem('userFirstName');

    }, serverErrorResponse => this.errorMsg = serverErrorResponse.error.error);
  }

  private getCart(): void {
    let observable = this.cartsService.getCart();

    observable.subscribe(cart => {
      cart ? this.cartsService.cart = cart : this.cartsService.cart = new Cart();

    }, serverErrorResponse => {
      alert(serverErrorResponse.error.error);
    });
  }
}
