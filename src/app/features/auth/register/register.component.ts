import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss',], // Corrected to use styleUrls
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const role = localStorage.getItem('userRole');
    const userData = { email: this.email, password: this.password };

    if (role === 'Jobseeker') {
      this.authService.register(userData).subscribe(
        (response: any) => {
          alert('Registration successful! Please log in.');
          this.router.navigate(['/login']);
        },
        (error: any) => {
          console.error('Registration error', error);
          alert('Registration failed: ' + (error.message || 'Unknown error'));
        }
      );
    } else if (role === 'HR') { // Corrected condition to check for 'HR'
      this.authService.registerHr(userData).subscribe(
        (response: any) => {
          alert('Registration successful! Please log in.');
          this.router.navigate(['/login']);
        },
        (error: any) => {
          console.error('Registration error', error);
          alert('Registration failed: ' + (error.message || 'Unknown error'));
        }
      );
    } else {
      alert('Invalid user role.');
    }
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
