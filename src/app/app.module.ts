import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: 'abc',
  authDomain: 'abc',
  databaseURL: 'abc',
  projectId: 'abc',
  storageBucket: 'abc',
  messagingSenderId: '1abc'
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
