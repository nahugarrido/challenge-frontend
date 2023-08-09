import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
})
export class IncomeComponent implements OnChanges {
  @Input() transactions: Transaction[] = [];
  currentMonthIncome: number = 0;
  lastMonthIncome: number = 0;
  incomeVariationPercentage: number = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.transactions = changes['transactions'].currentValue;
    this.calculateIncome();
  }

  calculateIncome() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

    const currentMonthTransactions = this.transactions.filter(
      (transaction) =>
        transaction.date &&
        new Date(transaction.date).getMonth() === currentMonth
    );

    const lastMonthTransactions = this.transactions.filter(
      (transaction) =>
        transaction.date && new Date(transaction.date).getMonth() === lastMonth
    );

    this.currentMonthIncome = currentMonthTransactions.reduce(
      (total, transaction) =>
        transaction.movementType === 'INCOME'
          ? total + transaction.amount
          : total,
      0
    );

    this.lastMonthIncome = lastMonthTransactions.reduce(
      (total, transaction) =>
        transaction.movementType === 'INCOME'
          ? total + transaction.amount
          : total,
      0
    );

    if (this.lastMonthIncome !== 0) {
      this.incomeVariationPercentage =
        ((this.currentMonthIncome - this.lastMonthIncome) /
          this.lastMonthIncome) *
        100;
    }
  }
}
