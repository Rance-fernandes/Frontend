import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { MyAppliedJobsComponent } from './my-applied-jobs/my-applied-jobs.component';

const routes: Routes = [
  { path: '', component: JobListComponent },  // Default route for jobs
  { path: 'applied-jobs', component: MyAppliedJobsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
