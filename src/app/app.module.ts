import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ScoreComponent } from './score/score.component';
import { StreamComponent } from './stream/stream.component';

import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'

import {FormsModule} from '@angular/forms';


var firebaseconfig = {
  apiKey: "AIzaSyDHm_FCwm2itHdsMnpdwRZOuZYhy54O5-E",
  authDomain: "firestore-2bb06.firebaseapp.com",
  databaseURL: "https://firestore-2bb06.firebaseio.com",
  projectId: "firestore-2bb06",
  storageBucket: "firestore-2bb06.appspot.com",
  messagingSenderId: "194539216164"
};



@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    StreamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }


