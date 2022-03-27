/* eslint-disable guard-for-in */
import { Component, OnInit } from '@angular/core';
import { AccountProduts, Products, RequestMenu } from '../models/interface';
import { DatabaseService } from '../services/database/database.service';
import { StorageService } from '../services/storage/storage.service';
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

  load = true;

  constructor(private db: DatabaseService, private storage: StorageService) {}

  ngOnInit(): void {
  }

  async ionViewWillEnter(): Promise<void>{
    await this.calcTotalAccount();
    if(this.viewPedidos === true){
      this.products.length = 0;
      this.amount.length = 0;
      this.viewAllProducts = false;
      await this.viewProducts();
    }
    this.load = false;
  }

  ionViewWillLeave(): void{
    this.load = true;
  }

  async calcTotalAccount(){
    this.infoRequest = await this.db.getRequestMenu(this.storage.get('desk'));
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
    const products = await this.getProductsEqualId();
    this.infoRequest.forEach(info=>{
      this.products.push(products[info.idProduct]);
      this.amount.push(info.amount);
    });
    this.viewAllProducts = true;
  }

  async getProductsEqualId(){
    const equal = this.getEquialId();
    await Promise.all(
      // eslint-disable-next-line arrow-body-style
      Object.keys(equal).map(key=>{
        return new Promise(resolve=>{
          this.db.getProductsByIdPrduct(key).then(product=>{
            equal[key] = product;
            resolve('');
          });
        });
      })
    );
    return equal;
  }

  getEquialId(): object{
    const equal = {};
    this.infoRequest.forEach(info => {
      if(equal[info.idProduct] === undefined){
        equal[info.idProduct] = 1;
      };
    });
    return equal;
  }

}
