import { Injectable } from '@angular/core';
import { env } from '../../../env';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { RoleDto } from '../../dto/user/role.dto';
import { Observable } from 'rxjs';
import { UserDto } from '../../dto/user/user.dto';

const getRoleApi = env.base_url + '/api/v1/private/role/get-all';
const createEmployeeAdminApi = env.base_url + '/api/v1/private/employee/for-admin-mgr/register/admin';
const createEmployeeTellerApi = env.base_url + '/api/v1/private/employee/for-admin-mgr/register/teller';

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

  public createEmployeeAdmin(userData: UserDto): Observable<any> {
    const req = new HttpRequest('POST', createEmployeeAdminApi, userData);
    return this.http.request(req);
  }

  public createEmployeeTeller(userData: UserDto): Observable<any> {
    const req = new HttpRequest('POST', createEmployeeTellerApi, userData);
    return this.http.request(req);
  }

}