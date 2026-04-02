# Site Vitrine Web Creation - Dépannage PC Gard

Site vitrine moderne et créatif pour l'activité de création de sites web de Dépannage PC Gard.

## 🎨 Caractéristiques

- **Design créatif moderne** avec animations fluides et effets visuels
- **100% responsive** - optimisé mobile, tablette et desktop
- **Performance optimisée** - code léger et rapide
- **SEO-friendly** - meta tags et structure optimisés
- **Portfolio dynamique** - présentation de tes projets (MCRestor30, The Sunset Spa, etc.)
- **Formulaire de contact** - avec Web3Forms
- **Pages légales complètes** - Mentions légales, Politique de confidentialité, CGV

## 📁 Structure du projet

```
/
├── index.html                      # Page d'accueil
├── style.css                       # Styles CSS
├── script.js                       # JavaScript
├── mentions-legales.html          # Mentions légales
├── politique-confidentialite.html # Politique de confidentialité
├── cgv.html                       # Conditions générales de vente
└── README.md                      # Ce fichier
```

## 🚀 Déploiement sur GitHub Pages

### Étape 1 : Créer un dépôt GitHub

1. Va sur [GitHub](https://github.com) et connecte-toi
2. Clique sur le bouton **"New repository"** (ou "Nouveau dépôt")
3. Nomme ton dépôt : `web-creation` (ou autre nom)
4. Laisse-le en **Public**
5. **NE COCHE PAS** "Add a README file"
6. Clique sur **"Create repository"**

### Étape 2 : Uploader les fichiers

**Option A - Via l'interface web GitHub (le plus simple) :**

1. Sur la page de ton nouveau dépôt, clique sur **"uploading an existing file"**
2. Glisse-dépose TOUS les fichiers du site :
   - index.html
   - style.css
   - script.js
   - mentions-legales.html
   - politique-confidentialite.html
   - cgv.html
   - README.md
3. Écris un message de commit : "Initial commit - Site Web Creation"
4. Clique sur **"Commit changes"**

**Option B - Via Git en ligne de commande :**

```bash
# Dans le dossier contenant tes fichiers
git init
git add .
git commit -m "Initial commit - Site Web Creation"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/web-creation.git
git push -u origin main
```

### Étape 3 : Activer GitHub Pages

1. Dans ton dépôt GitHub, clique sur **"Settings"** (Paramètres)
2. Dans le menu de gauche, clique sur **"Pages"**
3. Sous "Source", sélectionne **"main"** branch
4. Clique sur **"Save"**
5. Attends 1-2 minutes

Ton site sera disponible à : `https://TON_USERNAME.github.io/web-creation/`

### Étape 4 : Configurer le formulaire de contact

**IMPORTANT** : Le formulaire de contact ne fonctionnera pas tant que tu n'auras pas configuré Web3Forms.

1. Va sur [https://web3forms.com](https://web3forms.com)
2. Inscris-toi gratuitement avec ton email (contact@depannagepcgard.fr)
3. Récupère ta clé API (Access Key)
4. Dans GitHub, ouvre le fichier `script.js`
5. Clique sur l'icône crayon pour éditer
6. Trouve la ligne :
   ```javascript
   formData.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY_HERE');
   ```
7. Remplace `YOUR_WEB3FORMS_ACCESS_KEY_HERE` par ta vraie clé
8. Clique sur **"Commit changes"**

Le formulaire est maintenant opérationnel ! 🎉

## 🔧 Personnalisation

### Modifier les couleurs

Dans `style.css`, modifie les variables CSS en haut du fichier :

```css
:root {
    --primary: #6366f1;      /* Bleu principal */
    --secondary: #ec4899;    /* Rose/Magenta */
    --accent: #10b981;       /* Vert accent */
    /* ... */
}
```

### Ajouter/modifier des projets portfolio

Dans `index.html`, cherche la section `<!-- Portfolio Section -->` et duplique un bloc `<article class="portfolio-item">`.

### Mettre à jour les informations de contact

Recherche et remplace dans tous les fichiers :
- `contact@depannagepcgard.fr` par ton email
- `06 37 12 76 88` par ton téléphone
- `932 695 570 00014` par ton SIRET

## 📱 Responsive

Le site est optimisé pour :
- 📱 Mobile (< 640px)
- 📱 Tablette (640px - 968px)
- 💻 Desktop (> 968px)

## ⚡ Performance

- Pas de dépendances jQuery
- CSS/JS vanilla optimisés
- Fonts Google chargées en async
- Animations CSS performantes

## 🎯 SEO

- Meta tags optimisés
- Structure HTML sémantique
- URLs propres
- Contenu optimisé mots-clés

## 📄 Licence

Tous droits réservés - Dépannage PC Gard © 2026

---

**Besoin d'aide ?**
📧 contact@depannagepcgard.fr
📱 06 37 12 76 88
