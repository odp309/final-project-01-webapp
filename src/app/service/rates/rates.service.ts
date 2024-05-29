import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RateTableEntry } from '../../model/RateTableEntry';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(private http:HttpClient) { }

  LoadData(): Observable<RateTableEntry[]> {
    return this.http.get<RateTableEntry[]>("http://156.67.214.127:8080/api/v1/public/get/exchange-rate")
  }
}
