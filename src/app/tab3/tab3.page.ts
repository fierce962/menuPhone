import { Component, OnInit } from '@angular/core';
import { AccountProduts, Products, RequestMenu } from '../models/interface';
import { DatabaseService } from '../services/database/database.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  totalAmount: string;

  viewPedidos = false;

  products: Products[] = [];

  amount: string[] = [];

  viewAllProducts = false;

  infoRequest: RequestMenu[];

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.calcTotalAccount();
  }

  async calcTotalAccount(){
    this.infoRequest  = await this.db.getRequestMenu('1');
    let amount = 0;
    this.infoRequest.forEach(request=>{
      // eslint-disable-next-line radix
      amount += parseInt(request.totalPrice);
    });
    this.totalAmount = this.parseAmount(amount);
  }

  parseAmount(amount: number): string{
    const parseAmount: string[] = [];
    const amountToArray: string[] = amount.toString().split('');
    const maxLong: number = amountToArray.length -1;
    amountToArray.reverse().forEach((individualNumber, index) =>{
      parseAmount.push(individualNumber);
      if((index + 1) % 3 === 0 && index < maxLong){
        parseAmount.push('.');
      };
    });
    return parseAmount.reverse().join('');
  }

  async viewProducts(): Promise<void>{
    await Promise.all(
      // eslint-disable-next-line arrow-body-style
      this.infoRequest.map(info=>{
        return new Promise(resolve=>{
          this.db.getProductsByRequestMenu(info.idProduct).then(product=>{
            this.products.push(product);
            this.amount.push(info.amount);
            resolve('');
          });
        });
      })
    );
    this.viewAllProducts = true;
  }

}
