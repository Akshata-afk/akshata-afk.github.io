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
// SOC ticker feed
// ============================================
const tickerMessages = [
  ['[INFO]', 'Nmap scan completed — 0 open ports flagged'],
  ['[SCAN]', 'APK static analysis running on target build'],
  ['[OK]', 'OWASP ZAP baseline scan finished — no criticals'],
  ['[INFO]', 'Burp Suite proxy capturing traffic'],
  ['[SCAN]', 'jadx decompilation complete'],
  ['[OK]', 'Wireshark capture analyzed — no anomalies'],
  ['[INFO]', 'CVSS scoring applied to 3 findings'],
  ['[SCAN]', 'Dynamic analysis session started']
];
const track = document.getElementById('tickerTrack');
if (track){
  const build = () => tickerMessages.map(
    ([tag, msg]) => `<span>${tag}</span>${msg}`
  ).join('<span style="color:var(--text-dim);margin:0 8px;">//</span>');
  track.innerHTML = build() + build(); // duplicate for seamless loop
}

// ============================================
// Packet counter (cosmetic, ties to "live" feel)
// ============================================
const packetEl = document.getElementById('packetCount');
if (packetEl && !reduceMotion){
  let count = 1200 + Math.floor(Math.random() * 300);
  packetEl.textContent = count.toLocaleString();
  setInterval(() => {
    count += Math.floor(Math.random() * 40) + 5;
    packetEl.textContent = count.toLocaleString();
  }, 1800);
} else if (packetEl){
  packetEl.textContent = '1,482';
}

// ============================================
// Live network chart (redraws with new points periodically)
// ============================================
const chartLine = document.getElementById('chartLine');
if (chartLine && !reduceMotion){
  function randomPoints(){
    const step = 40;
    let pts = [];
    for (let x = 0; x <= 400; x += step){
      const y = 30 + Math.random() * 60;
      pts.push(`${x},${y.toFixed(1)}`);
    }
    return pts.join(' ');
  }
  setInterval(() => {
    chartLine.setAttribute('points', randomPoints());
  }, 2600);
}

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
