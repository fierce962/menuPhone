import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { OptionsMenu } from 'src/app/models/interface';

@Component({
  selector: 'app-menu-products',
  templateUrl: './menu-products.component.html',
  styleUrls: ['./menu-products.component.scss'],
})
export class MenuProductsComponent implements OnInit {

  @Output() selected: EventEmitter<string> = new EventEmitter();

  allOptions: OptionsMenu;
  partialOptions: string[];
  viewOptions = false;

  numberOptions: number;

  btnRigthDisabled = false;
  btnLeftDisabled = true;

  constructor(private db: DatabaseService) { }

  ngOnInit() {}

  async selectOptionsType(select: string): Promise<void>{
    this.allOptions = await this.db.getMenuOptions(select);
    this.partialOptions = this.allOptions.options.slice(0, 5);
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

}
