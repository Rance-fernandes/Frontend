import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { JobService } from '../../../core/services/job.service';
import { JobDetailComponent } from '../job-detail/job-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit {
  jobs: any[] = [];
  filteredJobs: any[] = [];
  appliedJobs: any[] = [];
  searchKeyword: string = '';
  jobTypeFilter: string = '';
  experienceFilter: string = '';
  username: string = 'currentUsername';
  
  // Pagination properties
  pageSize = 5; // Number of items per page
  pageIndex = 0;

  @Output() appliedJobsChange = new EventEmitter<any[]>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private jobService: JobService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.jobService.getJobs().subscribe(
      (data) => {
        console.log('Fetched jobs:', data);
        this.jobs = data;
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  applyFilters(): void {
    this.filteredJobs = this.jobs.filter((job) => {
      const matchesKeyword = this.searchKeyword
        ? job.jobTitle.toLowerCase().includes(this.searchKeyword.toLowerCase())
        : true;
      const matchesJobType = this.jobTypeFilter
        ? job.jobType === this.jobTypeFilter
        : true;
      const matchesExperience = this.experienceFilter
        ? job.experienceLevel === this.experienceFilter
        : true;

      return matchesKeyword && matchesJobType && matchesExperience;
    });
    this.paginator.firstPage(); // Reset to the first page after applying filters
  }

  searchJobs(): void {
    this.applyFilters();
  }

  applyJob(job: any): void {
    const email = localStorage.getItem('email');
    if (!email) {
      alert('Please log in to apply for this job.');
      return;
    }

    this.jobService.applyToJob(email, job._id).subscribe(
      (response) => {
        console.log('Job application successful', response);
        alert(`You have successfully applied for the job: ${job.jobTitle}`);
      },
      (error) => {
        console.error('Error applying for job:', error);
        alert('Job already Applied');
      }
    );
  }

  openJobDetail(job: any): void {
    const dialogRef = this.dialog.open(JobDetailComponent, {
      data: { jobId: job._id },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialog closed');
    });
  }

  // Pagination change event
  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
