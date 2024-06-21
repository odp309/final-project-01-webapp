import { Injectable } from '@angular/core';
import { env } from '../../../env';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { RoleResponseDto } from '../../dto/user/roleResponse.dto';
import { Observable } from 'rxjs';
import { UserRequestDto } from '../../dto/user/userRequest.dto';
import { BranchReservationRequestDto } from '../../dto/branch-reservations/branchReservationRequest.dto';

const updateReservationStatusApi = env.base_url + '/api/v2/private/reservation-list/update-status';

@Injectable({
  providedIn: 'root'
})
export class BranchReservationsService {

  constructor(
    private http: HttpClient,
  ) { }

  public updateReservationStatus(branchReservationData: BranchReservationRequestDto): Observable<any> {
    const req = new HttpRequest('POST', updateReservationStatusApi, branchReservationData);
    return this.http.request(req);
  }

}