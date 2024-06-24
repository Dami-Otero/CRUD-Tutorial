import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { _outcome } from '../pages/shared/models/Outcome';
import { CommonModule } from '@angular/common';
import { ModelComponent } from '../pages/shared/ui/model/model.component';
import { OutcomeService } from '../services/outcome.service';
import { OutcomeFormComponent } from '../outcome-form/outcome-form.component'; // Import OutcomeFormComponent
import { ModalService } from '../services/modal.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-outcome',
  standalone: true,
  imports: [ModelComponent, CommonModule, ReactiveFormsModule, OutcomeFormComponent, RouterModule], // Add OutcomeFormComponent here
  templateUrl: './outcome.component.html',
  styleUrls: ['./outcome.component.css']
})
export class OutcomeComponent implements OnInit {
  outcomes: _outcome[] = [];
  isModelOpen = false;
  isEditMode = false;
  outcome: _outcome | null = null;

  constructor(private outcomeService: OutcomeService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.loadOutcomes();
    this.modalService.openOutcomeModal$.subscribe(() => {
      this.openModel();
    });
  }

  loadOutcomes() { //loads outcomes
    this.outcomeService.getOutcomes().subscribe((data: _outcome[]) => this.outcomes = data);
  }

  openModel() {
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.isEditMode = false;
    this.outcome = null;
    this.loadOutcomes();
  }

  loadOutcome(data: _outcome) {
    this.outcome = data;
    this.isEditMode = true;
    this.openModel();
  }

  deleteOutcome(id: number) { //deletes outcomes
    this.outcomeService.deleteOutcome(id).subscribe(() => this.loadOutcomes());
  }
}
