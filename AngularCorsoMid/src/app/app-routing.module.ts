import { HtmlParser } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './Componenti/contact/contact.component';
import { HomeComponent } from './Componenti/home/home.component';
// angular fa finta che i componenti siano altre pagine e permette cosi di navigare tra pagie cambiando url

// se non ho app-routing module allora uso ng g module app-routing --flat --module=app
const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'about', component:AboutComponent},
  {path: 'contact', component:ContactComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



