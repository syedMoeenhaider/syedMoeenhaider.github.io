// Scroll reveal for sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.section').forEach(s => observer.observe(s));

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
