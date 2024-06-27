import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CompanyService } from '../services/company.service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BarChartComponent } from '../bar-chart/bar-chart.component';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule, BarChartComponent],
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  companyId?: string;
  companyName: string = '';
  incomes: any[] = []; //store companies incomes
  outcomes: any[] = [];
  totalIncome: number = 0;
  totalOutcome: number = 0;
  type: "income" | "outcome" = "income"

  constructor(private route: ActivatedRoute, private companyService: CompanyService) { } //routing purposes and accessing company.services

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id')!; //provides company id
    this.companyName = this.route.snapshot.paramMap.get('name')!; //provides company name
    this.type = this.route.snapshot.data['type'] || 'income';
    this.loadCompanyDetails(this.companyName, this.type); //load company details with name and type
  }

  loadCompanyDetails(name: string, type: "income" | "outcome") {
    this.companyService.getElementsByParam('http://localhost:3000', name, type, 'company').subscribe({
      next: (elements) => {
        if(type == 'income'){
          this.incomes = elements;
          this.totalIncome = this.incomes.reduce((total, income) => total + income.amount, 0);
        } else {
          this.outcomes = elements;
          this.totalOutcome = this.outcomes.reduce((total, outcome) => total + outcome.amount, 0);
        }
        
      },
    });
    // this.companyService.getCompanyOutcomeByName(name).subscribe({
    //   next: (outcomes) => {
    //     this.outcomes = outcomes;
    //   },
    // });
  }
}