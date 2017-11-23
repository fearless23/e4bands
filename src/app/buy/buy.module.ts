import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyComponent } from './buy.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: BuyComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BuyComponent
  ]
})
export class BuyModule { }
