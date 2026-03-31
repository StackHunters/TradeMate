/* 
   SESSION  (replace with JWT decode / API)
 */
const SESSION = {
  firstName: 'Kofi',
  lastName:  'Brebo',
  fullName:  'Kofi Brebo',
  email:     'kofi@example.com',
  location:  'East Legon, Accra',
  avatar:    'https://i.pravatar.cc/80?img=33',
};

/* 
   ROUTE MAP
   Centralise every path here so you only
   ever update one place when files move.
 */
const ROUTES = {
  dashboard   : '/HTML/CLIENT/user-dashboard.html',
  bookings    : '/HTML/CLIENT/booking.html',
  services    : '/HTML/CLIENT/services.html',
  messages    : '#',
  profile     : '#',
  settings    : '#',
  landing     : '/index.html',
  login       : '/HTML/ADMIN/login.html',
};

/* 
   DATA  (replace arrays with fetch())
 */
const BOOKINGS = [
  { id:'bk1', service:'Weekly Tutoring Package', provider:'Kwame Asante',    icon:'📚', date:'Mar 10, 2025', status:'completed'   },
  { id:'bk2', service:'Electrical Wiring Fix',   provider:'Ama Electricals', icon:'⚡', date:'Mar 08, 2025', status:'in-progress' },
  { id:'bk3', service:'Deep Home Cleaning',       provider:'CleanPro Ghana',  icon:'🧹', date:'Mar 05, 2025', status:'pending'     },
  { id:'bk4', service:'Plumbing — Kitchen Sink',  provider:'Yaw Plumbers',   icon:'🔧', date:'Feb 28, 2025', status:'accepted'    },
  { id:'bk5', service:'Event Photography',        provider:'Lens Masters GH', icon:'📷', date:'Feb 20, 2025', status:'cancelled'   },
];

const ST = {
  pending:       { label:'Pending',     cls:'st-pending'     },
  accepted:      { label:'Accepted',    cls:'st-accepted'    },
  'in-progress': { label:'In Progress', cls:'st-in-progress' },
  completed:     { label:'Completed',   cls:'st-completed'   },
  cancelled:     { label:'Cancelled',   cls:'st-cancelled'   },
};

const PROVIDERS = [
  { id:'p1', name:'Henry Charles', init:'HC', img:'https://i.pravatar.cc/80?img=11', cat:'Private Tutor',  price:'₵50',  rating:4.8, reviews:127, tags:['WASSCE','Maths'],       verified:true },
  { id:'p2', name:'Ama Boateng',   init:'AB', img:'https://i.pravatar.cc/80?img=5',  cat:'Electrician',    price:'₵80',  rating:4.9, reviews:89,  tags:['Wiring','Solar'],       verified:true },
  { id:'p3', name:'Yaw Darko',     init:'YD', img:'https://i.pravatar.cc/80?img=7',  cat:'Plumber',        price:'₵60',  rating:4.7, reviews:203, tags:['Pipes','Drainage'],     verified:true },
  { id:'p4', name:'Akua Ofori',    init:'AO', img:'https://i.pravatar.cc/80?img=47', cat:'Cleaner',        price:'₵40',  rating:4.8, reviews:156, tags:['Deep Clean','Office'],  verified:true },
  { id:'p5', name:'Abena Asare',   init:'AA', img:'https://i.pravatar.cc/80?img=48', cat:'Photographer',   price:'₵150', rating:5.0, reviews:42,  tags:['Events','Portraits'],   verified:true },
  { id:'p6', name:'Kofi Mensah',   init:'KM', img:'https://i.pravatar.cc/80?img=12', cat:'Painter',        price:'₵70',  rating:4.6, reviews:74,  tags:['Interior','Exterior'],  verified:true },
];

/* 
   INIT
 */
document.addEventListener('DOMContentLoaded', () => {
  setWelcome();
  renderBookings();
  renderProviders();
  initReveal();
  syncNavActive();
});

/* 
   WELCOME
 */
