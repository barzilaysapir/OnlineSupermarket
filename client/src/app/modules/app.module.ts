// MODULES
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

// PROVIDERS
import { AuthenticationInterceptor } from '../interceptors/AuthenticationInterceptor';

// COMPONENTS
import { LayoutComponent } from '../components/layout/layout.component';
import { HeaderComponent } from '../components/header/header.component';
import { HomeComponent } from '../components/home/home.component';
import { WelcomeComponent } from '../components/home/welcome/welcome.component';
import { LoginSignupComponent } from '../components/home/login-signup/login-signup.component';
import { MenuComponent } from '../components/menu/menu.component';
import { ProductsComponent } from '../components/products/products.component';
import { ProductCardComponent } from '../components/products/product-card/product-card.component';
import { ModalComponent } from '../components/modal/modal.component';
// customer
import { CustomersComponent } from '../components/customers/customers.component';
import { OrderComponent } from '../components/customers/order/order.component';
import { CartComponent } from '../components/customers/cart/cart.component';
// admin
import { AdminComponent } from '../components/admin/admin.component';
import { ManageProductsComponent } from '../components/admin/manage-products/manage-products.component';
import { CartItemComponent } from '../components/customers/cart/cart-item/cart-item.component';


@NgModule({

  declarations: [
    LayoutComponent,
    HeaderComponent,
    ProductsComponent,
    ProductCardComponent,
    CartComponent,
    LoginSignupComponent,
    WelcomeComponent,
    ManageProductsComponent,
    CustomersComponent,
    HomeComponent,
    MenuComponent,
    OrderComponent,
    AdminComponent,
    ModalComponent,
    CartItemComponent,
  ],

  imports: [
    BrowserModule,
    RoutingModule, RouterModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],

  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }],

  bootstrap: [LayoutComponent]
  
})

export class AppModule { }
