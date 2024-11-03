import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Your backend API base URL

  constructor(private http: HttpClient, private router: Router) {}
  
  getUserRole(): string | null {
    return localStorage.getItem('userRole'); 
  }

  
  // Register method
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }


   // Register method
   registerHr(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/register`, userData);
  }


  


  // Login method
  login(userData: any): Observable<any> {
    
    return this.http.post(`${this.apiUrl}/login`, userData); //returns a token
  }

  loginHr(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/login`, userData); //returns a token
  }

  // Save token to local storage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  saveEmail(email: string): void {
    localStorage.setItem('email', email);
  }


  // Logout method
  logout(): void {
    localStorage.removeItem('userRole');

    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Check if logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
