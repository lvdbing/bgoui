import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BigscreenRoutingModule } from './bigscreen-routing.module';
import { BigscreenComponent } from './bigscreen.component';
import { ShowComponent } from './show/show.component';


@NgModule({
  declarations: [
    BigscreenComponent,
    ShowComponent
  ],
  imports: [
    CommonModule,
    BigscreenRoutingModule
  ]
})
export class BigscreenModule { }
