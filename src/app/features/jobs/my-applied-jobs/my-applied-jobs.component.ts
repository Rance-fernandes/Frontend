import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../core/services/job.service';

@Component({
  selector: 'app-my-applied-jobs',
  templateUrl: './my-applied-jobs.component.html',
  styleUrl: './my-applied-jobs.component.scss',
})
export class MyAppliedJobsComponent implements OnInit {
  appliedJobs: any[] = [];
  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadAppliedJobs();
  }

  loadAppliedJobs(): void {
    const email = localStorage.getItem('email'); // Retrieve the user email from localStorage
  
    if (email) {
      const encodedEmail = encodeURIComponent(email); // Encode the email only if it's not null
  
      this.jobService.getAppliedJobs(encodedEmail).subscribe(
        (jobs) => {
          this.appliedJobs = jobs; // Load applied jobs for the user
        },
        (error) => {
          console.error('Error loading applied jobs', error);
        }
      );
    } else {
      console.error('User email not found in localStorage');
    }
  }
  

  revokeApplication(job: any): void {
    const email = localStorage.getItem('email');
    if (email) {

      const encodedEmail = encodeURIComponent(email); 

      this.jobService.revokeApplication(job._id, encodedEmail).subscribe(
        () => {
          this.appliedJobs = this.appliedJobs.filter(
            
            (appliedJob) => appliedJob._id !== job._id
          );
          alert(`Revoked application for: ${job.jobTitle}`);
        },
        (error) => {
          console.error('Error revoking application', error);
          alert('Failed to revoke application');
        }
      );
    } else {
      console.error('User email not found in localStorage');
    }
  }

}
