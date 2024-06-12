import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalancesComponent } from './page/balances/balances.component';

const routes: Routes = [
  { path: '', component: BalancesComponent, title: 'Balances' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalancesRoutingModule { }
