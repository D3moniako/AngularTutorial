import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPlannersPage } from './admin-planners.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPlannersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPlannersPageRoutingModule {}
