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

  /* ---------- Menu mobile (burger) ---------- */
  var burger = document.getElementById('navBurger');
  var links  = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      links.classList.toggle('open');
      var spans = burger.querySelectorAll('span');
      var open  = links.classList.contains('open');
      spans[0].style.transform = open ? 'rotate(45deg) translateY(3.5px)' : '';
      spans[1].style.transform = open ? 'rotate(-45deg) translateY(-3.5px)' : '';
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        burger.querySelectorAll('span').forEach(function (s) { s.style.transform = ''; });
      });
    });
  }

  /* ---------- Apparition des éléments au scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
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

  /* ---------- Formulaire de contact (Web3Forms) ---------- */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var btn   = form.querySelector('.btn-submit');
      var label = btn.querySelector('.btn-submit-label');
      var succ  = document.getElementById('formSuccess');
      btn.classList.add('sending');
      btn.disabled = true;
      if (label) label.textContent = 'Envoi…';

      var formData = new FormData(form);
      formData.append('access_key', '1a79de7f-cdea-4b44-bd65-ef53ac8cf7d6');
      formData.append('subject', 'Nouveau contact — Paulygone.fr');
      formData.append('from_name', 'Paulygone Contact');

      try {
        var res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
        var data = await res.json();
        if (data.success) {
          btn.style.display = 'none';
          var notice = form.querySelector('.form-notice');
          if (notice) notice.style.display = 'none';
          if (succ) succ.classList.add('visible');
          form.reset();
        } else { throw new Error(data.message); }
      } catch (err) {
        btn.classList.remove('sending');
        btn.disabled = false;
        if (label) label.textContent = 'Erreur — réessayez';
        setTimeout(function () {
          if (label) label.textContent = 'Envoyer ma demande';
        }, 3000);
      }
    });
  }

});
