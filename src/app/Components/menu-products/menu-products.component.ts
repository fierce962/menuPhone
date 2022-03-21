import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { OptionsMenu } from 'src/app/models/interface';

@Component({
  selector: 'app-menu-products',
  templateUrl: './menu-products.component.html',
  styleUrls: ['./menu-products.component.scss'],
})
export class MenuProductsComponent implements OnInit {

  @Output() selectedOption: EventEmitter<string> = new EventEmitter();

  allOptions: OptionsMenu;
  partialOptions: string[];
  viewOptions = false;

  numberOptions: number;

  paginatorPosition = 0;
  paginatorOptions: number[] = [];

  btnRigthDisabled = false;
  btnLeftDisabled = true;

  constructor(private db: DatabaseService) { }

  ngOnInit() {}

  async selectOptionsType(select: string): Promise<void>{
    this.allOptions = await this.db.getMenuOptions(select);
    this.partialOptions = this.allOptions.options.slice(0, 5);
    this.calcPaginatorOptions();
    this.viewOptions = true;
  }

  changeViewOptions(newNumberOption: number): void{
    if(this.numberOptions === undefined){
      this.numberOptions = newNumberOption;
    }else{
      this.numberOptions += newNumberOption;
    }
    const positionEnd: number = this.numberOptions + 5;
    this.partialOptions = this.allOptions.options.slice(this.numberOptions, positionEnd);
    this.allowEnabledBtn();
  }

  decidePaginatorPosition(addOrRemove: number): void{
    this.paginatorPosition += addOrRemove;
  }

  calcPaginatorOptions(): void{
    let calc: number = this.allOptions.options.length / 5;
    if(!(this.allOptions.options.length % 2)){
      calc = parseFloat((calc + 1).toFixed(0));
    }
    for (let index = 0; index < calc; index++) {
      this.paginatorOptions.push(index);
    }
  }

  allowEnabledBtn(): void{
    if(this.numberOptions + 5 > this.allOptions.options.length){
      this.btnRigthDisabled = true;
    }else{
      this.btnRigthDisabled = false;
    }
    if(this.numberOptions !== undefined && this.numberOptions >= 5){
      this.btnLeftDisabled = false;
    }else{
      this.btnLeftDisabled = true;
    }
  }

  setOption(optionName: string): void{
    this.selectedOption.emit(optionName);
  }

}
