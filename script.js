// ---------------------------------------------------------
// Efek mengetik satu kali di blok komentar hero
// ---------------------------------------------------------
(function typeHeroComment() {
  const el = document.getElementById('fileComment');
  if (!el) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fullText = el.textContent;

  if (prefersReducedMotion) return; // biarkan teks statis, tidak perlu animasi

  el.textContent = '';
  el.style.opacity = '1';

  let i = 0;
  const speed = 10; // ms per karakter

  function step() {
    el.textContent = fullText.slice(0, i);
    i++;
    if (i <= fullText.length) {
      requestAnimationFrame(() => setTimeout(step, speed));
    }
  }
  step();
})();

// ---------------------------------------------------------
// Toggle menu navigasi di layar kecil
// ---------------------------------------------------------
(function mobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ---------------------------------------------------------
// Menandai link navigasi aktif sesuai posisi scroll
// ---------------------------------------------------------
(function activeNavOnScroll() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('[data-nav]');
  if (!sections.length || !navLinks.length) return;

  const map = new Map();
  navLinks.forEach((link) => {
    const id = link.getAttribute('href').replace('#', '');
    map.set(id, link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = map.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
})();