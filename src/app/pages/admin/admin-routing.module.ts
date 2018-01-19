import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DragonsComponent } from './dragons/dragons.component';

const routes: Routes = [
  {
    path: '',
    component: DragonsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
