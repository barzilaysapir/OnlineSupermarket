// NG
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
// MODELS
import { OrderDetails } from 'src/app/models/OrderDetails';
// SERVICES
import { StateService } from 'src/app/services/state.service';
import { CartsService } from 'src/app/services/carts.service';
import { UsersService } from 'src/app/services/users.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})

export class OrderComponent implements OnInit {

  public orderDetails: OrderDetails;
  public currentDate: Date;
  public datesToDisableArray: Date[];
  public userAddress: { city: string, street: string };

  /* ==================
     FORM GROUP */
  public orderFormGroup: FormGroup;
  public city: FormControl;
  public street: FormControl;
  public shippingDate: FormControl;
  public creditCard: FormControl;
  /* ================== */

  constructor(
    public stateService: StateService,
    public usersService: UsersService,
    private cartsService: CartsService,
    private ordersService: OrdersService,
  ) {

    this.orderDetails = new OrderDetails();
    this.orderDetails.city = this.usersService.userDetails.city;
    this.datesToDisableArray = [];
    this.currentDate = new Date();
  }

  ngOnInit(): void {
    this.city = new FormControl(this.orderDetails.city, Validators.required);
    this.street = new FormControl("", Validators.required);
    this.shippingDate = new FormControl("", Validators.required);
    this.creditCard = new FormControl("", [Validators.required, Validators.pattern("^[0-9]{4}$")]);

    this.orderFormGroup = new FormGroup({
      city: this.city,
      street: this.street,
      shippingDate: this.shippingDate,
      creditCard: this.creditCard
    })

    this.getOrdersShipDates();
    this.getUserAddress();
  }

  public order(): void {
    this.orderDetails.finalPrice = this.cartsService.total;
    this.orderDetails.orderDate = new Date();

    /* ==================
       FORM GROUP */
    this.orderDetails.city = this.city.value;
    this.orderDetails.street = this.street.value;
    this.orderDetails.shippingDate = this.shippingDate.value;
    this.orderDetails.creditCard = this.creditCard.value;
    /* ================== */

    let observable = this.ordersService.order(this.orderDetails);

    observable.subscribe(() => {
      this.stateService.isOrderCompleted = true;
    }
      , serverErrorResponse => {
        alert(serverErrorResponse.error.error);
      });

  }

  public getUserAddress(): void {
    let observable = this.usersService.getUserAddress();

    observable.subscribe(userAddress => {
      this.userAddress = userAddress;
      this.city.patchValue(userAddress.city);

    }, serverErrorResponse => alert(serverErrorResponse.error.error));

  }

  public getOrdersShipDates(): void {
    let observable = this.ordersService.getOrdersShipDates();

    observable.subscribe(datesToDisable => {
      datesToDisable.map(date => this.datesToDisableArray.push(new Date(date.shipDate)));

    }, serverErrorResponse => alert(serverErrorResponse.error.error));

  }

  /* =============================
      DATEPICKER DISABLE BUSY DAYS
    ============================= */
  public busyDatesFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getTime();

    return !this.datesToDisableArray.find(date => date.getTime() == day + 7200000);
  }

  public busyDatesStyle: MatCalendarCellClassFunction<Date> = (cellDate, view): string => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const day = cellDate.getTime();

      // Mark busy dates in gray.
      return (this.datesToDisableArray.find(date => date.getTime() == day + 7200000)) ? 'diabled-days' : '';
    }

    return '';
  }

}
