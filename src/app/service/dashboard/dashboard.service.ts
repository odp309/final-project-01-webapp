import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExchangeRates } from '../../model/ExchangeRates';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  LoadData(): Observable<ExchangeRates> {
    return this.http.get<ExchangeRates>("http://156.67.214.127:8080/api/v1/public/getCurrency")
  }

}
