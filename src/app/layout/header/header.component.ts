import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showCreateJobButton: boolean = false;
  showJobButton: boolean = false;
  isHrRoute: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Subscribing to router events to detect route changes
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const currentRoute = this.router.url;

        // Show the Create Job button only on the /hr route
        this.showCreateJobButton = currentRoute === '/hr';

        // Show the Job button only on the /jobs/applied-jobs route
        this.showJobButton = currentRoute === '/jobs/applied-jobs';

        // Check if the route includes '/hr' to toggle isHrRoute
        this.isHrRoute = event.urlAfterRedirects.includes('/hr');
      });
  }

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
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

  createJob() {
    // Navigate to the create job page
    this.router.navigate(['/jobs/create']);
  }
}
