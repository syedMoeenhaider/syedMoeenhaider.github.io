// Scroll reveal for sections
const reveal = (el) => el.classList.add('visible');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        reveal(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.section').forEach((s) => {
    // If already in view (e.g. direct #anchor link), reveal immediately
    const r = s.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      reveal(s);
    } else {
      observer.observe(s);
    }
  });
} else {
  // Fallback: show everything
  document.querySelectorAll('.section').forEach(reveal);
}

// Smooth anchor scrolling that also reveals the target
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        reveal(target);
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', id);
      }
    }
  });
});

// Smooth active nav highlight
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = [...document.querySelectorAll('.section[id], .hero[id]')];

window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  let current = 'top';
  sections.forEach(s => { if (s.offsetTop <= y) current = s.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
}, { passive: true });
