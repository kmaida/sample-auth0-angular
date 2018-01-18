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


@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    HomeComponent,
    HeaderComponent,
    LoadingComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot()
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
