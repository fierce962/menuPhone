import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductViewComponent } from '../product-view/product-view.component';


@NgModule({
  declarations: [ProductsComponent, ProductViewComponent],
  imports: [
    CommonModule
  ],
  exports: [ProductsComponent]
})
export class ProductsModule { }
