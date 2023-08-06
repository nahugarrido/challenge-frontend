import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  transactions: Transaction[] = [];
  constructor(private _transactionService: TransactionService) {}

  ngOnInit(): void {
    console.log('hi');
    this.updateTransactions();
  }

  updateTransactions() {
    this._transactionService
      .getTransactionsByUserID('30111222')
      .subscribe((transactions) => {
        this.transactions = transactions;
      });
  }

  updateTransactionsHandle(): void {
    console.log('event emitted');
    this.updateTransactions();
  }
}
