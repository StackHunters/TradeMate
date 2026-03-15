/* =====================================================
   TradeMate — LandingPage.js  (FULLY FIXED)
   Fixes applied:
   1. Duplicate `const cards` → renamed catCards / featCards
   2. Duplicate `observer` → renamed catCardObs / cardObs
   3. Null-safe guards on getElementById
   4. FIX: handleRequest(e) was expecting an Event but HTML was
      passing a URL string. Changed signature to handleRequest(url)
      so it works correctly with the HTML onclick call.
   ===================================================== */

/* ──────────────────────────────────────────────────────
   NAV — hamburger + active link
   ────────────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');
const links      = document.querySelectorAll('.nav-links a');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

links.forEach(link => {
  link.addEventListener('click', function () {
    links.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    if (window.innerWidth <= 768 && hamburger && navLinks) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('nav') && hamburger && navLinks) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  }
});


/* ──────────────────────────────────────────────────────
   SEARCH BAR — live suggestions + search handler
   ────────────────────────────────────────────────────── */
const serviceInput = document.getElementById('serviceInput');
const dropdown     = document.getElementById('resultsDropdown');

const allSuggestions = [
  'Plumber','Electrician','House Cleaning','Painter','Carpenter',
  'Tutor','Doctor','Nurse','Photographer','Catering','Barber',
  'Hair Stylist','Driver','IT Support','Accountant','Lawyer',
  'Fitness Trainer','Roofer','Tiler'
];

const emojis = {
  'Plumber':'🔧','Electrician':'⚡','House Cleaning':'🧹','Painter':'🖌️',
  'Carpenter':'🪚','Tutor':'📚','Doctor':'🏥','Nurse':'🏥',
  'Photographer':'📸','Catering':'🍽️','Barber':'💈','Hair Stylist':'💇',
  'Driver':'🚗','IT Support':'💻','Accountant':'💼','Lawyer':'⚖️',
  'Fitness Trainer':'🏋️','Roofer':'🏠','Tiler':'🔲'
};

if (serviceInput && dropdown) {
  serviceInput.addEventListener('input', function () {
    const val = this.value.trim().toLowerCase();
    if (val.length < 2) { dropdown.classList.remove('show'); return; }
    const matches = allSuggestions.filter(s => s.toLowerCase().includes(val));
    if (matches.length === 0) { dropdown.classList.remove('show'); return; }
    renderSuggestions(matches.slice(0, 5));
    dropdown.classList.add('show');
  });

  serviceInput.addEventListener('blur', () =>
    setTimeout(() => dropdown.classList.remove('show'), 150)
  );

  serviceInput.addEventListener('focus', function () {
    if (this.value.trim().length >= 2) dropdown.classList.add('show');
  });

  serviceInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSearch();
  });
}

function renderSuggestions(items) {
  dropdown.innerHTML = items.map(name => `
    <div class="result-item" onclick="selectSuggestion('${name}')">
      <div class="result-icon">${emojis[name] || '🛠️'}</div>
      <div class="result-text">
        <div class="result-name">${name}</div>
        <div class="result-meta">Tap to search</div>
      </div>
      <div class="result-rating">★ ${(4.5 + Math.random() * 0.5).toFixed(1)}</div>
    </div>
  `).join('');
}

function selectSuggestion(name) {
  if (serviceInput) serviceInput.value = name;
  if (dropdown)     dropdown.classList.remove('show');
}

function setService(name) {
  if (!serviceInput) return;
  serviceInput.value = name;
  serviceInput.focus();
}

