// NG
import { Component, OnInit } from '@angular/core';
// MODELS
import { Product } from 'src/app/models/Product';
// SERVICES
import { StateService } from 'src/app/services/state.service';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  public isShowModal: boolean;
  public product: Product;
  public searchInput: string;

  constructor(
    public productsService: ProductsService,
    public stateService: StateService,
    private cartsService: CartsService
  ) {
    this.isShowModal = false;
    this.searchInput = '';
  }

  ngOnInit(): void {
    this.stateService.path = location.pathname.split('/')[1];
  }

  public showModal(product: Product): void {
    this.product = product;
    this.stateService.isShowModal = true;
  }

  public closeModal(): void {
    this.stateService.isShowModal = false;
  }

  public addToCart(product: Product): void {
    let observable = this.cartsService.addToCart(product);

    observable.subscribe(cartItem => {
      this.cartsService.total += product.price * product.amount;
      this.cartsService.cartItems.push(cartItem);

      this.closeModal();
    }
      , serverErrorResponse => alert(serverErrorResponse.error.error));

  }

  public updateOnCart(product: Product): void {
    let observable = this.cartsService.updateOnCart(product);

    observable.subscribe(updatedProduct => {
      this.cartsService.total = 0;

      this.cartsService.cartItems.find((item, index) => (
        item.id == product.id &&
        (this.cartsService.cartItems.splice(index, 1, updatedProduct))
      ));

      this.cartsService.cartItems.map(item => this.cartsService.total += item.price);

      this.closeModal();
    }
      , serverErrorResponse => alert(serverErrorResponse.error.error));

  }

  public removeFromCart(productToRemove: Product): void {
    let observable = this.cartsService.removeFromCart(productToRemove);

    observable.subscribe(() => {
      this.closeModal();

      let indexToRemove = this.cartsService.cartItems.indexOf(productToRemove);
      this.cartsService.total -= productToRemove.price;
      this.cartsService.cartItems.splice(indexToRemove, 1);
    }
      , serverErrorResponse => alert(serverErrorResponse.error.error));

  }

  public searchProduct(): void {
    if (this.searchInput == '') {
      return;
    }

    let observable = this.productsService.searchProduct(this.searchInput);
    observable.subscribe(products => {
      this.productsService.products = products;
      this.searchInput = '';
      this.stateService.isSearching = true;

    }, serverErrorResponse => alert(serverErrorResponse.error.error));

  }

  public openAddProductPanel(): void {
    this.stateService.manageState = 'addingNewProduct';
    this.stateService.isAsidePanelOpen = true;
  }
}

