import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  customers = [
    {name: 'Арматурный завод', address: '0xDb32930e429391c1DC31C570CaAc56f08275ef23'},
    {name: 'Бетонный завод', address: '0xdb32930e429391c1dc31c570caac56f08275ef23'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
