export type AddOn={id:string;name:string;price:number};
export type Product={id:number;name:string;description:string;price:number;emoji:string;tag:string;category:string;imageUrl?:string;addOns?:AddOn[]};
export type CartItem=Product&{cartKey:string;quantity:number;selectedAddOns:AddOn[];notes?:string};
