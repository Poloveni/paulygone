#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PAULYGONE — Générateur des pages SEO locales
=============================================
Ce script fabrique une page HTML par ville à partir du contenu défini
dans le dictionnaire VILLES ci-dessous.

À QUOI ÇA SERT ?
Google classe les sites ville par ville. Une page dédiée à « création de
site web à Alès » a beaucoup plus de chances de sortir sur cette recherche
que la page d'accueil, qui parle de Nîmes.

COMMENT L'UTILISER ?
1. Ouvre un terminal dans le dossier du site
2. Tape :  python _generer-pages-villes.py
3. Les fichiers creation-site-web-<ville>.html sont (re)créés

POUR AJOUTER UNE VILLE : copie un bloc dans VILLES, change le contenu,
relance le script, puis ajoute l'URL dans sitemap.xml.

⚠️ Chaque ville DOIT avoir un texte différent. Copier-coller le même
contenu en changeant juste le nom de la ville est sanctionné par Google
(on appelle ça des « pages satellites »).
"""

import io
import os

SITE = "https://paulygone.fr"

VILLES = {
    "ales": {
        "nom": "Alès",
        "nom_de": "d'Alès",              # « à Alès » / « d'Alès »
        "prep": "à Alès",
        "cp": "30100",
        "lat": 44.1281,
        "lon": 4.0817,
        "title": "Création de site web à Alès — Développeur freelance | Paulygone",
        "desc": "Création de site internet à Alès et dans les Cévennes. Site vitrine sur-mesure, rapide et référencé sur Google, à partir de 490 €. Devis gratuit sous 24 h.",
        "h1_avant": "Création de site web",
        "h1_ville": "à Alès",
        "intro": (
            "Deuxième ville du Gard et porte des Cévennes, Alès concentre un tissu dense "
            "d'artisans, de PME industrielles et de commerces de centre-ville. Beaucoup "
            "travaillent encore au bouche-à-oreille, sans vitrine en ligne — alors que "
            "leurs clients les cherchent d'abord sur Google."
        ),
        "contexte_titre": "Pourquoi un site web change la donne à Alès",
        "contexte": [
            (
                "Un bassin d'activité qui se cherche en ligne",
                "Entre le centre historique, la zone de Croupillac et les communes de la "
                "vallée, la clientèle alésienne est dispersée. Quand quelqu'un tape "
                "« plombier Alès » ou « traiteur Alès », c'est Google qui décide qui il "
                "appellera. Sans site, vous n'êtes tout simplement pas dans la course."
            ),
            (
                "Une concurrence encore peu équipée",
                "C'est une bonne nouvelle : dans beaucoup de métiers alésiens, les "
                "professionnels bien positionnés se comptent sur les doigts d'une main. "
                "Un site propre et rapide suffit souvent à passer devant, alors que ce "
                "serait impossible sur un marché saturé."
            ),
            (
                "Le tourisme cévenol comme clientèle bonus",
                "Gîtes, restaurants, activités de plein air : la fréquentation touristique "
                "des Cévennes amène chaque année des visiteurs qui préparent tout depuis "
                "leur téléphone, souvent depuis une autre région. Ils ne vous trouveront "
                "que si vous existez en ligne."
            ),
        ],
        "faq": [
            (
                "Vous vous déplacez jusqu'à Alès ?",
                "Oui, sans supplément. Je me déplace pour le premier rendez-vous si vous "
                "préférez qu'on se rencontre. La suite du projet se pilote très bien par "
                "téléphone et par email — c'est même souvent plus rapide pour vous."
            ),
            (
                "Je suis artisan à Alès, j'ai vraiment besoin d'un site ?",
                "Si vos clients vous trouvent déjà sans, tant mieux. Mais un site vous "
                "rend joignable 24 h/24, montre vos réalisations en photo et rassure les "
                "nouveaux clients avant même le premier appel. Pour un artisan, c'est "
                "souvent le meilleur investissement de communication."
            ),
        ],
    },

    "uzes": {
        "nom": "Uzès",
        "nom_de": "d'Uzès",
        "prep": "à Uzès",
        "cp": "30700",
        "lat": 44.0122,
        "lon": 4.4194,
        "title": "Création de site web à Uzès — Développeur freelance | Paulygone",
        "desc": "Création de site internet à Uzès et dans l'Uzège. Design soigné pour commerces, gîtes et artisans d'art. À partir de 490 €, livré en 2 semaines.",
        "h1_avant": "Création de site web",
        "h1_ville": "à Uzès",
        "intro": (
            "Premier duché de France, Uzès vit du tourisme, de l'artisanat d'art et d'un "
            "commerce de centre-ville qui a du caractère. Ici, un site générique ne suffit "
            "pas : votre vitrine en ligne doit avoir le même soin que votre boutique."
        ),
        "contexte_titre": "Ce qu'un site apporte aux professionnels de l'Uzège",
        "contexte": [
            (
                "Une clientèle qui vient de loin",
                "Une grande partie de vos visiteurs ne vivent pas dans le Gard. Ils "
                "préparent leur séjour, leur achat ou leur réservation depuis chez eux, "
                "parfois plusieurs mois à l'avance. Votre site est le seul point de "
                "contact possible à ce moment-là."
            ),
            (
                "Le beau se vend avec de belles images",
                "Poterie, brocante, décoration, hébergement de charme : dans l'Uzège, "
                "l'achat est un coup de cœur. Je construis des galeries photo qui "
                "s'affichent instantanément, même sur un téléphone en 4G — parce qu'une "
                "belle image qui met cinq secondes à charger ne sert à rien."
            ),
            (
                "Réserver sans décrocher le téléphone",
                "Chambre d'hôtes, table de restaurant, atelier découverte : intégrer une "
                "prise de rendez-vous en ligne, c'est capter les demandes du soir et du "
                "week-end, quand vous n'êtes pas disponible pour répondre."
            ),
        ],
        "faq": [
            (
                "Mon activité est très saisonnière, est-ce rentable ?",
                "Justement : un site travaille toute l'année, y compris pendant la basse "
                "saison où vos futurs clients préparent leurs vacances. Et contrairement à "
                "un abonnement Wix, vous payez une fois — pas 25 € par mois même en janvier."
            ),
            (
                "Je vends des créations, faut-il une boutique en ligne ?",
                "Pas forcément. Un site vitrine avec une belle galerie et un formulaire de "
                "commande sur-mesure suffit souvent, et coûte bien moins cher. Si le volume "
                "le justifie ensuite, on ajoute la boutique. On en discute lors du devis, "
                "sans vous pousser vers l'option la plus chère."
            ),
        ],
    },

    "bagnols-sur-ceze": {
        "nom": "Bagnols-sur-Cèze",
        "nom_de": "de Bagnols-sur-Cèze",
        "prep": "à Bagnols-sur-Cèze",
        "cp": "30200",
        "lat": 44.1616,
        "lon": 4.6206,
        "title": "Création de site web à Bagnols-sur-Cèze — Freelance | Paulygone",
        "desc": "Création de site internet à Bagnols-sur-Cèze et dans le Gard rhodanien. Site vitrine professionnel, rapide et optimisé Google. Dès 490 €, devis gratuit.",
        "h1_avant": "Création de site web",
        "h1_ville": "à Bagnols-sur-Cèze",
        "intro": (
            "Entre le pôle technologique de Marcoule, les domaines viticoles des Côtes du "
            "Rhône et un centre-ville commerçant, le Gard rhodanien réunit des activités "
            "très différentes. Le point commun : une présence en ligne souvent datée, ou "
            "inexistante."
        ),
        "contexte_titre": "Trois raisons de soigner votre site dans le Gard rhodanien",
        "contexte": [
            (
                "Répondre aux exigences des donneurs d'ordre",
                "Sous-traitance industrielle, BTP, services aux entreprises : quand un "
                "acheteur reçoit votre devis, son premier réflexe est de taper le nom de "
                "votre société. Un site sérieux, avec vos références et vos certifications, "
                "fait la différence face à un concurrent qui n'a qu'une page Facebook."
            ),
            (
                "Vendre son vin au-delà du caveau",
                "Les domaines de la région accueillent des visiteurs de passage qui "
                "voudraient recommander une caisse trois mois plus tard. Sans site, ils ne "
                "retrouvent ni votre nom, ni votre contact. C'est du chiffre d'affaires qui "
                "s'évapore."
            ),
            (
                "Sortir dans les recherches locales",
                "Le Gard rhodanien est à cheval sur plusieurs bassins — Avignon, Orange, "
                "Pont-Saint-Esprit. Une configuration Google correcte permet d'apparaître "
                "sur toute cette zone, pas seulement sur votre commune."
            ),
        ],
        "faq": [
            (
                "J'ai déjà un site, mais il est vieux. Vous le refaites ?",
                "Oui, la refonte représente une bonne partie de mon activité. Je récupère "
                "ce qui fonctionne (vos textes, vos photos, votre référencement acquis) et "
                "je reconstruis le reste, en veillant à ne perdre aucune position sur "
                "Google au passage."
            ),
            (
                "Combien de temps entre le premier contact et la mise en ligne ?",
                "Deux à trois semaines pour un site vitrine, à condition que vous me "
                "fournissiez rapidement vos textes et vos photos. Je vous envoie une "
                "maquette à valider avant de développer : aucune mauvaise surprise à la fin."
            ),
        ],
    },

    "montpellier": {
        "nom": "Montpellier",
        "nom_de": "de Montpellier",
        "prep": "à Montpellier",
        "cp": "34000",
        "lat": 43.6108,
        "lon": 3.8767,
        "title": "Création de site web à Montpellier — Freelance | Paulygone",
        "desc": "Développeur web freelance à Montpellier : site vitrine sur-mesure, rapide et optimisé SEO. L'alternative souple à l'agence, à partir de 490 €.",
        "h1_avant": "Création de site web",
        "h1_ville": "à Montpellier",
        "intro": (
            "Montpellier ne manque pas d'agences web — et c'est précisément le problème "
            "pour un indépendant, un cabinet ou un jeune commerce : les devis démarrent "
            "souvent à plusieurs milliers d'euros, pour un projet qui n'en demande pas tant."
        ),
        "contexte_titre": "L'alternative freelance face aux agences montpelliéraines",
        "contexte": [
            (
                "Le même résultat, sans la structure à financer",
                "Une agence facture ses locaux, ses commerciaux et ses chefs de projet. En "
                "travaillant seul, je livre un site de qualité équivalente pour un site "
                "vitrine classique, à une fraction du budget. Vous payez du travail, pas "
                "de l'organigramme."
            ),
            (
                "Vous parlez à la personne qui code",
                "Pas d'intermédiaire, pas de brief déformé, pas de délai d'une semaine pour "
                "corriger un numéro de téléphone. Vous m'écrivez, je modifie. C'est le "
                "principal retour que me font mes clients."
            ),
            (
                "Un marché exigeant, un site qui doit suivre",
                "À Montpellier, vos concurrents sont bien équipés. Un site lent ou mal "
                "adapté au mobile se voit immédiatement. Je livre des pages qui s'affichent "
                "en moins de deux secondes, parce que c'est là que se joue la première "
                "impression."
            ),
        ],
        "faq": [
            (
                "Vous êtes à Nîmes, ça pose un problème ?",
                "Aucun : Montpellier est à une quarantaine de minutes, et je me déplace "
                "volontiers pour un premier rendez-vous. Le reste du projet se gère à "
                "distance, ce qui vous fait gagner du temps à vous aussi."
            ),
            (
                "Pourquoi si peu cher par rapport à une agence ?",
                "Parce que je n'ai ni bureaux à payer, ni équipe commerciale, et que je "
                "travaille avec des outils modernes qui accélèrent réellement le "
                "développement. Le prix bas ne vient pas d'un travail bâclé — mes "
                "réalisations sont toutes en ligne, vous pouvez les vérifier."
            ),
        ],
    },
}

# --- Projets mis en avant sur les pages villes (extrait du portfolio) ---
PROJETS = [
    ("https://anichamassagethai.com", "Anicha", "Anicha Massage Thaï",
     "Institut de massage à Nîmes : ambiance apaisante et réservation en un geste.", 1200, 597),
    ("https://www.mcrestor30.fr/", "mcrestor30", "MCRestor30",
     "Atelier de thermolaquage : galerie de réalisations et visibilité locale sur Google.", 1200, 641),
    ("https://show-room-oliv.fr/", "showroom-oliv", "ShowRoom d'Oliv",
     "Showroom mode : design raffiné, navigation fluide, pensé d'abord pour le mobile.", 1200, 597),
]

LOGO_SVG_FLECHE = ('<svg width="16" height="16" viewBox="0 0 16 16" fill="none">'
                   '<path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" '
                   'stroke-linecap="round" stroke-linejoin="round"/></svg>')


def bloc_projets():
    out = []
    for url, img, titre, desc, w, h in PROJETS:
        out.append(f"""                <a href="{url}" target="_blank" rel="noopener" class="portfolio-item reveal">
                    <div class="portfolio-image">
                        <picture>
                            <source srcset="{img}.webp" type="image/webp">
                            <img src="{img}.jpg" alt="Aperçu du site {titre}" class="portfolio-screenshot" loading="lazy" decoding="async" width="{w}" height="{h}">
                        </picture>
                    </div>
                    <div class="portfolio-content">
                        <h3 class="portfolio-title">{titre}</h3>
                        <p class="portfolio-description">{desc}</p>
                    </div>
                </a>""")
    return "\n\n".join(out)


def bloc_contexte(items):
    out = []
    for i, (titre, texte) in enumerate(items, start=1):
        out.append(f"""                <div class="service-card reveal">
                    <span class="service-num">({i:02d})</span>
                    <h3 class="service-title">{titre}</h3>
                    <p class="service-description">{texte}</p>
                </div>""")
    return "\n".join(out)


def bloc_faq(items):
    fleche = ('<svg class="faq-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">'
              '<path d="M3 6L8 11L13 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>')
    out = []
    for q, r in items:
        out.append(f"""                <div class="faq-item reveal">
                    <button class="faq-question" aria-expanded="false"><span>{q}</span>{fleche}</button>
                    <div class="faq-answer"><p>{r}</p></div>
                </div>""")
    return "\n".join(out)


def schema_faq(items):
    entries = []
    for q, r in items:
        q_ = q.replace('"', '\\"')
        r_ = r.replace('"', '\\"')
        entries.append(
            '        { "@type": "Question", "name": "%s", "acceptedAnswer": '
            '{ "@type": "Answer", "text": "%s" } }' % (q_, r_)
        )
    return ",\n".join(entries)


TEMPLATE = """<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="{desc}">
    <meta name="author" content="Paul Schricke">
    <meta name="theme-color" content="#FBFAF7" media="(prefers-color-scheme: light)">
    <meta name="theme-color" content="#12110E" media="(prefers-color-scheme: dark)">

    <script>
    (function () {{
      try {{
        var saved = localStorage.getItem('paulygone-theme');
        var sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', saved || sys);
      }} catch (e) {{
        document.documentElement.setAttribute('data-theme', 'light');
      }}
    }})();
    </script>

    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{desc}">
    <meta property="og:image" content="{site}/paulygone-social-share.jpg">
    <meta property="og:url" content="{site}/{slug_fichier}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="fr_FR">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{desc}">
    <meta name="twitter:image" content="{site}/paulygone-social-share.jpg">

    <link rel="canonical" href="{site}/{slug_fichier}">
    <link rel="icon" type="image/png" href="logo.png">
    <link rel="apple-touch-icon" href="logo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap"></noscript>
    <link rel="stylesheet" href="style.css">

    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Paulygone — Création de sites web {prep}",
      "description": "{desc}",
      "url": "{site}/{slug_fichier}",
      "logo": "{site}/logo.png",
      "image": "{site}/paulygone-social-share.jpg",
      "telephone": "+33637127688",
      "email": "schricke.paul@gmail.com",
      "priceRange": "490 € - 990 €",
      "address": {{
        "@type": "PostalAddress",
        "addressLocality": "Nîmes",
        "addressRegion": "Occitanie",
        "postalCode": "30000",
        "addressCountry": "FR"
      }},
      "areaServed": {{
        "@type": "City",
        "name": "{nom}",
        "postalCode": "{cp}",
        "geo": {{ "@type": "GeoCoordinates", "latitude": {lat}, "longitude": {lon} }}
      }},
      "founder": {{
        "@type": "Person",
        "name": "Paul Schricke",
        "sameAs": ["https://www.linkedin.com/in/paulschricke/"]
      }},
      "sameAs": ["https://www.linkedin.com/in/paulschricke/"]
    }}
    </script>

    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{ "@type": "ListItem", "position": 1, "name": "Accueil", "item": "{site}/" }},
        {{ "@type": "ListItem", "position": 2, "name": "Création de site web {prep}", "item": "{site}/{slug_fichier}" }}
      ]
    }}
    </script>

    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
{schema_faq}
      ]
    }}
    </script>
