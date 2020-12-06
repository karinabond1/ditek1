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
        this.contract.methods.balanceOff('0x8C7Fd7c3c0f6405FB474Af45588D5b99a7206Af2').call().then(async (data) => {
          console.log('get', data);
          console.log('data[0]', data[0]);
          console.log('data[1]', data[1]);
          val.ee = Math.floor(Math.random() * 5) + 1 + parseFloat(data[0]);
          val.co = Math.floor(Math.random() * 5) + 1 + parseFloat(data[1]);
          this.dis[number].dis = true;
          /*this.contract.methods.edit(val.ee, val.co).send({from: '0x8C7Fd7c3c0f6405FB474Af45588D5b99a7206Af2'}).then((dataEdit) => {
            console.log('change', dataEdit);
          });*/
          // tslint:disable-next-line:prefer-const
          const privateKey = new Buffer('b7480e3041bfab6f07f5175a3b097841a89d68f60ffda7a08f0d03ae1697d8c5', 'hex');
          const Tx = require('ethereumjs-tx').Transaction;
          const gasPrice = await this.client.eth.getGasPrice();
          const txCount = await this.client.eth.getTransactionCount('0x8C7Fd7c3c0f6405FB474Af45588D5b99a7206Af2');
          console.log(txCount);

          const rawTx = {
            nonce: this.client.utils.toHex(txCount),
            // gasPrice: this.client.utils.toHex(gasPrice),
            // gasLimit: this.client.utils.toHex('30000'),
            gasLimit: this.client.utils.toHex(100000),
            gasPrice: this.client.utils.toHex(60e9), // 10 Gwei
            // from: '',
            from: '0x8C7Fd7c3c0f6405FB474Af45588D5b99a7206Af2',
            to: this.contractAddress,
             value: '0x00',
            data: this.contract.methods.edit(val.ee, val.co).encodeABI(),
          };
          const infobal = await this.contract.methods.balanceOff('0x8C7Fd7c3c0f6405FB474Af45588D5b99a7206Af2').call();
          console.log('1');
          // tslint:disable-next-line:prefer-const
          let tx = new Tx(rawTx, { chain: 'ropsten' });
          // console.log(tx);

          console.log('2');
          tx.sign(privateKey);
          console.log('3');
          // let serializedTx = tx.serialize().toString('hex');
          console.log('0x' + tx.serialize().toString('hex'));

          // let infoo = await this.client.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'));
          const hash = await this.waitForHash('0x' + tx.serialize().toString('hex'));
          console.log(hash);
          console.log('4');



          /*this.client.eth.sendSignedTransaction('0x' + serializedTx, function (err, txHash) {

            if (txHash) {

              console.log(txHash);

            }

            else if (err && err.message) {

              console.log(err.message);

            }

            else {

              console.log('Unable to sendRawTransaction');

            }

          });*/
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
