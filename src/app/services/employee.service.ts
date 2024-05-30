import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, IEmployee} from '../pages/shared/models/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  api= "http://localhost:3000/employee"

  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<ApiResponse<IEmployee[]>>
  {

    return this.http.get<ApiResponse<IEmployee[]>>('${this.apiurl}')
  }

  getEmployee(id: string): Observable<ApiResponse<IEmployee>>
  {
    return this.http.get<ApiResponse<IEmployee>>('${this.apiurl}/${id}')

  }

  createEmployee(employee: IEmployee): Observable<ApiResponse<IEmployee>> {

    return this.http.get<ApiResponse<IEmployee>>('${this.apiurl}')

  }


  updateEmployee(id: string, employee: IEmployee){
    return this.http.put<ApiResponse<IEmployee>>(
      '${this.apiurl}/${id}', 
      employee
      );

  }
  
  deleteEmployee(id: string){

    return this.http.delete('${this.apiurl}')

  }
}
