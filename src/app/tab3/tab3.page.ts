import { Component, OnInit } from '@angular/core';
import { RequestMenu } from '../models/interface';
import { DatabaseService } from '../services/database/database.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  totalAmount: string;

  viewPedidos = false;

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
    amount.toString().split('').reverse().forEach((individualNumber, index) =>{
      parseAmount.push(individualNumber);
      if((index + 1) % 3 === 0){
        parseAmount.push('.');
      };
    });
    return parseAmount.reverse().join('');
  }

  async viewProducts(): Promise<void>{
    await Promise.all(
      this.infoRequest.map(info=> this.db.getProductsByRequestMenu(info.idProduct) )
    );
  }

}
