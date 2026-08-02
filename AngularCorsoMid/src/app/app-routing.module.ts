import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// =============================
// GUARD
// =============================

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';



// =============================
// PAGINE PUBBLICHE
// =============================

import { HomeComponent }
from './Componenti/home/home.component';

import { ShopComponent }
from './Componenti/shop/shop.component';

import { ProductsComponent }
from './Componenti/products/products.component';

import { AboutComponent }
from './Componenti/about/about.component';

import { ContactComponent }
from './Componenti/contact/contact.component';


import { Pag404Component } from './Componenti/pag404/pag404.component';


// =============================
// AUTENTICAZIONE
// =============================

import { LoginComponent }
from './Componenti/login/login.component';

import { RegisterComponent }
from './Componenti/register/register.component';





// =============================
// UTENTE
// =============================

import { ProfileComponent }
from './Componenti/profile/profile.component';

import { MyPlannersComponent }
from './Componenti/my-planners/my-planners.component';

import { MyOrdersComponent }
from './Componenti/my-orders/my-orders.component';

import { FavoritesComponent }
from './Componenti/favorites/favorites.component';





// =============================
// E-COMMERCE
// =============================

import { CartComponent }
from './Componenti/cart/cart.component';

import { CheckoutComponent }
from './Componenti/checkout/checkout.component';

import { PaymentSuccessComponent }
from './Componenti/payment-success/payment-success.component';






// =============================
// ADMIN
// =============================

import { AdminComponent }
from './Componenti/admin/admin.component';

import { DashboardComponent }
from './Componenti/admin/dashboard/dashboard.component';

import { AdminPlannersComponent }
from './Componenti/admin/admin-planners/admin-planners.component';

import { AdminOrdersComponent }
from './Componenti/admin/admin-orders/admin-orders.component';

import { AdminPaymentsComponent }
from './Componenti/admin/admin-payments/admin-payments.component';

import { AdminUsersComponent }
from './Componenti/admin/admin-users/admin-users.component';

import { AdminUploadComponent }
from './Componenti/admin-upload-planner/admin-upload-planner.component';






const routes: Routes = [




// =================================================
// HOME
// URL: /
// =================================================

{
 path:'',
 component:HomeComponent
},





// =================================================
// SHOP
// URL: /shop
// =================================================

{
 path:'shop',
 component:ShopComponent
},





// =================================================
// DETTAGLIO PRODOTTO
// URL: /products/1
// =================================================

{
 path:'product/:id',
 redirectTo:'products/:id'
},




// =================================================
// ABOUT
// =================================================

{
 path:'about',
 component:AboutComponent
},





// =================================================
// CONTATTI
// =================================================

{
 path:'contact',
 component:ContactComponent
},






// =================================================
// AUTENTICAZIONE
// =================================================

{
 path:'login',
 component:LoginComponent
},



{
 path:'register',
 component:RegisterComponent
},






// =================================================
// CARRELLO
// =================================================

{
 path:'cart',
 component:CartComponent,
canActivate:[AuthGuard]

},






// =================================================
// CHECKOUT
// Utente autenticato
// =================================================

{
 path:'checkout',
 component:CheckoutComponent,
 canActivate:[AuthGuard]
},





// =================================================
// PAGAMENTO COMPLETATO
// Stripe success
// =================================================

{
 path:'payment-success',
 component:PaymentSuccessComponent,
 canActivate:[AuthGuard]
},






// =================================================
// AREA UTENTE
// =================================================

{
 path:'profile',
 component:ProfileComponent,
 canActivate:[AuthGuard]
},



{
 path:'favorites',
 component:FavoritesComponent,
 canActivate:[AuthGuard]
},



{
 path:'my-orders',
 component:MyOrdersComponent,
 canActivate:[AuthGuard]
},



{
 path:'my-planners',
 component:MyPlannersComponent,
 canActivate:[AuthGuard]
},







// =================================================
// AREA ADMIN
//
// URL BASE:
// /admin
//
// Protetta da AdminGuard
//
// Figli:
// /admin/dashboard
// /admin/planners
// /admin/orders
// /admin/payments
// /admin/users
// =================================================


{
 path:'admin',

 component:AdminComponent,

 canActivate:[AdminGuard],


 children:[



 // -------------------------
 // Default admin
 // /admin
 // -------------------------

 {
  path:'',
  redirectTo:'dashboard',
  pathMatch:'full'
 },




 // -------------------------
 // Dashboard
 // /admin/dashboard
 // -------------------------

 {
  path:'dashboard',
  component:DashboardComponent
 },





 // -------------------------
 // Planner
 // /admin/planners
 // -------------------------

 {
  path:'planners',
  component:AdminPlannersComponent
 },





 // -------------------------
 // Upload planner
 // /admin/upload
 // -------------------------

 {
  path:'upload',
  component:AdminUploadComponent
 },





 // -------------------------
 // Utenti
 // /admin/users
 // -------------------------

 {
  path:'users',
  component:AdminUsersComponent
 },





 // -------------------------
 // Ordini
 // /admin/orders
 // -------------------------

 {
  path:'orders',
  component:AdminOrdersComponent
 },





 // -------------------------
 // Pagamenti
 // /admin/payments
 // -------------------------

 {
  path:'payments',
  component:AdminPaymentsComponent
 }



 ]

},







// =================================================
// PAGINA NON TROVATA
// Deve stare SEMPRE alla fine
// =================================================

{
 path:'**',
 component:Pag404Component
}



];







@NgModule({

imports:[

RouterModule.forRoot(

routes,

{

scrollPositionRestoration:'top',

anchorScrolling:'enabled',

useHash:false

}

)

],

exports:[

RouterModule

]

})


export class AppRoutingModule {}