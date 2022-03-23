import { Component, OnInit } from '@angular/core';
import { SessionsService } from '../services/sessions/sessions.service';
import { DatabaseService } from '../services/database/database.service';
import { RequestDesk, RequestMenu, StorageAccount } from '../models/interface';
import { StorageService } from '../services/storage/storage.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private sessions: SessionsService, private db: DatabaseService,
    private storage: StorageService) {}

  ngOnInit(): void {}

  endRequestMenu(): void{
    const requestDesk: RequestDesk = {
      deskNumber: '1',
      requestMenu: this.createRequestDesk()
    };
    this.db.setDeskRequest(requestDesk);
    this.storage.remove('account');
  }

  createRequestDesk(): RequestMenu[]{
    const requestMenu: RequestMenu[] = [];
    const account: StorageAccount = JSON.parse(this.storage.get('account'));
    if(account !== null){
      Object.keys(account).forEach(key=>{
        account[key].account.forEach(product=>{
          requestMenu.push({
            amount: product.amount,
            nameProduc: product.product.title,
            idProduct: product.product.id,
            totalPrice: product.totalPrice
          });
        });
      });
    }
    return requestMenu;
  }

}
