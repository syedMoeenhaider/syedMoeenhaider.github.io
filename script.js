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
    const r = s.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      reveal(s);
    } else {
      observer.observe(s);
    }
  });
} else {
  document.querySelectorAll('.section').forEach(reveal);
}

// Smooth anchor scrolling
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

// Project filters
document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.work-card').forEach((card) => {
      const cats = (card.dataset.category || '').split(' ');
      if (filter === 'all' || cats.includes(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
