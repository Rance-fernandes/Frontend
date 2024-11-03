import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponentComponent } from '../app/layout/layout-component/layout-component.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthGuard } from '../app/core/authGuard/auth.guard'; // Import the AuthGuard
import { HrPortalComponent } from './features/hr/hr-portal/hr-portal.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: '',
    component: LayoutComponentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'jobs',
        loadChildren: () =>
          import('../app/features/jobs/jobs.module').then((m) => m.JobsModule),
        canActivate: [AuthGuard], // Protect jobs module with AuthGuard
      },
      {
        path: 'hr',
        loadChildren: () =>
          import('../app/features/hr/hr-routing.module').then((m) => m.HrRoutingModule),
        canActivate: [AuthGuard],
      },
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    ],
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule), 
    
  },
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
