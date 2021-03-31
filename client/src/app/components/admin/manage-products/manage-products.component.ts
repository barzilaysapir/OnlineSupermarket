// NG
import { Component } from '@angular/core';
// MODELS
import { Product } from 'src/app/models/Product';
// SERVICES
import { StateService } from 'src/app/services/state.service';
import { ProductsService } from 'src/app/services/products.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})

export class ManageProductsComponent {
  public errorMsg: string;

  constructor(
    public stateService: StateService,
    public productsService: ProductsService,
    public categoriesService: CategoriesService
  ) {
    this.errorMsg = '';
  }

  // PUBLICS
  public closeManageForm(): void {
    this.stateService.isAsidePanelOpen = false;
    this.stateService.manageState = 'none';

    this.productsService.currentProduct = new Product();
  }

  public onSubmitForm(): void {
    this.stateService.manageState == 'editingProduct'
      ? this.updateProduct(this.productsService.currentProduct)
      : this.addNewProduct();
  }

  // PRIVATES
  private updateProduct(updatedProduct: Product): void {
    let observable = this.productsService.updateProduct();
    observable.subscribe(() => {

      // Update UI
      this.productsService.products.find((product, index) => {
        if (product.id == updatedProduct.id) {

          if (product.categoryId == updatedProduct.categoryId) {
            this.productsService.products.splice(index, 1, updatedProduct);
          } else {
            this.productsService.products.splice(index, 1);
          }
        }
      });

      // Resets
      this.errorMsg = '';
      this.handleSuccessCover();

    },
      serverErrorResponse => this.errorMsg = serverErrorResponse.error.error);
  }

  private addNewProduct(): void {
    let observable = this.productsService.addProduct();
    observable.subscribe(newProduct => {

      // Update UI if needed
      if (newProduct.categoryId == this.stateService.activeCategory.id) {
        this.productsService.products.push(newProduct)
      }

      // Resets
      this.errorMsg = '';
      this.handleSuccessCover();

    },
      serverErrorResponse => this.errorMsg = serverErrorResponse.error.error);
  }

  private handleSuccessCover(): void {
    this.stateService.showSuccessCover = true;

    setTimeout(() => {
      this.stateService.showSuccessCover = false;
      this.closeManageForm();
    }, 700);
  }

}
