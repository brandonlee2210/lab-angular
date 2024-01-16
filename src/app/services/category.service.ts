import { Injectable, inject } from '@angular/core'; // inject
import { HttpClient } from '@angular/common/http'; // HttpClient
import { Category, CategoryAdmin } from '../types/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // call api
  apiUrl = 'https://fakestoreapi.com/categories';
  apiAdminUrl = 'http://localhost:3000/categories'; // khai bao apiUrl

  http = inject(HttpClient); // inject bien http
  constructor() {}

  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl); //axios.get(apiUrl)
  }

  addCategory(category: CategoryAdmin): Observable<CategoryAdmin> {
    return this.http.post<CategoryAdmin>(this.apiAdminUrl, category);
  }

  editCategory(category: CategoryAdmin): Observable<CategoryAdmin> {
    return this.http.put<CategoryAdmin>(
      `${this.apiAdminUrl}/${category.id}`,
      category
    );
  }

  deleteCategory(id: number): Observable<CategoryAdmin> {
    return this.http.delete<CategoryAdmin>(`${this.apiAdminUrl}/${id}`);
  }

  getCategory(id: number): Observable<CategoryAdmin> {
    return this.http.get<CategoryAdmin>(`${this.apiAdminUrl}/${id}`);
  }

  getCategoryListAdmin(): Observable<CategoryAdmin[]> {
    return this.http.get<CategoryAdmin[]>(this.apiAdminUrl); //axios.get(apiUrl)
  }
}
