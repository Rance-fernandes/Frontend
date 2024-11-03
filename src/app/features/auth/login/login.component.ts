import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const role = localStorage.getItem('userRole');

    const userData = { email: this.email, password: this.password };

    if (role == 'Jobseeker') {
      this.authService.login(userData).subscribe(
        (response: any) => {
          this.authService.saveToken(response.token);
          this.authService.saveEmail(this.email);
          alert('Logged in as employee successfully');
          this.router.navigate(['/jobs']);
        },
        (error) => {
          console.error('Login error', error);
          alert('Invalid credentials');
        }
      );
    } else if (role == 'HR') {
      this.authService.loginHr(userData).subscribe(
        (response: any) => {
          this.authService.saveToken(response.token);
          this.authService.saveEmail(this.email);
          alert('Logged in as HR successfully');

          this.router.navigate(['/hr']);
        },
        (error) => {
          console.error('Login error', error);
          alert('Invalid credentials');
        }
      );
    } else {
      alert('wrong user');
    }
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
