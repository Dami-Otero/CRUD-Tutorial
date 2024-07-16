import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, Color } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective<'bar'>
  @Input() data: any[] = [];
  @Input() label: string = '';
  @Input() type: 'income' | 'outcome' | 'combined' = 'combined';

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true, //makes chart responsive
    scales: {
      x: {},
      y: {
        min: 0, //must be at least 0 since its income/outcome
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType: ChartConfiguration<'bar'>['type'] = 'bar'; //chart type bar

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Income', backgroundColor: 'rgba(0, 123, 255, 0.4)'},
      { data: [], label: 'Outcome', backgroundColor: 'rgba(255, 99, 132, 0.4)'}
    ],
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) { //checks for changes in data
      if (this.type === 'combined') {
        this.groupDataByInvoiceDateCombined();
      }  else {
        this.groupDataByInvoiceDate(); //groups data by invoice date for income/outcome chart
      }
      this.chart?.update();
    }
  }

  private groupDataByInvoiceDate(): void {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyData = monthNames.reduce((acc, month) => {
      acc[month] = 0; //0 for january
      return acc;
    }, {} as { [key: string]: number }); //stores monthly data

    for (const item of this.data) {
      const date = new Date(item.invoice_date); //invoice date for month
      const month = monthNames[date.getMonth()]; //gets month name from date
      monthlyData[month] += item.amount; //sums month amounts
    }

    const labels = monthNames; //month name labels
    const amounts = labels.map(label => monthlyData[label]);

    this.barChartData.labels = labels;
    if (this.type === 'income') {
      this.barChartData.datasets = [{
        data: amounts,
        label: 'Income',
        backgroundColor: 'rgba(0, 123, 255, 0.4)'
      }];
    } else if (this.type === 'outcome') {
      this.barChartData.datasets = [{
        data: amounts,
        label: 'Outcome',
        backgroundColor: 'rgba(255, 99, 132, 0.4)'
      }];
    }
  }

  private groupDataByInvoiceDateCombined() {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyData = monthNames.reduce((acc, month) => {
      acc[month] = { income: 0, outcome: 0 }; //starts as 0 for income/outcome
      return acc;
    }, {} as { [key: string]: { income: number, outcome: number } });

    for (const item of this.data) {
      const date = new Date(item.invoice_date);//uses invoice date
      const month = monthNames[date.getMonth()];

      if (item.type === 'income') {
        monthlyData[month].income += item.amount; //sums incomes by month
      } else {
        monthlyData[month].outcome += item.amount; //sums outcomes by month
      }
    }

    const labels = monthNames;
    const incomeAmounts = labels.map(label => monthlyData[label].income); //orders income amounts
    const outcomeAmounts = labels.map(label => monthlyData[label].outcome); //orders outcome amounts

    this.barChartData.labels = labels;
    this.barChartData.datasets = [
      {
        data: incomeAmounts,
        label: 'Income',
        backgroundColor: 'rgba(0, 123, 255, 0.4)'
      },
      {
        data: outcomeAmounts,
        label: 'Outcome',
        backgroundColor: 'rgba(255, 99, 132, 0.4)'
      }
    ];
  }

  public chartClicked({event,active,}: {event?: ChartEvent;active?: object[] }) { //deals with chart clicking events
    console.log(event, active);
  }

  public chartHovered({event, active,}: {event?: ChartEvent;active?: object[] }) { //deals with hovering events
    console.log(event, active);
  }
}
