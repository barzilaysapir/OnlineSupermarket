// NG
import { Component, Input } from '@angular/core';
// MODELS
import { Product } from 'src/app/models/Product';
// SEVICES
import { StateService } from 'src/app/services/state.service';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})

export class CartItemComponent {
  @Input() item: Product;
  @Input() searchInput: string;

  constructor(
    public stateService: StateService,
    private productsService: ProductsService,
    private cartsService: CartsService
  ) { }

  public removeFromCart(): void {
    let observable = this.cartsService.removeFromCart(this.item);

    observable.subscribe(() => {
      let indexToRemove = this.cartsService.cartItems.indexOf(this.item);

      this.cartsService.total -= this.item.price;
      this.cartsService.cartItems.splice(indexToRemove, 1);
      this.productsService.products.find(product => product.id == this.item.id && (product.amount = 0));

    }, serverErrorResponse => alert(serverErrorResponse.error.error));
  }

  public highlightSearchResults(): string {
    let searchInCartResults = this.cartsService.searchInCartResults;
    let inputIsntEmpty = this.searchInput != '';

    if (searchInCartResults.includes(this.item.name) && inputIsntEmpty) {
      return 'highlighted';
    }
  }

}
