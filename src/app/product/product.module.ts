import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    { path: '', component: ProductComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProductComponent
  ]
})
export class ProductModule { }