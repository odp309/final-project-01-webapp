import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RateTableEntry } from '../../model/RateTableEntry';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  LoadData(): Observable<RateTableEntry> {
    return this.http.get<RateTableEntry>("")
  }

}
