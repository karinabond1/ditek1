import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() factory: object[];
  @Input() client: any;
  @Output() updateBalances = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

}
