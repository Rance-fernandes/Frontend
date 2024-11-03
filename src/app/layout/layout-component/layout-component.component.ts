import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-component',
  templateUrl: './layout-component.component.html',
  styleUrl: './layout-component.component.scss'
})
export class LayoutComponentComponent {
  isHrUser: boolean = false;

  ngOnInit(): void {
    // Retrieve the user role from localStorage
    const userRole = localStorage.getItem('userRole');
    
    // Set the isHrUser flag based on the retrieved role
    this.isHrUser = userRole === 'HR';
  }
}
