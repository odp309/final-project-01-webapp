import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../core/services/datatable/dashboard/dashboard.service';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.dtoptions = {
      info: true,
      paging: true,
      autoWidth: true,
      language:{
        searchPlaceholder:"Search Exchange Rate"
      }
    };
  }
}
