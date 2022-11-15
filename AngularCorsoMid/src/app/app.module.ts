import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponenteProvaComponent } from './componente-prova/componente-prova.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider'; // uso angular material che è framework css di angular
                                                             //MatSliderModule l'ho aggiungo cosi uso angular material per usare componenti prefatti
                                                              //DEVO RIAVVIARE IL SERVER QUANDO USO COMPONENTI O MODULI ANGULAR MATERIAL SENNO NON VENGONO REIINDERIZZATI
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import{FormsModule} from '@angular/forms';
import { HigelightDirective } from './direttive/higelight.directive';

import { ServizioPortaService } from './service/servizio-porta.service';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './Componenti/contact/contact.component';
import { HomeComponent } from './Componenti/home/home.component';

@NgModule({
  declarations: [ // nella declarations abbiamo i mattoncini , vari componenti
    AppComponent,
    ComponenteProvaComponent,
    HigelightDirective,
    AboutComponent,
    ContactComponent,
    HomeComponent
  ],
  imports: [ // abbiamo le librerie ossia i moduli che permettono di fare varie cose senza scrivere codice nuovo
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,


    MatSliderModule,// BEST PRATICES CREARE UN MODULO APPPARTE DOVE BUTTARCI DENTRO TUTTI I COMPONENTI MATERIAL ANGULAR E POI IMPORTARLO QUI IN APP MODULE,
                    // PROBLEMA: NELLA CREAZIONE DEI COMPONENT AVRÒ NECESSITA DI USARE DEI FALG SE FACCIO COSI

    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [ServizioPortaService], //posso avere i services direttamente referenziati qui, che sono librerie nostre con logica riusabile ovunque
  bootstrap: [AppComponent]
})
export class AppModule { }
