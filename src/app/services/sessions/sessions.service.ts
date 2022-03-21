import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AccountProduts } from '../../models/interface';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  accountProduts: AccountProduts[] = [];
  private accountProduts$: Subject<boolean> = new Subject();

  constructor() { }

  setAccountProducts(): void{
    this.accountProduts$.next(true);
  }

  getAccountProducs(): Observable<boolean>{
    return this.accountProduts$;
  }

}
