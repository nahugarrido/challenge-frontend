import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginDTO } from '../models/login-dto.model';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { SingupDTO } from '../models/signup-dto.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseURL: string = environment.baseURL + 'auth';

  constructor(private http: HttpClient) {}

  login(loginData: LoginDTO): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseURL}/authenticate`,
      loginData
    );
  }

  isAuthenticated(): boolean {
    return false;
  }

  saveUserData(token: string, userId: string): void {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('active-user-id', userId);
  }

  cleanUserData(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('active-user-id');
  }

  getActiveUserId(): string | null {
    return sessionStorage.getItem('active-user-id');
  }

  signUp(userData: SingupDTO): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/register`, userData);
  }
}
