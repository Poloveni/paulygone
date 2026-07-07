# Paulygone — paulygone.fr

Site vitrine de Paulygone, activité de création de sites web à Nîmes (Gard).

## Stack

- HTML / CSS / JavaScript pur — aucun framework, aucune dépendance
- Hébergé sur **GitHub Pages** avec le domaine personnalisé `paulygone.fr` (fichier `CNAME`)
- Formulaire de contact via **Web3Forms** (clé dans `script.js`)
- Polices : **Syne** (titres) + **Inter** (texte), via Google Fonts

## Structure

```
/
├── index.html                      # Page d'accueil (one-page)
├── style.css                       # Design system complet
├── script.js                       # Interactions (scroll, FAQ, formulaire…)
├── 404.html                        # Page introuvable
├── mentions-legales.html           # Mentions légales
├── politique-confidentialite.html  # Politique de confidentialité
├── cgv.html                        # Conditions générales de vente
├── sitemap.xml / robots.txt        # SEO
├── videos/                         # Vidéo hero + poster
└── *.webp / *.png / *.jpg          # Images (webp servi en priorité)
```

## Publier une modification

```bash
git add .
git commit -m "Description du changement"
git push
```

Le site est mis à jour automatiquement par GitHub Pages 1 à 2 minutes après le push.

## Design system (style.css)

Les couleurs et polices sont définies dans les variables `:root` en haut de `style.css` :
crème `--bg`, encre `--ink`, violet `--accent`, lime `--lime`.

---

© 2026 Paulygone — Paul Schricke · schricke.paul@gmail.com · 06 37 12 76 88
