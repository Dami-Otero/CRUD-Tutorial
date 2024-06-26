import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { IsActiveMatchOptions, Router, UrlTree } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  currentRoute!: string;

  constructor(public route:Router, private modalService: ModalService){ //injects router and modal service into component
    this.route.events.subscribe(() => { //detects route changes
      //console.log(this.route) 
      console.log(this.route.url)
      this.currentRoute = this.route.url;
    });
  }

  goto(location:string){ //navigates to specific location
    console.log(location)
    this.route.navigate([location]); //navigates to given route
  }
  openIncomeModal() { //opens income modal
    this.modalService.openIncomeModal();
  }
  openOutcomeModal() { //opens outcome modal
    this.modalService.openOutcomeModal();
  }

  //isActive(url: string | UrlTree, matchOptions: IsActiveMatchOptions): boolean  ?

}
