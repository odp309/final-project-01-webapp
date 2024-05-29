import { Component, OnInit } from '@angular/core';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  dtoptions:Config={}


ngOnInit(): void {
    this.dtoptions = {
      paging: false,
      pagingType: "full",
      autoWidth: true,
      language:{
        searchPlaceholder:"Search User"
      }
    }
  }

  addNewUser():void{
    console.log("navigate to add user page")
  }
}
