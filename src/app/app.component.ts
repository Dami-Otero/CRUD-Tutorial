import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterLink, RouterLinkActive, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RoutesRecognized, RouteConfigLoadStart, RouteConfigLoadEnd, ChildActivationStart, ChildActivationEnd } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { BackButtonComponent } from './back-button/back-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RouterLink, RouterLinkActive, RouterModule, BackButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'CRUD-Tutorial';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {
    router.events.subscribe((event) => { //helps understand router events
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (event instanceof RoutesRecognized) {
        console.log('RoutesRecognized event:', event);
      } else if (event instanceof RouteConfigLoadStart) {
        console.log('RouteConfigLoadStart event:', event);
      } else if (event instanceof RouteConfigLoadEnd) {
        console.log('RouteConfigLoadEnd event:', event);
      } else if (event instanceof NavigationEnd) {
        this.isLoading = false;
      } else if (event instanceof NavigationCancel) {
        this.isLoading = false;
        this.errorMessage = 'Navigation cancelled';
      } else if (event instanceof NavigationError) {
        this.isLoading = false;
        this.errorMessage = 'Navigation error';
      } else if (event instanceof ChildActivationStart) {
        const childRoute = event.snapshot.routeConfig?.path;
        console.log(`ChildActivationStart event for ${childRoute}`);
        // Load data specific to the child component here
      } else if (event instanceof ChildActivationEnd) {
        console.log('ChildActivationEnd event:', event);
        // Perform any necessary cleanup tasks here
      }
    });
  }
}
