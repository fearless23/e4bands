import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule, rc } from './admin.routing';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    rc
  ]
})
export class AdminModule { }
