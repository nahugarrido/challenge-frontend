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

import { Installment } from 'src/app/models/installment.model';

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
    console.log('clicked :' + id);
  }
}
