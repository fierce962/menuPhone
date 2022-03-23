import { Component } from '@angular/core';
import { DatabaseService } from '../services/database/database.service';
import { Products } from '../models/interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  products: Products[];

  viewMenuProduc = true;

  constructor(private db: DatabaseService) {}

  async getProdut(option: string): Promise<void>{
    this.products = await this.db.getProducts(option);
    this.viewMenuProduc = false;
  }
}
