import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';


@NgModule({

  declarations: [
    AppComponent
  ],


  imports: [

    BrowserModule,

    IonicModule.forRoot(),

    FormsModule,

    AppRoutingModule,

    SharedModule

  ],


  providers: [],


  bootstrap: [

    AppComponent

  ]

})


export class AppModule {}