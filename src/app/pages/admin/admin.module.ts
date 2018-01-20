import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import shared module
import { SharedModule } from './../../shared/shared.module';
// Import admin module assets
import { AdminRoutingModule } from './admin-routing.module';
import { DragonsComponent } from './dragons/dragons.component';
import { LoadingComponent } from '../../shared/loading.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [DragonsComponent],
  exports: [DragonsComponent]
})
export class AdminModule { }
