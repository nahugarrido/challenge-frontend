import { Component } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/models/transaction.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoanService } from 'src/app/services/loan.service';
import { Installment } from 'src/app/models/installment.model';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-dashboard-material',
  templateUrl: './dashboard-material.component.html',
  styleUrls: ['./dashboard-material.component.css'],
})
export class DashboardMaterialComponent {
  transactions: Transaction[] = [];
  installments: Installment[] = [];
  title = 'challenge-frontend';

  constructor(
    private transactionService: TransactionService,
    private authService: AuthenticationService,
    private loanService: LoanService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.updateTransactions();
    this.updateInstallments();
  }

  updateTransactions() {
    const activeUserID = this.authService.getActiveUserId() as string;
    this.transactionService
      .getTransactionsByUserID(activeUserID)
      .subscribe((transactions) => {
        this.transactions = transactions;
      });
  }

  updateInstallments() {
    const activeUserID = this.authService.getActiveUserId() as string;
    this.userService.getUserInformation(activeUserID).subscribe((user) => {
      const userId = user.id;
      this.loanService
        .getInstallmentsByUserId(userId)
        .subscribe((installments) => {
          this.installments = installments;
        });

      console.log(this.installments);
    });
  }
}
