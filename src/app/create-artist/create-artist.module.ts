import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateArtistComponent } from './create-artist.component';

const routes: Routes = [
    { path: '', component: CreateArtistComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [
    CreateArtistComponent
  ]
})
export class CreateArtistModule { }