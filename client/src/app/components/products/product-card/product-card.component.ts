// NG
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// MODELS
import { Product } from 'src/app/models/Product';
// SERVICES
import { StateService } from 'src/app/services/state.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {

  @Input() product: Product;

  @Output() cardEvent = new EventEmitter<Product>();
  showModal(product: Product) {
    this.cardEvent.emit(product);
  }

  constructor(
    public stateService: StateService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.stateService.path = location.pathname.split('/')[1];
  }

  public editProduct(): void {
    this.stateService.manageState = 'editingProduct';
    this.stateService.isAsidePanelOpen = true;
    this.productsService.currentProduct = { ...this.product };
  }

}
