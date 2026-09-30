"use client";

import { useMemo, useState } from "react";
import type { Product, SelectedAddOn } from "../lib/types";

type Props = { product: Product; onClose: () => void; onAdd: (product: Product, quantity: number, addOns: SelectedAddOn[], notes: string) => void };

export function ProductModal({ product, onClose, onAdd }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState<SelectedAddOn[]>([]);
  const [notes, setNotes] = useState("");

  const unitPrice = useMemo(() => product.price + selected.reduce((sum, item) => sum + item.price, 0), [product.price, selected]);
  const total = unitPrice * quantity;

  function toggle(addOn: SelectedAddOn) {
    setSelected((current) => current.some((item) => item.id === addOn.id) ? current.filter((item) => item.id !== addOn.id) : [...current, addOn]);
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-title" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar detalhes">×</button>
        <div className="modal-food" aria-hidden="true">{product.emoji}</div>
        <span className="tag">{product.tag}</span>
        <h2 id="product-title" className="mt-3 text-3xl font-black">{product.name}</h2>
        <p className="mt-2 leading-6 text-[var(--muted)]">{product.description}</p>

        {!!product.addOns?.length && <div className="option-section">
          <div><h3 className="font-extrabold">Quer adicionar algo?</h3><p className="text-xs text-[var(--muted)]">Opcional · escolha quantos quiser</p></div>
          <div className="addon-list">{product.addOns.map((addOn) => {
            const checked = selected.some((item) => item.id === addOn.id);
            return <button type="button" key={addOn.id} className={checked ? "addon active" : "addon"} onClick={() => toggle(addOn)} aria-pressed={checked}>
              <span><b>{addOn.name}</b><small>+ R$ {addOn.price.toFixed(2).replace(".", ",")}</small></span><span className="check">{checked ? "✓" : "+"}</span>
            </button>;
          })}</div>
        </div>}

        <label className="field option-section"><span>Alguma observação?</span><textarea value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={180} placeholder="Ex.: sem cebola, molho separado..." /></label>

        <div className="modal-footer">
          <div className="qty large"><button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button><b>{quantity}</b><button onClick={() => setQuantity((q) => Math.min(20, q + 1))}>+</button></div>
          <button className="primary-button flex-1" onClick={() => onAdd(product, quantity, selected, notes.trim().slice(0, 180))}>Adicionar · R$ {total.toFixed(2).replace(".", ",")}</button>
        </div>
      </section>
    </div>
  );
}
