import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrPortalComponent } from './hr-portal/hr-portal.component';
import { PostJobComponent } from './post-job/post-job.component';

const routes: Routes = [
  { path: '', component: HrPortalComponent },
  { path: 'createjob', component: PostJobComponent }, // Default route for jobs

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HrRoutingModule {}
