import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeRatesComponent } from './page/exchange-rates/exchange-rates.component';

const routes: Routes = [
  { path: '', component: ExchangeRatesComponent, title: 'Exchange Rates' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeRatesRoutingModule { }
