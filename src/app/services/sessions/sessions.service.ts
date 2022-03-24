import { Injectable } from '@angular/core';
import { AccountProduts, OptionsMenu } from '../../models/interface';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  menuOptions: OptionsMenu;

  constructor() { }

}
