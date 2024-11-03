import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HrService } from '../../../core/services/hr.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobService } from '../../../core/services/job.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss'],
})
export class EditJobComponent {
  editJobForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditJobComponent>,
    private jobService: JobService,
    private HrService: HrService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any // Injected data for editing
  ) {
    // Initialize the form with the job data from dialog input
    this.editJobForm = this.fb.group({
      jobTitle: [data.jobTitle, Validators.required],
      jobType: [data.jobType, Validators.required],
      company: [data.company, Validators.required],
      location: [data.location, Validators.required],
      experienceLevel: [data.experienceLevel],
      qualifications: [data.qualifications],
      description: [data.description],
    });
  }

  ngOnInit(): void {}
  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }

  onSubmit(): void {
    if (this.editJobForm.valid) {
      const updatedJob = { ...this.data, ...this.editJobForm.value }; // Merge form data with existing data

      this.HrService.updateJob(updatedJob).subscribe(
        (response) => {
          this.dialogRef.close(updatedJob); // Close dialog and return updated job data

          this.HrService.notifyJobCreated(); // Notify that a job has been created
          this.dialogRef.close();
          this.openSnackBar('Job updated successfully!', 'Close'); // Display success message

        },
        (error) => {
          console.error('Error updating job:', error);
          this.openSnackBar('Failed to update job. Please try again.', 'Close'); // Display error message
        }
      );
    }
  }
  
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000, // Show for 3 seconds
    });
  }
}
