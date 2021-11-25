import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermitRoutingModule } from './permit-routing.module';
import { PermitComponent } from './permit.component';


@NgModule({
  declarations: [
    PermitComponent
  ],
  imports: [
    CommonModule,
    PermitRoutingModule
  ]
})
export class PermitModule { }
