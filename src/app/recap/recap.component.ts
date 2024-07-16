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
import { LineChartComponent } from "../line-chart/line-chart.component";
import { GrossMarginBarChartComponent } from '../gross-margin-bar-chart/gross-margin-bar-chart.component';

@Component({
  selector: 'app-recap',
  standalone: true,
  imports: [CommonModule, BarChartComponent, IncomeFormComponent, OutcomeFormComponent, LineChartComponent, GrossMarginBarChartComponent],
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnInit {
  incomes: _income[] = [];
  outcomes: _outcome[] = [];
  combinedData: any[] = [];
  grossMarginData: any[] = [];
  totalIncome: number = 0;
  totalOutcome: number = 0;
  grossMargin: number = 0;
  numberOfCompanies: number = 0;
  isIncomeModalOpen = false; //false so modal starts closed
  numberOfSuppliers: number = 0;
  numberOfClients: number = 0;
  isOutcomeModalOpen = false;
  isEditMode = false; //doesnt start in edit mode
  income: _income | null = null;
  outcome: _outcome | null = null;

  selectedTab: 'recap' | 'largestIncome' | 'largestOutcome' = 'recap';

  constructor(private incomeService: IncomeService, private outcomeService: OutcomeService, private modalService: ModalService) {
  }

  ngOnInit() {
    this.loadIncomes();
    this.loadOutcomes();

    this.modalService.openIncomeModal$.subscribe(() => this.openIncomeModal()); //used to open income modals
    this.modalService.openOutcomeModal$.subscribe(() => this.openOutcomeModal()); //used to open outcome modals
  }

  loadIncomes() {
    this.incomeService.getIncomes().subscribe((data: _income[]) => {
      this.incomes = data;
      this.totalIncome = this.calculateTotalIncome(data); //stores total income
      this.calculateNumberOfCompanies(); //used to calculate number of companies
      this.updateCombinedData();
      this.updateGrossMarginData(); //update gross margin data
    });
  }

  loadOutcomes() {
    this.outcomeService.getOutcomes().subscribe((data: _outcome[]) => {
      this.outcomes = data;
      this.totalOutcome = this.calculateTotalOutcome(data);
      this.calculateNumberOfCompanies();
      this.updateCombinedData();
      this.updateGrossMarginData();
    });
  }

  calculateTotalIncome(incomes: _income[]): number {
    return incomes.reduce((total, income) => total + parseFloat(income.amount), 0);
  }

  calculateTotalOutcome(outcomes: _outcome[]): number {
    return outcomes.reduce((total, outcome) => total + parseFloat(outcome.amount), 0);
  }

  calculateNumberOfCompanies(): void {
    const suppliers = new Set<string>();
    const clients = new Set<string>();

    for (const income of this.incomes) //adds clients from income
      clients.add(income.company);
    
    for (const outcome of this.outcomes) //adds suppliers from income
      suppliers.add(outcome.company);
  

    this.numberOfClients = clients.size;
    this.numberOfSuppliers = suppliers.size;
  }

  updateCombinedData() {
    this.combinedData = [
      ...this.incomes.map(income => ({ ...income, type: 'income', invoice_date: income.invoice_date })),
      ...this.outcomes.map(outcome => ({ ...outcome, type: 'outcome', invoice_date: outcome.invoice_date }))
    ];
  }

  updateGrossMarginData() {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyIncome: { [key: string]: number } = {};
    const monthlyOutcome: { [key: string]: number } = {};

    monthNames.forEach(month => {
      monthlyIncome[month] = 0;
      monthlyOutcome[month] = 0;
    });

    for (const income of this.incomes) {
      const date = new Date(income.invoice_date); //use invoice_date
      const month = monthNames[date.getMonth()];
      monthlyIncome[month] += parseFloat(income.amount);
    }

    for (const outcome of this.outcomes) {
      const date = new Date(outcome.invoice_date); // Use invoice_date
      const month = monthNames[date.getMonth()];
      monthlyOutcome[month] += parseFloat(outcome.amount);
    }

    this.grossMarginData = monthNames.map(month => ({
      month,
      margin: monthlyIncome[month] !== 0
        ? ((monthlyIncome[month] - monthlyOutcome[month]) / monthlyIncome[month]) * 100
        : -100 // If no income, set margin to -100%
    }));

    this.grossMargin = this.totalIncome !== 0
      ? ((this.totalIncome - this.totalOutcome) / this.totalIncome) * 100
      : 0;
  }

  openIncomeModal() { //opens income modal
    this.isIncomeModalOpen = true;
    this.income = null;
    this.isEditMode = false;
  }

  openOutcomeModal() { //opens outcome modal
    this.isOutcomeModalOpen = true;
    this.outcome = null;
    this.isEditMode = false;
  }

  closeIncomeModal() { //closes income modal
    this.isIncomeModalOpen = false;
    this.loadIncomes();
  }

  closeOutcomeModal() { //closes outcome modal
    this.isOutcomeModalOpen = false;
    this.loadOutcomes();
  }

  getLargestIncome(): _income | null {
    return this.incomes.length > 0 ? this.incomes.reduce((prev, current) => (parseFloat(prev.amount) > parseFloat(current.amount)) ? prev : current) : null;
  }

  getLargestOutcome(): _outcome | null {
    return this.outcomes.length > 0 ? this.outcomes.reduce((prev, current) => (parseFloat(prev.amount) > parseFloat(current.amount)) ? prev : current) : null;
  }

  selectTab(tab: 'recap' | 'largestIncome' | 'largestOutcome') {
    this.selectedTab = tab;
  }
}
