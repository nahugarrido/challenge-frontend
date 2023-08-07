import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginDTO } from '../models/login-dto.model';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { SingupDTO } from '../models/signup-dto.model';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseURL: string = environment.baseURL + 'auth';
  jwt_decode = jwt_decode;

  constructor(private http: HttpClient) {}

  login(loginData: LoginDTO): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseURL}/authenticate`,
      loginData
    );
  }

  isAuthenticated(): boolean {
    const token = this.getUserToken();
    if (!token) {
      return false;
    }
    const decodedToken: any = this.jwt_decode(token);
    return decodedToken.exp > Date.now() / 1000;
  }

  saveUserData(token: string, userId: string): void {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('active-user-id', userId);
  }

  cleanUserData(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('active-user-id');
  }

  getUserToken(): string {
    return sessionStorage.getItem('token') as string;
  }

  getActiveUserId(): string | null {
    return sessionStorage.getItem('active-user-id');
  }

  signUp(userData: SingupDTO): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/register`, userData);
  }
}
