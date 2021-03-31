// NG
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// MODELS
import { UserDetails } from 'src/app/models/UserDetails';
// SERVICES
import { StateService } from 'src/app/services/state.service';
import { UsersService } from 'src/app/services/users.service';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {
  public amountOfProducts: number;
  public amountOfOrders: number;

  constructor(
    public stateService: StateService,
    public cartsService: CartsService,
    public usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // On first landing - get market's state
    if (!this.amountOfOrders) {
      let observable = this.stateService.getMarketState();

      observable.subscribe(marketState => {
        marketState = marketState.map(item => Object.values(item)[0]);
        this.amountOfProducts = marketState[0];
        this.amountOfOrders = marketState[1];

      }, serverErrorResponse => alert(serverErrorResponse.error.error));
    }
  }

  public setCallToAction(): string {
    return !this.cartsService.cart?.id || this.cartsService.cart.status == 'close'
      ? 'Start Shopping' : 'Continue Shopping';
  }

  public onShoppingClick(): void {
    this.stateService.showSuccessCover = false;
    this.usersService.userDetails = new UserDetails();
    this.router.navigate(["/customers"]);
  }

}
