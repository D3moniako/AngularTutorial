import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

// =============================
// PAGINE PRINCIPALI
// =============================


import { HomeComponent } 
from './Componenti/home/home.component';


import { ShopComponent } 
from './Componenti/shop/shop.component';


import { ProductsComponent } 
from './Componenti/products/products.component';


import { MyPlannersComponent } 
from './Componenti/my-planners/my-planners.component';


import { ContactComponent } 
from './Componenti/contact/contact.component';


import { AboutComponent } 
from './Componenti/about/about.component';

import { AdminComponent } 
from './Componenti/admin/admin.component'; 

import { AdminPlannersComponent } 
from './Componenti/admin/admin-planners/admin-planners.component';

import { AdminOrdersComponent } from './Componenti/admin/admin-orders/admin-orders.component';
import { DashboardComponent } 
from './Componenti/admin/dashboard/dashboard.component';

import { AdminUploadComponent } 
from './Componenti/admin-upload-planner/admin-upload-planner.component';

// =============================
// CARRELLO
// ATTIVO
// =============================


import { CartComponent }
from './Componenti/cart/cart.component';






// =============================
// FUTURO
// PAGINA 404
// =============================


// import { Pag404Component }
// from './Componenti/pag404/pag404.component';






// =============================
// FUTURO LOGIN
// =============================


import { LoginComponent }
from './Componenti/login/login.component';




import { RegisterComponent }
from './Componenti/register/register.component';








// =============================
// FUTURO CHECKOUT
// =============================


import { CheckoutComponent }
from './Componenti/checkout/checkout.component';






// =============================
// FUTURO UTENTE
// =============================
import { AdminUsersComponent } from './Componenti/admin/admin-users/admin-users.component';

import { FavoritesComponent }
from './Componenti/favorites/favorites.component';



import { ProfileComponent }
from './Componenti/profile/profile.component';









const routes: Routes = [








// =============================
// HOME
// URL:
// /
// =============================


{
path:'',
component:HomeComponent
},









// =============================
// SHOP
// URL:
// /shop
// =============================


{
path:'shop',
component:ShopComponent
},









// =============================
// DETTAGLIO PRODOTTO
// esempio:
// /products/1
// =============================


{
path:'products/:id',
component:ProductsComponent
},









// =============================
// I MIEI PLANNER
// =============================


{
path:'my-planners',
component:MyPlannersComponent,
canActivate:[AuthGuard]

},











// =============================
// ABOUT
// =============================


{
path:'about',
component:AboutComponent
},










// =============================
// CONTATTI
// =============================


{
path:'contact',
component:ContactComponent
},










// =============================
// CARRELLO
// ATTIVO
// =============================


{
path:'cart',
component:CartComponent
},


// =============================
// FAVORITI
// =============================


{
path:'favorites',
component:FavoritesComponent,
canActivate:[AuthGuard]

},











// =============================
// LOGIN
// =============================


{
path:'login',
component:LoginComponent
},










// =============================
// REGISTRAZIONE
// =============================


{
path:'register',
component:RegisterComponent
},










// =============================
// CHECKOUT
// =============================


{
path:'checkout',
component:CheckoutComponent,
canActivate:[AuthGuard]
},










// =============================
// PROFILO UTENTE
// ATTIVO
// =============================


{
path:'profile',
component:ProfileComponent,
canActivate:[AuthGuard]

},

{
 path:'admin',
 component:AdminComponent,
 canActivate:[AdminGuard],

 children:[


   {
    path:'',
    redirectTo:'dashboard',
    pathMatch:'full'
   },


   {
    path:'dashboard',
    component:DashboardComponent
   },


   {
    path:'planners',
    component:AdminPlannersComponent
   },


   {
    path:'upload',
    component:AdminUploadComponent
   },


   {
    path:'users',
    component:AdminUsersComponent
   },


   {
    path:'orders',
    component:AdminOrdersComponent
   }


 ]

},








// =============================
// FUTURO PAGINA 404
// deve essere sempre ultima
// =============================


// {
// path:'**',
// component:Pag404Component
// }






// temporaneo finché non crei Pag404Component


{
path:'**',
redirectTo:''
}




];









@NgModule({

imports:[

RouterModule.forRoot(routes)

],

exports:[

RouterModule

]

})


export class AppRoutingModule {}