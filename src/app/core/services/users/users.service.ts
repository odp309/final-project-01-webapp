import { Injectable } from '@angular/core';
import { env } from '../../../env';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { RoleResponseDto } from '../../dto/user/roleResponse.dto';
import { Observable } from 'rxjs';
import { UserRequestDto } from '../../dto/user/userRequest.dto';

const getRoleApi = env.base_url + '/api/v1/private/role/get-all';
const createEmployeeAdminApi = env.base_url + '/api/v2/private/employee/for-admin-mgr/register/admin';
const createEmployeeTellerApi = env.base_url + '/api/v2/private/employee/for-admin-mgr/register/teller';
const activateEmployeeStatusApi = env.base_url + '/api/v2/private/employee/for-admin-mgr/activate-employee';
const resetPasswordApi = env.base_url + '/api/v2/private/employee/for-admin-mgr/invoke-password-reset';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) { }

  public getRoles(): Observable<any> {
    return this.http.get<any>(getRoleApi);
  }

  public createEmployeeAdmin(userData: UserRequestDto): Observable<any> {
    const req = new HttpRequest('POST', createEmployeeAdminApi, userData);
    return this.http.request(req);
  }

  public createEmployeeTeller(userData: UserRequestDto): Observable<any> {
    const req = new HttpRequest('POST', createEmployeeTellerApi, userData);
    return this.http.request(req);
  }

  public activateEmployeeStatus(userId: string): Observable<any>{
    const req = new HttpRequest('POST', activateEmployeeStatusApi, {id : userId});
    return this.http.request(req);
  }

  public resetPasswordEmployee(userId: string): Observable<any>{
    const req = new HttpRequest('POST', resetPasswordApi, {employeeId : userId});
    return this.http.request(req);
  }

}