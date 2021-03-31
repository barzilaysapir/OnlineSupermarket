// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from '../components/home/home.component';
import { ProductsComponent } from '../components/products/products.component';
import { AdminComponent } from '../components/admin/admin.component';
import { CustomersComponent } from '../components/customers/customers.component';
import { OrderComponent } from '../components/customers/order/order.component';

// Guards
import { AdminGuard } from '../guards/admin.guard';
import { CustomerGuard } from '../guards/customer.guard';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "admin", canActivate: [AdminGuard], component: AdminComponent },

  {
    path: "customers", canActivate: [CustomerGuard], component: CustomersComponent, children: [
      { path: "products", component: ProductsComponent },
      { path: "order", component: OrderComponent },
      { path: "", redirectTo: "products", pathMatch: "full" },
    ]
  },

  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "*", component: HomeComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }
