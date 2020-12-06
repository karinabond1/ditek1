import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() factory: any;
  @Input() client: any;
  @Output() updateBalances = new EventEmitter<string>();
  @Output() addTransaction = new EventEmitter<object>();

  @Input() customers: object[];
  @Input() contract: any;
  @Input() contractAddress: any;

  constructor() {
  }

  ngOnInit() {
  }

  sendInfoTwo(number) {
    this.customers.forEach((val: any, key: any) => {
      if (key === number) {
        this.contract.methods.balanceOff(this.factory[0].address).call().then(async (data) => {
          console.log('get', data[0]);
          console.log(this.factory[0].address);
          console.log(this.factory[0].products[0].address);

          // tslint:disable-next-line:prefer-const
          const privateKey = new Buffer(this.factory[0].pk, 'hex');
          const Tx = require('ethereumjs-tx').Transaction;
          const txCount = await this.client.eth.getTransactionCount(this.factory[0].address);

          const rawTx = {
            nonce: this.client.utils.toHex(txCount),
            gasLimit: this.client.utils.toHex(200000),
            gasPrice: this.client.utils.toHex(60e9), // 10 Gwei
            from: this.factory[0].address,
            to: this.contractAddress,
            value: '0x00',
            // tslint:disable-next-line:radix max-line-length
            data: this.contract.methods.transfer(this.factory[0].products[0].address.toString(), parseInt(data[0]), parseInt(data[1])).encodeABI(),
          };
          // tslint:disable-next-line:prefer-const
          let tx = new Tx(rawTx, {chain: 'ropsten'});

          tx.sign(privateKey);

          const hash = await this.waitForHash('0x' + tx.serialize().toString('hex'), key, val.products[0].address);
          console.log(hash);
          this.addTransaction.emit({event, hash});
          // tslint:disable-next-line:variable-name
          this.contract.methods.balanceOff(val.address).call().then((data_info) => {
            console.log('!!!!!', data_info);
          });
        });
      }
    });
  }

  sendInfo(number) {
    this.customers.forEach((val: any, key: any) => {
      if (key === number) {
        this.contract.methods.balanceOff(val.products[0].address).call().then(async (data) => {
          console.log('get', data[0]);
          console.log(val.products[0].address);
          console.log(this.factory[0].products[0].address);

          // tslint:disable-next-line:prefer-const
          const privateKey = new Buffer(val.products[0].pk, 'hex');
          const Tx = require('ethereumjs-tx').Transaction;
          const txCount = await this.client.eth.getTransactionCount(val.products[0].address);

          const rawTx = {
            nonce: this.client.utils.toHex(txCount),
            gasLimit: this.client.utils.toHex(200000),
            gasPrice: this.client.utils.toHex(60e9), // 10 Gwei
            from: val.products[0].address,
            to: this.contractAddress,
            value: '0x00',
            // tslint:disable-next-line:radix max-line-length
            data: this.contract.methods.transfer(this.factory[0].products[0].address.toString(), parseInt(data[0]), parseInt(data[1])).encodeABI(),
          };
          // tslint:disable-next-line:prefer-const
          let tx = new Tx(rawTx, {chain: 'ropsten'});

          tx.sign(privateKey);

          const hash = await this.waitForHash('0x' + tx.serialize().toString('hex'), key, val.products[0].address);
          console.log(hash);
          this.addTransaction.emit({event, hash});
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
          // tslint:disable-next-line:variable-name
          this.contract.methods.balanceOff(address).call().then((data_info) => {
            this.updateBalances.next('updateBalances');
          });
        });
    });
  }

}
