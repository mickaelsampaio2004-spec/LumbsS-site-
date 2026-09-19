
const menuButton = 
document.getElementById('menuButton'); const nav = 
document.getElementById('nav'); const currentYear = 
document.getElementById('currentYear'); if 
(currentYear) {
  currentYear.textContent = new 
  Date().getFullYear();
}
if (menuButton && nav) { 
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open'); 
    menuButton.setAttribute('aria-expanded', 
    String(isOpen)); menuButton.textContent = isOpen 
    ? '✕' : '☰';
  });
  nav.querySelectorAll('a').forEach((link) => { 
    link.addEventListener('click', () => {
      nav.classList.remove('open'); 
      menuButton.setAttribute('aria-expanded', 
      'false'); menuButton.textContent = '☰';
    });
  });
}
const revealTargets = document.querySelectorAll( 
  '.section-heading, .card, .feature-card, 
  .audience-card, .solution-item, .step, .principle, 
  .pilot-card'
); revealTargets.forEach((element) => { 
  element.classList.add('reveal');
});
if ('IntersectionObserver' in window) { const 
  observer = new IntersectionObserver(
    (entries) => { entries.forEach((entry) => { if 
        (entry.isIntersecting) {
          entry.target.classList.add('visible'); 
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 
      0px',
    }
  ); revealTargets.forEach((element) => 
  observer.observe(element));
} else {
  revealTargets.forEach((element) => 
  element.classList.add('visible'));
}

let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
});

document.addEventListener('click', async (event) => {
  const installLink = event.target.closest('a[href="/app/"]');

  if (!installLink) return;

  if (deferredInstallPrompt) {
    event.preventDefault();

    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;

    deferredInstallPrompt = null;
    return;
  }

  const isIOS =
    /iphone|ipad|ipod/i.test(navigator.userAgent) &&
    !window.matchMedia('(display-mode: standalone)').matches;

  if (isIOS) {
    event.preventDefault();
    window.location.href = '/app/?install=ios';
  }
});
