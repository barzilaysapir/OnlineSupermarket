import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// MODELS
import { Category } from '../models/Category';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
  public allCategories: Category[];
  
  constructor(private http: HttpClient) { 
    this.allCategories = [];
  }
  
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>("http://localhost:3001/categories");
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:3001/categories/" + categoryId);
  }

}
