import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPlannersPage } from './my-planners.page';

const routes: Routes = [
  {
    path: '',
    component: MyPlannersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPlannersPageRoutingModule {}
