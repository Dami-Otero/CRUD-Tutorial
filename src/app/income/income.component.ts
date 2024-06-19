import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { _income } from '../pages/shared/models/Income';
import { CommonModule } from '@angular/common';
import { ModelComponent } from '../pages/shared/ui/model/model.component';
import { IncomeService } from '../services/income.service';
import { IncomeFormComponent } from '../income-form/income-form.component'; 
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ModelComponent, CommonModule, IncomeFormComponent], 
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  incomes: _income[] = []; //array to store data on incomes
  isModelOpen = false; //model starts closed
  isEditMode = false; //starts in non edit
  income: _income | null = null;

  constructor(private incomeService: IncomeService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.loadIncomes();
    this.modalService.openIncomeModal$.subscribe(() => {
      this.openModel();
    });
  }

  loadIncomes() { //loads incomes
    this.incomeService.getIncomes().subscribe((data: _income[]) => this.incomes = data);
  }

  openModel() {
    this.isModelOpen = true;
  }

  closeModel() { //
    this.isModelOpen = false; 
    this.isEditMode = false;
    this.loadIncomes();
  }

  loadIncome(data: _income) {
    this.income = data;
    this.isEditMode = true;
    this.openModel();
  }

  deleteIncome(id: number) { //deletes income using id
    if (id) {
      this.incomeService.deleteIncome(id).subscribe({
        next: () => this.loadIncomes(),
        error: (err) => console.error(`Failed to delete income with ID ${id}`, err)
      });
    }
  }
}
