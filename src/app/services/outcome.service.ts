import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _outcome } from '../pages/shared/models/Outcome';

@Injectable({
  providedIn: 'root'
})
export class OutcomeService {
  private apiUrl = 'http://localhost:3000/outcome';

  constructor(private http: HttpClient) {}

  getOutcomes(): Observable<_outcome[]> {
    return this.http.get<_outcome[]>(this.apiUrl);
  }

  addOutcome(outcome: _outcome): Observable<_outcome> {
    return this.http.post<_outcome>(this.apiUrl, outcome);
  }

  updateOutcome(id: number, outcome: _outcome): Observable<_outcome> {
    return this.http.patch<_outcome>(`${this.apiUrl}/${id}`, outcome);
  }

  deleteOutcome(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