function setWelcome() {
  document.getElementById('firstName').textContent  = SESSION.firstName;
  document.getElementById('sbUserName').textContent = SESSION.fullName;
  document.getElementById('siLoc').value            = SESSION.location;

  const d    = new Date();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const mos  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const el   = document.getElementById('welcomeDate');
  el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>${days[d.getDay()]}, ${mos[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/* 
   RENDER BOOKINGS
 */
function renderBookings() {
  const list = document.getElementById('bookingList');
  if (!BOOKINGS.length) {
    list.innerHTML = `
      <div class="empty-box">
        <div class="empty-icon">📋</div>
        <div class="empty-title">No bookings yet</div>
        <div class="empty-sub">Find a service and make your first booking today.</div>
        <button class="empty-btn" onclick="navigate(ROUTES.services)">Find a Service →</button>
      </div>`;
    return;
  }

  list.innerHTML = BOOKINGS.slice(0, 5).map(b => {
    const s = ST[b.status] || ST.pending;
    return `
      <div class="bk-card bk-${b.status.replace(' ', '-')}">
        <div class="bk-icon">${b.icon}</div>
        <div class="bk-info">
          <div class="bk-service">${b.service}</div>
          <div class="bk-provider">by <b>${b.provider}</b></div>
        </div>
        <div class="bk-right">
          <span class="bk-date">${b.date}</span>
          <span class="bk-status ${s.cls}">${s.label}</span>
        </div>
        <button class="bk-action"
          onclick="navigate('${ROUTES.bookings}?id=${b.id}')">View →</button>
      </div>`;
  }).join('');
}

/* 
   RENDER PROVIDERS
 */
function renderProviders() {
  const grid = document.getElementById('providerGrid');
  const list = PROVIDERS.filter(p => p.verified).slice(0, 6);

  grid.innerHTML = list.map(p => `
    <div class="prov-card" onclick="navigate('${ROUTES.services}?id=${p.id}')">
      <div class="prov-glow"></div>
      <div class="prov-avatar">
        <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'"/>
        ${p.init}
      </div>
      <div class="prov-verified">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>Verified
      </div>
      <div class="prov-name">${p.name}</div>
      <div class="prov-cat">${p.cat}</div>
      <div class="prov-row">
        <div class="prov-rating">★ ${p.rating} <em>(${p.reviews})</em></div>
        <div class="prov-price">${p.price}<small>/session</small></div>
      </div>
      <div class="prov-tags">
        ${p.tags.map(t => `<span class="prov-tag">${t}</span>`).join('')}
      </div>
      <button class="prov-btn"
        onclick="event.stopPropagation(); navigate('${ROUTES.services}?id=${p.id}')">
        View Profile
      </button>
    </div>`
  ).join('');
}

/* 
   SEARCH
 */
function onSearchInput() {
  const v = document.getElementById('siInput').value;
  document.getElementById('siClear').style.display = v ? 'block' : 'none';
}

function clearSearch() {
  document.getElementById('siInput').value = '';
  document.getElementById('siClear').style.display = 'none';
  document.getElementById('siInput').focus();
}

function doSearch() {
  const q   = document.getElementById('siInput').value.trim();
  const cat = document.getElementById('siCat').value;
  const loc = document.getElementById('siLoc').value.trim();

  if (!q && !cat) {
    document.getElementById('siInput').focus();
    showToast('warning', 'Enter a search term', 'Tell us what service you need.');
    return;
  }

  const params = new URLSearchParams();
  if (q)   params.set('q',   q);
  if (cat) params.set('cat', cat);
  if (loc) params.set('loc', loc);

  window.location.href = ROUTES.services + '?' + params.toString();
}

function quickSearch(term) {
  document.getElementById('siInput').value = term;
  document.getElementById('siClear').style.display = 'block';
  doSearch();
}

/* 
   NAVIGATION
   Single function used by every link.
   Performs a hard redirect — no toast spam
   on normal navigation.
 */
function navigate(url) {
  if (!url || url === '#') return;
  window.location.href = url;
}

/* 
   LOGOUT
 */
function handleLogout() {
  showToast('info', 'Signing out…', 'See you next time, ' + SESSION.firstName + '!');
  setTimeout(() => {
    window.location.href = ROUTES.landing;
  }, 1600);
}

/* 
   MARK ACTIVE NAV ITEM
   Highlights the sidebar item that matches
   the current page URL.
 */
function syncNavActive() {
  const current = window.location.pathname;
  document.querySelectorAll('.sb-item').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelectorAll('.bn-item').forEach(item => {
    item.classList.remove('active');
  });

  /* Match sidebar items by their onclick URL */
  document.querySelectorAll('.sb-item[onclick]').forEach(item => {
    const match = item.getAttribute('onclick').match(/navigate\(['"]([^'"]+)['"]\)/);
    if (match && current.includes(match[1].split('?')[0])) {
      item.classList.add('active');
    }
  });

  /* Match bottom nav items by their onclick URL */
  document.querySelectorAll('.bn-item[onclick]').forEach(item => {
    const match = item.getAttribute('onclick').match(/navigate\(['"]([^'"]+)['"]\)/);
    if (match && current.includes(match[1].split('?')[0])) {
      item.classList.add('active');
    }
  });
}

/* 
   SIDEBAR TOGGLE (mobile)
 */
function toggleSidebar() {
  const sb   = document.getElementById('sidebar');
  const ov   = document.getElementById('sbOverlay');
  const btn  = document.getElementById('hamBtn');
  const open = sb.classList.toggle('open');
  ov.classList.toggle('show', open);
  btn.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sbOverlay').classList.remove('show');
  document.getElementById('hamBtn').classList.remove('open');
  document.body.style.overflow = '';
}

/* 
   SCROLL REVEAL
 */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('on'), i * 60);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });

  document.querySelectorAll('.rv:not(.on)').forEach(el => obs.observe(el));
}

/* 
   TOAST
 */
function showToast(type, title, msg) {
  const icons = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };
  const stack = document.getElementById('toastStack');
  if (!stack) return;

  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `
    <div class="toast-icon">${icons[type] || 'ℹ️'}</div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${msg}</div>
    </div>
    <button class="toast-x"
      onclick="removeToast(this.closest('.toast'))"
      aria-label="Close">✕</button>`;

  stack.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => removeToast(t), 5000);
}

function removeToast(el) {
  if (!el) return;
  el.classList.remove('show');
  setTimeout(() => el.remove(), 320);
}