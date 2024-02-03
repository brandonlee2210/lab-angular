import { Injectable, inject } from '@angular/core'; // inject
import { HttpClient } from '@angular/common/http'; // HttpClient
import { User, UserAdmin } from '../types/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // call api
  apiUrl = 'https://65a676a074cf4207b4f01a69.mockapi.io/Auth';
  apiAdminUrl = 'https://65a676a074cf4207b4f01a69.mockapi.io/Auth'; // khai bao apiUrl

  http = inject(HttpClient); // inject bien http
  constructor() {}

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl); //axios.get(apiUrl)
  }

  addUser(user: UserAdmin): Observable<UserAdmin> {
    return this.http.post<UserAdmin>(this.apiAdminUrl, user);
  }

  editUser(user: UserAdmin): Observable<UserAdmin> {
    return this.http.put<UserAdmin>(`${this.apiAdminUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<UserAdmin> {
    return this.http.delete<UserAdmin>(`${this.apiAdminUrl}/${id}`);
  }

  getUser(id: number): Observable<UserAdmin> {
    return this.http.get<UserAdmin>(`${this.apiAdminUrl}/${id}`);
  }

  getUserListAdmin(): Observable<UserAdmin[]> {
    return this.http.get<UserAdmin[]>(this.apiAdminUrl); //axios.get(apiUrl)
  }
}