function handleSearch() {
  if (!serviceInput) return;
  const service  = serviceInput.value.trim();
  const category = document.getElementById('categorySelect')?.value;
  const location = document.getElementById('locationSelect')?.value;

  if (!service && !category) {
    serviceInput.focus();
    serviceInput.style.animation = 'none';
    void serviceInput.offsetHeight; // force reflow
    serviceInput.style.animation = 'shake 0.3s ease';
    return;
  }

  const btn = document.querySelector('.search-btn');
  if (!btn) return;

  btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 0.6s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Searching...`;
  btn.style.pointerEvents = 'none';

  setTimeout(() => {
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Found Results!`;
    btn.style.background = 'linear-gradient(135deg, #00C896, #00A87A)';
    setTimeout(() => {
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> Search`;
      btn.style.background   = '';
      btn.style.pointerEvents = '';
    }, 2000);
  }, 1200);
}


/* ──────────────────────────────────────────────────────
   CATEGORY CARDS — staggered reveal + click ripple
   ────────────────────────────────────────────────────── */
const catCards = document.querySelectorAll('.cat-card');

const catCardObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card  = entry.target;
      const index = [...catCards].indexOf(card);
      setTimeout(() => card.classList.add('visible'), index * 80);
      catCardObs.unobserve(card);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

catCards.forEach(card => {
  catCardObs.observe(card);

  card.addEventListener('click', (e) => {
    e.preventDefault();
    const name = card.querySelector('.cat-name')?.textContent || '';
    createRipple(e, card);
    setTimeout(() => showToast(`🔍 Browsing ${name} near you...`), 300);
  });
});


/* ──────────────────────────────────────────────────────
   FEATURED CARDS (.feat-card) — staggered reveal + tilt
   ────────────────────────────────────────────────────── */
const featCards = document.querySelectorAll('.feat-card');

const cardObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const i = [...featCards].indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      cardObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

featCards.forEach(card => {
  cardObs.observe(card);

  // Subtle 3-D tilt on mousemove
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
    const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
    card.style.transform = `translateY(-6px) scale(1.015) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


/* ──────────────────────────────────────────────────────
   CATEGORY COUNT ANIMATION
   ────────────────────────────────────────────────────── */
const catGrid = document.getElementById('catGrid');

if (catGrid) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.count-num').forEach(el => {
          const val = parseInt(el.textContent);
          el.textContent = '0';
          setTimeout(() => animateCount(el, val), 200);
        });
        sectionObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  sectionObserver.observe(catGrid);
}

function animateCount(el, target, duration = 1400) {
  let start = 0;
  const step  = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start).toLocaleString();
    if (start >= target) clearInterval(timer);
  }, 16);
}


/* ──────────────────────────────────────────────────────
   STATS BAR
   ────────────────────────────────────────────────────── */
const statItems = document.querySelectorAll('.stat-item');
const statsBar  = document.getElementById('statsBar');

if (statsBar && statItems.length) {
  const statsObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statItems.forEach((item, i) => {
          setTimeout(() => {
            item.classList.add('visible');
            const numEl    = item.querySelector('.stat-number');
            const target   = parseFloat(numEl.dataset.target);
            const decimals = numEl.dataset.target.includes('.') ? 1 : 0;
            countUp(numEl, target, decimals);
          }, i * 120);
        });
        statsObs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  statsObs.observe(statsBar);
}


/* ──────────────────────────────────────────────────────
   BANNER STAT COUNTERS
   ────────────────────────────────────────────────────── */
const bannerNums   = document.querySelectorAll('.banner-stat-num[data-target]');
const trustBanner  = document.querySelector('.local-trust-banner');

if (trustBanner && bannerNums.length) {
  const bannerObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bannerNums.forEach(el => countUp(el, parseInt(el.dataset.target), 0, 1200));
        bannerObs.disconnect();
      }
    });
  }, { threshold: 0.5 });

  bannerObs.observe(trustBanner);
}


/* ──────────────────────────────────────────────────────
   SHARED UTILITIES
   ────────────────────────────────────────────────────── */

