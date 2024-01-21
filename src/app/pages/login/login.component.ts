import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginForm } from '../../types/Auth';
import { AuthService } from '../../services/auth.service';
// import { PermissionsService } from '../../auth-guard.guard';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: LoginForm = {
    email: '',
    password: '',
  };

  authService = inject(AuthService);
  // _PermissionsService = inject(PermissionsService);
  router = inject(Router);

  handleSubmitForm() {
    if (!this.user.email || !this.user.password)
      return alert('Please fill email and password');
    this.authService.login(this.user).subscribe((res) => {
      if (
        Array.isArray(res) &&
        res.find((user: any) => user.email === this.user.email)
      ) {
        sessionStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['/admin']);
      } else {
        alert('Email or password is incorrect');
      }
    });
  }
}
