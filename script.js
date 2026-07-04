// ============================================
// Year in footer
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================
// Hero terminal typing effect
// ============================================
const typedEl = document.getElementById('typedText');
const lines = [
  'scan --target=akshata.dev',
  'access granted. loading profile...'
];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeLines(lines, el){
  if (reduceMotion) {
    el.textContent = lines[lines.length - 1];
    return;
  }
  let lineIndex = 0;
  let charIndex = 0;

  function typeChar(){
    const current = lines[lineIndex];
    if (charIndex <= current.length){
      el.textContent = current.slice(0, charIndex);
      charIndex++;
      setTimeout(typeChar, 32);
    } else if (lineIndex < lines.length - 1){
      setTimeout(() => {
        lineIndex++;
        charIndex = 0;
        typeChar();
      }, 500);
    }
  }
  typeChar();
}
typeLines(lines, typedEl);

// ============================================
// Mobile nav toggle
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================
// Scroll reveal for sections
// ============================================
const revealTargets = document.querySelectorAll(
  '.about__body, .skills__grid, .timeline__item, .finding-card, .edu-grid, .contact__grid'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));
