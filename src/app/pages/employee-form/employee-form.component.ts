import {Component, EventEmitter, Output} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent {
  @Output() onCloseModel = new EventEmitter();
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      doj: new FormControl('', [Validators.required])

    })

  } 
  

  onClose() {
    this.onCloseModel.emit(false);
  }
  onSubmit(){
    if (this.employeeForm.valid) {

      this.employeeService.createEmployee(this.employeeForm.value).subscribe({next:(response)=>
      {
        this.onClose();
      }
      })

    }
    else {
      this.employeeForm.markAllAsTouched()
    }
  }
}
