import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandComponent } from './band.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: BandComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BandComponent
  ]
})
export class BandModule { }