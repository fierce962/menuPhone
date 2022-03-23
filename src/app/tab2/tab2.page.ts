import { Component, OnInit } from '@angular/core';
import { SessionsService } from '../services/sessions/sessions.service';
import { DatabaseService } from '../services/database/database.service';
import { RequestDesk, RequestMenu } from '../models/interface';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private sessions: SessionsService, private db: DatabaseService) {}

  ngOnInit(): void {}

  endRequestMenu(): void{
    const requestDesk: RequestDesk = {
      deskNumber: '1',
      requestMenu: this.createRequestDesk()
    };
    this.db.setDeskRequest(requestDesk);
  }

  createRequestDesk(): RequestMenu[]{
    const requestMenu: RequestMenu[] = [];
    this.sessions.accountProduts.forEach(accountProduct=>{
      requestMenu.push({
        amount: accountProduct.amount,
        idProduct: accountProduct.product.id,
        nameProduc: accountProduct.product.title,
        totalPrice: accountProduct.totalPrice
      });
    });
    return requestMenu;
  }

}
