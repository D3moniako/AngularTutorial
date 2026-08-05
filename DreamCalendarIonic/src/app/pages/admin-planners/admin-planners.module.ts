import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPlannersPageRoutingModule } from './admin-planners-routing.module';

import { AdminPlannersPage } from './admin-planners.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPlannersPageRoutingModule
  ],
  declarations: [AdminPlannersPage]
})
export class AdminPlannersPageModule {}
