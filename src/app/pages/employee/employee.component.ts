import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../shared/ui/model/model.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../shared/models/Employee';
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ModelComponent, EmployeeFormComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit{
  isModelOpen = false;
  employees: IEmployee[] = [];
  employee!: IEmployee;
constructor(private employeeService: EmployeeService, private toastService: ToastrService){}

ngOnInit(): void{
  this.getAllEmployee();
}

getAllEmployee(){

  this.employeeService.getAllEmployee().subscribe({
    next: (response) => {
      this.employees = response.data;
    }
  })
}

deleteEmployee(id: string){

  this.employeeService.deleteEmployee(id).subscribe({
    next: (response) => {
      this.toastService.success(response.message)
      this.getAllEmployee()


    }
  })
}

loadEmployee(data: IEmployee){
  this.employee = data;
  this.openModel();
}
  openModel() {
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAllEmployee()
  }
}
