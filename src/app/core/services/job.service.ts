import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://localhost:3000/api/jobs'; // Your API endpoint
  private userUrl = 'http://localhost:3000/auth/users';

  constructor(private http: HttpClient) {}

  private email: string = 'user@example.com'; // Replace with actual logic to get the logged-in user's email

  getJobs(): Observable<any[]> {
    console.log('API URL:', this.apiUrl); // Log the API URL
    return this.http.get<any[]>(this.apiUrl);
  }

  getJobById(jobId: String): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${jobId}`);
  }

  // Load applied jobs from local storage
  loadAppliedJobs(): any[] {
    const storedJobs = localStorage.getItem(`appliedJobs_${this.email}`);
    return storedJobs ? JSON.parse(storedJobs) : [];
  }

  // Save applied jobs to local storage
  saveAppliedJobs(appliedJobs: any[]): void {}

  // Add a job to the applied jobs list
  addAppliedJob(job: any, appliedJobs: any[]): boolean {
    if (
      !appliedJobs.some((appliedJob) => appliedJob.jobTitle === job.jobTitle)
    ) {
      appliedJobs.push(job);
      this.saveAppliedJobs(appliedJobs);
      return true; // Successfully applied
    }
    return false; // Job already applied
  }

  // New method to apply for a job
  applyToJob(email: string, jobId: string): Observable<any> {
    const payload = { email, jobId };

    console.log(payload);

    return this.http.post(`${this.apiUrl}/apply`, payload);
  }

  getAppliedJobs(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/applied-jobs/${email}`);
  }

  // Method to revoke job application
  revokeApplication(jobId: string, email: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/revoke/${jobId}?email=${email}`);
  }
}
