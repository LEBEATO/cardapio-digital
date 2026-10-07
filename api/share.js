const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));

export default async function handler(req, res) {
  const siteUrl = `https://${req.headers.host}`;
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey =
    process.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  let store = {
    store_name: "Cardápio Digital",
    description: "Faça seu pedido online pelo nosso cardápio digital.",
    share_image_path: null,
    logo_path: null,
  };

  if (supabaseUrl && supabaseKey) {
    try {
      const response = await fetch(
        `${supabaseUrl}/rest/v1/store_settings?id=eq.1&select=store_name,description,share_image_path,logo_path`,
        { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } }
      );
      if (response.ok) {
        const rows = await response.json();
        if (rows?.[0]) store = { ...store, ...rows[0] };
      }
    } catch {}
  }

  const imagePath = store.share_image_path || store.logo_path;
  const image = imagePath && supabaseUrl
    ? `${supabaseUrl}/storage/v1/object/public/product-images/${imagePath.split("/").map(encodeURIComponent).join("/")}`
    : `${siteUrl}/favicon.svg`;

  const title = escapeHtml(store.store_name || "Cardápio Digital");
  const description = escapeHtml(store.description || "Faça seu pedido online pelo nosso cardápio digital.");
  const imageUrl = escapeHtml(image);

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  res.status(200).send(`<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${imageUrl}">
<meta property="og:url" content="${siteUrl}/share">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${imageUrl}">
<meta http-equiv="refresh" content="0;url=/">
</head>
<body><p>Abrindo <a href="/">${title}</a>...</p></body>
</html>`);
}
