import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  currentRoute!: string;

  constructor(private route:Router, private modalService: ModalService){
    this.route.events.subscribe(() => {
      this.currentRoute = this.route.url;
    });
  }

  goto(location:string){
    console.log(location)
    this.route.navigate([location]);
  }
  openIncomeModal() {
    this.modalService.openIncomeModal();
  }
  openOutcomeModal() {
    this.modalService.openOutcomeModal();
  }

}
