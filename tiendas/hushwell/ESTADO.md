# Estado del proyecto — Hushwell (antes "MŌA Pets")

- Tienda: jib2y1-i4.myshopify.com
- Carpeta de trabajo: tiendas/hushwell/tema (tema base Dawn 16.0.0, descargado 2026-09-30)
- Tema publicado: "Hushwell (Claude) – fotos IA", ID 191620579652 (publicado por el usuario 30-sep). El anterior "Hushwell (Claude)" (191618580804) queda como copia.
- Borrador pendiente de publicar: "Hushwell – garantía y reseñas", ID 191620940100 (= publicado + cambios de reseñas/garantía)
- El conector de Shopify NO puede escribir en el tema publicado: duplicar → editar la copia → el usuario publica.
  themeFilesUpsert con type URL no aplica cambios en archivos de texto; usar type TEXT y comprobar checksumMd5.
- Vista previa: https://jib2y1-i4.myshopify.com/?preview_theme_id=191618580804
- Tema anterior guardado: "MŌA Pets – NYC Boutique (EN)" (ID 191526961476)
- Entorno (nube): Node 22, Shopify CLI 4.8.3. Ejecutar el CLI con NODE_USE_ENV_PROXY=1.
  Hay que crear un /usr/local/bin/xdg-open vacío para que el inicio de sesión no falle.
- Red permitida: *.myshopify.com, cdn.shopify.com, accounts.shopify.com, admin.shopify.com

## Fases
- [x] 0 Entorno  - [x] 1 Conexión  - [x] 2 Proyecto  - [x] 3 Brief
- [x] 4 Construcción  - [x] 5 Producto y páginas  - [x] 6 Publicado

## Catálogo
- Producto único: gid://shopify/Product/15695532196164
  - Título: "Hushwell Anti-Snoring Chin Strap"; handle: hushwell-anti-snoring-chin-strap (redirección desde el anterior)
  - Precio $15.99, variante "Black", 84 uds. Proveedor: Hushwell. Tipo: Sleep Aid
  - Descripción + SEO escritos en inglés. templateSuffix = "hw" (plantilla product.hw.json)
  - 8 fotos del proveedor; las 3 últimas son idénticas (candidatas a borrar)
- 114 productos antiguos de mascotas pasados a BORRADOR (no borrados), a petición del usuario
- Menú creado: "hushwell-menu" (Home, Chin Strap, Shipping & Returns, Contact) → usado en el header

- Precios (30-sep): chin strap $31.99, banda $35.99, V-line $41.99
- Producto 2: gid://shopify/Product/15695542812996 "Hushwell Adjustable Chin Strap Band" (hushwell-adjustable-chin-strap-band),
  plantilla hw-banda, colores Black (6 uds) / Blue (0 uds)
- Producto 3: gid://shopify/Product/15695542747460 "Hushwell V-Line Chin & Jaw Strap" (hushwell-v-line-chin-jaw-strap),
  plantilla hw-vline, Purple/Black/Pink. Una foto lleva la marca de otro fabricante ("HIEERBUS")
- Chin strap: quitadas las 2 fotos duplicadas (quedan 6)
- Menú: Home, Shop (/collections/all), Shipping & Returns, Contact

## Brief / decisiones de diseño
- Mercado EE. UU., inglés, USD. Nombre de marca propuesto por Claude: Hushwell
- Estilo "noche tranquila": noche #121836 / #1B2248 / #0B1026, lavanda #C3B4F2, lila suave #EDE8F7,
  crema #F7F3EC, tinta #1B2140, luna #F2DFA7
- Tipos: Fraunces (títulos) + Inter (texto), vía Google Fonts; tipografía de Dawn: Lora + Assistant
- Botones píldora; esquinas de 22px; cielo estrellado en CSS; animación al aparecer con el scroll; cinta de frases
- Fotos IA: SÍ (30-sep, a petición del usuario) — ver sección "Fotos IA"
- Reseñas: NO se han puesto reseñas inventadas; añadir solo reseñas reales

