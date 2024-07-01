import { Component, OnInit } from '@angular/core';
import { IncomeService } from '../services/income.service';
import { OutcomeService } from '../services/outcome.service';
import { _income } from '../pages/shared/models/Income';
import { _outcome } from '../pages/shared/models/Outcome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recap.component.html',
  styleUrl: './recap.component.css'
})
export class RecapComponent implements OnInit {
  incomes: _income[] = [];
  outcomes: _outcome[] = [];
  totalIncome: number = 0;
  totalOutcome: number = 0;
  numberOfCompanies: number = 0;

  constructor(private incomeService: IncomeService, private outcomeService: OutcomeService) {
  }

  ngOnInit(): void {
    this.loadIncomes();
    this.loadOutcomes();
  }

  loadIncomes(): void {
    this.incomeService.getIncomes().subscribe((data: _income[]) => {
      this.incomes = data;
      this.totalIncome = this.calculateTotalIncome(data);
      this.calculateNumberOfCompanies();
    });
  }

  loadOutcomes(): void {
    this.outcomeService.getOutcomes().subscribe((data: _outcome[]) => {
      this.outcomes = data;
      this.totalOutcome = this.calculateTotalOutcome(data);
      this.calculateNumberOfCompanies();
    });
  }

  calculateTotalIncome(incomes: _income[]): number {
    return incomes.reduce((total, income) => total + parseFloat(income.amount), 0);
  }

  calculateTotalOutcome(outcomes: _outcome[]): number {
    return outcomes.reduce((total, outcome) => total + parseFloat(outcome.amount), 0);
  }

  calculateNumberOfCompanies(): void {
  const companies = new Set<string>();

  for (const income of this.incomes) 
    companies.add(income.company);
  for (const outcome of this.outcomes) 
    companies.add(outcome.company);
  
  this.numberOfCompanies = companies.size;
}

}
