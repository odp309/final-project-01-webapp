import { HttpClient, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BalanceTable } from '../../../dto/datatable/balanceTable.dto';
import { Observable } from 'rxjs';
import { env } from '../../../../env';

const getBalanceApi = env.base_url + '/api/v1/private/branch-reserve/get';
const postAddStockApi = env.base_url + '/api/v1/private/branch-reserve/add-stock';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor( private http:HttpClient) {}

  LoadData(branchCode: string): Observable<BalanceTable[]> {
    const payload = { branchCode: branchCode };
    return this.http.post<BalanceTable[]>(getBalanceApi, payload);
  }

  AddStock(branchCode: string, currencyCode:string, balance:number): Observable<any> {
    const payload = {branchCode,currencyCode, balance};
    return this.http.post(postAddStockApi, payload)
  }

}
