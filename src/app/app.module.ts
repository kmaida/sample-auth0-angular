import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

// Import authentication module
import { AuthModule } from './auth/auth.module';
// Import page components
import { CallbackComponent } from './pages/callback.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoadingComponent } from './shared/loading.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DinosaursComponent } from './pages/dinosaurs/dinosaurs.component';
// API service
import { ApiService } from './shared/api.service';


@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    HomeComponent,
    HeaderComponent,
    LoadingComponent,
    ProfileComponent,
    DinosaursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot()
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
