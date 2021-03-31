import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// MODELS
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})

export class CartsService {
  public cart: Cart;
  public total: number;
  public cartItems: Product[];
  public searchInCartResults: string[];

  constructor(private http: HttpClient) {
    this.total = 0;
    this.cartItems = [];
    this.searchInCartResults = [];
  }

  // CART
  public getCart(): Observable<Cart> {
    return this.http.get<Cart>("http://localhost:3001/carts");
  }

  public createCart(currentDate: Date): Observable<Cart> {
    return this.http.post<Cart>("http://localhost:3001/carts", { currentDate });
  }

  // CART ITEMS
  public getCartItems(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:3001/carts/items");
  }

  public addToCart(purchasedProduct: Product): Observable<Product> {
    return this.http.post<Product>("http://localhost:3001/carts/items", purchasedProduct);
  }

  public updateOnCart(product: Product): Observable<Product> {
    return this.http.put<Product>("http://localhost:3001/carts/items", product);
  }

  public removeFromCart(product: Product): Observable<void> {
    return this.http.delete<void>("http://localhost:3001/carts/items/" + product.id);
  }

  public emptyCart(): Observable<void> {
    return this.http.delete<void>("http://localhost:3001/carts/items");
  }
  
}
