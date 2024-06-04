import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';



import {routes} from './app.routes'
import {HttpClientModule} from '@angular/common/http'


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), //configure router with applications routes
    importProvidersFrom(HttpClientModule), //allows http requests
    provideToastr(), 
    provideAnimations()]
};
