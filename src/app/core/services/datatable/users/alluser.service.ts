import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTable } from '../../../dto/datatable/userTable.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlluserService {

  constructor( private http:HttpClient) {}

    LoadData(): Observable <UserTable[]>{
      return this.http.get<UserTable[]>("")
    }
}
