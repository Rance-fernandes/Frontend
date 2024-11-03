import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { MyAppliedJobsComponent } from './my-applied-jobs/my-applied-jobs.component';
import { JobsRoutingModule } from './jobs-routing.module';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [JobListComponent, MyAppliedJobsComponent, JobDetailComponent],
  imports: [
    CommonModule,
    JobsRoutingModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule, MatPaginatorModule
  ],
})
export class JobsModule {}
