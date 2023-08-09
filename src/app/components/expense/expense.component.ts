import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnChanges {
  @Input() transactions: Transaction[] = [];
  currentMonthExpenses: number = 0;
  lastMonthExpenses: number = 0;
  expensesVariationPercentage: number = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.transactions = changes['transactions'].currentValue;
    this.calculateExpenses();
  }

  calculateExpenses() {
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

    this.currentMonthExpenses = currentMonthTransactions.reduce(
      (total, transaction) =>
        transaction.movementType === 'EXPENSE'
          ? total + transaction.amount
          : total,
      0
    );

    this.lastMonthExpenses = lastMonthTransactions.reduce(
      (total, transaction) =>
        transaction.movementType === 'EXPENSE'
          ? total + transaction.amount
          : total,
      0
    );

    if (this.lastMonthExpenses !== 0) {
      this.expensesVariationPercentage =
        ((this.currentMonthExpenses - this.lastMonthExpenses) /
          this.lastMonthExpenses) *
        100;
    }
  }
}
