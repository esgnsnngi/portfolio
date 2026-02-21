// Scroll reveal
const revealElements = document.querySelectorAll(".edu-card, .skill-card, .project-card, .sec-head, .hero-text");

revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(40px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach((el) => revealObserver.observe(el));
(function () {
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");
  let W, H, particles = [];
  const COUNT = 70;
  const MAX_DIST = 130;
  const COLOR = "79, 142, 247";

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  class Dot {
    constructor() { this.reset(true); }
    reset(random) {
      this.x  = random ? Math.random() * W : (Math.random() < 0.5 ? 0 : W);
      this.y  = random ? Math.random() * H : (Math.random() < 0.5 ? 0 : H);
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.r  = Math.random() * 1.6 + 0.6;
      this.a  = Math.random() * 0.6 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -10 || this.x > W + 10 || this.y < -10 || this.y > H + 10) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${COLOR}, ${this.a})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Dot());

  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          const alpha = (1 - d / MAX_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${COLOR}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }
  frame();
})();
/* ── Resume buttons ── */
const resume = "Tejas_H_G_CV.pdf";
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.dataset.action === "view") {
      window.open(resume, "_blank");
    } else if (btn.dataset.action === "Download") {
      const a = document.createElement("a");
      a.href = resume; a.download = resume; a.click();
    }
  });
});

/* ── Typewriter ── */
const words = ["Python Developer", "Frontend Developer", "Full Stack Developer", "Quick Learner", "Passionate Coder"];
const el = document.getElementById("type");
let wi = 0, ci = 0, deleting = false;
function type() {
  const w = words[wi];
  el.textContent = w.slice(0, ci);
  if (!deleting && ci < w.length) { ci++; setTimeout(type, 110); }
  else if (deleting && ci > 0) { ci--; setTimeout(type, 65); }
  else {
    deleting = !deleting;
    if (!deleting) wi = (wi + 1) % words.length;
    setTimeout(type, deleting ? 1400 : 350);
  }
}
type();

/* ── Mobile sidebar ── */
const ham = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

function toggleSidebar(open) {
  ham.classList.toggle("open", open);
  sidebar.classList.toggle("open", open);
  overlay.classList.toggle("show", open);
  document.body.style.overflow = open ? "hidden" : "";
}

ham.addEventListener("click", () => toggleSidebar(!sidebar.classList.contains("open")));
overlay.addEventListener("click", () => toggleSidebar(false));

/* ── Smooth scroll + close sidebar on mobile ── */
document.querySelectorAll(".nav-item").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const id = link.dataset.target;
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (window.innerWidth <= 768) toggleSidebar(false);
  });
});

/* ── Active nav via scroll ── */
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-item");
const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.toggle("active", l.dataset.target === entry.target.id));
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => obs.observe(s));

/* ── Scroll-reveal for cards ── */
const cards = document.querySelectorAll(".edu-card, .skill-card, .project-card");
cards.forEach((c, i) => {
  c.style.opacity = "0";
  c.style.transform = "translateY(18px)";
  c.style.transition = `opacity 0.45s ease ${i * 0.05}s, transform 0.45s ease ${i * 0.05}s`;
});
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = "1";
      e.target.style.transform = "translateY(0)";
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
cards.forEach(c => revObs.observe(c));
