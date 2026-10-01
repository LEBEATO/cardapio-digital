import { useEffect, useMemo, useRef, useState } from "react";
import { Header } from "../components/layout/Header";
import { ProductCard } from "../features/menu/ProductCard";
import { CartDrawer } from "../features/cart/CartDrawer";
import { products } from "../data/products";
import type { CartItem, Product } from "../types/menu";

export function HomePage(){
 const [dark,setDark]=useState(true); const [cart,setCart]=useState<CartItem[]>([]); const [cartOpen,setCartOpen]=useState(false); const [activeCategory,setActiveCategory]=useState("Destaques"); const categoryRefs=useRef<Record<string,HTMLAnchorElement|null>>({});
 useEffect(()=>{const saved=localStorage.getItem("theme");const next=saved?saved==="dark":matchMedia("(prefers-color-scheme: dark)").matches;setDark(next)},[]);
 useEffect(()=>{document.documentElement.dataset.theme=dark?"dark":"light";localStorage.setItem("theme",dark?"dark":"light")},[dark]);
 const count=useMemo(()=>cart.reduce((s,i)=>s+i.quantity,0),[cart]);
 useEffect(()=>{const el=categoryRefs.current[activeCategory];el?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})},[activeCategory]);
 function updateQuantity(key:string,q:number){setCart(c=>q<=0?c.filter(i=>i.cartKey!==key):c.map(i=>i.cartKey===key?{...i,quantity:Math.min(20,q)}:i))}
 function quickAdd(p:Product){setCart(c=>{const key=`${p.id}::`;const found=c.find(i=>i.cartKey===key);return found?c.map(i=>i.cartKey===key?{...i,quantity:i.quantity+1}:i):[...c,{...p,cartKey:key,quantity:1,selectedAddOns:[]}]})}
 return <main><Header dark={dark} count={count} onTheme={()=>setDark(v=>!v)} onCart={()=>count>0&&setCartOpen(true)}/>
 <section className="hero"><div className="shell hero-grid"><div className="hero-copy"><span className="pill">🔥 Sabor que chega junto</span><h1>Seu burger favorito, <em>sem complicação.</em></h1><p>Escolha, personalize e envie seu pedido direto para o WhatsApp. Sem cadastro.</p><a className="primary" href="#cardapio">Ver cardápio ↓</a></div><div className="burger-stage"><div className="burger">🍔</div></div></div></section>
 <nav className="categories" aria-label="Categorias"><div className="shell category-scroll">{[["🔥 Destaques","Destaques","#cardapio"],["🍔 Lanches","Lanches","#cardapio"],["🍟 Porções","Porções","#cardapio"],["🥤 Bebidas","Bebidas","#bebidas"],["🍰 Sobremesas","Sobremesas","#cardapio"]].map(([label,name,target])=><a ref={el=>{categoryRefs.current[name]=el}} className={activeCategory===name?"active":""} href={target} key={name} onClick={()=>setActiveCategory(name)}>{label}</a>)}</div></nav>
 <section className="shell menu" id="cardapio"><p className="eyebrow">Feitos na hora</p><h2>Mais pedidos</h2><div className="product-grid">{products.filter(p=>p.category!=="Bebidas").map(p=><ProductCard key={p.id} product={p} onOpen={quickAdd} onQuickAdd={quickAdd}/>)}</div><div className="menu-section" id="bebidas"><p className="eyebrow">Para acompanhar</p><h2>Bebidas</h2><div className="product-grid">{products.filter(p=>p.category==="Bebidas").map(p=><ProductCard key={p.id} product={p} onOpen={quickAdd} onQuickAdd={quickAdd}/>)}</div></div></section>
 {cartOpen&&count>0&&<CartDrawer items={cart} onClose={()=>setCartOpen(false)} onQuantity={updateQuantity} onClear={()=>{setCart([]);setCartOpen(false)}}/>}
 {count>0&&<button className="cart-bar" onClick={()=>setCartOpen(true)}><span><b>{count}</b> {count===1?"item":"itens"}</span><strong>Ver carrinho →</strong></button>}
 </main>
}
