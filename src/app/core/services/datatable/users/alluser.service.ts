import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTable } from '../../../dto/datatable/userTable.dto';
import { Observable } from 'rxjs';
import { env } from '../../../../env';

const getEmployeeApi = env.base_url + '/api/v2/private/employee/for-admin-mgr/get-all-employees';

@Injectable({
  providedIn: 'root'
})
export class AlluserService {

  constructor( private http:HttpClient) {}

  LoadData(branchCode: string): Observable<UserTable[]> {
    const payload = { branchCode: branchCode };
    return this.http.post<UserTable[]>(getEmployeeApi, payload);
  }

}
