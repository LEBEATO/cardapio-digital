export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  emoji: string;
  tag: string;
  category: string;
};

export type CartItem = Product & { quantity: number };
