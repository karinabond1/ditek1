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
  products = [
    {name: 'Арматура', address: '', image: 'photo_2020-12-06 14.39.12.jpeg'},
    {name: 'Бетон', address: '', image: 'photo_2020-12-06 14.39.15.jpeg'}
  ];

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
      image: 'humster.gif',
      address: '0x8B7f76fde966fAE325Ce75Ce8055f8433297319c',
      pk: 'baf01ea5c8c013269bf0e4f34478641a1dc7d685e0c5a0292ae245af30d804bf'
    },
    {
      greenCoef: 0.7,
      ee: 0,
      co: 0,
      gen1: 0,
      gen2: 0,
      name: 'Ботиевская станция',
      image: 'solar-panel.jpg',
      address: '0xEEFC7266B9C64cC09caf68B28b00c86b6F7B85B2',
      pk: 'd3ff8376ef8f1ff24623698b3d3e88712ef02ef7b90823a4147241f759e19138',
    }
  ];

  customers = [
    {
      image: 'factory-1.png',
      name: 'ПАО «Славгородский арматурный завод»',
      address: '0xDbEA42531a17f9c442505aC42E8B214931497a66',
      pk: '0f033bb595dda3eae4b6047b8177b844430290aca1bcf83ebb866f1d5314065f',
      privateKey: '',
      balance: {cc: 0, co2: 0},
      products: [
        {
          name: 'Арматура',
          address: '0x5e0969AF56c476CB1CCAf40dA094F849a3C2e2A0',
          pk: '890262bb7fcd46db8343140f5b130cd407f4cb6ee354138cbd8f9a3349135e3c',
          image: 'photo_2020-12-06 14.39.12.jpeg',
          balance: {cc: 0, co2: 0}},
        // {name: 'Бетон', address: '', image: 'photo_2020-12-06 14.39.15.jpeg', balance: {cc: 0, co2: 0}}
      ]
    },
    {
      image: 'factory-2.png',
      name: 'Бетонный завод',
      address: '0x7d382968Fa55DAF3d4a2CC52421EaDC13a9FfB5D',
      pk: '2b0759ef63ed593defb5e0c0d990ecf6a6523e02b244c654479d888c57765e27',
      privateKey: '',
      balance: {cc: 0, co2: 0},
      products: [
        // {name: 'Арматура', address: '', image: 'photo_2020-12-06 14.39.12.jpeg', balance: {cc: 0, co2: 0}},
        {
          name: 'Бетон',
          address: '0xB1a0B608C668570eE4F877298063EaDA9C0F991B',
          pk: '6e22cf3bea2555fd5bf6fcb979f5288fa445ea1d208d330622ae588a6a57717c',
          image: 'photo_2020-12-06 14.39.15.jpeg',
          balance: {cc: 0, co2: 0}}
      ]
    },
  ];

  ngOnInit() {
    this.contract = new this.client.eth.Contract(this.abiJson, this.contractAddress);

    for (const index in this.customers) {
      this.contract.methods.balanceOff(this.customers[index].address).call()
        .then(async (data) => {
          this.customers[index].balance.cc = data[0];
          this.customers[index].balance.co2 = data[1];
        });
    }

    this.counters_info.forEach((val: any, key: any) => {
      this.contract.methods.balanceOff(val.address).call().then((data) => {
        val.ee = data[0];
        val.co = data[1];
      });
    });
  }
}
