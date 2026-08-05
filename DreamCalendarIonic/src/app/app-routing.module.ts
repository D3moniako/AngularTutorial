import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [



  // =========================
  // HOME
  // =========================

  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module')
      .then(m => m.HomePageModule)
  },





  // =========================
  // SHOP / PLANNER
  // =========================

  {
    path: 'shop',
    loadChildren: () =>
      import('./pages/planner/planner.module')
      .then(m => m.PlannerPageModule)
  },





  // =========================
  // DETTAGLIO PRODOTTO
  // =========================

  {
    path: 'products/:id',
    loadChildren: () =>
      import('./pages/products/products.module')
      .then(m => m.ProductsPageModule)
  },



  // vecchio collegamento

  {
    path:'product/:id',
    redirectTo:'products/:id'
  },







  // =========================
  // LOGIN
  // =========================

  {
    path:'login',
    loadChildren: () =>
      import('./pages/login/login.module')
      .then(m => m.LoginPageModule)
  },






  // =========================
  // REGISTER
  // =========================

  {
    path:'register',
    loadChildren: () =>
      import('./pages/register/register.module')
      .then(m => m.RegisterPageModule)
  },






  // =========================
  // PROFILE
  // =========================

  {
    path:'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module')
      .then(m => m.ProfilePageModule)
  },






  // =========================
  // I MIEI PLANNER
  // =========================
/*
  {
    path:'my-planners',
    loadChildren: () =>
      import('./pages/my-planners/my-planners.module')
      .then(m => m.MyPlannersPageModule)
  },
*/





  // =========================
  // I MIEI ORDINI
  // =========================
/*
  {
    path:'my-orders',
    loadChildren: () =>
      import('./pages/my-orders/my-orders.module')
      .then(m => m.MyOrdersPageModule)
  },
*/






  // =========================
  // CARRELLO
  // =========================

  {
    path:'cart',
    loadChildren: () =>
      import('./pages/cart/cart.module')
      .then(m => m.CartPageModule)
  },







  // =========================
  // CHECKOUT
  // =========================
/*
  {
    path:'checkout',
    loadChildren: () =>
      import('./pages/checkout/checkout.module')
      .then(m => m.CheckoutPageModule)
  },
*/






  // =========================
  // PAGAMENTO RIUSCITO
  // =========================
/*
  {
    path:'payment-success',
    loadChildren: () =>
      import('./pages/payment-success/payment-success.module')
      .then(m => m.PaymentSuccessPageModule)
  },
*/







  // =========================
  // CHAT
  // =========================
/*
  {
    path:'chat',
    loadChildren: () =>
      import('./pages/chat/chat.module')
      .then(m => m.ChatPageModule)
  },*/







  // =========================
  // ABOUT
  // =========================
/*
  {
    path:'about',
    loadChildren: () =>
      import('./pages/about/about.module')
      .then(m => m.AboutPageModule)
  },
*/






  // =========================
  // CONTACT
  // =========================
/*
  {
    path:'contact',
    loadChildren: () =>
      import('./pages/contact/contact.module')
      .then(m => m.ContactPageModule)
  },
*/






  // =========================
  // ADMIN
  // =========================
/*

  {
    path:'admin/dashboard',
    loadChildren: () =>
      import('./pages/admin/dashboard/dashboard.module')
      .then(m => m.DashboardPageModule)
  },



  {
    path:'admin/products',
    loadChildren: () =>
      import('./pages/admin/products/products.module')
      .then(m => m.AdminProductsPageModule)
  },



  {
    path:'admin/orders',
    loadChildren: () =>
      import('./pages/admin/orders/orders.module')
      .then(m => m.AdminOrdersPageModule)
  },



  {
    path:'admin/users',
    loadChildren: () =>
      import('./pages/admin/users/users.module')
      .then(m => m.AdminUsersPageModule)
  },

*/




  // =========================
  // 404
  // =========================

  {
    path:'**',
    redirectTo:''
  }


];





@NgModule({

  imports:[

    RouterModule.forRoot(routes,{
      scrollPositionRestoration:'top'
    })

  ],

  exports:[

    RouterModule

  ]

})


export class AppRoutingModule {}