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
  countInfo(number) {
    this.counters_info.forEach((val: any, key: any) => {
      if ( key === number) {
        this.contract.methods.balanceOff('0x8C7Fd7c3c0f6405FB474Af45588D5b99a7206Af2').call().then((data) => {
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
          // TODO
          let privateKey = new Buffer('e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex');
          const Tx = require('ethereumjs-tx').Transaction;
          const rawTx = {
            nonce: '0x00',
            gasPrice: '0x09184e72a000',
            gasLimit: '0x2710',
            to: '0x8C7Fd7c3c0f6405FB474Af45588D5b99a7206Af2',
            value: '0x00',
            data: this.contract.methods.edit(val.ee, val.co).encodeABI(),
          };

          // tslint:disable-next-line:prefer-const
          let tx = new Tx(rawTx);
          tx.sign(privateKey);
          const serializedTx = tx.serialize();
          this.client.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
            .on('receipt', console.log);

          // const privateKey = new Buffer('6d...', 'hex');

          /*const rawTransaction = {
            from: '0x8C7Fd7c3c0f6405FB474Af45588D5b99a7206Af2',
            gasPrice: this.client.utils.toHex(2 * 1e9),
            gasLimit: this.client.utils.toHex(210000),
            to: this.contractAddress,
            value: '0x0',
            data: this.contract.methods.edit(val.ee, val.co).encodeABI(),
            nonce: this.client.utils.toHex(2 * 1e9)};*/
          /*const transaction = new TxData(rawTransaction);
          transaction.sign(privateKey);*/
        });
      }
    });
  }
}
