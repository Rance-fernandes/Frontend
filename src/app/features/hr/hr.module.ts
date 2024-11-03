import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrPortalComponent } from './hr-portal/hr-portal.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PostJobComponent } from './post-job/post-job.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditJobComponent } from './edit-job/edit-job.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [HrPortalComponent, PostJobComponent, EditJobComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    MatDialogModule,ReactiveFormsModule,MatPaginatorModule
  ],
})
export class HrModule {}
