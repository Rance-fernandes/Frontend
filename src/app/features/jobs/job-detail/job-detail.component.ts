import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobService } from '../../../core/services/job.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditJobComponent } from '../../hr/edit-job/edit-job.component';
import { HrService } from '../../../core/services/hr.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent implements OnInit {
  @Input() job: any; // Pass the job data from the parent component
  isHrRoute: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<JobDetailComponent>,
    private jobService: JobService,
    private HrService: HrService,
    private _snackBar: MatSnackBar, // Inject Snackbar service
    @Inject(MAT_DIALOG_DATA) public data: { jobId: string },
    private router: Router, // Inject Router
    private dialog: MatDialog // Inject MatDialog for editing
  ) {}

  ngOnInit(): void {
    this.fetchJobDetails(this.data.jobId); // Fetch job details on initialization
    this.checkRoute(); // Check if current route is /hr
  }

  fetchJobDetails(jobId: string): void {
    this.jobService.getJobById(jobId).subscribe(
      (data) => {
        console.log(data);
        this.job = data; // Assign fetched job data

        // Optional: Show success message
        this.openSnackBar('Job details loaded successfully!', 'Close');
      },
      (error) => {
        console.error('Error fetching job details:', error);
        // Show error message
        this.openSnackBar(
          'Failed to load job details. Please try again.',
          'Close'
        );
      }
    );
  }

  checkRoute(): void {
    this.isHrRoute = this.router.url === '/hr'; // Check if the current route is /hr
    console.log(this.isHrRoute);
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000, // Snackbar will automatically close after 3 seconds
    });
  }

  applyJob(): void {
    // Logic to apply for the job
    alert(`Applied for job: ${this.job.jobTitle}`);
  }

  editJob(): void {
    // Close the current JobDetailComponent dialog
    this.dialogRef.close();

    // Open the EditJobComponent dialog
    const dialogRef = this.dialog.open(EditJobComponent, {
      width: '400px',
      data: { ...this.job },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.job = result; // Update local job data
        this.openSnackBar('Job details updated successfully!', 'Close');
      }
    });
  }

  confirmDelete(): void {
    // Confirm before deletion
    if (confirm('Are you sure you want to delete this job?')) {
      console.log(this.job);
      
      this.HrService.deleteJob(this.job._id).subscribe(
        () => {
          console.log('Deleted job:', this.job);
          this.HrService.notifyJobCreated(); // Notify that a job has been created
          this.openSnackBar('Job deleted successfully!', 'Close');
          this.dialogRef.close(); // Close the dialog after deletion
        },
        (error) => {
          console.error('Error deleting job:', error);
          this.openSnackBar('Error deleting job. Please try again.', 'Close');
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close(); // Close the dialog or the detail view
  }
}
