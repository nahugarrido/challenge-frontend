import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnChanges, OnInit {
  @Input() transactions: Transaction[] = [];
  chart!: Chart;

  constructor() {}

  ngOnInit() {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.transactions = changes['transactions'].currentValue;
    this.renderChart();
  }

  renderChart() {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const incomeByDayOfWeek = [0, 0, 0, 0, 0, 0, 0];

    this.transactions.forEach((transaction) => {
      if (transaction.movementType === 'INCOME' && transaction.date) {
        const dayOfWeek = new Date(transaction.date).getDay();
        incomeByDayOfWeek[dayOfWeek] += transaction.amount;
      }
    });

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: daysOfWeek,
        datasets: [
          {
            label: 'Income per week day',
            data: incomeByDayOfWeek,
            borderWidth: 1,
            backgroundColor: 'rgba(69, 228, 138, 0.937)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
