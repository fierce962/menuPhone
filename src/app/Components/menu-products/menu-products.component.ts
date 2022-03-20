import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-products',
  templateUrl: './menu-products.component.html',
  styleUrls: ['./menu-products.component.scss'],
})
export class MenuProductsComponent implements OnInit {

  @Output() selected: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  sendSelected(select: string): void{
    this.selected.emit(select);
  }

}
