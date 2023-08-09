import { Component } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/models/transaction.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoanService } from 'src/app/services/loan.service';
import { Installment } from 'src/app/models/installment.model';
import { UserService } from 'src/app/services/user.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  transactions: Transaction[] = [];
  installments: Installment[] = [];
  user!: User;
  title = 'challenge-frontend';
  isMobile = false;
  rowHeightValue = '250px';

  constructor(
    private transactionService: TransactionService,
    private authService: AuthenticationService,
    private loanService: LoanService,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.updateTransactions();
    this.updateInstallments();
    this.updateUser();

    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .subscribe((result) => {
        this.isMobile = result.matches;
        this.rowHeightValue = result.matches ? '160px' : '250px';
      });
  }

  updateTransactions() {
    const activeUserID = this.authService.getActiveUserId() as string;
    this.transactionService
      .getTransactionsByUserID(activeUserID)
      .subscribe((transactions) => {
        this.transactions = transactions.sort((a, b) => {
          if (a.date > b.date) {
            return -1;
          } else if (a.date < b.date) {
            return 1;
          } else {
            return 0;
          }
        });
      });
  }

  updateInstallments() {
    const activeUserID = this.authService.getActiveUserId() as string;
    this.userService.getUserInformation(activeUserID).subscribe((user) => {
      const userId = user.id;
      this.loanService
        .getInstallmentsByUserId(userId)
        .subscribe((installments) => {
          this.installments = installments.sort((a, b) => {
            if (a.date > b.date) {
              return -1;
            } else if (a.date < b.date) {
              return 1;
            } else {
              return 0;
            }
          });
        });
    });
  }

  updateUser() {
    const activeUserID = this.authService.getActiveUserId() as string;
    this.userService.getUserInformation(activeUserID).subscribe((user) => {
      this.user = user;
    });
  }
}
