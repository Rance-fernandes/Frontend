import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HrService } from '../../../core/services/hr.service';
import { Router } from '@angular/router'; // Import Router for navigation
import { JobService } from '../../../core/services/job.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss'],
})
export class PostJobComponent {
  jobForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private HrService: HrService,
    private jobSercice: JobService,
    private dialogRef: MatDialogRef<PostJobComponent>,
    private router: Router // Inject Router
  ) {
    // Define the job form with necessary fields
    this.jobForm = this.fb.group({
      jobTitle: ['', Validators.required],
      jobType: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      description: [''],
      experienceLevel: [''],
      qualifications: [''],
    });
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without data on cancel
  }

  onSubmit() {
    if (this.jobForm.valid) {
      const jobData = {
        ...this.jobForm.value,
        jobId: 'JID' + Math.floor(Math.random() * 10000),
      };

      console.log(jobData);

      this.HrService.createJob(jobData).subscribe(
        (response) => {
          console.log('Job created successfully:', response);
          this.dialogRef.close(); // Close the dialog after successful creation
          this.HrService.notifyJobCreated(); // Notify that a job has been created
          this.dialogRef.close(); // Close the dialog after successful creation

        },
        (error) => {
          console.error('Error creating job:', error);
        }
      );
    }
  }
}
