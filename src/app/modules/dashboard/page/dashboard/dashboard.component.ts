import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../service/dashboard.service';
import { ExchangeRates, Rates } from '../../../../model/ExchangeRates';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { RateTableEntry } from '../../../../model/RateTableEntry';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  exchangeRateData!: ExchangeRates;
  rateTable: RateTableEntry[] = [];
  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.dtoptions = {
      info: false,
      paging: false,
      autoWidth: true,
    };
    this.loadData();
  }

  loadData() {
    this.service.LoadData().subscribe((item) => {
      this.exchangeRateData = item;
      this.populateRateTable(item.rates, item.sellRates);
      this.dttrigger.next(null);
    });
  }

  populateRateTable(rates: Rates, sellRates: Rates): void {
    this.rateTable = Object.keys(rates).map((key) => ({
      currency: key,
      rate: rates[key as keyof Rates],
      sellRate: sellRates[key as keyof Rates],
    }));
  }
}
