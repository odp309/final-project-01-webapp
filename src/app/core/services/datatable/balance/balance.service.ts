import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BalanceTable } from '../../../dto/datatable/balanceTable.dto';
import { Observable } from 'rxjs';
import { env } from '../../../../env';

const getBalanceApi = env.base_url + '/api/v1/private/branch-reserve/get';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor( private http:HttpClient) {}

  LoadData(branchName: string): Observable<BalanceTable[]> {
    const payload = { branchName: branchName };
    return this.http.post<BalanceTable[]>(getBalanceApi, payload);
  }

}
