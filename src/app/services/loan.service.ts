import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Installment } from '../models/installment.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoanSaveDTO } from '../models/loan-save-dto.model';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private http: HttpClient) {}

  getInstallmentsByUserId(id: number): Observable<Installment[]> {
    return this.http.get<Installment[]>(`${environment.baseURL}loans/${id}`);
  }

  generateLoan(loan: LoanSaveDTO): void {
    this.http.post(`${environment.baseURL}loans/generate`, loan).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  payInstallment(userId: number, installmentId: number): void {
    this.http
      .post(`${environment.baseURL}loans/${userId}/pay/${installmentId}`, {})
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
}
