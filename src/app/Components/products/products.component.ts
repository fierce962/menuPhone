/* eslint-disable @typescript-eslint/dot-notation */
import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { SessionsService } from 'src/app/services/sessions/sessions.service';
import { Products, AccountProduts, StorageAccount } from 'src/app/models/interface';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit {

  @Input() products: Products[];
  @ViewChildren('inputs', { read: ElementRef }) inputs: QueryList<ElementRef>;

  accountProduts: AccountProduts[];

  constructor(private sessions: SessionsService, private storage: StorageService,
    private router: Router) { }

  ngOnInit() {
    this.hasProducts();
  }

  ngAfterViewInit(): void {
    this.hasStorageProducts();
  }

  hasProducts(): void{
    if(this.products !== undefined && this.products.length === 0){
      this.accountProduts = [... this.sessions.accountProduts];
      this.accountProduts.forEach(account => {
        this.products.push(account.product);
      });
    }
  }

  hasStorageProducts(): void{
    const account: StorageAccount = JSON.parse(this.storage.get('account'));
    if(account !== null && this.router.url === '/tabs/tab1'){
      const category: string = this.products[0].category;
      if(account[category]){
        account[category].account.forEach(product=>{
          this.inputs['_results'][product.indexProduct].nativeElement.value = product.amount;
        });
      };
    }
  }

  addOrRemoveInput(value: number, index: number): void{
    // eslint-disable-next-line radix
    const requestInput: number = parseInt(this.inputs['_results'][index].nativeElement.value);
    const operation: number = requestInput + value;
    if(operation !== 0){
      this.inputs['_results'][index].nativeElement.value = operation;
    }
  }

  validKeyInput(index: number): void{
    if(this.inputs['_results'][index].nativeElement.value !== ''){
      // eslint-disable-next-line radix
      const parseNumber: number = parseInt(this.inputs['_results'][index].nativeElement.value);
      if(!isNaN(parseNumber)){
        this.inputs['_results'][index].nativeElement.value = parseNumber;
      }else{
        this.inputs['_results'][index].nativeElement.value = '';
      }
    }
  }

  blurInput(index: number): void{
    if(this.inputs['_results'][index].nativeElement.value === ''){
      this.inputs['_results'][index].nativeElement.value = 1;
    }
  }

  addOrder(productSelect: Products, index: number): void{
    const inputAmount = this.inputs['_results'][index].nativeElement.value;
    const calcPrice = this.calcTotalPrice(productSelect.price, inputAmount);
    if(this.sessions.accountProduts.length === 0){
      this.sessions.accountProduts.push({
        product: productSelect,
        amount: inputAmount,
        totalPrice: calcPrice
      });
    }else{
      this.sessions.accountProduts.forEach(product =>{
        product.amount = inputAmount;
        product.totalPrice = calcPrice;
      });
    }
    this.createAccount(productSelect, calcPrice, inputAmount, index);
  }

  createAccount(productSelect: Products, calcPrice: string, inputAmount: string, index: number): void{
    let account: StorageAccount = JSON.parse(this.storage.get('account'));
    if(account === null || !account[productSelect.category]){
      if(account === null){
        account = {};
      }
      account[productSelect.category] = {
        account: [{
          amount: inputAmount,
          totalPrice: calcPrice,
          product: productSelect,
          indexProduct: index
        }]
      };
    }else{
      const productExists: boolean = account[productSelect.category].account.some(product =>{
          if(product.product.id === productSelect.id){
            product.amount = inputAmount;
            product.totalPrice = calcPrice;
            return true;
          }
        });
      if(!productExists){
        account[productSelect.category].account.push({
          amount: inputAmount,
          totalPrice: calcPrice,
          product: productSelect,
          indexProduct: index
        });
      }
    };
    this.setStorageAccount(account);
  }

  setStorageAccount(account: StorageAccount): void{
    this.storage.set('account', JSON.stringify(account));
  }

  calcTotalPrice(price: string , inputAmount: string): string{
    const parsePrice = price.split('.').join('');
    // eslint-disable-next-line radix
    return ( parseInt(parsePrice) * parseInt(inputAmount) ).toString();
  }
}
