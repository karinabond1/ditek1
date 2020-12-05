import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ditek1';

  // tslint:disable-next-line:variable-name
  show_1 = false;
  // tslint:disable-next-line:variable-name
  show_2 = false;
  // tslint:disable-next-line:variable-name
  show_3 = false;

  customers = [
    {image: '', name: 'Арматурный завод', address: '0xDb32930e429391c1DC31C570CaAc56f08275ef23'},
    {image: '', name: 'Бетонный завод', address: '0xdb32930e429391c1dc31c570caac56f08275ef23'},
  ];
}
