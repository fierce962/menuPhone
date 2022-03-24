/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, getDocs, where, query, doc, getDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { Products, OptionsMenu, RequestDesk, RequestMenu } from 'src/app/models/interface';

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

  async getRequestMenu(desk: string): Promise<RequestMenu[]>{
    return await getDocs(query(collection(this.db, 'desk'), where('deskNumber', '==', desk)))
    .then(results=>{
      const infoProducts: RequestMenu[] = [];
      results.docs.forEach(deskRequest=>{
        deskRequest.data().requestMenu.forEach((infoRequest: RequestMenu)=>{
          infoProducts.push(infoRequest);
        });
      });
      return infoProducts;
    });
  }

  async getProductsByRequestMenu(productId: string): Promise<Products | any>{
    return await getDoc(doc(this.db, 'products', 'CzrAw3wCEFMGY'))
    .then(results=> results.data());
  }

}
