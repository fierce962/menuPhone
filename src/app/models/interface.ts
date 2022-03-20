export interface RequestProduct{
    nameProduct: string;
    amount: number;
    prices: number;
    total: number;
}

export interface Products{
    title: string;
    img: string;
    description: string;
    price: string;
    type: string;
}

export interface OptionsMenu{
    options: string[];
    type: string;
}
