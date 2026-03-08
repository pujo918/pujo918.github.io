// ---- CUSTOM CURSOR ----
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .project-card, .skill-card, .exp-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    ring.style.width = '56px';
    ring.style.height = '56px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    ring.style.width = '36px';
    ring.style.height = '36px';
  });
});

// ---- NAVBAR SHADOW ON SCROLL ----
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.boxShadow =
    window.scrollY > 20 ? '0 2px 24px rgba(0,0,0,0.5)' : 'none';
});

/* ============================================================
   CERTIFICATE LIGHTBOX
============================================================ */
const certGrid = document.querySelector('.cert-grid');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbClose = document.getElementById('lbClose');

if (certGrid) {
  certGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.cert-card');
    if (!card) return;
    const imgUrl = card.getAttribute('data-img');
    if (imgUrl) {
      lbImg.src = imgUrl;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // prevent bg scroll
    }
  });
}

if (lightbox) {
  lbClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // restore scroll
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

/* ============================================================
   ACTIVITIES & EVENTS MODAL
============================================================ */
const expCards = document.querySelectorAll('.exp-card');
const actModal = document.getElementById('actModal');
const actClose = document.getElementById('actClose');
const actModalImg = document.getElementById('actModalImg');
const actModalTitle = document.getElementById('actModalTitle');
const actModalMeta = document.getElementById('actModalMeta');
const actModalDesc = document.getElementById('actModalDesc');

document.body.addEventListener('click', (e) => {
  // Check if click was on an exp-card or inside an exp-card
  const card = e.target.closest('.exp-card');
  if (!card) return;

  const imgUrl = card.getAttribute('data-img');
  const title = card.getAttribute('data-title');
  const meta = card.getAttribute('data-meta');
  const desc = card.getAttribute('data-desc');

  // Only open if there is data
  if (imgUrl || title) {
    if (imgUrl) actModalImg.src = imgUrl;
    if (title) actModalTitle.textContent = title;

    // Allow HTML in meta/desc for things like &bull;
    if (meta) actModalMeta.innerHTML = meta;
    if (desc) actModalDesc.innerHTML = desc;

    actModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent outer scroll
  }
});

if (actModal) {
  actClose.addEventListener('click', () => {
    actModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  actModal.addEventListener('click', (e) => {
    // If user clicks the dark background (outside the modal dialog)
    if (e.target === actModal) {
      actModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// ---- HAMBURGER ----
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');
ham.addEventListener('click', () => {
  ham.classList.toggle('active');
  mob.classList.toggle('open');
});
mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  ham.classList.remove('active');
  mob.classList.remove('open');
}));

// ---- SCROLL REVEAL ----
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars when visible
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 0.08 + 's';
  revealObs.observe(el);
});

// Also observe skill cards separately for bar animation
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-card').forEach(c => skillObs.observe(c));

// ---- PROJECT FILTER ----
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('#projectsGrid .project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.opacity = match ? '1' : '0.2';
      card.style.transform = match ? '' : 'scale(0.97)';
      card.style.pointerEvents = match ? 'auto' : 'none';
    });
  });
});

// ---- CONTACT FORM ----
function handleSubmit(btn) {
  const orig = btn.innerHTML;
  btn.innerHTML = 'Terkirim! ✓';
  btn.style.background = '#c8ff00';
  setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; }, 2500);
}

// ---- FOOTER YEAR ----
document.getElementById('year').textContent = new Date().getFullYear();
