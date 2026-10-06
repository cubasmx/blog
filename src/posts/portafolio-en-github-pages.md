---
title: "Mi portafolio vive en GitHub Pages"
date: 2026-10-05
resumen: "Publico mi sitio personal con GitHub Actions: sin build, sin rama gh-pages y sin dependencias."
tags: ["web", "deploy", "github-pages"]
lectura: 3
---

Tenía claro desde el principio que mi portafolio no necesitaba un framework. Es HTML, CSS y JavaScript planos: `index.html`, `styles.css` y `script.js`. Sin empaquetadores, sin `node_modules`, sin sorpresas.

## El sitio

Lo puedes ver en producción:

- **https://cubasmx.github.io/julio-cubas/**

Es una página única con hero, servicios, trabajo, stack y contacto. Todo estático, así que carga rápido y no tiene partes que se caigan por su cuenta.

## Cómo se publica

La publicación corre en **GitHub Actions** con un único archivo, `.github/workflows/deploy.yml`. El flujo es sencillo y por eso me gusta:

1. Cada push a `main` dispara el workflow (también se puede lanzar a mano con `workflow_dispatch`).
2. El job `build` copia `index.html`, `styles.css` y `script.js` a `dist/`.
3. El job `deploy` publica ese `dist/` en GitHub Pages.

## Lo que aprendí

Configuré GitHub Pages con origen **GitHub Actions**. Eso significa que el workflow es la única ruta de publicación: no hay rama `gh-pages` y no se sirve nada directamente desde `main`. Un solo lugar donde mirar cuando algo no aparece en el sitio.

Si tu sitio es estático de verdad, este montaje alcanza y sobra. Cero infraestructura que mantener.
