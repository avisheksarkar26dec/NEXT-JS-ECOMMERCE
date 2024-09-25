export interface ICart {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    qty: number;
}

export interface CartState {
    cartData: ICart[];
  }