const SITE = { name: 'Purpyel' };

const SOCIALS = [
  { label: 'GitHub',  icon: 'github',  url: 'https://github.com/thePurpyel' },
  { label: 'Discord', icon: 'discord', url: 'https://discord.gg/rkSKtdW99R' },
  { label: 'Ko-fi',   icon: 'kofi',    url: 'https://ko-fi.com/purpyel' },
];

const ICONS = {
  github:  `<img src="/assets/github.svg"  alt="GitHub">`,
  discord: `<img src="/assets/discord.svg" alt="Discord">`,
  kofi:    `<img src="/assets/kofi.svg"    alt="Ko-fi">`,
};

const NAV_TABS = [
  { label: 'Home',          url: '/' },
  { label: 'WaterBot',      url: '/waterbot' },
  { label: 'Protogen Head', url: '/protogen' },
];

function initShared() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  /* ── Nav ── */
  const navTabsEl      = document.getElementById('nav-tabs');
  const navMobileInner = document.getElementById('nav-mobile-inner');
  const hamburger      = document.getElementById('nav-hamburger');
  const mobileMenu     = document.getElementById('nav-mobile-menu');

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }

  function navTabAction(url) {
    if (url.startsWith('#')) {
      document.getElementById(url.slice(1))
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      url.startsWith('http')
        ? window.open(url, '_blank', 'noopener')
        : (window.location.href = url);
    }
    closeMobileMenu();
  }

  NAV_TABS.forEach(tab => {
    const tabPath  = tab.url.startsWith('#') ? '/' : tab.url;
    const isActive = tabPath === path || (tabPath === '/' && path === '');

    const btn = document.createElement('button');
    btn.className = 'nav-tab' + (isActive ? ' active' : '');
    btn.textContent = tab.label;
    btn.addEventListener('click', () => navTabAction(tab.url));
    navTabsEl.appendChild(btn);

    const mBtn = document.createElement('button');
    mBtn.className = 'nav-mobile-item' + (isActive ? ' active' : '');
    mBtn.textContent = tab.label;
    mBtn.addEventListener('click', () => navTabAction(tab.url));
    navMobileInner.appendChild(mBtn);
  });

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      hamburger.classList.add('open');
      mobileMenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
    }
  });

  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target))
      closeMobileMenu();
  });

  /* ── Footer ── */
  const brand = document.getElementById('footer-brand');
  if (brand) brand.textContent = SITE.name;

  const footerLinks = document.getElementById('footer-links');
  if (footerLinks) {
    SOCIALS.forEach((s, i) => {
      if (i > 0) {
        const sep = document.createElement('span');
        sep.className = 'footer-sep';
        sep.textContent = '|';
        footerLinks.appendChild(sep);
      }
      const a = document.createElement('a');
      a.className = 'footer-link';
      a.href = s.url;
      if (s.url.startsWith('http')) { a.target = '_blank'; a.rel = 'noopener'; }
      a.innerHTML = `${ICONS[s.icon] || ''} ${s.label}`;
      footerLinks.appendChild(a);
    });
  }

  /* ── Scroll-reveal ── */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.anim-in').forEach(el => obs.observe(el));
}
