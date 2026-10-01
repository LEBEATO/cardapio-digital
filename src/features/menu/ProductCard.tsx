import { useState } from "react";
import type { Product } from "../../types/menu";
type Props={product:Product;onOpen:(p:Product)=>void;onQuickAdd:(p:Product)=>void};
export function ProductCard({product,onOpen,onQuickAdd}:Props){
 const [imageFailed,setImageFailed]=useState(false);
 const showImage=Boolean(product.imageUrl&&!imageFailed);
 return <article className="product-card" onClick={()=>onOpen(product)}>
  <div className="product-image">{showImage?<img src={product.imageUrl} alt={product.name} loading="lazy" onError={()=>setImageFailed(true)}/>:<span className="product-fallback" aria-hidden="true">{product.emoji}</span>}</div>
  <div className="product-info"><span className="tag">{product.tag}</span><h3>{product.name}</h3><p>{product.description}</p><div className="row"><strong>R$ {product.price.toFixed(2).replace(".",",")}</strong><button className="add" onClick={e=>{e.stopPropagation();onQuickAdd(product)}} aria-label={`Adicionar ${product.name}`}>+</button></div></div>
 </article>
}