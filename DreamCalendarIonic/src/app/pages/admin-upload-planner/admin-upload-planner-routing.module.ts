import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUploadPlannerPage } from './admin-upload-planner.page';

const routes: Routes = [
  {
    path: '',
    component: AdminUploadPlannerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUploadPlannerPageRoutingModule {}
