import type { Product } from "./types";

export const products: Product[] = [
  { id: 1, name: "X-Bacon Especial", description: "Pão brioche, carne 180g, bacon crocante, cheddar e molho da casa.", price: 29.9, emoji: "🍔", tag: "Mais pedido", category: "Lanches" },
  { id: 2, name: "Smash Duplo", description: "Dois smash burgers, queijo, cebola caramelizada e molho especial.", price: 32.9, emoji: "🍔", tag: "Novo", category: "Lanches" },
  { id: 3, name: "Batata Suprema", description: "Batata crocante com cheddar cremoso e bacon.", price: 22.9, emoji: "🍟", tag: "Promoção", category: "Porções" },
  { id: 4, name: "Combo da Casa", description: "Burger clássico, batata crocante e refrigerante gelado.", price: 39.9, emoji: "🥤", tag: "Combo", category: "Combos" },
];