</head>
<body>

    <a class="skip-link" href="#contenu">Aller au contenu principal</a>

    <div class="progress-bar" id="progressBar"></div>

    <nav class="nav scrolled" id="nav">
        <div class="nav-inner">
            <a href="index.html" class="logo" aria-label="Paulygone — accueil">
                <picture>
                    <source srcset="logo.webp" type="image/webp">
                    <img src="logo.png" alt="Paulygone" class="logo-img" width="400" height="218">
                </picture>
                <span class="logo-sub">Web Creation</span>
            </a>
            <div class="nav-links" id="navLinks">
                <a href="index.html#portfolio">Portfolio</a>
                <a href="index.html#services">Services</a>
                <a href="index.html#tarifs">Tarifs</a>
                <a href="index.html#apropos">À propos</a>
                <a href="index.html#contact" class="nav-contact">Contact</a>
            </div>
            <div class="nav-tools">
                <button class="theme-toggle" id="themeToggle" type="button" aria-label="Basculer entre le mode clair et le mode sombre" title="Mode clair / sombre">
                    <svg class="theme-icon theme-icon--sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M4.22 4.22l1.77 1.77M18.01 18.01l1.77 1.77M2 12h2.5M19.5 12H22M4.22 19.78l1.77-1.77M18.01 5.99l1.77-1.77"/></svg>
                    <svg class="theme-icon theme-icon--moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
                </button>
                <button class="nav-burger" id="navBurger" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="navLinks">
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </nav>

    <!-- Hero -->
    <section class="hero ville-hero" id="contenu">
        <div class="container">
            <nav class="fil-ariane" aria-label="Fil d'Ariane">
                <a href="index.html">Accueil</a>
                <span aria-hidden="true">›</span>
                <span aria-current="page">Site web {prep}</span>
            </nav>
            <div class="hero-inner">
                <div class="hero-availability fade-up">
                    <span class="hero-availability-dot"></span>
                    Disponible — nouveau projet livré en 2 semaines
                </div>
                <h1 class="hero-title fade-up delay-1">
                    {h1_avant}<br>
                    <em>{h1_ville}</em>
                </h1>
                <p class="hero-sub fade-up delay-2">{intro}</p>
                <div class="hero-actions fade-up delay-3">
                    <a href="index.html#contact" class="btn btn-primary">Demander mon devis gratuit{fleche}</a>
                    <a href="#realisations" class="btn btn-ghost">Voir mes réalisations</a>
                </div>
                <div class="hero-trust fade-up delay-4">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 12.8 4.2 15l.7-4.3-3.1-3 4.3-.6z"/></svg>
                    Devis gratuit &amp; sans engagement · Réponse sous 24 h
                </div>
            </div>
        </div>
    </section>

    <!-- Contexte local -->
    <section class="section section-alt">
        <div class="container">
            <header class="section-head reveal">
                <span class="eyebrow">{nom}</span>
                <h2>{contexte_titre}</h2>
            </header>
            <div class="services-grid">
{bloc_contexte}
            </div>
        </div>
    </section>

    <!-- Réalisations -->
    <section id="realisations" class="section">
        <div class="container">
            <header class="section-head reveal">
                <span class="eyebrow">Réalisations</span>
                <h2>Des projets <em>réels</em>, en ligne</h2>
                <p>Un aperçu de mon travail. Tous ces sites sont consultables, vous pouvez les tester vous-même.</p>
            </header>
            <div class="portfolio-grid portfolio-grid--trois">
{bloc_projets}
            </div>
            <p class="ville-lien-portfolio reveal">
                <a href="index.html#portfolio" class="back-link" style="margin:0;">Voir tout le portfolio{fleche}</a>
            </p>
        </div>
    </section>

    <!-- Tarifs (résumé) -->
    <section class="section section-alt">
        <div class="container">
            <header class="section-head reveal">
                <span class="eyebrow">Tarifs</span>
                <h2>Un budget <em>connu d'avance</em></h2>
                <p>Pas d'abonnement, pas de frais cachés. Vous payez une fois, le site est à vous.</p>
            </header>
            <div class="ville-tarifs reveal">
                <div class="ville-tarif-item">
                    <span class="ville-tarif-nom">Essentiel</span>
                    <span class="ville-tarif-prix">dès 490 €</span>
                    <span class="ville-tarif-desc">Site vitrine 1 à 4 pages, formulaire de contact, mise en ligne incluse.</span>
                </div>
                <div class="ville-tarif-item ville-tarif-item--phare">
                    <span class="ville-tarif-nom">Pro</span>
                    <span class="ville-tarif-prix">dès 990 €</span>
                    <span class="ville-tarif-desc">Jusqu'à 8 pages, SEO approfondi, animations, 1 mois de support offert.</span>
                </div>
                <div class="ville-tarif-item">
                    <span class="ville-tarif-nom">Sur-mesure</span>
                    <span class="ville-tarif-prix">sur devis</span>
                    <span class="ville-tarif-desc">Boutique en ligne, application web, intégrations spécifiques.</span>
                </div>
            </div>
            <p class="ville-tarifs-note reveal">Le détail complet des formules est sur <a href="index.html#tarifs">la page tarifs</a>.</p>
        </div>
    </section>

    <!-- FAQ -->
    <section class="section">
        <div class="container">
            <header class="section-head reveal">
                <span class="eyebrow">FAQ</span>
                <h2>Questions <em>fréquentes</em></h2>
            </header>
            <div class="faq-list">
{bloc_faq}
            </div>
        </div>
    </section>

    <!-- CTA final -->
    <footer class="footer">
        <div class="footer-cta">
            <h2>Un projet {prep} ?<br><em>Parlons-en.</em></h2>
            <a href="index.html#contact" class="btn btn-lime">Demander mon devis gratuit{fleche}</a>
        </div>
        <div class="footer-inner">
            <div class="footer-contact">
                <a href="tel:0637127688">06 37 12 76 88</a>
                <a href="mailto:schricke.paul@gmail.com">schricke.paul@gmail.com</a>
            </div>
            <nav class="footer-villes" aria-label="Autres villes">
{liens_villes}
            </nav>
            <nav class="footer-links">
                <a href="index.html">Accueil</a>
                <a href="mentions-legales.html">Mentions légales</a>
                <a href="cgv.html">CGV</a>
                <a href="politique-confidentialite.html">Confidentialité</a>
            </nav>
            <p class="footer-copy">© 2026 Paulygone — Création de sites web à Nîmes</p>
        </div>
    </footer>

    <a href="https://wa.me/33637127688?text=Bonjour%20Paul%2C%20je%20suis%20int%C3%A9ress%C3%A9(e)%20par%20vos%20services%20de%20cr%C3%A9ation%20web%20!" class="whatsapp-btn" target="_blank" rel="noopener" aria-label="Contacter sur WhatsApp">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>

    <script src="script.js" defer></script>
    <script data-goatcounter="https://poloveni.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>
