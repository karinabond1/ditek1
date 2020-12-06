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
  counters_info = [
    {
      greenCoef: 0.95,
      ee: 0,
      co: 0,
      gen1: 0,
      gen2: 0,
      name: 'Приморская станция',
      image: 'vetr.png',
      address: '0x8C7Fd7c3c0f6405FB474Af45588D5b99a7206Af2',
      pk: 'b7480e3041bfab6f07f5175a3b097841a89d68f60ffda7a08f0d03ae1697d8c5'
    },
    {
      greenCoef: 0.85,
      ee: 0,
      co: 0,
      gen1: 0,
      gen2: 0,
      name: 'Запорожская станция',
      image: 'solar-panel.jpg',
      address: '0x8B7f76fde966fAE325Ce75Ce8055f8433297319c',
      pk: ''
    },
    {
      greenCoef: 0.7,
      ee: 0,
      co: 0,
      gen1: 0,
      gen2: 0,
      name: 'Ботиевская станция',
      image: 'humster.gif',
      address: '0xEEFC7266B9C64cC09caf68B28b00c86b6F7B85B2',
      pk: 'd3ff8376ef8f1ff24623698b3d3e88712ef02ef7b90823a4147241f759e19138',
    }
  ];

  customers = [
    {
      image: 'factory-1.png',
      name: 'ПАО «Славгородский арматурный завод»',
      address: '0xf831195b528C08Ec6823d64C63098079CbeaD5aC',
      pk: '1a9a842cbf37e91f3ced719035f56e1cf12686042ac0e9b9298e376f1c027eab',
      privateKey: '',
      balance: 0
    },
    {
      image: 'factory-2.png',
      name: 'Бетонный завод',
      address: '0x7d382968Fa55DAF3d4a2CC52421EaDC13a9FfB5D',
      pk: '2b0759ef63ed593defb5e0c0d990ecf6a6523e02b244c654479d888c57765e27',
      privateKey: '',
      balance: 0
    },
  ];

  ngOnInit() {
    this.contract = new this.client.eth.Contract(this.abiJson, this.contractAddress);

    for (const index in this.customers) {
      /*this.client.eth.getBalance(this.customers[index].address).then((data) => {
        this.customers[index].balance = parseInt(data, 10) / 1e18;
      });*/
    }
    this.counters_info.forEach((val: any, key: any) => {
      this.contract.methods.balanceOff(val.address).call().then((data) => {
        val.ee = data[0];
        val.co = data[1];
      });
    });


    // this.client.eth.getBalance('0x8C7Fd7c3c0f6405FB474Af45588D5b99a7206Af2').then((data) => {
    //   console.log(data / 1e18);
    // });


  }
}
