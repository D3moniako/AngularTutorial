import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NotificationDropdownComponent } from './components/notification-dropdown/notification-dropdown.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';


@NgModule({

  declarations: [

    HeaderComponent,

    FooterComponent,

    ProductCardComponent,

    NotificationDropdownComponent,

    NotificationComponent,
     SideMenuComponent,
     

  ],


  imports: [

    CommonModule,

    FormsModule,

    IonicModule,

    RouterModule

  ],


  exports: [

    HeaderComponent,

    FooterComponent,

    ProductCardComponent,
    

    NotificationDropdownComponent,

    NotificationComponent,
    SideMenuComponent,

  ]

})

export class SharedModule {}