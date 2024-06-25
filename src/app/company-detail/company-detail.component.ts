import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  companyId?: string;
  companyName: string = '';
  incomes: any[] = []; //store companies incomes
  outcomes: any[] = [];

  constructor(private route: ActivatedRoute, private companyService: CompanyService) { } //routing purposes and accessing company.services

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id')!; //provides company id
    this.companyName = this.route.snapshot.paramMap.get('name')!; //provides company name
    this.loadCompanyDetails(this.companyName); //load company details with name
  }

  loadCompanyDetails(name: string) {
    this.companyService.getCompanyIncomeByName(name).subscribe({ // get income data by company name
      next: (incomes) => {
        this.incomes = incomes;
      },
    });
    this.companyService.getCompanyOutcomeByName(name).subscribe({
      next: (outcomes) => {
        this.outcomes = outcomes;
      },
    });
  }
}
