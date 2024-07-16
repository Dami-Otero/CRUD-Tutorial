import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-gross-margin-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './gross-margin-bar-chart.component.html',
  styleUrls: ['./gross-margin-bar-chart.component.css']
})
export class GrossMarginBarChartComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective<'bar'>;
  @Input() incomes: any[] = [];
  @Input() outcomes: any[] = [];
  
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: -100, //-100% min
        max: 100, //100% max
        ticks: {
          callback: (value: number | string) => `${value}%` //adds % for label
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  public barChartType: ChartConfiguration<'bar'>['type'] = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], backgroundColor: [], borderColor: [], borderWidth: 1 }, 
    ]
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['incomes'] || changes['outcomes']) { //in case of change
      this.updateChartData(); //chart updates
    }
  }

  private updateChartData() {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyIncome: { [key: string]: number } = {}; //monthly income totals
    const monthlyOutcome: { [key: string]: number } = {}; //outcome totals

    monthNames.forEach(month => { //both start at 0 for each month
      monthlyIncome[month] = 0;
      monthlyOutcome[month] = 0;
    });

    for (const income of this.incomes) { //sums income amts
      const date = new Date(income.invoice_date);
      const month = monthNames[date.getMonth()];
      monthlyIncome[month] += parseFloat(income.amount);
    }

    for (const outcome of this.outcomes) { //sums outcome amts
      const date = new Date(outcome.invoice_date);
      const month = monthNames[date.getMonth()];
      monthlyOutcome[month] += parseFloat(outcome.amount);
    }

    const labels = monthNames;
    const margins = labels.map(month => { //calculates gross margin %
      const income = monthlyIncome[month];
      const outcome = monthlyOutcome[month];
      return income !== 0 ? ((income - outcome) / income) * 100 : -100;
    });

    this.barChartData.labels = labels;
    this.barChartData.datasets[0].data = margins;
    this.barChartData.datasets[0].backgroundColor = margins.map(value => value < 0 ? 'rgba(255, 99, 132, 0.4)' : 'rgba(0, 123, 255, 0.4)'); //sets color based on value
    this.barChartData.datasets[0].borderColor = margins.map(value => value < 0 ? 'rgba(255, 99, 132, 1)' : 'rgba(0, 123, 255, 1)');
    
    this.chart?.update();
  }

  public chartClicked({ event, active }: { event?: ChartEvent; active?: object[] }) {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent; active?: object[] }) {
    console.log(event, active);
  }
}
