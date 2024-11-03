// src/app/services/job.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HrService {

  private jobCreatedSource = new Subject<void>();
  jobCreated$ = this.jobCreatedSource.asObservable();

  private apiUrl = 'http://localhost:3000/api/jobs/'; // Your endpoint URL

  constructor(private http: HttpClient) {}

  createJob(jobData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, jobData);
  }


  deleteJob(jobId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${jobId}`); // Adjust the endpoint as needed
  }

  updateJob(jobData: any): Observable<any> {
    console.log(jobData);   
    return this.http.put<any>(`${this.apiUrl}${jobData._id}`, jobData); // Adjust the endpoint as needed
  }

  
  notifyJobCreated() {
    this.jobCreatedSource.next(); // Notify subscribers that a job has been created
  }
}
