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
        const randomNumber = Math.floor(Math.random() * (100 - 50) + 50);

        this.dis[number].dis = true;
        this.contract.methods.balanceOff(val.address).call().then(async (data) => {
          console.log('get', data);
          console.log('data[0]', data[0]);
          console.log('data[1]', data[1]);
          val.ee = Math.floor(randomNumber + parseFloat(data[0]));
          val.co = Math.floor((randomNumber * val.greenCoef) + parseFloat(data[1]));
          // tslint:disable-next-line:prefer-const
          const privateKey = new Buffer(val.pk, 'hex');
          const Tx = require('ethereumjs-tx').Transaction;
          const txCount = await this.client.eth.getTransactionCount(val.address);

          const rawTx = {
            nonce: this.client.utils.toHex(txCount),
            // gasPrice: this.client.utils.toHex(gasPrice),
            // gasLimit: this.client.utils.toHex('30000'),
            gasLimit: this.client.utils.toHex(100000),
            gasPrice: this.client.utils.toHex(60e9), // 10 Gwei
            // from: '',
            from: val.address,
            to: this.contractAddress,
            value: '0x00',
            data: this.contract.methods.edit(val.ee, val.co).encodeABI(),
          };
          // tslint:disable-next-line:prefer-const
          let tx = new Tx(rawTx, { chain: 'ropsten' });

          tx.sign(privateKey);
          console.log('0x' + tx.serialize().toString('hex'));

          // let infoo = await this.client.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'));
          const hash = await this.waitForHash('0x' + tx.serialize().toString('hex'));
          console.log(hash);
          console.log('4');

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
