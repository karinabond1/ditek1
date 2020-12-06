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

  @Input() customers: any;

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
    this.counters_info.forEach((val: any, key: any) => {
      this.contract.methods.balanceOff(val.address).call().then((data) => {
        val.ee = data[0];
        val.co = data[1];
        if ( val.ee > 0 && val.co > 0) {
          this.dis[key].dis = true;
        }
      });
    });
  }

  // tslint:disable-next-line:variable-name
  sendInfo(number, sender_number) {
    this.counters_info.forEach((val: any, key: any) => {
      if ( key === number) {
        this.dis[key].dis = false;
        this.contract.methods.balanceOff(val.address).call().then(async (data) => {
          console.log('get', data[0]);
          console.log(this.customers[sender_number].address);

          // tslint:disable-next-line:prefer-const
          const privateKey = new Buffer(val.pk, 'hex');
          const Tx = require('ethereumjs-tx').Transaction;
          const txCount = await this.client.eth.getTransactionCount(val.address);

          const rawTx = {
            nonce: this.client.utils.toHex(txCount),
            gasLimit: this.client.utils.toHex(100000),
            gasPrice: this.client.utils.toHex(35e9), // 10 Gwei
            from: val.address,
            to: this.contractAddress,
            value: '0x00',
            // tslint:disable-next-line:radix max-line-length
            data: this.contract.methods.transfer(this.customers[sender_number].address.toString(), parseInt(data[0]), parseInt(data[1])).encodeABI(),
            // chainId: 8888
          };
          // tslint:disable-next-line:prefer-const
          let tx = new Tx(rawTx, { chain: 'ropsten' });

          tx.sign(privateKey);

          // let infoo = await this.client.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'));
          const hash = await this.waitForHash('0x' + tx.serialize().toString('hex'), key);
          console.log(hash);
          // tslint:disable-next-line:variable-name
          this.contract.methods.balanceOff(val.address).call().then((data_info) => {
            console.log('!!!!!', data_info);
          });

        });
      }
    });
  }

  // tslint:disable-next-line:variable-name
  // @ts-ignore
  // tslint:disable-next-line:variable-name
   async countInfo(number) {
    this.counters_info.forEach((val: any, key: any) => {
      if ( key === number) {
        this.contract.methods.balanceOff(val.address).call().then(async (data) => {
          this.dis[key].dis = false;
          const randomNumber = Math.round((Math.random() * 10) + 1);
          console.log('get', data);
          console.log('randomNumber', randomNumber);
          console.log('randomNumber cof', randomNumber * val.greenCoef);

          // tslint:disable-next-line:prefer-const
          const privateKey = new Buffer(val.pk, 'hex');
          const Tx = require('ethereumjs-tx').Transaction;
          const txCount = await this.client.eth.getTransactionCount(val.address);

          const rawTx = {
            nonce: this.client.utils.toHex(txCount),
            gasLimit: this.client.utils.toHex(200000),
            gasPrice: this.client.utils.toHex(60e9), // 10 Gwei
            from: val.address,
            to: this.contractAddress,
            value: '0x00',
            data: this.contract.methods.edit(Math.round(randomNumber), Math.round(randomNumber * val.greenCoef)).encodeABI(),
          };
          // tslint:disable-next-line:prefer-const
          let tx = new Tx(rawTx, { chain: 'ropsten' });

          tx.sign(privateKey);

          // let infoo = await this.client.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'));
          const hash = await this.waitForHash('0x' + tx.serialize().toString('hex'), key);
          console.log(hash);

          /*val.ee = Math.round(randomNumber + parseFloat(data[0]));
          val.co += Math.round((randomNumber * val.greenCoef) + parseFloat(data[1]));*/

          // tslint:disable-next-line:variable-name
          this.contract.methods.balanceOff(val.address).call().then((data_info) => {
            console.log('!!!!!', data_info);
          });

        });
      }
    });
  }

 waitForHash(signedTx, key) {
    return new Promise((resolve, reject) => {
      this.client.eth.sendSignedTransaction(signedTx)
        .once('transactionHash', (hash) => {
          resolve(hash);
        })
        .on('receipt', (receipt) => {
          this.dis[key].dis = true;
          // tslint:disable-next-line:variable-name
          this.contract.methods.balanceOff(this.counters_info[key].address).call().then((data_info) => {
            this.counters_info[key].ee = data_info[0];
            this.counters_info[key].co = data_info[1];
          });
        });
    });
  }
}
