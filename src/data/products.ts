import type { Product } from "../types/menu";
const extras=[{id:"bacon",name:"Bacon extra",price:4},{id:"cheddar",name:"Cheddar extra",price:3.5},{id:"meat",name:"Carne 180g extra",price:9},{id:"sauce",name:"Molho da casa",price:2}];
export const products:Product[]=[
{id:1,name:"X-Bacon Especial",description:"Pão brioche, carne 180g, bacon crocante, cheddar e molho da casa.",price:29.9,emoji:"🍔",tag:"Mais pedido",category:"Lanches",addOns:extras},
{id:2,name:"Smash Duplo",description:"Dois smash burgers, queijo, cebola caramelizada e molho especial.",price:32.9,emoji:"🍔",tag:"Novo",category:"Lanches",addOns:extras},
{id:3,name:"Batata Suprema",description:"Batata crocante com cheddar cremoso e bacon.",price:22.9,emoji:"🍟",tag:"Promoção",category:"Porções",addOns:[extras[0],extras[1]]},
{id:4,name:"Combo da Casa",description:"Burger clássico, batata crocante e refrigerante gelado.",price:39.9,emoji:"🥤",tag:"Combo",category:"Combos",addOns:extras},
{id:5,name:"Coca-Cola Lata",description:"Refrigerante Coca-Cola 350 ml gelado.",price:6.5,emoji:"🥤",tag:"Gelada",category:"Bebidas"},
{id:6,name:"Guaraná Lata",description:"Refrigerante Guaraná 350 ml gelado.",price:6,emoji:"🥤",tag:"Gelada",category:"Bebidas"},
{id:7,name:"Suco de Laranja",description:"Suco de laranja 500 ml.",price:9.9,emoji:"🍊",tag:"Natural",category:"Bebidas"},
{id:8,name:"Água Mineral",description:"Água mineral 500 ml.",price:4,emoji:"💧",tag:"500 ml",category:"Bebidas"}
];
