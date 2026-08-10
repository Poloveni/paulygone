/* =========================================================
   PAULYGONE — Interactions du site (Studio clair)
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Barre de progression au scroll ---------- */
  var bar = document.getElementById('progressBar');
  if (bar) {
    window.addEventListener('scroll', function () {
      var h = document.documentElement;
      var pct = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ---------- Navigation : fond au scroll ---------- */
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ---------- Bascule mode clair / mode sombre ----------
     Le thème est déjà appliqué par le petit script placé dans le <head>
     (pour éviter que la page clignote au chargement). Ici on gère juste le clic. */
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next    = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('paulygone-theme', next); } catch (e) {}
      themeToggle.setAttribute('aria-label',
        next === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre');
      var meta = document.querySelector('meta[name="theme-color"]:not([media])');
      if (meta) meta.setAttribute('content', next === 'dark' ? '#12110E' : '#FBFAF7');
    });
  }

  /* ---------- Menu mobile (burger) ---------- */
  var burger = document.getElementById('navBurger');
  var links  = document.getElementById('navLinks');
  if (burger && links) {
    var setBurger = function (open) {
      links.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      var spans = burger.querySelectorAll('span');
      spans[0].style.transform = open ? 'rotate(45deg) translateY(3.5px)' : '';
      spans[1].style.transform = open ? 'rotate(-45deg) translateY(-3.5px)' : '';
    };
    burger.addEventListener('click', function () {
      setBurger(!links.classList.contains('open'));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setBurger(false); });
    });
    /* Échap ferme le menu, et le focus revient sur le bouton */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        setBurger(false);
        burger.focus();
      }
    });
  }

  /* ---------- Apparition des éléments au scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');

  /* Cascade : décalage progressif entre éléments d'un même groupe */
  var revealGroups = [];
  reveals.forEach(function (el) {
    var p = el.parentElement;
    var idx = revealGroups.indexOf(p);
    if (idx === -1) { revealGroups.push(p); p.__revealIndex = 0; }
    el.style.transitionDelay = Math.min(p.__revealIndex * 90, 450) + 'ms';
    p.__revealIndex++;
  });

  if ('IntersectionObserver' in window && reveals.length) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { revealObs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Compteurs animés (stats) ---------- */
  var statNums = document.querySelectorAll('.stat-num');
  if (statNums.length && 'IntersectionObserver' in window) {
    var statsObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        statsObs.unobserve(entry.target);
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-target'), 10);
        var duration = 1200, start = performance.now();
        function tick(now) {
          var progress = Math.min((now - start) / duration, 1);
          var ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(ease * target);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    statNums.forEach(function (el) { statsObs.observe(el); });
  }

  /* ---------- FAQ : accordéon ---------- */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (el) {
        el.classList.remove('open');
        el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Surlignage du lien de nav actif ---------- */
  var navMap = {};
  ['portfolio', 'services', 'processus', 'contact'].forEach(function (id) {
    navMap[id] = document.querySelector('.nav-links a[href="#' + id + '"]');
  });
  if ('IntersectionObserver' in window) {
    var sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          Object.keys(navMap).forEach(function (k) {
            if (navMap[k]) navMap[k].classList.remove('nav-active');
          });
          if (navMap[id]) navMap[id].classList.add('nav-active');
        }
      });
    }, { threshold: 0.35 });
    ['#portfolio', '#services', '#processus', '#contact'].forEach(function (sel) {
      var s = document.querySelector(sel);
      if (s) sectionObs.observe(s);
    });
  }

  /* ---------- Bouton retour en haut ---------- */
  var backBtn = document.getElementById('backToTop');
  if (backBtn) {
    window.addEventListener('scroll', function () {
      backBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Barre d'action mobile ---------- */
  var mobileCta = document.getElementById('mobileCta');
  if (mobileCta) {
    window.addEventListener('scroll', function () {
      mobileCta.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
  }

  /* ---------- Vidéo différée (chargée quand visible) ---------- */
  var lazyVid = document.querySelector('video[data-src]');
  if (lazyVid) {
    var loadVid = function () {
      lazyVid.src = lazyVid.getAttribute('data-src');
      lazyVid.removeAttribute('data-src');
      lazyVid.play().catch(function () {});
    };
    if ('IntersectionObserver' in window) {
      var vidObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { loadVid(); vidObs.disconnect(); }
        });
      }, { rootMargin: '300px' });
      vidObs.observe(lazyVid);
    } else {
      loadVid();
    }
  }

  /* ---------- Formulaire de contact (Web3Forms) ---------- */
  var form = document.getElementById('contactForm');
  if (form) {

    /* Règles de validation, champ par champ */
    var rules = {
      name:    function (v) { return v.trim().length >= 2 || 'Merci d’indiquer votre nom.'; },
      email:   function (v) { return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim()) || 'Cette adresse email semble incorrecte.'; },
      phone:   function (v) { return v.trim() === '' || /^[\d\s+().-]{8,20}$/.test(v.trim()) || 'Ce numéro de téléphone semble incorrect.'; },
      project: function (v) { return v !== '' || 'Merci de choisir un type de projet.'; },
      message: function (v) { return v.trim().length >= 10 || 'Décrivez votre projet en quelques mots (10 caractères minimum).'; }
    };

    function showError(field, msg) {
      var box = form.querySelector('#error-' + field.name);
      field.setAttribute('aria-invalid', 'true');
      if (box) { box.textContent = msg; box.classList.add('visible'); }
    }
    function clearError(field) {
      var box = form.querySelector('#error-' + field.name);
      field.removeAttribute('aria-invalid');
      if (box) { box.textContent = ''; box.classList.remove('visible'); }
    }
    function validateField(field) {
      var rule = rules[field.name];
      if (!rule) return true;
      var result = rule(field.value);
      if (result === true) { clearError(field); return true; }
      showError(field, result);
      return false;
    }

    /* On valide quand l'utilisateur quitte un champ, et on efface l'erreur dès qu'il corrige */
    Object.keys(rules).forEach(function (name) {
      var field = form.elements[name];
      if (!field) return;
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        if (field.getAttribute('aria-invalid') === 'true') validateField(field);
      });
    });

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      /* Validation complète : on s'arrête au premier champ invalide */
      var firstInvalid = null;
      Object.keys(rules).forEach(function (name) {
        var field = form.elements[name];
        if (field && !validateField(field) && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      /* Piège anti-robots : si ce champ caché est rempli, c'est un bot.
         On simule un envoi réussi pour ne pas lui donner d'indice. */
      var honeypot = form.elements['botcheck'];
      var isBot = honeypot && honeypot.value !== '';

      var btn    = form.querySelector('.btn-submit');
      var label  = btn.querySelector('.btn-submit-label');
      var succ   = document.getElementById('formSuccess');
      var notice = form.querySelector('.form-notice');

      function markSent() {
        btn.style.display = 'none';
        if (notice) notice.style.display = 'none';
        if (succ) succ.classList.add('visible');
        form.reset();
      }

      btn.classList.add('sending');
      btn.disabled = true;
      if (label) label.textContent = 'Envoi…';

      if (isBot) { markSent(); return; }

      var formData = new FormData(form);
      formData.append('access_key', '1a79de7f-cdea-4b44-bd65-ef53ac8cf7d6');
      formData.append('subject', 'Nouveau contact — Paulygone.fr');
      formData.append('from_name', 'Paulygone Contact');

      /* Sécurité : on abandonne au bout de 15 s plutôt que de laisser le bouton bloqué */
      var controller = new AbortController();
      var timer = setTimeout(function () { controller.abort(); }, 15000);

      try {
        var res  = await fetch('https://api.web3forms.com/submit', {
          method: 'POST', body: formData, signal: controller.signal
        });
        clearTimeout(timer);
        var data = await res.json();
        if (data.success) { markSent(); }
        else { throw new Error(data.message || 'Erreur inconnue'); }
      } catch (err) {
        clearTimeout(timer);
        btn.classList.remove('sending');
        btn.disabled = false;
        if (label) label.textContent = 'Échec — réessayez';
        var fallback = document.getElementById('formFallback');
        if (fallback) fallback.classList.add('visible');
        setTimeout(function () {
          if (label) label.textContent = 'Envoyer ma demande';
        }, 4000);
      }
    });
  }

});
