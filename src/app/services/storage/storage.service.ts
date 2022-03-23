import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  get(name: string): string{
    return localStorage.getItem(name);
  }

  set(name: string, value: string){
    localStorage.setItem(name, value);
  }

  clear(): void{
    localStorage.clear();
  }
}
