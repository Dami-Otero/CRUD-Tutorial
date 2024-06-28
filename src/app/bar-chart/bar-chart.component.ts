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
      { data: [], label: 'Amount' },
    ],
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) { //checks for changes in data
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthlyIncome: { [key: string]: number } = {}; //stores monthly income
      for (let i = 0; i < this.data.length; i++) {
        const item = this.data[i];
        const date = new Date(item.invoice_date);
        const month = monthNames[date.getMonth()]; //gets month name from date

        if (!monthlyIncome[month]) { //if month doesn't exist
          monthlyIncome[month] = 0;
        }
        monthlyIncome[month] += item.amount; //sums monthly incomes
      }

      //used for chart data
      const labels = Object.keys(monthlyIncome); //makes months labels
      const amounts = Object.values(monthlyIncome);
      this.barChartData.labels = labels; //updates labels in chart data
      this.barChartData.datasets[0].data = amounts; //updates amounts for dataset
      this.barChartData.datasets[0].label = this.label; //updates dataset label
      this.chart?.update(); //updates charts changes
    }
  }

  public chartClicked({event,active,}: {event?: ChartEvent;active?: object[] }): void { //deals with chart clicking events
    console.log(event, active);
  }

  public chartHovered({event, active,}: {event?: ChartEvent;active?: object[] }): void { //deals with hovering events
    console.log(event, active);
  }
}
