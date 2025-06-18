import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './Interceptor/token.interceptor';
import { ToastrModule } from 'ngx-toastr'
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withInterceptors([tokenInterceptor])), BrowserAnimationsModule, importProvidersFrom(ToastrModule.forRoot(
    {
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
    }

  )), provideAnimations(
  )]
};