## Archivos propios (prefijo hw-)
- assets/hw-styles.css, assets/hw-scripts.js, assets/hw-favicon.png, fotos hw-*.jpg
- snippets/hw-icono.liquid
- sections: hw-hero, hw-marquesina, hw-problema, hw-pasos, hw-beneficios, hw-comparativa,
  hw-cta-producto, hw-faq, hw-producto, hw-coleccion
- templates/index.json (portada), templates/product.hw.json, product.hw-banda.json, product.hw-vline.json
- Modificados de Dawn: header.liquid (ajuste brand_text), footer.liquid (reescrito), header-group.json,
  footer-group.json, layout/theme.liquid (favicon, fuentes, css/js), config/settings_data.json (colores y fuentes)

## Pendiente del lado del usuario
- [ ] Cambiar el nombre de la tienda a "Hushwell" (Configuración → Detalles de la tienda)
- [ ] Rellenar las políticas (Configuración → Políticas) para enlazarlas desde el pie de página
- [ ] Confirmar que ofrece envío gratis a EE. UU. y garantía de 30 noches (lo dice la web); si no, cambiar esos textos
- [ ] Revisar la moneda de la tienda (USD) y los mercados (Configuración → Mercados)

## Promociones y envío (30-sep-2026)
- Descuento automático "Launch Sale – 20% off" (gid://shopify/DiscountAutomaticNode/1919646007620): todo el catálogo, hasta 2026-10-15 06:59 UTC (14-oct, hora EE. UU.)
- Descuento automático "Free US shipping" (gid://shopify/DiscountAutomaticNode/1919644893508): envío gratis a EE. UU., sin fin
- Tema: ajustes globales "Promoción" (promo_activa, promo_porcentaje=20, promo_fin=2026-10-14, promo_etiqueta);
  snippet hw-precio muestra precio rebajado, tachado y "-20%"; se apaga solo después de promo_fin
- Barra superior: "Launch Sale: 20% off everything — ends Oct 14 · Free US shipping" → CAMBIAR al terminar la oferta
- Foto con marca "HIEERBUS" quitada de la cinta en V
- Políticas guardadas (envíos con plazos EE. UU. 7-14 / Canadá 8-16 días laborables, devoluciones 30 días, privacidad, términos, contacto)
- Portada: foto "No more sleep disruption" sustituida por ilustración CSS (hw-ilus) en hw-problema

## Fotos IA (30-sep-2026)
- Generadas con gpt-image-2 (clave de OpenAI inyectada por el entorno en la nube; no hay clave guardada en el proyecto).
  El proxy corta las peticiones a los ~30 s → el script de generación se usa en modo streaming (stream + partial_images).
- Copias en tiendas/hushwell/fotos-ia/ (fuera del tema). Estilo: estudio sobre crema #F7F3EC con lavanda / ambiente nocturno azul noche.
- Chin strap: hw-cs-estudio (portada de la galería), hw-hero (mujer durmiendo, luz de luna), hw-cs-lifestyle (hombre de lado), hw-cs-detalle (velcro)
- Banda: hw-banda-estudio (azul y negra), hw-banda-lifestyle (hombre canoso durmiendo)
- V-line: hw-vline-estudio (morado/negro/rosa), hw-vline-lifestyle (mujer en la cama)
- Subidas a la galería de cada producto como primeras fotos (las del proveedor siguen detrás).
- Portada: assets/hw-hero.jpg sustituida por la foto IA. Como el conector no puede escribir en el tema publicado,
  se creó la copia "Hushwell (Claude) – fotos IA" (ID 191620579652) con la foto nueva → hay que PUBLICAR esa copia.
- Gasto aproximado en OpenAI: ~1 $ (1 foto high, ~10 medium/low incluyendo pruebas y reintentos)

## Reseñas y confianza (30-sep-2026)
- NO reseñas inventadas (FTC: prohibidas en EE. UU. desde 2024). Plan: app Judge.me (gratis) para reseñas reales.
- hw-producto: estrellas bajo el título solo si hay reseñas reales (metacampos reviews.rating / reviews.rating_count),
  hueco para bloques de apps (@app) bajo el precio, caja "30-night sleep guarantee" y logos de pago. Todo editable.
  El CSS nuevo va en {% stylesheet %} dentro de la propia sección.
- Pendiente usuario: instalar Judge.me y publicar el borrador 191620940100.
