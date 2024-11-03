import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private router: Router) {}

  onSelectRole(role: string): void {
    localStorage.setItem('userRole', role); // Save role in local storage
    this.router.navigate(['/auth/login']); // Redirect to login page
  }

}
