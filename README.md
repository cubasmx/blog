# Notas de Julio — blog personal

Blog estático con [Eleventy 11ty](https://www.11ty.dev/), en español, tono
humano y notas cortas. Reutiliza los tokens de diseño del portafolio
(`/home/mantis/repos/julio-cubas`): fondo `#0b0f10`, acento lima `#d7f75b`,
cyan `#66e5d0`, tipografías Fira Code + DM Sans. Sin frameworks de UI.

## Árbol

```
blog/
├── package.json
├── eleventy.config.js        # collections, filtros de fecha, pathPrefix
├── .gitignore
├── .github/workflows/deploy.yml   # deploy a GitHub Pages (cubasmx/blog)
└── src/
    ├── _data/site.json       # título, autor, descripción, URL
    ├── _includes/
    │   ├── base.njk          # layout base (head, header, footer)
    │   └── post.njk          # layout de post
    ├── assets/styles.css     # estilos (tokens del portafolio)
    ├── posts/
    │   ├── posts.json        # data de carpeta: layout + permalink
    │   └── portafolio-en-github-pages.md   # post de ejemplo (real)
    ├── index.njk             # home: lista de posts
    ├── acerca.njk            # página "acerca"
    └── feed.njk              # RSS en /feed.xml
```

## Uso

```bash
npm install       # instala @11ty/eleventy
npm run start     # servidor dev en http://localhost:8080/  (recarga en vivo)
npm run build     # genera el estático en _site/
```

### Previsualizar

- **Dev con recarga:** `npm run start` y abrir `http://localhost:8080/`.
- **Estático ya construido:** `npm run build` y luego
  `python3 -m http.server 4173 --directory _site`, abrir `http://localhost:4173`.

## Escribir un post

Crea un `.md` en `src/posts/` con front matter:

```yaml
---
title: "Título de la nota"
date: 2026-10-05
resumen: "Una o dos frases que salen en la lista del home."
tags: ["web", "notas"]
lectura: 3
---
```

El layout, la URL (`/notas/<slug>/`) y la marca de "es post" vienen de
`src/posts/posts.json`. Los `tags` son solo para mostrar en el post.

## Deploy

`.github/workflows/deploy.yml` publica en GitHub Pages **cuando exista un push a
`main`** en el repo `cubasmx/blog`. El job `build` corre `npm ci` + `npm run
build` y sube `_site/` como artefacto; el job `deploy` lo publica.

> Este repo es local: **no hay remoto ni push configurados**. El workflow está
> listo pero no se ha ejecutado. Pasos para activarlo:
> 1. Crear el repo `cubasmx/blog` en GitHub.
> 2. `git add -A && git commit -m "..."` y añadir el remoto.
> 3. En GitHub → Settings → Pages, origen **GitHub Actions**.
> 4. Push a `main`.

La URL pública esperada es `https://cubasmx.github.io/blog/`. Por eso el
`pathPrefix` es `/blog/`; en local `npm start` lo fuerza a `/` (ver
`ELEVENTY_PATH_PREFIX` en `eleventy.config.js`).
