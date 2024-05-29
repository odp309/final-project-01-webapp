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
      language:{
        searchPlaceholder:"Search Exchange Rate"
      }
    };
    this.loadData();
  }

  loadData() {
    this.service.LoadData().subscribe((item) => {
      this.exchangeRateData = item;
      if (item && item.buyRates && item.sellRates) {
        this.populateRateTable(item.buyRates, item.sellRates);
        this.dttrigger.next(null);
      } else {
        console.error('Invalid data received from the API', item);
      }
    },
    (error) => {
      console.error('Error loading data', error);
    }
  );
}

  populateRateTable(buyRates: Rates, sellRates: Rates): void {
    this.rateTable = Object.keys(buyRates).map((key) => ({
      currency: key,
      rate: buyRates[key as keyof Rates],
      sellRate: sellRates[key as keyof Rates],
    }));
  }
}
