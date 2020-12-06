import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() customers: object[];
  @Input() client: any;

  constructor() {
  }

  ngOnInit() {
  }

}
