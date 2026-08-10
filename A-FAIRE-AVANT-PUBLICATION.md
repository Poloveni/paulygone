# À faire avant de publier

Deux étapes. Compte 10 minutes.

---

## 1. Vérifier le site sur ton ordinateur (5 min)

Ouvre le dossier `C:\Users\syne\Documents\GitHub\paulygone` dans l'explorateur Windows,
puis **double-clique sur `index.html`**. Il s'ouvre dans ton navigateur.

Vérifie dans l'ordre :

- [ ] La page s'affiche normalement, rien n'est cassé
- [ ] En haut à droite de la barre de navigation, il y a une **icône de lune** — clique dessus : le site passe en sombre. Reclique : il revient en clair.
- [ ] Recharge la page (touche `F5`) : le thème choisi est conservé, **sans clignotement blanc**
- [ ] Dans le formulaire de contact, clique sur « Envoyer ma demande » **sans rien remplir** → des messages d'erreur rouges apparaissent sous chaque champ
- [ ] Tout en bas de la page, clique sur « Site web à Alès » → la page locale s'ouvre

> **Si quelque chose ne s'affiche pas** : appuie sur `Ctrl + F5`. Ça force le navigateur à
> recharger les fichiers au lieu d'utiliser sa mémoire. C'est l'erreur n°1 quand on modifie un site.

---

## 2. Mettre en ligne (5 min)

Ouvre **Git Bash** dans le dossier du site (clic droit dans le dossier → « Open Git Bash here »),
puis tape ces trois commandes, une par une, en appuyant sur `Entrée` à chaque fois :

```bash
git add -A
git commit -m "Optimisation images, mode sombre, pages locales, formulaire securise"
git push
```

> `git add -A` prépare toutes les modifications
> `git commit` enregistre une version avec un message
> `git push` envoie sur GitHub, qui publie automatiquement le site

Compte **1 à 2 minutes** avant que paulygone.fr soit à jour. Recharge avec `Ctrl + F5`.

---

## 3. Après la mise en ligne (bonus, 5 min)

### Dire à Google que les nouvelles pages existent

1. Va sur [Google Search Console](https://search.google.com/search-console)
2. Colle `https://paulygone.fr/sitemap.xml` dans **Sitemaps** → Envoyer
3. Dans la barre de recherche en haut, colle `https://paulygone.fr/creation-site-web-ales.html`
   → clique sur **Demander une indexation**. Répète pour les 3 autres villes.

Compte 1 à 4 semaines avant de voir ces pages remonter sur Google. C'est normal, sois patient.

### Mesurer la vitesse

Va sur [PageSpeed Insights](https://pagespeed.web.dev/), colle `https://paulygone.fr`.
Tu devrais être dans le vert. Si un point est rouge, envoie-moi la capture.

---

## Quand tu auras des avis clients

La section témoignages est prête, mise de côté dans le fichier
`_section-temoignages-a-reutiliser.html`. Elle n'est pas publiée : c'est juste un modèle.

Pour récolter des avis, envoie ce message à tes clients :

> Bonjour, j'ajoute une page témoignages sur mon site. Accepteriez-vous d'écrire
> 2-3 phrases sur notre collaboration ? Ça m'aiderait beaucoup. Merci !

Quand tu en auras 3, dis-le-moi : je remets la section en place avec leurs vrais avis,
et j'ajoute les données structurées pour faire apparaître les étoiles dans Google.

⚠️ Ne publie jamais un avis inventé : c'est une pratique commerciale trompeuse
(article L121-2 du Code de la consommation) et Google déclasse les sites concernés.

En attendant, l'encart « Laisser un avis » est toujours présent dans la section
Comparatif — c'est lui qui va t'aider à en collecter.

---

## Ajouter une nouvelle ville plus tard

Les 4 pages locales sont générées par le script `_generer-pages-villes.py`.

1. Ouvre-le dans un éditeur de texte
2. Copie un bloc de ville complet dans `VILLES` (de `"ales": {` jusqu'à `},`)
3. Change **tout le contenu** — pas seulement le nom de la ville
4. Dans Git Bash, tape : `python _generer-pages-villes.py`

⚠️ Chaque ville doit avoir un texte **vraiment différent**. Copier-coller le même contenu
en changeant juste le nom, Google appelle ça des « pages satellites » et sanctionne.

Ce script ne fait pas partie du site publié — il reste sur ton ordinateur, c'est un outil.
