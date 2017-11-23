import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeComponent } from './exchange.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: ExchangeComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ExchangeComponent
  ]
})
export class ExchangeModule { }

