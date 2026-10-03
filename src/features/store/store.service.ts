import { supabase } from "../../lib/supabase/client";

export type StoreSettings={
 store_name:string;
 description:string|null;
 logo_path:string|null;
 share_image_path:string|null;
 whatsapp:string;
 instagram_url:string|null;
 facebook_url:string|null;
 address:string|null;
 opening_hours:string|null;
 is_open:boolean;
};

export const defaultStoreSettings:StoreSettings={
 store_name:"BurgerHouse",
 description:"Faça seu pedido pelo nosso cardápio digital.",
 logo_path:null,
 share_image_path:null,
 whatsapp:import.meta.env.VITE_WHATSAPP_NUMBER||"5535988953079",
 instagram_url:null,
 facebook_url:null,
 address:null,
 opening_hours:null,
 is_open:true
};

export async function getStoreSettings():Promise<StoreSettings>{
 if(!supabase) return defaultStoreSettings;
 const {data,error}=await supabase.from("store_settings").select("store_name,description,logo_path,share_image_path,whatsapp,instagram_url,facebook_url,address,opening_hours,is_open").eq("id",1).single();
 if(error||!data) return defaultStoreSettings;
 return {...defaultStoreSettings,...data};
}
