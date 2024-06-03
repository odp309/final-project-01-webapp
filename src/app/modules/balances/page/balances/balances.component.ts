import { Component } from '@angular/core';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrl: './balances.component.css'
})
export class BalancesComponent {

  // get today date, delete this if the api response is valid
  updatedAt: Date = new Date();

}
