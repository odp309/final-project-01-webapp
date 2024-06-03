import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationTable } from '../../../dto/datatable/reservationTable.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http:HttpClient) { }

  LoadData(): Observable<ReservationTable[]> {
    return this.http.get<ReservationTable[]>("")
  }
}
