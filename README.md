# TheMachineff — Fan page (GitHub Pages)

Sitio estático con HTML/CSS/JS vanilla, listo para GitHub Pages y Google AdSense.

## Estructura
```
.
├── index.html
├── contacto.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── assets/
│   ├── logo.png                (Logo página web)
│   ├── diamantes.png           (Cofre con diamantes recortado en PNG TRANSPARENTE)
│   ├── instagram.png
│   ├── facebook.png
│   ├── youtube.png
│   ├── whatsapp.png
│   ├── email.png               (opcional para la página de contacto)
│   ├── favicon.ico
│   └── favicon-180.png         (opcional para iOS)
├── ads.txt
├── robots.txt
└── .nojekyll
```

## AdSense
- Cliente: `ca-pub-6600377778506731` ya integrado en `<head>` para Auto Ads.
- Si deseas anuncios manuales, reemplaza `data-ad-slot="REEMPLAZA_CON_TU_SLOT"` con un slot real y descomenta el bloque en `index.html`/`contacto.html`.
- Sube `ads.txt` a la raíz del dominio.

## Deploy en GitHub Pages
1. Crea el repositorio (p. ej. `TheMachineff`).
2. Sube estos archivos a `main`.
3. En Settings → Pages: Source = `Deploy from a branch`, Branch = `main` (`/root`).
4. Espera a que se publique en `https://<tu-usuario>.github.io/TheMachineff/`.

## Conectar dominio de Namecheap (opcional)
1. En GitHub Pages (Settings → Pages) agrega tu dominio en “Custom domain”.
2. En Namecheap, DNS:
   - CNAME para `www` → `<tu-usuario>.github.io.`
   - 4 registros A para el apex (si usas dominio raíz):  
     185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
3. Sube un archivo `CNAME` (sin extensión) con tu dominio dentro (ej: `themachineff.com`).

## Reemplazos de imágenes
- `assets/diamantes.png`: usa la versión recortada con transparencia (recomendado).
- Logos de redes: mantén los oficiales como los enviaste.
- Favicon: genera uno desde tu logo (32×32 ICO y 180×180 PNG para iOS).

## Funcionalidades clave
- Selección de cantidades: 100, 310, 520, 1060, 2180, 5600.
- Botón “Generar” habilitado tras elegir.
- Paso de “ID de jugador” y botón “Enviar”.
- Modal de resumen (cantidad + ID).
- Animación de carga con mensajes: “Cargando…”, “Procesando solicitud”, “Generando diamantes”.
- Banner de compartir (Facebook, WhatsApp, Web Share API, copiar enlace).
- Persistencia con `localStorage` de la última cantidad elegida.
- Diseño oscuro, acentos neón, responsive, SEO listo.

## Aviso
Fan page no oficial. El “generador” es un simulador visual; no entrega objetos reales del juego.