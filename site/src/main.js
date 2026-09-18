import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ---------- Contexte ---------- */
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const touch = matchMedia('(hover: none)').matches;
const body = document.body;
if (reduced) body.classList.add('reduced');

/* ---------- Scroll fluide (Lenis) ---------- */
const lenis = new Lenis({ lerp: 0.11, smoothWheel: true, wheelMultiplier: 1 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

// Liens d'ancre → défilement Lenis
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    closeMenu();
    lenis.scrollTo(el, { offset: id === '#top' ? 0 : -40, duration: 1.4 });
  });
});

/* ---------- Portrait vivant : vidéo en boucle + dérive de caméra liée au scroll ----------
   La vidéo tourne en temps réel (clignements, respiration) pour que le portrait ne soit jamais figé.
   Le scroll, lui, pilote une légère dérive de cadrage et le voile : il reste réversible et sans inertie. */
const bgv = document.getElementById('bgv');
const saveData = !!(navigator.connection && navigator.connection.saveData);
const useVideo = !reduced && !saveData;

if (!useVideo) {
  body.classList.add('no-video');
  bgv.remove();
} else {
  const small = matchMedia('(max-width: 767px)').matches;
  const file = small ? 'bg-mobile.mp4' : 'bg.mp4';
  bgv.loop = true;
  bgv.muted = true;
  const toPoster = () => { body.classList.add('no-video'); };
  bgv.addEventListener('error', toPoster, { once: true });
  // Chargement différé : le poster s'affiche tout de suite, la vidéo prend le relais sur la même image.
  const loadVideo = () => {
    bgv.preload = 'auto';
    bgv.src = new URL(file, new URL(import.meta.env.BASE_URL, location.href)).href;
    bgv.load();
    tryPlay();
  };
  // Lecture auto refusée (onglet en arrière-plan, économie d'énergie…) : la première image reste affichée,
  // identique au poster, et on relance à la première interaction ou au retour sur l'onglet.
  let wantPlay = true;
  const tryPlay = () => { if (!wantPlay) return; const p = bgv.play(); if (p && p.catch) p.catch(() => {}); };
  ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach((ev) => window.addEventListener(ev, () => { if (bgv.paused) tryPlay(); }, { passive: true }));
  if (document.readyState === 'complete') setTimeout(loadVideo, 150);
  else window.addEventListener('load', () => setTimeout(loadVideo, 150), { once: true });

  // Dérive de caméra pilotée par le scroll (s'arrête quand on s'arrête, revient quand on remonte).
  gsap.fromTo(bgv, { scale: 1.03, xPercent: 0 }, {
    scale: 1.1, xPercent: -1.2, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  // Inutile de décoder la vidéo quand le voile la recouvre presque entièrement.
  ScrollTrigger.create({
    trigger: '#work', start: 'top 15%', endTrigger: '#contact', end: 'top 95%',
    onToggle: (self) => { wantPlay = !self.isActive; if (self.isActive) bgv.pause(); else tryPlay(); },
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) bgv.pause(); else tryPlay(); });
  window.__bgv = bgv;
}
window.__lenis = lenis;
window.__ST = ScrollTrigger;

/* ---------- Voile progressif sur la vidéo ---------- */
const veil = document.querySelector('.bg-veil');
gsap.to(veil, { opacity: 0.9, ease: 'none', scrollTrigger: { trigger: '#work', start: 'top 95%', end: 'top 25%', scrub: true } });
gsap.fromTo(veil, { opacity: 0.9 }, { opacity: 0.5, ease: 'none', immediateRender: false, scrollTrigger: { trigger: '#contact', start: 'top 90%', end: 'top 20%', scrub: true } });

/* ---------- Intro hero ---------- */
const heroEls = gsap.utils.toArray('[data-hero]');
if (!reduced) {
  const lines = gsap.utils.toArray('.hero__title .line');
  gsap.set(heroEls, { opacity: 1 });
  gsap.set(lines, { yPercent: 110 });
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.25 });
  tl.from('.hero__kicker', { opacity: 0, y: 14, duration: 0.9 })
    .to(lines, { yPercent: 0, duration: 1.3, stagger: 0.12 }, '-=0.5')
    .from('.hero__sub', { opacity: 0, y: 18, duration: 1 }, '-=0.8')
    .from('.hero__ctas > *', { opacity: 0, y: 14, duration: 0.8, stagger: 0.1 }, '-=0.7')
    .from('.hero__scroll', { opacity: 0, duration: 0.8 }, '-=0.4');
  // Le hero s'efface doucement quand on quitte le premier écran
  gsap.to('.hero__inner', { opacity: 0, y: -40, ease: 'none', scrollTrigger: { trigger: '.hero', start: '45% top', end: 'bottom top', scrub: true } });
}

