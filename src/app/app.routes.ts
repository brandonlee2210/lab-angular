import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { EditProductsComponent } from './pages/admin/edit-products/edit-products.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { canActivateTeam } from './auth-guard.guard';

const canActivate = () => {
  const token = sessionStorage.getItem('user');
  if (token) {
    return true;
  }
  return false;
};

export const routes: Routes = [
  // route '/' = page Home
  // path, component
  { path: '', component: HomeComponent },
  // { path: 'admin', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [canActivate],
    children: [
      { path: 'products', component: ProductsComponent },
      { path: '', component: ProductsComponent },
      {
        path: 'products/edit/:id',
        component: EditProductsComponent,
        data: { isEdit: true },
      },
      { path: 'products/add', component: AddProductComponent },
    ], // data: {isEdit: true} => truyen tham so
  },
];
