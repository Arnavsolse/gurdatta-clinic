/* ============================================================
   GURUDATTA CLINIC & DIAGNOSTIC CENTER — script.js
   ============================================================ */

'use strict';

/* ── 1. NAVBAR SCROLL STATE ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

/* ── 2. MOBILE HAMBURGER MENU ── */
const hamburger     = document.getElementById('hamburger');
const mobileMenu    = document.getElementById('mobile-menu');
const hamburgerIcon = document.getElementById('hamburger-icon');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburgerIcon.innerHTML = isOpen ? svgX() : svgMenu();
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburgerIcon.innerHTML = svgMenu();
  });
});

/* ── 3. SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el    = entry.target;
    const delay = parseFloat(el.dataset.delay || 0) * 1000;
    setTimeout(() => el.classList.add('revealed'), delay);
    revealObs.unobserve(el);
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

/* ── 4. ANIMATED COUNTERS ── */
const counterEls = document.querySelectorAll('[data-counter]');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el       = entry.target;
    const target   = parseFloat(el.dataset.counter);
    const suffix   = el.dataset.suffix  || '';
    const decimals = parseInt(el.dataset.decimal || 0);
    const duration = 1800;
    const stepMs   = 16;
    const steps    = duration / stepMs;
    const inc      = target / steps;
    let current    = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) {
        el.textContent = target.toFixed(decimals) + suffix;
        clearInterval(timer);
      } else {
        el.textContent = current.toFixed(decimals) + suffix;
      }
    }, stepMs);
    counterObs.unobserve(el);
  });
}, { threshold: 0.3 });
counterEls.forEach(el => counterObs.observe(el));

/* ── 5. FAQ ACCORDION ── */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-btn').addEventListener('click', () => {
    const isOpen = item.classList.toggle('open');
    item.querySelector('.faq-btn').setAttribute('aria-expanded', isOpen);
  });
});

/* ── 6. BOOKING FORM → WhatsApp ── */
const bookForm = document.getElementById('booking-form');
if (bookForm) {
  bookForm.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('f-name').value.trim();
    const phone   = document.getElementById('f-phone').value.trim();
    const service = document.getElementById('f-service').value;
    const date    = document.getElementById('f-date').value;

    if (!name || !phone) {
      showToast('Please enter your name and phone number.', '#e74c3c');
      return;
    }

    const msg = encodeURIComponent(
      `Hello Gurudatta Clinic!\nI'd like to book an appointment.\nName: ${name}\nPhone: ${phone}\nService: ${service || 'Not specified'}\nPreferred Date: ${date || 'Flexible'}`
    );
    window.open(`https://wa.me/919423201371?text=${msg}`, '_blank');
    showToast('✓ Opening WhatsApp…');
    bookForm.reset();
  });
}

/* ── 7. TOAST ── */
function showToast(msg, bg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  if (bg) toast.style.background = bg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ── 8. MARQUEE DUPLICATE (seamless) ── */
const track = document.querySelector('.marquee-track');
if (track) {
  track.innerHTML += track.innerHTML;
}

/* ── 9. STAGGER DELAYS on service cards ── */
document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.12}s`;
});

/* ── 10. FLOATING PILL stagger ── */
document.querySelectorAll('.floating-pill').forEach((pill, i) => {
  pill.style.animationDelay = `${i * 0.5}s`;
});

/* ── 11. FORM FOCUS STYLING ── */
document.querySelectorAll('.form-input, .form-select').forEach(el => {
  el.addEventListener('focus', () => el.style.borderColor = '#0056B3');
  el.addEventListener('blur',  () => el.style.borderColor = '#e2e8f0');
});

/* ── 12. ACTIVE NAV on scroll ── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const secObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('nav-active'));
      const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (link) link.classList.add('nav-active');
    }
  });
}, { rootMargin: '-35% 0px -60% 0px' });
sections.forEach(s => secObs.observe(s));

/* ── 13. LOGO → scroll to top ── */
document.querySelector('.nav-logo').style.cursor = 'pointer';
document.querySelector('.nav-logo').addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

/* ── SVG HELPERS ── */
function svgMenu() {
  return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
}
function svgX() {
  return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
}
