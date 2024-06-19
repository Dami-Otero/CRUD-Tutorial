import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private openIncomeModalSource = new Subject<void>();
  private openOutcomeModalSource = new Subject<void>();

  openIncomeModal$ = this.openIncomeModalSource.asObservable();
  openOutcomeModal$ = this.openOutcomeModalSource.asObservable();

  openIncomeModal() {
    this.openIncomeModalSource.next();
  }

  openOutcomeModal() {
    this.openOutcomeModalSource.next();
  }
}