</body>
</html>
"""


def main():
    dossier = os.path.dirname(os.path.abspath(__file__))
    generes = []

    for slug, v in VILLES.items():
        fichier = f"creation-site-web-{slug}.html"

        # Maillage interne : liens vers les autres villes (bon pour le SEO)
        autres = [
            f'                <a href="creation-site-web-{s}.html">Site web à {d["nom"]}</a>'
            for s, d in VILLES.items() if s != slug
        ]
        autres.insert(0, '                <a href="index.html">Site web à Nîmes</a>')

        html = TEMPLATE.format(
            site=SITE,
            slug_fichier=fichier,
            title=v["title"],
            desc=v["desc"],
            nom=v["nom"],
            prep=v["prep"],
            cp=v["cp"],
            lat=v["lat"],
            lon=v["lon"],
            h1_avant=v["h1_avant"],
            h1_ville=v["h1_ville"],
            intro=v["intro"],
            contexte_titre=v["contexte_titre"],
            bloc_contexte=bloc_contexte(v["contexte"]),
            bloc_projets=bloc_projets(),
            bloc_faq=bloc_faq(v["faq"]),
            schema_faq=schema_faq(v["faq"]),
            liens_villes="\n".join(autres),
            fleche=LOGO_SVG_FLECHE,
        )

        chemin = os.path.join(dossier, fichier)
        with io.open(chemin, "w", encoding="utf-8") as f:
            f.write(html)
        generes.append(fichier)
        print(f"  ✓ {fichier}")

    # --- sitemap.xml ---
    urls = ["index.html", "mentions-legales.html", "cgv.html", "politique-confidentialite.html"] + generes
    lignes = ['<?xml version="1.0" encoding="UTF-8"?>',
              '<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">']
    lignes[1] = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    for u in urls:
        loc = f"{SITE}/" if u == "index.html" else f"{SITE}/{u}"
        prio = "1.0" if u == "index.html" else ("0.8" if u in generes else "0.3")
        freq = "weekly" if u == "index.html" else ("monthly" if u in generes else "yearly")
        lignes.append("  <url>")
        lignes.append(f"    <loc>{loc}</loc>")
        lignes.append(f"    <changefreq>{freq}</changefreq>")
        lignes.append(f"    <priority>{prio}</priority>")
        lignes.append("  </url>")
    lignes.append("</urlset>")

    with io.open(os.path.join(dossier, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write("\n".join(lignes) + "\n")
    print("  ✓ sitemap.xml")

    print(f"\n{len(generes)} page(s) ville générée(s). Pense à relire les textes avant de publier.")


if __name__ == "__main__":
    main()
