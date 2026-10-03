import { supabase } from "../../lib/supabase/client";
import type { Product } from "../../types/menu";

type DbAddon={id:number;name:string;price:number};
type DbProduct={id:number;name:string;description:string;price:number;fallback_emoji:string;tag:string|null;image_path:string|null;categories:{name:string}|null;product_addons:DbAddon[]};

export async function getMenuProducts():Promise<Product[]>{
 const client=supabase;
 if(!client) return [];
 const {data,error}=await client.from("products").select("id,name,description,price,fallback_emoji,tag,image_path,categories(name),product_addons(id,name,price)").eq("active",true).order("sort_order");
 if(error) throw error;
 return ((data??[]) as unknown as DbProduct[]).map(p=>({
   id:p.id,
   name:p.name,
   description:p.description,
   price:Number(p.price),
   emoji:p.fallback_emoji||"🍔",
   tag:p.tag??"",
   category:p.categories?.name??"Outros",
   imageUrl:p.image_path?client.storage.from("product-images").getPublicUrl(p.image_path).data.publicUrl:undefined,
   addOns:(p.product_addons??[]).map(a=>({id:String(a.id),name:a.name,price:Number(a.price)}))
 }));
}
