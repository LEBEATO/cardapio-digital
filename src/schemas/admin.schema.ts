import { z } from "zod";

const moneyString=z.string().trim().min(1,"Informe o preço.").transform(v=>v.replace(/\s/g,"").replace(/\.(?=\d{3}(?:\D|$))/g,"").replace(",",".")).pipe(z.coerce.number().min(0,"Preço inválido.").max(99999.99,"Preço muito alto."));

export const productFormSchema=z.object({
 name:z.string().trim().min(2,"Informe o nome do produto.").max(120,"Nome muito longo."),
 description:z.string().trim().max(500,"A descrição deve ter no máximo 500 caracteres."),
 price:moneyString,
 categoryId:z.coerce.number().int().positive("Selecione uma categoria válida.")
});

const optionalUrl=z.string().trim().refine(v=>v===""||/^https:\/\//i.test(v),"Use um link https:// válido.");

export const storeSettingsSchema=z.object({
 store_name:z.string().trim().min(2,"Informe o nome do estabelecimento.").max(120),
 whatsapp:z.string().transform(v=>v.replace(/\D/g,"")).pipe(z.string().regex(/^\d{10,15}$/,"WhatsApp inválido.")),
 instagram_url:optionalUrl.nullable().optional(),
 facebook_url:optionalUrl.nullable().optional(),
 address:z.string().trim().max(300).nullable().optional(),
 opening_hours:z.string().trim().max(200).nullable().optional(),
 is_open:z.boolean()
});
