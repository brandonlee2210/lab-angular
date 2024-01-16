import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { EditProductsComponent } from './pages/admin/edit-products/edit-products.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { AdminComponent } from './layouts/admin/admin.component';
export const routes: Routes = [
  // route '/' = page Home
  // path, component
  { path: '', component: HomeComponent },
  // { path: 'admin', component: ProductsComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      {
        path: 'products/edit/:id',
        component: EditProductsComponent,
        data: { isEdit: true },
      },
      { path: 'products/add', component: AddProductComponent },
    ], // data: {isEdit: true} => truyen tham so
  },
];