function countUp(el, target, decimals = 0, duration = 1600) {
  const start  = performance.now();
  const update = (now) => {
    const t    = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const val  = target * ease;
    el.textContent = decimals > 0
      ? val.toFixed(decimals)
      : Math.floor(val).toLocaleString();
    if (t < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function createRipple(e, el) {
  const circle = document.createElement('span');
  const rect   = el.getBoundingClientRect();
  const size   = Math.max(rect.width, rect.height) * 2;
  Object.assign(circle.style, {
    position:     'absolute',
    width:        size + 'px',
    height:       size + 'px',
    left:         (e.clientX - rect.left  - size / 2) + 'px',
    top:          (e.clientY - rect.top   - size / 2) + 'px',
    borderRadius: '50%',
    background:   'rgba(102,126,234,0.15)',
    transform:    'scale(0)',
    animation:    'ripple 0.55s ease-out forwards',
    pointerEvents:'none',
    zIndex:       0,
  });
  el.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
}

function showToast(msg) {
  const existing = document.querySelector('.toast-notify');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className  = 'toast-notify';
  toast.textContent = msg;
  Object.assign(toast.style, {
    position:    'fixed',
    bottom:      '32px',
    left:        '50%',
    transform:   'translateX(-50%) translateY(80px)',
    background:  '#161B24',
    color:       '#E8EDF5',
    padding:     '13px 24px',
    borderRadius:'100px',
    fontSize:    '0.88rem',
    fontFamily:  "'Nunito', sans-serif",
    fontWeight:  '600',
    boxShadow:   '0 8px 30px rgba(0,0,0,0.5)',
    zIndex:      '9999',
    transition:  'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
    border:      '1px solid rgba(102,126,234,0.2)',
    whiteSpace:  'nowrap',
  });

  document.body.appendChild(toast);
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      toast.style.transform = 'translateX(-50%) translateY(0)'
    )
  );

  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(80px)';
    setTimeout(() => toast.remove(), 400);
  }, 2800);
}

function handleViewAll() {
  showToast('📋 Loading all categories...');
  window.location.href = '/HTML/CLIENT/services.html';

}

/* FIX: handleRequest was declared as handleRequest(e) expecting an Event
   object, but the HTML was calling it as onclick="handleRequest('/HTML/SERVICES/Services.html')"
   passing a URL string. The old code tried to call e.preventDefault() on a
   string, throwing "e.preventDefault is not a function".
   Fixed: accept a url string, show a toast, and optionally navigate. */
function handleRequest(url) {
  showToast('✉️ Opening custom service request...');
  window.location.href = '/HTML/ADMIN/register.html';
  // Uncomment the line below if you want to actually navigate:
  // window.location.href = url;
}

 /* ── Counting Animation ── */
  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    let start = null;

    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = easeOutExpo(progress);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  }

  /* ── Trigger on scroll into view ── */
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(c => observer.observe(c));


   function handleCTA(type) {
      if (type === 'find') {
        alert('🔵 Redirecting to Service Search...');
        // window.location.href = '/find-service';
        window.location.href = '/HTML/ADMIN/register.html';
      } else {
        alert('⚪ Redirecting to Provider Registration...');
        // window.location.href = '/become-provider';
        window.location.href = '/HTML/ADMIN/register.html';
      }
    }

    // Intersection Observer for scroll-triggered entrance
    const section = document.querySelector('.cta-section');
    const Observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.style.visibility = 'visible';
          Observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    Observer.observe(section);

    // subtle mouse parallax on orbs
    document.addEventListener('mousemove', (e) => {
      const { innerWidth: W, innerHeight: H } = window;
      const dx = (e.clientX / W - 0.5) * 30;
      const dy = (e.clientY / H - 0.5) * 20;
      document.querySelector('.orb-1').style.transform = `translate(${dx}px, ${dy}px)`;
      document.querySelector('.orb-2').style.transform = `translate(${-dx}px, ${-dy}px)`;
    });


      // Auto year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Newsletter subscribe
  function handleSubscribe() {
    const input = document.querySelector('.newsletter-input');
    const email = input.value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      shake(input);
      return;
    }
    if (!emailRe.test(email)) {
      shake(input);
      input.style.borderColor = 'rgba(231,76,60,.5)';
      setTimeout(() => input.style.borderColor = '', 1400);
      return;
    }

    const btn = document.querySelector('.newsletter-btn');
    btn.textContent = '✓ Done!';
    btn.style.background = 'linear-gradient(135deg,#27ae60,#2ecc71)';
    input.value = '';
    input.placeholder = 'Thanks for subscribing!';
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
      input.placeholder = 'your@email.com';
    }, 3000);
  }

  function shake(el) {
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = 'shake .4s ease';
  }

  // Keyboard: subscribe on Enter
  document.querySelector('.newsletter-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSubscribe();
  });


