import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyCwn-QfZjRq-yQdklkWMsohYekdG8wIIeY',
  authDomain: 'e4bands-2017.firebaseapp.com',
  databaseURL: 'https://e4bands-2017.firebaseio.com',
  projectId: 'e4bands-2017',
  storageBucket: 'e4bands-2017.appspot.com',
  messagingSenderId: '151854394335'
};

import { AppComponent } from './app.component';
import { AppRoutingModule, rc } from './app.routing';
import { AuthGuard } from './auth.service';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  declarations: [
    AppComponent,
    rc
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
