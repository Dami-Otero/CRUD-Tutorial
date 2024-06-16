import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _income } from '../pages/shared/models/Income';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private apiUrl = 'http://localhost:3000/income';

  constructor(private http: HttpClient) {}

  getIncomes(): Observable<_income[]> {
    return this.http.get<_income[]>(this.apiUrl);
  }

  addIncome(income: _income): Observable<_income> {
    return this.http.post<_income>(this.apiUrl, income);
  }

  updateIncome(id: number, income: _income): Observable<_income> {
    return this.http.patch<_income>(`${this.apiUrl}/${id}`, income);
  }

  deleteIncome(id: number): Observable<void> {
    console.log(`Deleting income at URL: ${this.apiUrl}/${id}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
