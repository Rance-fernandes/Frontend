import { Component, EventEmitter, Output } from '@angular/core';
import { JobService } from '../../../core/services/job.service';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailComponent } from '../../jobs/job-detail/job-detail.component';
import { HrService } from '../../../core/services/hr.service';
@Component({
  selector: 'app-hr-portal',
  templateUrl: './hr-portal.component.html',
  styleUrl: './hr-portal.component.scss'
})
export class HrPortalComponent {
  jobs: any[] = [];
  filteredJobs: any[] = []; // This will hold the filtered jobs
  appliedJobs: any[] = []; // This will hold the applied jobs
  searchKeyword: string = '';
  jobTypeFilter: string = '';
  experienceFilter: string = '';
  username: string = 'currentUsername'; // Replace with actual username logic

  constructor(private jobService: JobService, private dialog: MatDialog,private HrService: HrService) {}

  @Output() appliedJobsChange = new EventEmitter<any[]>();

  ngOnInit(): void {
    this.fetchJobs(); // Initial fetch of jobs

    // Subscribe to jobCreated$ to refresh the job list when a new job is created
    this.HrService.jobCreated$.subscribe(() => {
      this.fetchJobs(); // Fetch jobs again to get the updated list
    });
  }

  fetchJobs(): void {
    this.jobService.getJobs().subscribe(
      (data) => {
        console.log('Fetched jobs:', data);

        this.jobs = data;
        this.filteredJobs = this.jobs; // Initialize filtered jobs with all jobs
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  searchJobs(): void {
    this.filteredJobs = this.jobs.filter((job) => {
      // Check if job title matches search keyword
      const matchesKeyword = this.searchKeyword
        ? job.jobTitle.toLowerCase().includes(this.searchKeyword.toLowerCase())
        : true;

      // Check if job type matches filter (if provided)
      const matchesJobType = this.jobTypeFilter
        ? job.jobType === this.jobTypeFilter
        : true;

      // Check if experience level matches filter (if provided)
      const matchesExperience = this.experienceFilter
        ? job.experienceLevel === this.experienceFilter
        : true;

      // Return true only if all conditions are met
      return matchesKeyword && matchesJobType && matchesExperience;
    });
  }
  applyJob(job: any): void {
    const email = localStorage.getItem('email');
    if (!email) {
      alert('Please log in to apply for this job.');
      return;
    }

    this.jobService.applyToJob(email, job._id).subscribe(
      (response) => {
        console.log('job application applied sucessfully', response);
        alert(`You have successfully applied for the job: ${job.jobTitle}`);
      },
      (error) => {
        console.error('Error applying for job:', error);
        alert('Job already Applied');
      }
    );
  }

  
  // Modify the job card click event
  openJobDetail(job: any): void {
    const dialogRef = this.dialog.open(JobDetailComponent, {
      data: { jobId: job._id }, // Pass the jobId to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed');
    });
}
}
