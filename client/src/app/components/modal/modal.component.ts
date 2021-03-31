// NG
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

// MODELS
import { Product } from 'src/app/models/Product';
import { OrderDetails } from 'src/app/models/OrderDetails';

// SERVICES
import { StateService } from 'src/app/services/state.service';
import { CartsService } from 'src/app/services/carts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {
  private originalAmount: number;
  public errorMsg: string;
  public receiptTrustedUrl: {};

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    public stateService: StateService,
    public usersService: UsersService,
    public cartsService: CartsService
  ) {
    this.errorMsg = '';
  }

  @Input() order: OrderDetails;
  @Input() product: Product;

  @Output() updateCartEvent = new EventEmitter();
  updateOnCart() {
    this.updateCartEvent.emit(this.product);
  }

  @Output() removeFromCartEvent = new EventEmitter();
  removeFromCart() {
    this.removeFromCartEvent.emit(this.product);
  }

  @Output() addToCartEvent = new EventEmitter();
  addToCart() {
    this.addToCartEvent.emit(this.product);
  }

  ngOnInit(): void {
    // Order modal
    if (this.stateService.isOrderCompleted) {
      this.createReceiptFile(this.cartsService.cartItems, this.order);

      // Update cart modal
    } else {
      this.originalAmount = this.product.amount;
    }
  }

  // PRODUCT MODAL


  public onUpdateCartClick(): void {
    //  Customer didn't changed the amount
    if (this.originalAmount == this.product.amount) {
      this.originalAmount == 0
        ? this.errorMsg = "Enter the amount you want to add."
        : this.stateService.isShowModal = false;
    }

    // Customer added new product
    else if (this.originalAmount == 0 && this.product.amount > 0) {
      this.addToCart();
    }

    // Customer removed a product form cart
    else if (this.product.amount == 0) {
      this.removeFromCart();
    }

    // Customer changed the amount of product
    else if (this.originalAmount != this.product.amount) {
      this.updateOnCart();
    }

    this.originalAmount = this.product.amount;
  }

  public closeWithoutUpdate(): void {
    this.product.amount = this.originalAmount;
    this.stateService.isShowModal = false
  }

  // RECEIPT MODAL

  public createReceiptFile(cartItems: Product[], orderDetails: OrderDetails): void {
    let receipt = `Thank you for buying SweeterMarket! 🍩\n` +
      `Here is your order from ${orderDetails.orderDate.toDateString()}: \n\n`;

    for (let item of cartItems) {
      receipt += `${item.name.toUpperCase()} ▪ Amount: ${item.amount} ▪ Price: ${item.price}₪ \n`;
    }

    receipt += `\n🍬 Total Price: ${orderDetails.finalPrice}₪ 🍬 \n\n\n` +
      `Your order will be shipped to ${orderDetails.street}, ${orderDetails.city} ` +
      `on ${orderDetails.shippingDate.toDateString()}.\n` +
      `HAVE A SWEET ONE, ${this.usersService.userFirstName.toUpperCase()} 🍭`;

    let data = new Blob([receipt], { type: 'text/plain' });

    let receiptFileUrl = URL.createObjectURL(data);
    this.receiptTrustedUrl = this.sanitizer.bypassSecurityTrustUrl(receiptFileUrl);
  };

  public backHome(): void {
    this.stateService.isOrdering = false;

    this.cartsService.total = 0;
    this.cartsService.cartItems = [];
    this.cartsService.cart = {};

    this.router.navigate(["/home"]);
  }

}
