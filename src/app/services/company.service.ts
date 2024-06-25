import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _income } from '../pages/shared/models/Income';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:3000/income';

  constructor(private http: HttpClient) {}

  getElementsByParam(url:string, name: string, type: 'income' | 'outcome', parm:string): Observable<any[]> {
    return this.http.get<any[]>(url + '/' + type + '?' + parm + '=' + name );
  }
  // getCompanyOutcomeByName(name: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}?company=${name}`);
  // }
}
