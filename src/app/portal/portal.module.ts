import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzIconModule } from 'ng-zorro-antd/icon';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    PortalComponent,
    HomeComponent
  ],
  imports: [
    NzIconModule,
    CommonModule,
    PortalRoutingModule
  ]
})
export class PortalModule { }
