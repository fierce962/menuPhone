/* eslint-disable @typescript-eslint/dot-notation */
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RequestProduct } from '../../models/interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {


  @ViewChildren('inputs', { read: ElementRef }) inputs: QueryList<ElementRef>;

  requestProduct: RequestProduct[] = [];

  constructor() { }

  ngOnInit() {}

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

  addOrder(): void{
    //this.requestProduct.push();
  }
}
