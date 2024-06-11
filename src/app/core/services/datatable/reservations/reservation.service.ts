import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationTable } from '../../../dto/datatable/reservationTable.dto';
import { Observable } from 'rxjs';
import { env } from '../../../../env';

const getReservationsApi = env.base_url + '/api/v1/private/reservation-list/get';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http:HttpClient) { }

  LoadData(brachName: string): Observable<ReservationTable[]> {
    const payload = { brachName: brachName };
    return this.http.post<ReservationTable[]>(getReservationsApi, payload);
  }
}
