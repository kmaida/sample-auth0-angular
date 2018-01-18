import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Providers
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: []
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthGuard,
        AdminGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true
        }
      ]
    };
  }
}
