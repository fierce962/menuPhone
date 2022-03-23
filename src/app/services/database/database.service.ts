/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, getDocs, where, query, doc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { Products, OptionsMenu, RequestDesk } from 'src/app/models/interface';

const app = initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})


export class DatabaseService {
  private db = getFirestore(app);

  constructor() { }

  async getProducts(category: string): Promise<Products[]>{
    const getProducts = await getDocs(query(collection(this.db, 'products'), where('category', '==', category)));
    const product: Products[] = [];
    getProducts.forEach(getProduct=>{
      product.push({
        id: getProduct.id,
        title: getProduct.data().title,
        category: getProduct.data().category,
        img: getProduct.data().img,
        price: getProduct.data().price,
        description: getProduct.data().description
      });
    });
    return product;
  }

  async getMenuOptions(typeOptions: string): Promise<OptionsMenu>{
    return await getDocs(query(collection(this.db, 'menuOptions'), where('category', '==', typeOptions)))
    .then(results=>{
      const options: OptionsMenu | any = results.docs[0].data();
      return options;
    });
  }

  async setDeskRequest(requestDesk: RequestDesk): Promise<void>{
    await addDoc(collection(this.db, 'desk'), requestDesk);
  }
}
