import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './Interceptor/token.interceptor';
import { ToastrModule } from 'ngx-toastr'
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import {provideNgxStripe} from 'ngx-stripe'
import { ToastService, AngularToastifyModule } from 'angular-toastify';


export const appConfig: ApplicationConfig = {
  providers: [ToastService,provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withInterceptors([tokenInterceptor])), BrowserAnimationsModule, importProvidersFrom(ToastrModule.forRoot(
    {
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
    }

  )), provideAnimations(
  ),provideNgxStripe('pk_test_51RmGAID02Cz1EdUCpXxGYM7Itog2vmd83yoBxgh5roaqrfa7YHWyi5zntyJ7kRLBvAbmqQ988D1GIowfLlq0EDBP00WETZV28L')],
};
