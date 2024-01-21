import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginForm, LoginFormResponse } from '../types/Auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  constructor() {}

  login(user: LoginForm) {
    return this.http.get('https://65a676a074cf4207b4f01a69.mockapi.io/Auth');
  }

  signup(user: LoginForm) {
    return this.http.post('https://65a676a074cf4207b4f01a69.mockapi.io/Auth', {
      ...user,
    });
  }

  getAllUsers() {
    return;
  }
}
