import { Routes } from '@angular/router';
import { EmployeeComponent } from './pages/employee/employee.component';
import { IncomeComponent } from './income/income.component';
import { OutcomeComponent } from './outcome/outcome.component';
import { RecapComponent } from './recap/recap.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';

export const routes: Routes = [ //array to define routes 
    { path: '', redirectTo: '/income', pathMatch: 'full' }, //makes income default route, '' for initial url
    { path: 'income', component: IncomeComponent },
    { path: 'outcome', component: OutcomeComponent },
    { path: 'income/:name', component: CompanyDetailComponent, data: { type: 'income' } },
    { path: 'outcome/:name', component: CompanyDetailComponent, data: { type: 'outcome' } },
    { path: 'recap', component: RecapComponent },
]; 
