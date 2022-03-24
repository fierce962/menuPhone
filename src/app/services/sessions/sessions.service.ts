import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OptionsMenu } from '../../models/interface';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  menuOptions: OptionsMenu;

  private removeAllProducts$: Subject<boolean> = new Subject();

  constructor() { }

  getRemoveProduct(): Observable<boolean>{
    return this.removeAllProducts$;
  }

  setRemoveProduct(): void{
    this.removeAllProducts$.next(true);
  }
}
