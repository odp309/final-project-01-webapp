import { Component, OnInit } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { RateTable } from '../../../../core/dto/datatable/rateTable.dto';
import { RatesService } from '../../../../core/services/datatable/rates/rates.service';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrl: './exchange-rates.component.css'
})
export class ExchangeRatesComponent implements OnInit{
  rateTable: RateTable[] = [];
  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  constructor(private service: RatesService) {}

  ngOnInit(): void {
    this.dtoptions = {
      info: true,
      paging: false,
      autoWidth: true,
      language:{
        searchPlaceholder:"Search Exchange Rate"
      },      
    };
    this.loadData();
  }

  loadData() {
    this.service.LoadData().subscribe((item) => {
      this.rateTable = item;
      this.dttrigger.next(null);
    },
    (error) => {
      console.error('Error loading data', error);
    }
  );
}
}
