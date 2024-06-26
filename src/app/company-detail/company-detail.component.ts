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
  type: "income" | "outcome" = "income"

  constructor(private route: ActivatedRoute, private companyService: CompanyService) { } //routing purposes and accessing company.services

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id')!; //provides company id
    this.companyName = this.route.snapshot.paramMap.get('name')!; //provides company name
    this.type = this.route.snapshot.data['type'] || 'income';
    this.loadCompanyDetails(this.companyName, this.type); //load company details with name and type
  }

  loadCompanyDetails(name: string, type: "income" | "outcome") {
    this.companyService.getElementsByParam('http://localhost:3000', name, type, 'company').subscribe({
      next: (elements) => {
        if(type == 'income'){
          this.incomes = elements;
        } else {
          this.outcomes = elements;
        }
        
      },
    });
    // this.companyService.getCompanyOutcomeByName(name).subscribe({
    //   next: (outcomes) => {
    //     this.outcomes = outcomes;
    //   },
    // });
  }
}