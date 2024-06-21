import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardTable } from '../../../dto/datatable/dashboardTable.dto';
import { env } from '../../../../env';

const getWithdrawalReportApi = env.base_url + '/api/v2/private/withdrawal/get-report';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor(private http:HttpClient) { }

  LoadData(branchCode: any, year: any): Observable<DashboardTable> {
    const payload = { branchCode: branchCode, year: year };
    return this.http.post<DashboardTable>(getWithdrawalReportApi, payload);
  }

}
