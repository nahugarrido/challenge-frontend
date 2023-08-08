import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Installment } from '../models/installment.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private http: HttpClient) {}

  getInstallmentsByUserId(id: number): Observable<Installment[]> {
    return this.http.get<Installment[]>(`${environment.baseURL}loans/${id}`);
  }
}
