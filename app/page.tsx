"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductModal } from "../components/ProductModal";
import { CheckoutDrawer } from "../components/CheckoutDrawer";
import { products } from "../lib/products";
import type { CartItem, Product, SelectedAddOn } from "../lib/types";

export default function Home() {
  const [dark, setDark] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price + item.selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0)) * item.quantity, 0), [cart]);

  function addToCart(product: Product, quantity = 1, selectedAddOns: SelectedAddOn[] = [], notes = "") {
    const optionKey = selectedAddOns.map((item) => item.id).sort().join("-");
    const cartKey = `${product.id}:${optionKey}:${notes}`;
    setCart((current) => {
      const found = current.find((item) => item.cartKey === cartKey);
      if (found) return current.map((item) => item.cartKey === cartKey ? { ...item, quantity: Math.min(20, item.quantity + quantity) } : item);
      return [...current, { ...product, cartKey, quantity: Math.min(20, quantity), selectedAddOns, notes }];
    });
    setSelectedProduct(null);
  }

  function updateQuantity(cartKey: string, quantity: number) {
    setCart((current) => quantity <= 0 ? current.filter((item) => item.cartKey !== cartKey) : current.map((item) => item.cartKey === cartKey ? { ...item, quantity: Math.min(20, quantity) } : item));
  }

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(saved ? saved === "dark" : prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color:var(--surface-glass)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#" className="text-lg font-black tracking-tight" aria-label="Burger House, início">
            BURGER<span className="text-[var(--brand)]">HOUSE</span>
          </a>
          <div className="flex items-center gap-2">
            <button onClick={() => setDark(!dark)} className="icon-button" aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}>{dark ? "☀️" : "🌙"}</button>
            <button onClick={() => cartCount > 0 && setCartOpen(true)} className="icon-button relative" aria-label={`Carrinho com ${cartCount} itens`}>🛒{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}</button>
          </div>
        </div>
      </header>

      <section className="hero overflow-hidden">
        <div className="mx-auto grid min-h-[70vh] max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2">
          <div className="reveal">
            <span className="pill">🔥 Sabor que chega junto</span>
            <h1 className="mt-5 max-w-xl text-5xl font-black leading-[.95] tracking-[-.055em] sm:text-6xl md:text-7xl">
              Seu burger favorito, <span className="text-[var(--brand)]">sem complicação.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[var(--muted)] sm:text-lg">
              Escolha, personalize e envie seu pedido direto para o WhatsApp. Sem cadastro e sem perder tempo.
            </p>
            <a href="#cardapio" className="primary-button mt-7 inline-flex">Ver cardápio ↓</a>
          </div>
          <div className="food-stage" aria-hidden="true">
            <div className="food-glow" />
            <div className="burger-float">🍔</div>
            <span className="floating-chip chip-one">100% artesanal</span>
            <span className="floating-chip chip-two">Entrega rápida</span>
          </div>
        </div>
      </section>

      <nav className="sticky top-[61px] z-40 border-y border-[var(--border)] bg-[color:var(--surface-glass)] backdrop-blur-xl" aria-label="Categorias do cardápio">
        <div className="no-scrollbar mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
          {["🔥 Destaques", "🍔 Lanches", "🍟 Porções", "🥤 Bebidas", "🍰 Sobremesas"].map((item, index) => (
            <a key={item} href="#cardapio" className={index === 0 ? "category active" : "category"}>{item}</a>
          ))}
        </div>
      </nav>

      <section id="cardapio" className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div><p className="eyebrow">Feitos na hora</p><h2 className="text-3xl font-black tracking-tight sm:text-4xl">Mais pedidos</h2></div>
          <button className="text-sm font-bold text-[var(--brand)]">Ver todos</button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((product, index) => (
            <article key={product.id} className="product-card reveal" style={{ animationDelay: `${index * 80}ms` }} onClick={() => setSelectedProduct(product)}>
              <div className="product-image" aria-hidden="true"><span>{product.emoji}</span></div>
              <div className="min-w-0 flex-1 py-1">
                <span className="tag">{product.tag}</span>
                <h3 className="mt-2 text-lg font-extrabold">{product.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm leading-5 text-[var(--muted)]">{product.description}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <strong className="text-lg">R$ {product.price.toFixed(2).replace(".", ",")}</strong>
                  <button onClick={(event) => { event.stopPropagation(); addToCart(product); }} className="add-button" aria-label={`Adicionar ${product.name} ao carrinho`}>+</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addToCart} />}
      {cartOpen && cartCount > 0 && <CheckoutDrawer items={cart} onClose={() => setCartOpen(false)} onQuantity={updateQuantity} onClear={() => { setCart([]); setCartOpen(false); }} />}

      {cartCount > 0 && (
        <div className="fixed inset-x-0 bottom-4 z-50 px-4">
          <button onClick={() => setCartOpen(true)} className="cart-bar mx-auto flex w-full max-w-xl items-center justify-between">
            <span><b>{cartCount}</b> {cartCount === 1 ? "item" : "itens"} · R$ {cartTotal.toFixed(2).replace(".", ",")}</span><strong>Ver carrinho →</strong>
          </button>
        </div>
      )}
    </main>
  );
}
