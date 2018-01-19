import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DragonsComponent } from './dragons/dragons.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [DragonsComponent],
  exports: [DragonsComponent]
})
export class AdminModule { }
