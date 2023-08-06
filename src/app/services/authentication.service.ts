import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginDTO } from '../models/login-dto.model';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseURL: string = environment.baseURL + 'auth';

  constructor(private http: HttpClient) {}

  public login(loginData: LoginDTO): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseURL}/authenticate`,
      loginData
    );
  }

  public isAuthenticated(): boolean {
    return true;
  }
}
