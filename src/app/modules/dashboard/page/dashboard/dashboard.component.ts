import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../core/services/datatable/dashboard/dashboard.service';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { DashboardTable } from '../../../../core/dto/datatable/dashboardTable.dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  // dashboardTable: DashboardTable[] = [];
  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  constructor(private service: DashboardService) {}

  public dashboardTable: DashboardTable[] = [
    { currencyCode: 'USD', currencyName: 'United States dollar', totalSales: 65, totalPurchase: 28 },
    { currencyCode: 'SGD', currencyName: 'Singapore dollar', totalSales: 59, totalPurchase: 48 },
    { currencyCode: 'JPY', currencyName: 'Japanese yen', totalSales: 80, totalPurchase: 40 },
    { currencyCode: 'EUR', currencyName: 'Euro', totalSales: 81, totalPurchase: 19 },
    { currencyCode: 'GBP', currencyName: 'Pound sterling', totalSales: 56, totalPurchase: 86 },
    { currencyCode: 'AUD', currencyName: 'Australian dollar', totalSales: 55, totalPurchase: 27 },
    { currencyCode: 'MYR', currencyName: 'Malaysian ringgit', totalSales: 40, totalPurchase: 90 },
    { currencyCode: 'NZD', currencyName: 'New Zealand dollar', totalSales: 70, totalPurchase: 50 },
    { currencyCode: 'THB', currencyName: 'Thai baht', totalSales: 65, totalPurchase: 30 },
    { currencyCode: 'CNY', currencyName: 'Chinese yuan', totalSales: 75, totalPurchase: 60 },
    { currencyCode: 'CAD', currencyName: 'Canadian dollar', totalSales: 60, totalPurchase: 40 },
    { currencyCode: 'CHF', currencyName: 'Swiss Franc', totalSales: 55, totalPurchase: 45 },
    { currencyCode: 'HKD', currencyName: 'Hong Kong dollar', totalSales: 70, totalPurchase: 35 }
  ];

  ngOnInit(): void {
    this.dtoptions = {
      columnDefs: [{ targets: '_all', className: 'dt-head-center' }],
      info: true,
      paging: true,
      autoWidth: true,
      language:{
        searchPlaceholder:"Search Exchange Rate"
      }
    };
    this.loadData();
  }

  loadData() {
    this.service.LoadData().subscribe(
      // (item) => {
      //   this.dashboardTable = item;
      (item: DashboardTable) => {
        this.dashboardTable.push(item)
        this.dttrigger.next(null);
      },
      (error) => {
        console.error('Error loading data', error);
      }
    );
  }

}
