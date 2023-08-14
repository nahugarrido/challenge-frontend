import {
  Component,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Installment } from 'src/app/models/installment.model';
import { ModalPaymentComponent } from '../modal-payment/modal-payment.component';
import { LoanService } from 'src/app/services/loan.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss'],
})
export class LoanComponent implements OnChanges, AfterViewInit {
  @Input() installments: Installment[] = [];
  displayedColumns: string[] = [
    'totalAmount',
    'number',
    'date',
    'amount',
    'interestRate',
    'status',
  ];
  dataSource = new MatTableDataSource<Installment>(this.installments);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() updateTransactions = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private loanService: LoanService,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.installments = changes['installments'].currentValue;
    this.dataSource = new MatTableDataSource<Installment>(this.installments);
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  emitTransactionEvent(): void {
    this.updateTransactions.emit();
  }

  openPayModal(id: number): void {
    const dialogRef = this.dialog.open(ModalPaymentComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('result:', result);
      if (result) {
        const activeUser = this.authService.getActiveUserId();
        if (activeUser != null) {
          this.userService.getUserInformation(activeUser).subscribe((user) => {
            this.loanService
              .payInstallment(user.id, id)
              .subscribe((response) => {
                console.log('emited response');
                this.emitTransactionEvent();
              });
          });
        }
      }
    });
  }
}
