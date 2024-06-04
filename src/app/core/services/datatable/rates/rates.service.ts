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
    return this.http.get<RateTable[]>("https://valasplus.cloud/api/v1/public/exchange-rate/get-all")
  }
}
