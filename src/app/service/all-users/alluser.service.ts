import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserList } from '../../model/UserList';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlluserService {

  constructor( private http:HttpClient) {}

    LoadData(): Observable <UserList[]>{
      return this.http.get<UserList[]>("")
    }
}
