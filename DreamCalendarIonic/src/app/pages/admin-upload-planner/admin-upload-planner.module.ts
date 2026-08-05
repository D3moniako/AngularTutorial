import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminUploadPlannerPageRoutingModule } from './admin-upload-planner-routing.module';

import { AdminUploadPlannerPage } from './admin-upload-planner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminUploadPlannerPageRoutingModule
  ],
  declarations: [AdminUploadPlannerPage]
})
export class AdminUploadPlannerPageModule {}
