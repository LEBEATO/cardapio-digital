import { useMemo } from "react";
import type { CartItem } from "../../types/menu";
type Props={items:CartItem[];onClose:()=>void;onQuantity:(key:string,q:number)=>void;onClear:()=>void};
export function CartDrawer({items,onClose,onQuantity,onClear}:Props){
 const total=useMemo(()=>items.reduce((sum,item)=>sum+(item.price+item.selectedAddOns.reduce((s,a)=>s+a.price,0))*item.quantity,0),[items]);
 return <div className="drawer-backdrop" onMouseDown={onClose}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" onMouseDown={e=>e.stopPropagation()}>
  <div className="drawer-head"><div><span className="eyebrow">Seu pedido</span><h2 id="cart-title">Carrinho</h2></div><button className="close" onClick={onClose} aria-label="Fechar carrinho">×</button></div>
  <div className="cart-list">{items.map(item=><div className="cart-item" key={item.cartKey}><span className="cart-emoji">{item.emoji}</span><div className="cart-copy"><b>{item.name}</b><small>R$ {(item.price+item.selectedAddOns.reduce((s,a)=>s+a.price,0)).toFixed(2).replace(".",",")}</small></div><div className="qty"><button onClick={()=>onQuantity(item.cartKey,item.quantity-1)}>−</button><b>{item.quantity}</b><button onClick={()=>onQuantity(item.cartKey,item.quantity+1)}>+</button></div></div>)}</div>
  <button className="clear-cart" onClick={onClear}>Limpar carrinho</button>
  <div className="cart-total"><span>Total</span><strong>R$ {total.toFixed(2).replace(".",",")}</strong></div>
  <button className="checkout">Continuar pedido →</button>
 </aside></div>
}
