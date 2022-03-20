/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, getDocs, where, query } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { Products, OptionsMenu } from 'src/app/models/interface';

const app = initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})


export class DatabaseService {
  private db = getFirestore(app);

  constructor() { }

  async getProducts(classProduct: string, type: string): Promise<Products>{
    return await getDocs(query(collection(this.db, classProduct), where('type', '==', type)))
    .then(results=>{
      const products: Products[] | any = [];
      results.docs.forEach(result=>{
        products.push(result.data());
      });
      return products;
    });
  }

  async getMenuOptions(typeOptions: string): Promise<OptionsMenu>{
    return await getDocs(query(collection(this.db, 'menuOptions'), where('category', '==', typeOptions)))
    .then(results=>{
      const options: OptionsMenu | any = results.docs[0].data();
      return options;
    });
  }
}
