import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {routes} from './app.routes'
import {HttpClientModule} from '@angular/common/http'
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), //configure router with applications routes
    importProvidersFrom(HttpClientModule), //allows http requests
    provideToastr(), 
    provideAnimations(), provideCharts(withDefaultRegisterables())]
};

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));