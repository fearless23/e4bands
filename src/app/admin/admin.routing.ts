// app/projects/projects.routing.ts
// Projects Routing as a Module
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AdminComponent } from './admin.component';
import { BookingComponent } from './booking/booking.component';
import { QueryComponent} from './query/query.component';
// Routes
const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'booking', component: BookingComponent },
      { path: 'query', component: QueryComponent },
      { path: '', redirectTo: 'booking', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }

export const rc = [
  AdminComponent,
  BookingComponent,
  QueryComponent
];
