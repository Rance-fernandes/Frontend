import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PostJobComponent } from '../../features/hr/post-job/post-job.component';

@Component({
  selector: 'app-hr-header',
  templateUrl: './hr-header.component.html',
  styleUrl: './hr-header.component.scss'
})
export class HrHeaderComponent {

  constructor(private router: Router, private route: ActivatedRoute,private dialog: MatDialog) {}

  // createJob() {
  //   // Open the dialog with CreateJobComponent
  //   const dialogRef = this.dialog.open(PostJobComponent, {
  //     width: '500px', // You can adjust the width as needed
  //     data: {} // Pass any initial data if necessary
  //   });

  //   // Optionally handle after the dialog is closed
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       console.log('Job created:', result);
  //     }
  //   });
  // }

  createJob() {
    this.dialog.open(PostJobComponent);
  }
  
  logout() {
    // Clear the token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userRole');

    // Optional: Notify user of logout
    alert('You have been logged out successfully');

    // Navigate to the home page or login page
    this.router.navigate(['']);
  }
}
