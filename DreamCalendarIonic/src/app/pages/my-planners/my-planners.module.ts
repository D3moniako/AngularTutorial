import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPlannersPageRoutingModule } from './my-planners-routing.module';

import { MyPlannersPage } from './my-planners.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPlannersPageRoutingModule
  ],
  declarations: [MyPlannersPage]
})
export class MyPlannersPageModule {}
