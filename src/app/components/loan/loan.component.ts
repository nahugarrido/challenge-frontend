import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css'],
})
export class LoanComponent {
  @Output() updateTransactions = new EventEmitter();

  emitTransactionEvent(): void {
    this.updateTransactions.emit();
  }
}
