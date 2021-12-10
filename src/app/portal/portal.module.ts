import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';


import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { HeaderComponent } from './assembly/header/header.component';
import { LoginInputComponent } from './assembly/login-input/login-input.component';
import { RegisterInputComponent } from './assembly/register-input/register-input.component';


@NgModule({
  declarations: [
    PortalComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    LoginInputComponent,
    RegisterInputComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzDropDownModule,
    NzMessageModule,
    NzModalModule,
    CommonModule,
    PortalRoutingModule
  ]
})
export class PortalModule { }
