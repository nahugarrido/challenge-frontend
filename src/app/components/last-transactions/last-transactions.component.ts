import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-last-transactions',
  templateUrl: './last-transactions.component.html',
  styleUrls: ['./last-transactions.component.css'],
})
export class LastTransactionsComponent implements OnChanges {
  @Input() transactions: Transaction[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.transactions = changes['transactions'].currentValue;
    console.log(this.transactions);
  }
}
