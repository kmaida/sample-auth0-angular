import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
// Header navigation routerLinks
import { RouterModule } from '@angular/router';
// Components
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading.component';
// Providers
import { ApiService } from './api.service';
import { ErrorComponent } from './error.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    LoadingComponent,
    ErrorComponent
  ],
  exports: [
    HeaderComponent,
    LoadingComponent,
    ErrorComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ApiService
      ]
    };
  }
}
