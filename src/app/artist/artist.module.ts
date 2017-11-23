import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArtistComponent } from './artist.component';

const routes: Routes = [
  { path: '', component: ArtistComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [
    ArtistComponent
  ]
})

export class ArtistModule { }
