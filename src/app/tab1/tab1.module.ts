import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ScanQrComponent } from '../Components/scan-qr/scan-qr.component';
import { MenuProductsComponent } from '../Components/menu-products/menu-products.component';
import { ProductsComponent } from '../Components/products/products.component';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page, ScanQrComponent, MenuProductsComponent, ProductsComponent]
})
export class Tab1PageModule {}
