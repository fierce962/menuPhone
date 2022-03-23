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

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.calcTotalAccount();
  }

  async calcTotalAccount(){
    const infoRequest: RequestMenu[] = await this.db.getRequestMenu('1');
    let amount = 0;
    infoRequest.forEach(request=>{
      // eslint-disable-next-line radix
      amount += parseInt(request.totalPrice);
    });
    console.log(amount);
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

}
