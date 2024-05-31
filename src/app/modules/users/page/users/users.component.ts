import { Component, OnInit } from '@angular/core';
import { Config } from 'datatables.net';
import { AlluserService } from '../../../../core/services/datatable/users/alluser.service';
import { UserTable } from '../../../../core/dto/datatable/userTable.dto';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  userTable: UserTable[] = [];
  dtoptions:Config={}
  dttrigger: Subject<any> = new Subject<any>();


  constructor(private service:AlluserService){}


ngOnInit(): void {
    this.dtoptions = {
      paging: true,
      pagingType: "full_number",
      autoWidth: true,
      language:{
        searchPlaceholder:"Search User"
      }
    }, this.loadData()
  }

  loadData() {
    this.service.LoadData().subscribe((item) => {
      this.userTable = item;
      this.dttrigger.next(null);
    },
    (error) => {
      console.error('Error loading data', error);
    }
  );
}

  addNewUser():void{
    console.log("navigate to add user page")
  }

  deleteUser():void {
    console.log("delete this user")
  }
  
  generatePassword():void {
    console.log("request generate user password")
  }
}
