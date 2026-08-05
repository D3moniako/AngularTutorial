import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPaymentsPageRoutingModule } from './admin-payments-routing.module';

import { AdminPaymentsPage } from './admin-payments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPaymentsPageRoutingModule
  ],
  declarations: [AdminPaymentsPage]
})
export class AdminPaymentsPageModule {}
