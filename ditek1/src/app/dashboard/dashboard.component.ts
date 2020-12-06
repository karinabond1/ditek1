import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() customers: object[];
  @Input() client: any;
  @Output() updateBalances = new EventEmitter<string>();
  @Input() contract: any;
  @Input() contractAddress: any;
  @Output() addTransaction = new EventEmitter<string>();


  constructor() {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:variable-name
  sendInfo(number, sender_number) {
    this.customers.forEach((val: any, key: any) => {
      if ( key === number) {
        //this.dis[key].dis = false;
        this.contract.methods.balanceOff(val.address).call().then(async (data) => {
          console.log('get', data[0]);
          console.log(val.products[0].address);

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
            // tslint:disable-next-line:radix max-line-length
            data: this.contract.methods.transfer(val.products[0].address.toString(), parseInt(data[0]), parseInt(data[1])).encodeABI(),
            // chainId: 8888
          };
          // tslint:disable-next-line:prefer-const
          let tx = new Tx(rawTx, { chain: 'ropsten' });

          tx.sign(privateKey);

          // let infoo = await this.client.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'));
          const hash = await this.waitForHash('0x' + tx.serialize().toString('hex'), key, val.address);
          console.log(hash);
          // tslint:disable-next-line:variable-name
          this.contract.methods.balanceOff(val.address).call().then((data_info) => {
            console.log('!!!!!', data_info);
          });

        });
      }
    });
  }
  waitForHash(signedTx, key, address) {
    return new Promise((resolve, reject) => {
      this.client.eth.sendSignedTransaction(signedTx)
        .once('transactionHash', (hash) => {
          resolve(hash);
        })
        .on('receipt', (receipt) => {
          console.log('Added to block');
          //this.dis[key].dis = true;
          // tslint:disable-next-line:variable-name
          this.contract.methods.balanceOff(address).call().then((data_info) => {
            this.updateBalances.next('updateBalances');
          });
        });
    });
  }
}
