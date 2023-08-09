import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnChanges {
  @Input() balance: number = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.balance = changes['balance'].currentValue;
  }
}
