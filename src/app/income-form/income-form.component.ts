import { Component, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IncomeService } from '../services/income.service';
import { _income } from '../pages/shared/models/Income';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-income-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent implements OnChanges {
  @Input() data: _income | null = null; 
  @Input() isEditMode: boolean = false;  //starts not in edit mode
  @Output() onCloseModel = new EventEmitter();
  incomeForm: FormGroup;

  constructor(private fb: FormBuilder, private incomeService: IncomeService) {
    this.incomeForm = this.fb.group({ //initialize form and creates validators
      id: [0, Validators.required],
      company: ['', [Validators.required]],
      invoice_number: [0, [Validators.required, Validators.min(0)]],
      amount: [0, [Validators.required, Validators.min(0)]],
      due_date: ['', Validators.required],
      is_paid: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isEditMode && this.data) { //onlu if in edit mode and with data
      this.incomeForm.patchValue({
        id: this.data.id!,
        company: this.data.company,
        invoice_number: this.data.invoice_number,
        amount: this.data.amount,
        due_date: this.data.due_date,
        is_paid: this.data.is_paid
      });
    } else { //resets form
      this.resetForm();
    }
  }

  resetForm() { //defualt form
    this.incomeForm.reset({
      id: 0,
      company: '',
      invoice_number: 0,
      amount: 0,
      due_date: '',
      is_paid: ''
    });
  }

  onClose() {
    this.onCloseModel.emit(false);
  }

  onSubmit() { //used to submit forms
    if (this.incomeForm.valid) {
      const newIncome: _income = { ...this.incomeForm.value };
      if (this.isEditMode && this.data) { //if in edit mode
        this.incomeService.updateIncome(this.data.id!, newIncome).subscribe(() => {
          this.onClose();
        });
      } else { //not in edit mode
        this.incomeService.addIncome(newIncome).subscribe(() => {
          this.onClose();
        });
      }
    } else {
      this.incomeForm.markAllAsTouched();
    }
  }
}
