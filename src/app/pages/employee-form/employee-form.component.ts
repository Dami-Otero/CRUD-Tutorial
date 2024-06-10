import {Component, Input, EventEmitter, Output, SimpleChange, SimpleChanges, OnChanges} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../shared/models/Employee';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-form',
  standalone: true, //standalone component
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnChanges {

  @Input() data: IEmployee | null=null; //input property to recive employee data
  @Input() isEditMode: boolean=false; //shows if its in edit mode
  @Output() onCloseModel = new EventEmitter(); //notifies component about closure
  employeeForm: FormGroup; //used to manage the form

  //constructor method always gets called when an instance is created
  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private toastService: ToastrService) {
    this.employeeForm = this.fb.group({ 
      //required validators to create the form group
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      doj: new FormControl('', [Validators.required]),
      salary: [0, [Validators.required, Validators.min(0)]] 
    })

  } 
  
  ngOnChanges(): void { //used to recieve data when edited
    if (this.isEditMode && this.data) {
      //organizes data if in edit mode and not null
      this.employeeForm.patchValue({
        name: this.data?.name,
        email: this.data?.email,
        mobile: this.data?.mobile,
        dob: this.data?.dob,
        doj: this.data?.doj,
        salary: this.data?.salary
    })
  }
  else if (!this.isEditMode) //form resets if its not in edit mode
  {
    this.resetForm();
  }
}

  resetForm(){
    this.employeeForm.reset({
      name:'',
      email:'',
      mobile:'',
      dob:'',
      doj:'',
      salary: 0
    })
  }

  onClose() { //closes form
    this.onCloseModel.emit(false);
  }
  onSubmit(){ //for form submission and submit button
    console.log("Form Submitted", this.employeeForm.value); //trying to figure out why submit button doesn't work
    if (this.employeeForm.valid) {
      console.log('Updating Employee:', this.employeeForm.value);
      if (this.data){ //updates the employee if the data exists
        this.employeeService.updateEmployee(this.data.id as string, this.employeeForm.value).subscribe({next:(response)=>
          {
            this.toastService.success(response.message); //toast used to display messages to user
            this.onClose();
            
          }
          })

      }
      else { //creates new emplpyee if data does not exist
      console.log('Creating Employee:', this.employeeForm.value);
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
