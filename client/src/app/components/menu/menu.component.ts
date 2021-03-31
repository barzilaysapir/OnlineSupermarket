// NG
import { Component, OnInit } from '@angular/core';
// MODELS
import { Category } from 'src/app/models/Category';
// SERVICES
import { StateService } from 'src/app/services/state.service';
import { ProductsService } from 'src/app/services/products.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  public categories: string[];

  constructor(
    private stateService: StateService,
    public productsService: ProductsService,
    public categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    let observable = this.categoriesService.getAllCategories();

    observable.subscribe(allCategories => {
      this.categoriesService.allCategories = allCategories;
      this.navigate(allCategories[0]);
    },
      serverErrorResponse => alert(serverErrorResponse.error.error));

  }

  public navigate(category: Category): void {
    this.stateService.activeCategory = category;
    this.getProducts(category.id);

    // If searching mode was on - set it off
    this.stateService.isSearching && (this.stateService.isSearching = false);
  }

  public getProducts(categoryId: number): void {
    let observable = this.categoriesService.getProductsByCategory(categoryId);

    observable.subscribe(productsList => this.productsService.products = productsList
      , serverErrorResponse => alert(serverErrorResponse.error.error));
  }

  public setClass(category: { id: number, name: string }): {} {
    let classes = {
      active: this.stateService.activeCategory == category && !this.stateService.isSearching,
      navlink: true
    }
    return classes;
  }

}
