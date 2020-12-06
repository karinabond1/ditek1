import {Component, OnInit} from '@angular/core';
import Web3 from 'web3';
const abi = require('../contract-abi.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  client = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/a17cf29ba47744768d09f9cbfd0dda1c'));
  contractAddress = '0x16eeC86D0eA14d1F14aC9BbDE193F4818a65d971';
  contract = null;
  abiJson = abi;

  // tslint:disable-next-line:variable-name
  show_11 = false;
  // tslint:disable-next-line:variable-name
  show_12 = false;
  // tslint:disable-next-line:variable-name
  show_21 = false;
  // tslint:disable-next-line:variable-name
  show_22 = false;
  // tslint:disable-next-line:variable-name
  show_31 = false;
  // tslint:disable-next-line:variable-name
  show_32 = false;

  // tslint:disable-next-line:variable-name
  counters_info = [
    {
      greenCoef: 0.95,
      ee: 0,
      co: 0,
      gen1: 0,
      gen2: 0,
      name: 'Приморская станция',
      image: 'vetr.png'
    },
    {
      greenCoef: 0.85,
      ee: 0,
      co: 0,
      gen1: 0,
      gen2: 0,
      name: 'Запорожская станция',
      image: 'solar-panel.jpg'
    },
    {
      greenCoef: 0.7,
      ee: 0,
      co: 0,
      gen1: 0,
      gen2: 0,
      name: 'Ботиевская станция',
      image: 'humster.gif'
    }
  ];

  customers = [
    {
      image: 'factory-1.png',
      name: 'ПАО «Славгородский арматурный завод»',
      address: '0x8C7Fd7c3c0f6405FB474Af45588D5b99a7206Af2',
      privateKey: '',
      balance: 0
    },
    {
      image: 'factory-2.png',
      name: 'Бетонный завод',
      address: '0x8B7f76fde966fAE325Ce75Ce8055f8433297319c',
      privateKey: '',
      balance: 0
    },
  ];

  ngOnInit() {
    this.contract = new this.client.eth.Contract(this.abiJson, this.contractAddress);

    for (const index in this.customers) {
      this.client.eth.getBalance(this.customers[index].address).then((data) => {
        this.customers[index].balance = parseInt(data, 10) / 1e18;
      });
    }

    this.contract.methods.balanceOff('0x8C7Fd7c3c0f6405FB474Af45588D5b99a7206Af2').call().then((data) => {
      console.log('!!!!!', data);
    });

    // this.client.eth.getBalance('0x8C7Fd7c3c0f6405FB474Af45588D5b99a7206Af2').then((data) => {
    //   console.log(data / 1e18);
    // });


  }
}
