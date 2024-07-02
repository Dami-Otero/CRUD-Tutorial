import { Component, OnInit } from '@angular/core';
import { IncomeService } from '../services/income.service';
import { OutcomeService } from '../services/outcome.service';
import { _income } from '../pages/shared/models/Income';
import { _outcome } from '../pages/shared/models/Outcome';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from "../bar-chart/bar-chart.component";
import { ModalService } from '../services/modal.service';
import { IncomeFormComponent } from '../income-form/income-form.component';
import { OutcomeFormComponent } from '../outcome-form/outcome-form.component';

@Component({
  selector: 'app-recap',
  standalone: true,
  imports: [CommonModule, BarChartComponent, IncomeFormComponent, OutcomeFormComponent],
  templateUrl: './recap.component.html',
  styleUrl: './recap.component.css'
})
export class RecapComponent implements OnInit {
  incomes: _income[] = [];
  outcomes: _outcome[] = [];
  totalIncome: number = 0;
  totalOutcome: number = 0;
  numberOfCompanies: number = 0;
  isIncomeModalOpen = false; //false so modal starts closed
  isOutcomeModalOpen = false;
  isEditMode = false; //doesnt start in edit mode
  income: _income | null = null;
  outcome: _outcome | null = null;

  constructor(private incomeService: IncomeService, private outcomeService: OutcomeService, private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.loadIncomes();
    this.loadOutcomes();

    this.modalService.openIncomeModal$.subscribe(() => this.openIncomeModal()); //used to open income modals
    this.modalService.openOutcomeModal$.subscribe(() => this.openOutcomeModal()); //used to open outcome modals
  }

  loadIncomes(): void {
    this.incomeService.getIncomes().subscribe((data: _income[]) => {
      this.incomes = data;
      this.totalIncome = this.calculateTotalIncome(data); //stores total income
      this.calculateNumberOfCompanies(); //used to calculate number of companies
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

    for (const income of this.incomes)  //adds companies from income
      companies.add(income.company);
    for (const outcome of this.outcomes) //adds companies from outcome
      companies.add(outcome.company);

    this.numberOfCompanies = companies.size; //total number of unique companies
  }

  openIncomeModal(): void { //opens income modal
    this.isIncomeModalOpen = true;
    this.income = null;
    this.isEditMode = false;
  }

  openOutcomeModal(): void { //opens outcome modal
    this.isOutcomeModalOpen = true;
    this.outcome = null;
    this.isEditMode = false;
  }

  closeIncomeModal(): void { //closes income modal
    this.isIncomeModalOpen = false;
    this.loadIncomes();
  }

  closeOutcomeModal(): void { //closes outcome modal
    this.isOutcomeModalOpen = false;
    this.loadOutcomes();
  }
}
