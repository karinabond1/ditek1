import {Component, Input, OnInit} from '@angular/core';
import {TxData} from 'ethereumjs-tx';

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.css']
})
export class CountersComponent implements OnInit {

  constructor() { }

  @Input() show11: boolean;
  @Input() show12: boolean;
  @Input() show21: boolean;
  @Input() show22: boolean;
  @Input() show31: boolean;
  @Input() show32: boolean;

  // tslint:disable-next-line:variable-name
  @Input() counters_info: any;

  @Input() contract: any;

  @Input() client: any;

  @Input() contractAddress: any;

  public dis = [
    {
      dis: false
    },
    {
      dis: false
    },
    {
      dis: false
    }
  ];

  ngOnInit() {
  }

  // tslint:disable-next-line:variable-name
  showInfo(number) {
    switch (number) {
      case 11 :
        this.show11 = true;
        break;
      case 12 :
        this.show12 = true;
        break;
      case 21 :
        this.show21 = true;
        break;
      case 22 :
        this.show22 = true;
        break;
      case 31:
        this.show31 = true;
        break;
      case 32:
        this.show32 = true;
        break;
    }
  }

  // tslint:disable-next-line:variable-name
  // @ts-ignore
  // tslint:disable-next-line:variable-name
   async countInfo(number) {
    this.counters_info.forEach((val: any, key: any) => {
      if ( key === number) {
        this.contract.methods.balanceOff(val.address).call().then(async (data) => {
          const randomNumber = Math.round((Math.random() * 10) + 1);
          this.dis[number].dis = true;
          console.log('get', data);
          console.log('randomNumber', randomNumber);
          console.log('randomNumber cof', randomNumber * val.greenCoef);

          // tslint:disable-next-line:prefer-const
          const privateKey = new Buffer(val.pk, 'hex');
          const Tx = require('ethereumjs-tx').Transaction;
          const txCount = await this.client.eth.getTransactionCount(val.address);

          const rawTx = {
            nonce: this.client.utils.toHex(txCount),
            gasLimit: this.client.utils.toHex(100000),
            gasPrice: this.client.utils.toHex(60e9), // 10 Gwei
            from: val.address,
            to: this.contractAddress,
            value: '0x00',
            data: this.contract.methods.edit(Math.round(randomNumber), randomNumber * val.greenCoef).encodeABI(),
          };
          // tslint:disable-next-line:prefer-const
          let tx = new Tx(rawTx, { chain: 'ropsten' });

          tx.sign(privateKey);

          // let infoo = await this.client.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'));
          const hash = await this.waitForHash('0x' + tx.serialize().toString('hex'));
          console.log(hash);

          val.ee = Math.round(randomNumber + parseFloat(data[0]));
          val.co += Math.round((randomNumber * val.greenCoef) + parseFloat(data[1]));

          // tslint:disable-next-line:variable-name
          this.contract.methods.balanceOff(val.address).call().then((data_info) => {
            console.log('!!!!!', data_info);
          });

        });
      }
    });
  }

 waitForHash(signedTx) {
    return new Promise((resolve, reject) => {
      this.client.eth.sendSignedTransaction(signedTx)
        .once('transactionHash', (hash) => {
          resolve(hash);
        });
    });
  }
}
