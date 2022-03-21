export interface Products{
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
}
