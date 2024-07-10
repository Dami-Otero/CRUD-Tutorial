import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, Color } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective<'line'>;
  @Input() incomeData: any[] = [];
  @Input() outcomeData: any[] = [];
  @Input() label: string = '';

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    scales: {
      x: {
        type: 'time', //x axis by due month
        time: {
          unit: 'month',
          tooltipFormat: 'MMM',
          displayFormats: {
            month: 'MMM'
          }
        }
      },
      y: {
        beginAtZero: true //y axis starts 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartType: ChartConfiguration<'line'>['type'] = 'line'; //sets chart type to line

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [ //data for line graph, income blue, outcome green
      { data: [], label: 'Income', backgroundColor: 'rgba(0, 123, 255, 0.4)', borderColor: 'rgba(0, 123, 255, 1)', fill: false },
      { data: [], label: 'Outcome', backgroundColor: 'rgba(255, 99, 132, 0.4)', borderColor: 'rgba(255, 99, 132, 1)', fill: false },
    ],
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['incomeData'] || changes['outcomeData']) {
      this.updateChart();
    }
  }

  //data grouped by month
  private groupDataByMonth(data: any[]): { x: number, y: number }[] {
    const groupData: { [key: string]: number } = {};

    data.forEach(item => {
      const date = new Date(item.due_date); //uses due date
      const month = new Date(date.getFullYear(), date.getMonth(), 1).getTime(); //start of month
      if (!groupData[month]) {
        groupData[month] = 0;
      }
      groupData[month] += parseFloat(item.amount); //sums amounts for each month
    });

    return Object.keys(groupData).map(month => ({
      x: parseInt(month, 10), //string to num
      y: groupData[month] //amt for month
    })).sort((a, b) => a.x - b.x); //sorts by month
  }

  private updateChart() {
    const incomePoints = this.groupDataByMonth(this.incomeData); //grouped by month
    const outcomePoints = this.groupDataByMonth(this.outcomeData);
    this.lineChartData.datasets[0].data = incomePoints; //data for income
    this.lineChartData.datasets[1].data = outcomePoints; //data for outcome
    this.chart?.update();
  }

  public chartClicked({ event, active }: { event?: ChartEvent; active?: object[] }) {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent; active?: object[] }) {
    console.log(event, active);
  }
}
