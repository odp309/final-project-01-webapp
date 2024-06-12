import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RateTable } from '../../../dto/datatable/rateTable.dto';
import { env } from '../../../../env';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(private http:HttpClient) { }

  LoadData(): Observable<RateTable[]> {
    return this.http.get<RateTable[]>( env.base_url + '/api/v1/public/exchange_rate/get-all' )
  }
}
