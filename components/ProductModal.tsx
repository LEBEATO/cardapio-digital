"use client";

import type { Product } from "../lib/types";

type Props = { product: Product; onClose: () => void; onAdd: (product: Product, quantity: number) => void };

export function ProductModal({ product, onClose, onAdd }: Props) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-title" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar detalhes">×</button>
        <div className="modal-food" aria-hidden="true">{product.emoji}</div>
        <span className="tag">{product.tag}</span>
        <h2 id="product-title" className="mt-3 text-3xl font-black">{product.name}</h2>
        <p className="mt-2 leading-6 text-[var(--muted)]">{product.description}</p>
        <div className="mt-6 flex items-center justify-between gap-4">
          <strong className="text-2xl">R$ {product.price.toFixed(2).replace(".", ",")}</strong>
          <button className="primary-button" onClick={() => onAdd(product, 1)}>Adicionar ao carrinho</button>
        </div>
      </section>
    </div>
  );
}
