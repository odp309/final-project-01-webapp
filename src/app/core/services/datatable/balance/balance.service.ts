import { HttpClient, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BalanceTable } from '../../../dto/datatable/balanceTable.dto';
import { Observable } from 'rxjs';
import { env } from '../../../../env';

const getBalanceApi = env.base_url + '/api/v2/private/branch-reserve/get';
const postAddStockApi = env.base_url + '/api/v2/private/branch-reserve/add-stock';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor( private http:HttpClient) {}

  LoadData(branchCode: string): Observable<BalanceTable[]> {
    const payload = { branchCode: branchCode };
    return this.http.post<BalanceTable[]>(getBalanceApi, payload);
  }

  AddStock(branchCode: string, currencyCode:string, amount:number): Observable<any> {
    const payload = {branchCode,currencyCode, amount};
    return this.http.post(postAddStockApi, payload)
  }

}
