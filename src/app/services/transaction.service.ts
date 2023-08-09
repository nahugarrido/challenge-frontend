import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Transaction } from '../models/transaction.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transfer } from '../models/transfer.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  getTransactionsByUserID(id: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${environment.baseURL}transactions/${id}`
    );
  }

  deposit(userID: string, amount: number): void {
    this.http
      .post(`${environment.baseURL}transactions/deposit/${userID}`, amount)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  withdraw(userID: string, amount: number): void {
    this.http
      .post(`${environment.baseURL}transactions/withdraw/${userID}`, amount)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  transfer(transfer: Transfer): void {
    this.http
      .post(`${environment.baseURL}transactions/transfer`, transfer)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }
}
