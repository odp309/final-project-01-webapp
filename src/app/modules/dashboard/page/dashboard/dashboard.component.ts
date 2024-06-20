import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../core/services/datatable/dashboard/dashboard.service';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { DashboardTable } from '../../../../core/dto/datatable/dashboardTable.dto';
import { StorageService } from '../../../../core/services/storage/storage.service';
import { JwtDecoderService } from '../../../../core/services/jwt/jwt-decoder.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  dashboardTable: DashboardTable | undefined;
  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();
  currentMonth: Date = new Date();
  currentYear: Date = new Date();

  constructor(
    private service: DashboardService,
    private storageService: StorageService,
    private jwtDecoderService: JwtDecoderService,
  ) {
  }
  getYear(): number {
    return this.currentYear.getFullYear();
  }
  
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
    const token = this.storageService.getToken();
    const decodedToken: any = this.jwtDecoderService.decodeToken(token);
    const branchCode = decodedToken.branchCode;

    // Define a function to fetch data
    const fetchData = () => {
      this.service.LoadData(branchCode, this.getYear()).subscribe(
        (item: DashboardTable) => {
          console.log('success', item);
          console.log('success', item.month[0]?.june);
          this.dashboardTable = item;
            this.dttrigger.next(null);
        },
        (error) => {
          console.error('Error loading data', error);
        }
      );
    };

    // Fetch data initially
    fetchData();
  }
  

}
