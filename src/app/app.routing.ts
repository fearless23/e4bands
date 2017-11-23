// app.routing.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';


import { AuthGuard } from './auth.service';

// Routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'buy', loadChildren: './buy/buy.module#BuyModule' },
  { path: 'exchange', loadChildren: './exchange/exchange.module#ExchangeModule'},
  { path: 'band', loadChildren: './band/band.module#BandModule'},

  {
    path: 'product/:id',
    loadChildren: './product/product.module#ProductModule'
  },
  {
    path: 'exchange-product/:id',
    loadChildren: './exchange-product/exchange-product.module#ExchangeProductModule'
  },
  {
    path: 'artist/:id',
    loadChildren: './artist/artist.module#ArtistModule'
  },

  {
    path: 'sell',
    loadChildren: './sell/sell.module#SellModule',
    canActivate: [AuthGuard]
  },
  { path: 'create-artist',
    loadChildren: './create-artist/create-artist.module#CreateArtistModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    loadChildren: './contact/contact.module#ContactModule',
    canActivate: [AuthGuard]
  },
  { path: 'about', loadChildren: './about/about.module#AboutModule' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }

export const rc = [
  HeaderComponent,
  FooterComponent,
  HomeComponent,
  NotFoundComponent
];
