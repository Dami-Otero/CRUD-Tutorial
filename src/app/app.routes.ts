import { Routes } from '@angular/router';
import { EmployeeComponent } from './pages/employee/employee.component';
import { IncomeComponent } from './income/income.component';
import { OutcomeComponent } from './outcome/outcome.component';
import { RecapComponent } from './recap/recap.component';

export const routes: Routes = [
    { path: 'income', component: IncomeComponent },
    { path: 'outcome', component: OutcomeComponent },
    { path: 'recap', component: RecapComponent },
    { path: '', redirectTo: '/income', pathMatch: 'full' }, //makes income default route
]; 
