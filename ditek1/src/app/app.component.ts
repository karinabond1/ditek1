import {Component, OnInit} from '@angular/core';
import Web3 from 'web3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  client = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/a17cf29ba47744768d09f9cbfd0dda1c'));
  contract = null;
  abiJson = JSON.parse('[{"constant":false,"inputs":[' +
    '{"internalType":"uint256","name":"el_token","type":"uint256"},' +
    '{"internalType":"uint256","name":"kg_token","type":"uint256"}],' +
    '"name":"edit","outputs":[{"internalType":"uint256","name":"","type":"uint256"},' +
    '{"internalType":"uint256","name":"","type":"uint256"}],' +
    '"payable":false,"stateMutability":"nonpayable","type":"function"},' +
    '{"constant":false,"inputs":[{"internalType":"address","name":"_reciver","type":"address"},' +
    '{"internalType":"uint256","name":"el_token","type":"uint256"},' +
    '{"internalType":"uint256","name":"kg_token","type":"uint256"}],' +
    '"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],' +
    '"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],' +
    '"payable":false,"stateMutability":"nonpayable","type":"constructor"},' +
    '{"constant":true,"inputs":[{"internalType":"address","name":"_addr","type":"address"}],' +
    '"name":"balanceOff","outputs":[{"internalType":"uint256","name":"","type":"uint256"},' +
    '{"internalType":"uint256","name":"","type":"uint256"}],' +
    '"payable":false,"stateMutability":"view","type":"function"}]');
  contractAddress = '0x16eeC86D0eA14d1F14aC9BbDE193F4818a65d971';

  // tslint:disable-next-line:variable-name
  counters_info = [
    {
      ee: 0,
      co: 0,
      gen1: 0,
      gen2: 0,
      name: 'Приморская станция'
    },
    {
      ee: 0,
      co: 0,
      gen1: 0,
      gen2: 0,
      name: 'Запорожская станция'
    },
    {
      ee: 0,
      co: 0,
      gen1: 0,
      gen2: 0,
      name: 'Ботиевская станция'
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
