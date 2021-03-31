import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// MODELS
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  public products: Product[];
  public currentProduct: Product;

  constructor(private http: HttpClient) {
    this.currentProduct = new Product();
  }

  searchProduct(searchInput: string): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:3001/products/search/" + searchInput);
  }

  updateProduct(): Observable<any> {
    return this.http.put("http://localhost:3001/products/", this.currentProduct);
  }

  addProduct(): Observable<any> {
    return this.http.post("http://localhost:3001/products/", this.currentProduct);
  }

}
