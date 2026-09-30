"use client";

import { useMemo, useState } from "react";
import type { CartItem } from "../lib/types";

type Props = {
  items: CartItem[];
  onClose: () => void;
  onQuantity: (id: number, quantity: number) => void;
  onClear: () => void;
};

type Delivery = "delivery" | "pickup";
type Payment = "pix" | "card" | "cash";

const WHATSAPP_NUMBER = ""; // Configure depois somente com números, ex.: 5535999999999

export function CheckoutDrawer({ items, onClose, onQuantity, onClear }: Props) {
  const [delivery, setDelivery] = useState<Delivery>("delivery");
  const [payment, setPayment] = useState<Payment>("pix");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const deliveryFee = delivery === "delivery" ? 5 : 0;
  const total = subtotal + deliveryFee;

  function finishOrder() {
    const cleanName = name.trim().slice(0, 80);
    const cleanAddress = address.trim().slice(0, 180);
    const cleanNotes = notes.trim().slice(0, 250);
    if (!cleanName) return setError("Informe seu nome.");
    if (delivery === "delivery" && !cleanAddress) return setError("Informe o endereço de entrega.");
    if (!WHATSAPP_NUMBER) return setError("O WhatsApp da loja ainda precisa ser configurado.");

    const lines = items.map((item) => `• ${item.quantity}x ${item.name} — R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}`);
    const method = payment === "pix" ? "PIX" : payment === "card" ? "Cartão" : "Dinheiro";
    const message = [
      "🍔 *NOVO PEDIDO — BURGER HOUSE*",
      "",
      ...lines,
      "",
      `Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}`,
      delivery === "delivery" ? `Entrega: R$ ${deliveryFee.toFixed(2).replace(".", ",")}` : "Retirada no local",
      `*Total: R$ ${total.toFixed(2).replace(".", ",")}*`,
      "",
      `Cliente: ${cleanName}`,
      delivery === "delivery" ? `Endereço: ${cleanAddress}` : "Forma de recebimento: Retirada",
      `Pagamento: ${method}`,
      cleanNotes ? `Observações: ${cleanNotes}` : "",
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setError("");
  }

  return (
    <div className="drawer-backdrop" role="presentation" onMouseDown={onClose}>
      <aside className="checkout-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" onMouseDown={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <div><p className="eyebrow">Seu pedido</p><h2 id="cart-title" className="text-2xl font-black">Carrinho</h2></div>
          <button className="modal-close static" onClick={onClose} aria-label="Fechar carrinho">×</button>
        </div>

        <div className="mt-5 grid gap-3">
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <span className="text-3xl" aria-hidden="true">{item.emoji}</span>
              <div className="min-w-0 flex-1"><b className="block truncate">{item.name}</b><span className="text-sm text-[var(--muted)]">R$ {item.price.toFixed(2).replace(".", ",")}</span></div>
              <div className="qty">
                <button onClick={() => onQuantity(item.id, item.quantity - 1)} aria-label={`Diminuir ${item.name}`}>−</button>
                <b>{item.quantity}</b>
                <button onClick={() => onQuantity(item.id, item.quantity + 1)} aria-label={`Aumentar ${item.name}`}>+</button>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-3 text-xs font-bold text-[var(--muted)] underline" onClick={onClear}>Limpar carrinho</button>

        <div className="checkout-section">
          <h3 className="font-extrabold">Como você quer receber?</h3>
          <div className="choice-grid">
            <button className={delivery === "delivery" ? "choice active" : "choice"} onClick={() => setDelivery("delivery")}>🛵 Entrega</button>
            <button className={delivery === "pickup" ? "choice active" : "choice"} onClick={() => setDelivery("pickup")}>🏪 Retirada</button>
          </div>
        </div>

        <div className="checkout-section grid gap-3">
          <h3 className="font-extrabold">Seus dados</h3>
          <label className="field"><span>Nome</span><input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} autoComplete="name" placeholder="Seu nome" /></label>
          {delivery === "delivery" && <label className="field"><span>Endereço</span><input value={address} onChange={(e) => setAddress(e.target.value)} maxLength={180} autoComplete="street-address" placeholder="Rua, número, bairro e complemento" /></label>}
          <label className="field"><span>Observações (opcional)</span><textarea value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={250} placeholder="Ex.: sem cebola" /></label>
        </div>

        <div className="checkout-section">
          <h3 className="font-extrabold">Pagamento</h3>
          <div className="choice-grid three">
            {([["pix","PIX"],["card","Cartão"],["cash","Dinheiro"]] as const).map(([value,label]) => <button key={value} className={payment === value ? "choice active" : "choice"} onClick={() => setPayment(value)}>{label}</button>)}
          </div>
        </div>

        <div className="total-box">
          <div><span>Subtotal</span><b>R$ {subtotal.toFixed(2).replace(".", ",")}</b></div>
          <div><span>{delivery === "delivery" ? "Entrega" : "Retirada"}</span><b>{delivery === "delivery" ? `R$ ${deliveryFee.toFixed(2).replace(".", ",")}` : "Grátis"}</b></div>
          <div className="grand-total"><span>Total</span><b>R$ {total.toFixed(2).replace(".", ",")}</b></div>
        </div>

        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="whatsapp-button" onClick={finishOrder}>Finalizar no WhatsApp</button>
        <p className="safe-note">Nenhum dado de pagamento é coletado neste site. A confirmação acontece diretamente com a loja.</p>
      </aside>
    </div>
  );
}
