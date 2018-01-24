import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Route guards
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
// Components
import { HomeComponent } from './pages/home/home.component';
import { CallbackComponent } from './pages/callback.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DinosaursComponent } from './pages/dinosaurs/dinosaurs.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dinosaurs',
    component: DinosaursComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: './pages/admin/admin.module#AdminModule',
    canLoad: [AdminGuard],
    data: { role: 'admin' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
