/* eslint-disable @typescript-eslint/dot-notation */
import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SessionsService } from 'src/app/services/sessions/sessions.service';
import { Products, AccountProduts } from 'src/app/models/interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  @Input() products: Products[];
  @ViewChildren('inputs', { read: ElementRef }) inputs: QueryList<ElementRef>;

  accountProduts: AccountProduts[];

  constructor(private sessions: SessionsService) { }

  ngOnInit() {
    this.hasProducts();
  }

  hasProducts(): void{
    if(this.products !== undefined && this.products.length === 0){
      this.accountProduts = [... this.sessions.accountProduts];
      this.accountProduts.forEach(account => {
        this.products.push(account.product);
      });
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
    if(this.sessions.accountProduts.length === 0){
      this.sessions.accountProduts.push({
        product: productSelect,
        amount: inputAmount,
        totalPrice: this.calcTotalPrice(productSelect.price, inputAmount)
      });
    }else{
      this.sessions.accountProduts.forEach(product =>{
        product.amount = inputAmount;
        product.totalPrice = this.calcTotalPrice(productSelect.price, inputAmount);
      });
    }
  }

  calcTotalPrice(price: string , inputAmount: string): string{
    const parsePrice = price.split('.').join('');
    // eslint-disable-next-line radix
    return ( parseInt(parsePrice) * parseInt(inputAmount) ).toString();
  }
}
