export type AddOn = { id: string; name: string; price: number };

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  emoji: string;
  tag: string;
  category: string;
  addOns?: AddOn[];
};

export type SelectedAddOn = AddOn;

export type CartItem = Product & {
  cartKey: string;
  quantity: number;
  selectedAddOns: SelectedAddOn[];
  notes?: string;
};
