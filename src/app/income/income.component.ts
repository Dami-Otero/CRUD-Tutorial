import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { _income } from '../pages/shared/models/Income';
import { CommonModule } from '@angular/common';
import { ModelComponent } from '../pages/shared/ui/model/model.component';
import { IncomeService } from '../services/income.service';
import { IncomeFormComponent } from '../income-form/income-form.component'; 
import { ModalService } from '../services/modal.service';
import { Router, RouterModule } from '@angular/router';
import { DUIPaginator } from 'david-ui-angular';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ModelComponent, CommonModule, IncomeFormComponent, RouterModule, DUIPaginator], 
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  incomes: _income[] = []; //array to store data on incomes
  isModelOpen = false; //model starts closed
  isEditMode = false; //starts in non edit
  income: _income | null = null;
  totalIncome: number = 0;
  visibleTotalIncome: number = 0; //total income of the visible data
  curPage: number = 1;
  pageSize: number = 10;

  constructor(private incomeService: IncomeService, private modalService: ModalService, private router: Router) {

  }

  goto(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit(): void {
    this.loadIncomes();
    this.modalService.openIncomeModal$.subscribe(() => {
      this.openModel();
    });
  }

  loadIncomes() { //loads incomes
    this.incomeService.getIncomes().subscribe((data: _income[]) => {
      this.incomes = data;
      this.totalIncome = this.calculateTotalIncome(data);
      this.updateVisibleTotalIncome(); //calculate  visible total income
    });
  }

  openModel() {
    this.isModelOpen = true;
    this.income = null; //form is reset when adding new income
  }

  closeModel() { 
    this.isModelOpen = false; 
    this.isEditMode = false;
    this.loadIncomes();
  }

  loadIncome(data: _income) {
    this.income = data;
    this.isEditMode = true;
    this.isModelOpen = true;
  }

  deleteIncome(id: number) { //deletes income using id
    if (id) {
      this.incomeService.deleteIncome(id).subscribe({
        next: () => this.loadIncomes(),
        error: (err) => console.error(`Failed to delete income with ID ${id}`, err)
      });
    }
  }

  calculateTotalIncome(incomes: _income[]): number {
    return incomes.reduce((total, income) => total + parseFloat(income.amount), 0);
  }

  updateVisibleTotalIncome() {
    const start = (this.curPage - 1) * this.pageSize;
    const end = this.curPage * this.pageSize;
    const visibleIncomes = this.incomes.slice(start, end);
    this.visibleTotalIncome = visibleIncomes.reduce((total, income) => total + parseFloat(income.amount), 0);
  }

  numberOfPages(): number { //calculates number of pages needed
    return Math.ceil(this.incomes.length / this.pageSize);
  }
  onPageChange() {
    this.updateVisibleTotalIncome();
  }
}
