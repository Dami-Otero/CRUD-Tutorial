import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../shared/ui/model/model.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../shared/models/Employee';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ModelComponent, EmployeeFormComponent, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit{
  isModelOpen = false;
  isEditMode = false;
  employees: IEmployee[] = []; //array that holds list of employees
  employee: IEmployee | null = null; //for one employees data, | null = null allows employee to be null
constructor(private employeeService: EmployeeService, private toastService: ToastrService){}

//basic function that initializes componrnt
ngOnInit(): void{
  this.getAllEmployee(); //fetches employees once component initialized
  console.log('ngOnInit') 
}

getAllEmployee(){ //method to get employees

  this.employeeService.getAllEmployee().subscribe({
    next: (response) => {
      if (response && Array.isArray(response))  //only passes the data when it is in an arrray to avoid undefined entries
        this.employees = response; //assignes fetched data to this.employees
      console.log('Fetched employees', this.employees);
    }
  })
}

deleteEmployee(id: string){ //method for deleting employees

  this.employeeService.deleteEmployee(id).subscribe({
    next: (response) => { //executed call back function for response
      this.toastService.success(response.message)
      this.getAllEmployee()
    }
  })
}

loadEmployee(data: IEmployee){ //loads employee data onto the form, used for edit feature
  this.employee = data;
  this.isEditMode=true;
  this.openModel();
}
  openModel() {
    if (!this.employee)
    {
      this.employee = null; //makes employee null when adding new employee
    } 
      this.isModelOpen = true; //true so the model is displayed
    }
    
  

  closeModel() {
    this.isModelOpen = false; //hides model
    this.isEditMode = false; //resets edit mode
    this.getAllEmployee() //updates employee information
  }

//method used to calculate the total salary of the employees
  getTotalSalary(){
    return this.employees.reduce((total, employee) => total+employee.salary, 0)
  }
}
