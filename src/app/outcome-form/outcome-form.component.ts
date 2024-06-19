import { Component, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OutcomeService } from '../services/outcome.service';
import { _outcome } from '../pages/shared/models/Outcome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-outcome-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './outcome-form.component.html',
  styleUrls: ['./outcome-form.component.css']
})
export class OutcomeFormComponent implements OnChanges {
  @Input() data: _outcome | null = null; 
  @Input() isEditMode: boolean = false; 
  @Output() onCloseModel = new EventEmitter();
  outcomeForm: FormGroup;

  constructor(private fb: FormBuilder, private outcomeService: OutcomeService) {
    this.outcomeForm = this.fb.group({ 
      company: [null, [Validators.required]],
      invoice_number: [null, [Validators.required,]], //add all required validators
      amount: [null, [Validators.required, Validators.min(0)]],
      due_date: [null, Validators.required],
      is_paid: [null, Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isEditMode && this.data) { //adds data if in edit mode and data exists
      this.outcomeForm.patchValue({
        id: this.data.id,
        company: this.data.company,
        invoice_number: this.data.invoice_number,
        amount: this.data.amount,
        due_date: this.data.due_date,
        is_paid: this.data.is_paid
      });
    } else {
      this.resetForm(); //resets form
    }
  }

  resetForm() { //resets form
    this.outcomeForm.reset({
      company: null,
      invoice_number: null,
      amount: null,
      due_date: null,
      is_paid: null
    });
  }

  onClose() {
    this.onCloseModel.emit(false);
  }

  onSubmit() { //used to submit form
    if (this.outcomeForm.valid) {
      const newOutcome: _outcome = { ...this.outcomeForm.value }; //creates outcome with form values
      if (this.isEditMode && this.data) { //only updates if in edit mode
        this.outcomeService.updateOutcome(this.data.id!, newOutcome).subscribe(() => {
          this.onClose();
        }, error => {
          console.error('Error updating outcome:', error);
        });
      } else { //new outcome if not in edit mode
        this.outcomeService.addOutcome(newOutcome).subscribe(() => {
          this.onClose();
        }, error => {
          console.error('Error adding outcome:', error);
        });
      }
    } 
  }
}
