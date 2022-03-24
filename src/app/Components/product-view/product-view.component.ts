import { Component, Input, OnInit } from '@angular/core';
import { Products, AccountProduts } from 'src/app/models/interface';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {

  @Input() product: Products;
  @Input() amount: string;

  constructor() { }

  ngOnInit() {}

}
