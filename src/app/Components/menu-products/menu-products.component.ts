import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { OptionsMenu } from 'src/app/models/interface';
import { SessionsService } from 'src/app/services/sessions/sessions.service';

@Component({
  selector: 'app-menu-products',
  templateUrl: './menu-products.component.html',
  styleUrls: ['./menu-products.component.scss'],
})
export class MenuProductsComponent implements OnInit {

  @Output() selectedOption: EventEmitter<string> = new EventEmitter();

  menuOptions: OptionsMenu;
  viewOptions = false;

  constructor(private db: DatabaseService, private session: SessionsService) { }

  ngOnInit() {
    this.hasMenuOptions();
  }

  hasMenuOptions(): void{
    if(this.session.menuOptions !== undefined){
      this.menuOptions = this.session.menuOptions;
      this.viewOptions = true;
    }
  }

  removeMenuOptions(): void{
    this.session.menuOptions = undefined;
    this.viewOptions = false;
  }

  async selectOptionsType(select: string): Promise<void>{
    this.menuOptions = await this.db.getMenuOptions(select);
    this.session.menuOptions = this.menuOptions;
    this.viewOptions = true;
  }

  setOption(optionName: string): void{
    this.selectedOption.emit(optionName);
  }

}
