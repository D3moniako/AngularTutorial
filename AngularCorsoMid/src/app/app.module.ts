import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } 
from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatSliderModule } 
from '@angular/material/slider';

import { MatCardModule } 
from '@angular/material/card';

import { MatButtonModule } 
from '@angular/material/button';

import { MatInputModule } 
from '@angular/material/input';


// Direttive
import { HigelightDirective } 
from './direttive/higelight.directive';


// Services
import { ServizioPortaService } 
from './service/servizio-porta.service';

import { PlannerService } 
from './services/planner.service';

// Componenti principali
import { ComponenteProvaComponent } 
from './componente-prova/componente-prova.component';

import { AboutComponent } 
from './about/about.component';


// Componenti
import { ContactComponent } 
from './Componenti/contact/contact.component';

import { HomeComponent } 
from './Componenti/home/home.component';

import { MyPlannersComponent } 
from './Componenti/my-planners/my-planners.component';

import { ShopComponent } 
from './Componenti/shop/shop.component';

import { ProductsComponent } 
from './Componenti/products/products.component';

import { CartComponent } 
from './Componenti/cart/cart.component';

import { FavoritesComponent } 
from './Componenti/favorites/favorites.component';

import { PlannerComponent } 
from './Componenti/planner/planner.component';


// Shared
import { HeaderComponent } 
from './Componenti/shared/header/header.component';

import { FooterComponent } 
from './Componenti/shared/footer/footer.component';


// Checkout
import { CheckoutComponent } 
from './Componenti/checkout/checkout.component';


// User
import { LoginComponent } 
from './Componenti/login/login.component';

import { RegisterComponent } 
from './Componenti/register/register.component';

import { ProfileComponent } 
from './Componenti/profile/profile.component';


// Admin
import { AdminComponent } 
from './Componenti/admin/admin.component';

import { DashboardComponent } 
from './Componenti/admin/dashboard/dashboard.component';

import { AdminPlannersComponent } 
from './Componenti/admin/admin-planners/admin-planners.component';

import { AdminUploadComponent } 
from './Componenti/admin-upload-planner/admin-upload-planner.component';
import { AdminUsersComponent } from './Componenti/admin/admin-users/admin-users.component';
import { AdminOrdersComponent } from './Componenti/admin/admin-orders/admin-orders.component';



@NgModule({

declarations: [


AppComponent,


ComponenteProvaComponent,


HigelightDirective,


AboutComponent,


ContactComponent,


HomeComponent,


MyPlannersComponent,


ShopComponent,


ProductsComponent,


CartComponent,


FavoritesComponent,


PlannerComponent,


HeaderComponent,


FooterComponent,


CheckoutComponent,


LoginComponent,


RegisterComponent,


ProfileComponent,


AdminComponent,


AdminUploadComponent,

AdminPlannersComponent,

DashboardComponent,
  AdminUsersComponent,
  AdminOrdersComponent

],



imports: [


BrowserModule,


CommonModule,


AppRoutingModule,


BrowserAnimationsModule,


FormsModule,


MatSliderModule,


MatCardModule,


MatButtonModule,


MatInputModule


],



providers: [


ServizioPortaService,


PlannerService


],



bootstrap: [


AppComponent


]


})


export class AppModule { }