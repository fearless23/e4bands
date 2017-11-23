import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeProductComponent } from './exchange-product.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    { path: '', component: ExchangeProductComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ExchangeProductComponent
  ]
})
export class ExchangeProductModule { }
