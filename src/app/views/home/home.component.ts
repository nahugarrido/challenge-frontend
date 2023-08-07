import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/models/transaction.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  transactions: Transaction[] = [];
  constructor(
    private _transactionService: TransactionService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    console.log('hi');
    this.updateTransactions();
  }

  updateTransactions() {
    const activeUserID = this.authService.getActiveUserId() as string;
    this._transactionService
      .getTransactionsByUserID(activeUserID)
      .subscribe((transactions) => {
        this.transactions = transactions;
      });
  }

  updateTransactionsHandle(): void {
    console.log('event emitted');
    this.updateTransactions();
  }
}