/* ---------- Révélations au scroll ---------- */
if (!reduced) {
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
  gsap.utils.toArray('[data-parallax]').forEach((el) => {
    const amt = parseFloat(el.dataset.parallax) || 40;
    gsap.fromTo(el, { y: -amt }, { y: amt, ease: 'none', scrollTrigger: { trigger: el.closest('.case') || el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

/* ---------- Scènes Higgsfield des études de cas : repli sur les captures si l'image manque ---------- */
document.querySelectorAll('.case__scene').forEach((scene) => {
  const img = scene.querySelector('img');
  const fail = () => scene.closest('.case__stage').classList.add('no-scene');
  if (img.complete && img.naturalWidth === 0) fail();
  img.addEventListener('error', fail, { once: true });
});

/* ---------- Navigation ---------- */
const nav = document.getElementById('nav');
let lastY = 0;
lenis.on('scroll', ({ scroll, direction }) => {
  nav.classList.toggle('is-scrolled', scroll > 40);
  nav.classList.toggle('is-past-hero', scroll > innerHeight * 0.7);
  if (scroll > 200 && direction === 1 && scroll > lastY + 4) nav.classList.add('is-hidden');
  else if (direction === -1 || scroll < 120) nav.classList.remove('is-hidden');
  lastY = scroll;
});
const burger = document.getElementById('burger');
const menu = document.getElementById('mobileMenu');
function closeMenu() { menu.classList.remove('is-open'); menu.setAttribute('aria-hidden', 'true'); burger.setAttribute('aria-expanded', 'false'); lenis.start(); }
burger.addEventListener('click', () => {
  const open = !menu.classList.contains('is-open');
  menu.classList.toggle('is-open', open);
  menu.setAttribute('aria-hidden', String(!open));
  burger.setAttribute('aria-expanded', String(open));
  open ? lenis.stop() : lenis.start();
  if (open) menu.querySelector('a').focus();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('is-open')) { closeMenu(); burger.focus(); } });

/* ---------- FAQ animée ---------- */
document.querySelectorAll('.faq__item').forEach((d) => {
  const bodyEl = d.querySelector('.faq__body');
  const summary = d.querySelector('summary');
  summary.addEventListener('click', (e) => {
    e.preventDefault();
    if (reduced) { d.open = !d.open; return; }
    if (d.open) {
      gsap.to(bodyEl, { height: 0, opacity: 0, duration: 0.45, ease: 'power3.inOut', onComplete: () => { d.open = false; bodyEl.style.height = ''; } });
    } else {
      d.open = true;
      gsap.fromTo(bodyEl, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.55, ease: 'power3.out', onComplete: () => { bodyEl.style.height = ''; ScrollTrigger.refresh(); } });
    }
  });
});

/* ---------- Curseur ---------- */
if (!touch && !reduced) {
  body.classList.add('has-cursor');
  const cur = document.getElementById('cursor');
  const dotX = gsap.quickTo('.cursor__dot', 'x', { duration: 0.12, ease: 'power3' });
  const dotY = gsap.quickTo('.cursor__dot', 'y', { duration: 0.12, ease: 'power3' });
  const ringX = gsap.quickTo('.cursor__ring', 'x', { duration: 0.42, ease: 'power3' });
  const ringY = gsap.quickTo('.cursor__ring', 'y', { duration: 0.42, ease: 'power3' });
  window.addEventListener('mousemove', (e) => { dotX(e.clientX); dotY(e.clientY); ringX(e.clientX); ringY(e.clientY); cur.style.opacity = '1'; });
  document.addEventListener('mouseleave', () => { cur.style.opacity = '0'; });
  const hoverables = 'a, button, summary, input, textarea, .services__row, .step';
  document.addEventListener('mouseover', (e) => { if (e.target.closest(hoverables)) body.classList.add('cursor-hover'); });
  document.addEventListener('mouseout', (e) => { if (e.target.closest(hoverables)) body.classList.remove('cursor-hover'); });
}

/* ---------- Formulaire de contact ----------
   Prêt pour un service d'envoi (Web3Forms, Formspree, endpoint maison…).
   Tant que FORM_ENDPOINT est vide, repli : ouverture de la messagerie avec le message prérempli. */
const FORM_ENDPOINT = '';   // ex. 'https://api.web3forms.com/submit'
const FORM_ACCESS_KEY = ''; // clé publique fournie par le service (jamais de secret ici)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
const submitBtn = form.querySelector('button[type="submit"]');
const formOpenedAt = Date.now();

const setStatus = (msg, kind = '') => { status.textContent = msg; status.className = 'mono form__status' + (kind ? ' is-' + kind : ''); };
const fields = ['name', 'email', 'message'].map((n) => form.elements[n]);
fields.forEach((f) => f.addEventListener('input', () => { f.removeAttribute('aria-invalid'); }));

function validate() {
  let firstBad = null;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.elements.email.value.trim());
  fields.forEach((f) => {
    const bad = !f.value.trim() || (f.name === 'email' && !emailOk);
    if (bad) f.setAttribute('aria-invalid', 'true'); else f.removeAttribute('aria-invalid');
    if (bad && !firstBad) firstBad = f;
  });
  if (firstBad) { firstBad.focus(); setStatus(firstBad.name === 'email' && firstBad.value.trim() ? 'Vérifiez le format de votre email.' : 'Nom, email et quelques mots sur le projet sont nécessaires.', 'err'); }
  return !firstBad;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validate()) return;
  const data = Object.fromEntries(new FormData(form).entries());
  // Anti-spam : champ piège rempli ou envoi trop rapide → on ignore silencieusement.
  if (data.website || Date.now() - formOpenedAt < 3000) { setStatus('Message envoyé. Je vous réponds personnellement, rapidement.', 'ok'); form.reset(); return; }
  delete data.website;

  if (!FORM_ENDPOINT) {
    const subject = encodeURIComponent(`Projet web — ${data.name}${data.company ? ' (' + data.company + ')' : ''}`);
    const bodyTxt = encodeURIComponent(`${data.message}\n\n— ${data.name}\n${data.email}${data.company ? '\n' + data.company : ''}`);
    location.href = `mailto:schricke.paul@gmail.com?subject=${subject}&body=${bodyTxt}`;
    setStatus('Votre messagerie s\'ouvre avec le message prérempli.', 'ok');
    return;
  }

  submitBtn.disabled = true;
  setStatus('Envoi en cours…');
  try {
    const r = await fetch(FORM_ENDPOINT, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: FORM_ACCESS_KEY, subject: `Projet web — ${data.name}`, ...data }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || j.success === false) throw new Error(j.message || 'Erreur serveur');
    form.reset();
    setStatus('Message envoyé. Je vous réponds personnellement, rapidement.', 'ok');
  } catch {
    setStatus('Envoi impossible pour le moment. Écrivez-moi directement : schricke.paul@gmail.com', 'err');
  } finally {
    submitBtn.disabled = false;
  }
});

/* ---------- Boot ---------- */
window.addEventListener('load', () => ScrollTrigger.refresh());
