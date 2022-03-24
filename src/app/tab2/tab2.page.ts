import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database/database.service';
import { RequestDesk, RequestMenu, StorageAccount } from '../models/interface';
import { StorageService } from '../services/storage/storage.service';
import { SessionsService } from '../services/sessions/sessions.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  viewProducts = false;
  btnEndOrder = false;

  constructor(private db: DatabaseService,
    private storage: StorageService,
    private sessions: SessionsService) {}

  ngOnInit(): void {
    this.sessions.getRemoveProduct().subscribe(remove=>{
      this.btnEndOrder = !remove;
    });
  }

  ionViewWillEnter(): void{
    this.viewProducts = true;
    this.viewbtnOrder();
  }

  ionViewWillLeave(): void{
    this.viewProducts = false;
    this.btnEndOrder = false;
  }

  viewbtnOrder(): void{
    if(this.storage.get('account') !== null){
      this.btnEndOrder = true;
    }
  }

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
