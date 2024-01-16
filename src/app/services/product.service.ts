import { Injectable, inject } from '@angular/core'; // inject
import { HttpClient } from '@angular/common/http'; // HttpClient
import { Product, ProductAdmin } from '../types/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // call api
  apiUrl = 'https://65a66d9474cf4207b4f00059.mockapi.io/products';
  apiAdminUrl = 'https://65a66d9474cf4207b4f00059.mockapi.io/products'; // khai bao apiUrl

  http = inject(HttpClient); // inject bien http
  constructor() {}

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl); //axios.get(apiUrl)
  }

  addProduct(product: ProductAdmin): Observable<ProductAdmin> {
    return this.http.post<ProductAdmin>(this.apiAdminUrl, product);
  }

  editProduct(product: ProductAdmin): Observable<ProductAdmin> {
    return this.http.put<ProductAdmin>(
      `${this.apiAdminUrl}/${product.id}`,
      product
    );
  }

  deleteProduct(id: number): Observable<ProductAdmin> {
    return this.http.delete<ProductAdmin>(`${this.apiAdminUrl}/${id}`);
  }

  getProduct(id: number): Observable<ProductAdmin> {
    return this.http.get<ProductAdmin>(`${this.apiAdminUrl}/${id}`);
  }

  getProductListAdmin(): Observable<ProductAdmin[]> {
    return this.http.get<ProductAdmin[]>(this.apiAdminUrl); //axios.get(apiUrl)
  }
}
