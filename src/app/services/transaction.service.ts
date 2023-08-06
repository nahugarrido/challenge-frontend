import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models/transaction.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  getTransactionsByUserID(id: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${environment.baseURL}api/v1/transactions/${id}`
    );
  }
}
