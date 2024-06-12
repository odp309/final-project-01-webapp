import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardTable } from '../../../dto/datatable/dashboardTable.dto';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  LoadData(): Observable<DashboardTable> {
    return this.http.get<DashboardTable>("")
  }

}
