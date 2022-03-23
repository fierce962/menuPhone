export interface Products{
    id: string;
    title: string;
    img: string;
    description: string;
    price: string;
    category: string;
}

export interface OptionsMenu{
    options: string[];
    category: string;
}

export interface AccountProduts{
    product: Products;
    amount: string;
    totalPrice: string;
    indexProduct?: number;
}

export interface StorageAccount{
    [categoryName: string]: {
        account: AccountProduts[];
    };
}

export interface RequestDesk{
    deskNumber: string;
    requestMenu: RequestMenu[];
}

export interface RequestMenu{
    idProduct: string;
    nameProduc: string;
    amount: string;
    totalPrice: string;
}
