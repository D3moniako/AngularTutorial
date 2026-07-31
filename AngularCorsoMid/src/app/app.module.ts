import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } 
from '@angular/platform-browser/animations';

import { AppRoutingModule } 
from './app-routing.module';


// Angular Material

import { MatSliderModule } 
from '@angular/material/slider';

import { MatCardModule } 
from '@angular/material/card';

import { MatButtonModule } 
from '@angular/material/button';

import { MatInputModule } 
from '@angular/material/input';



// App

import { AppComponent } 
from './app.component';



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



// Componenti sito

import { ContactComponent } 
from './Componenti/contact/contact.component';

import { HomeComponent } 
from './Componenti/home/home.component';

import { MyPlannersComponent } 
from './Componenti/my-planners/my-planners.component';

import { ShopComponent } 
from './Componenti/shop/shop.component';

import {ProductsComponent} from './Componenti/products/products.component';

import { CartComponent } 
from './Componenti/cart/cart.component';

import { PlannerComponent } 
from './Componenti/planner/planner.component';

import { FavoritesComponent } 
from './Componenti/favorites/favorites.component';



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



// Ordini

import { MyOrdersComponent } 
from './Componenti/my-orders/my-orders.component';



// Admin

import { AdminComponent } 
from './Componenti/admin/admin.component';

import { DashboardComponent } 
from './Componenti/admin/dashboard/dashboard.component';

import { AdminPlannersComponent } 
from './Componenti/admin/admin-planners/admin-planners.component';

import { AdminUploadComponent } 
from './Componenti/admin-upload-planner/admin-upload-planner.component';

import { AdminUsersComponent } 
from './Componenti/admin/admin-users/admin-users.component';

import { AdminOrdersComponent } 
from './Componenti/admin/admin-orders/admin-orders.component';

import { AdminPaymentsComponent } 
from './Componenti/admin/admin-payments/admin-payments.component';
import { NotificationComponent } from './Componenti/notification/notification.component';





@NgModule({

declarations:[


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


PlannerComponent,


FavoritesComponent,


HeaderComponent,


FooterComponent,


CheckoutComponent,


LoginComponent,


RegisterComponent,


ProfileComponent,


MyOrdersComponent,


AdminComponent,


DashboardComponent,


AdminPlannersComponent,


AdminUploadComponent,


AdminUsersComponent,


AdminOrdersComponent,


AdminPaymentsComponent,
    NotificationComponent



],



imports:[


BrowserModule,


CommonModule,


FormsModule,




AppRoutingModule,


RouterModule,


BrowserAnimationsModule,



// Material

MatSliderModule,

MatCardModule,

MatButtonModule,

MatInputModule



],



providers:[


ServizioPortaService,


PlannerService



],



bootstrap:[


AppComponent


]


})


export class AppModule {}