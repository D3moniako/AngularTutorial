import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPaymentsPage } from './admin-payments.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPaymentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPaymentsPageRoutingModule {}
