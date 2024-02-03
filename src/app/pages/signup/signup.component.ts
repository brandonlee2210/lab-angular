import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginForm } from '../../types/Auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  user: LoginForm & {
    confirmPassword: string;
  } = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  authService = inject(AuthService);
  router = inject(Router);

  handleSubmitForm() {
    if (!this.user.email || !this.user.password || !this.user.confirmPassword)
      return alert('Please fill email, password and confirm password');
    this.authService.login(this.user).subscribe((res) => {
      if (
        Array.isArray(res) &&
        res.find((user: any) => user.email === this.user.email)
      ) {
        alert('Email already exists');
      } else {
        this.authService.signup(this.user).subscribe();
        alert('Signup success');
        window.location.href = '/login';
      }
    });
  }
}
