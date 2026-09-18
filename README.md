# Paul Schricke — landing page

Site personnel de Paul Schricke, créateur de sites web indépendant (Nîmes, Gard).
Landing page cinématique : portrait vidéo vivant en boucle, cadrage et voile pilotés par le scroll, direction artistique « Atelier nocturne ».

## Stack

- [Vite 5](https://vitejs.dev/) · vanilla JS (modules ES)
- [GSAP](https://gsap.com/) + ScrollTrigger · [Lenis](https://lenis.darkroom.engineering/) (scroll fluide)
- Typographies : Fraunces, Manrope, JetBrains Mono (Google Fonts)
- Visuels générés via Higgsfield (Nano Banana Pro, Seedance 2.0)

## Lancer le projet

```bash
cd site
npm install
npm run dev        # http://localhost:5173
npm run build -- --base=./   # build statique portable dans site/dist
```

## Structure

```
site/
  index.html              page principale
  mentions-legales.html   page annexe (données à compléter)
  src/style.css           layout, sections, charte
  src/glass.css           surfaces en verre, boutons, chips
  src/main.js             scroll, scrub vidéo, animations, formulaire
  public/bg.mp4           portrait vivant en boucle, desktop (1920x1080, 5,8 Mo)
  public/bg-mobile.mp4    même boucle pour mobile (1280x720, 0,7 Mo)
  public/img/             posters, captures Show Room Oliv, portraits
content/copy.md           textes validés de toutes les sections
assets/                   sources validées (images hero, aperçus)
```

## Avant la mise en ligne

- Remplacer `__DOMAINE__` dans `site/index.html`, `site/public/robots.txt` et `site/public/sitemap.xml`.
- Renseigner `FORM_ENDPOINT` et `FORM_ACCESS_KEY` dans `site/src/main.js` (service d'envoi du formulaire).
- Compléter `site/mentions-legales.html`.

## Charte

| Rôle | Couleur |
|---|---|
| Fond, Noir atelier | `#0F0E0C` |
| Surfaces, Bois brûlé | `#1A1815` |
| Accent unique, Ambre | `#E9A23B` |
| Texte, Ivoire | `#F1ECE3` |
| Texte secondaire, Pierre | `#9A9188` |
| Lignes, Trait | `#2C2925` |
