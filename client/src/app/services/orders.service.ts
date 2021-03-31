import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// MODELS
import { OrderDetails } from '../models/OrderDetails';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  constructor(private http: HttpClient) { }
  
  public order(orderDetails: OrderDetails): Observable<void> {
    return this.http.post<void>("http://localhost:3001/orders/", orderDetails);
  }
  
  public getOrdersShipDates(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:3001/orders");
  }

}
