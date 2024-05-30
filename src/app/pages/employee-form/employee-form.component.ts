import {Component, Input, EventEmitter, Output, SimpleChange, SimpleChanges, OnChanges} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../shared/models/Employee';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnChanges {

  @Input() data: IEmployee | null=null;
  @Output() onCloseModel = new EventEmitter();
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private toastService: ToastrService) {
    this.employeeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      doj: new FormControl('', [Validators.required])

    })

  } 
  
  ngOnChanges(): void {
    if (this.data) {
      this.employeeForm.patchValue({
        name: this.data?.name,
        email: this.data?.email,
        mobile: this.data?.mobile,
        dob: this.data?.dob,
        doj: this.data?.doj,
    })
  }
}
  onClose() {
    this.onCloseModel.emit(false);
  }
  onSubmit(){
    if (this.employeeForm.valid) {

      if (this.data){
        this.employeeService.updateEmployee(this.data.id as string, this.employeeForm.value).subscribe({next:(response)=>
          {
            this.toastService.success(response.message);
            this.onClose();
            
          }
          })

      }
      else {
      this.employeeService.createEmployee(this.employeeForm.value).subscribe({next:(response)=>
      {
        this.toastService.success(response.message);
        this.onClose();
      }
      })
     }

    }
    else {
      this.employeeForm.markAllAsTouched()
    }
  }
}
