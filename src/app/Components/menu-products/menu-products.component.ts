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
  partialOptions: string;
  viewOptions = false;

  constructor(private db: DatabaseService) { }

  ngOnInit() {}

  async selectedOptionsType(select: string): Promise<void>{
    this.allOptions = await this.db.getMenuOptions(select);
    // this.partialOptions = this.allOptions.options.filter((option, index)=>{
    //   return 
    // })
    this.viewOptions = true;
  }

}
