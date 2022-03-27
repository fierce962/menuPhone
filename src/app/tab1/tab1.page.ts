import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database/database.service';
import { Products } from '../models/interface';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  products: Products[];

  viewMenuProduc = true;

  constructor(private db: DatabaseService, private activeRoute: ActivatedRoute,
    private storage: StorageService) {}

  ngOnInit(): void {
    this.getDesk();
  }

  getDesk(): void{
    const desk = this.activeRoute.snapshot.paramMap.get('desk');
    if(desk !== null){
      this.storage.set('desk', desk);
    }
  }

  async getProdut(option: string): Promise<void>{
    this.products = await this.db.getProducts(option);
    this.viewMenuProduc = false;
  }
}
