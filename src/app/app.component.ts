import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'final-project-01-webapp';

  constructor(private http: HttpClient){}

  callApiHandler(){
    this.http.get('https://www.example.com').subscribe((res)=>{},)
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
