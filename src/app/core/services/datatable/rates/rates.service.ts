import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RateTable } from '../../../dto/datatable/rateTable.dto';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(private http:HttpClient) { }

  LoadData(): Observable<RateTable[]> {
    return this.http.get<RateTable[]>("http://156.67.214.127:8080/api/v1/public/get/exchange-rate")
  }
}
