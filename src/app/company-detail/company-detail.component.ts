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
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private companyService: CompanyService) { } //routing purposes and accessing company.services

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id')!; //provides company id
    this.loadCompanyDetails(this.companyId); //load company details using id
  }

  loadCompanyDetails(id: string) {
    this.companyService.getCompanyIncome(id).subscribe({ //trying to get the income data
      next: (incomes) => { //had trouble loading data in
      },
    });
  }
}
