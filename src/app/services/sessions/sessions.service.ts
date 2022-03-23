import { Injectable } from '@angular/core';
import { AccountProduts } from '../../models/interface';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  accountProduts: AccountProduts[] = [];

  constructor() { }

}
