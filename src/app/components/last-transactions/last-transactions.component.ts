import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from 'src/app/models/transaction.model';
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-last-transactions',
  templateUrl: './last-transactions.component.html',
  styleUrls: ['./last-transactions.component.scss'],
})
export class LastTransactionsComponent implements OnChanges, AfterViewInit {
  @Input() transactions: Transaction[] = [];
  displayedColumns: string[] = [
    'movementType',
    'header',
    'amount',
    'date',
    'status',
  ];
  dataSource = new MatTableDataSource<Transaction>(this.transactions);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  arrowIncome = faSquareArrowUpRight;

  ngOnChanges(changes: SimpleChanges): void {
    this.transactions = changes['transactions'].currentValue;
    this.dataSource = new MatTableDataSource<Transaction>(this.transactions);
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  shouldRotate(movementType: string): any {
    if (movementType === 'INCOME') {
      return 180;
    }
    return null;
  }
}
