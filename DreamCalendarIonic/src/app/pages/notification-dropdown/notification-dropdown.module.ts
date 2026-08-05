import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationDropdownPageRoutingModule } from './notification-dropdown-routing.module';

import { NotificationDropdownPage } from './notification-dropdown.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationDropdownPageRoutingModule
  ],
  declarations: [NotificationDropdownPage]
})
export class NotificationDropdownPageModule {}
