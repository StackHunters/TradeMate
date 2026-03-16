/* 
   ROUTE MAP
   Maps every provider category to its own HTML page.
   Update these paths whenever a file moves.
*/
const CATEGORY_ROUTES = {
  'Tutoring'    : '/HTML/CLIENT/provider-profile.html',
  'Cleaning'    : '#',
  'Electrical'  : '#',
  'Plumbing'    : '#',
  'Carpentry'   : '#',
  'Painting'    : '#',
  'Photography' : '#',
  'Catering'    : '#',
  'Landscaping' : '#',
  'Security'    : '#',
};

/* 
   PROVIDER DATA
*/
const ALL_PROVIDERS = [
  { id:'p1',  name:'Henry Charles',      init:'HC', img:'https://i.pravatar.cc/80?img=11', cat:'Tutoring',    price:50,  rating:4.8, reviews:127, loc:'East Legon, Accra',   bio:'Expert in Maths, Science & English. 6 years teaching JHS–University level.',         tags:['WASSCE','Maths','Science'],  verified:true },
  { id:'p2',  name:'Ama Boateng',         init:'AB', img:'https://i.pravatar.cc/80?img=5',  cat:'Electrical',  price:80,  rating:4.9, reviews:89,  loc:'Kumasi, Ashanti',     bio:'Licensed electrician. Wiring, repairs and solar installation across Kumasi.',         tags:['Wiring','Solar','Repairs'],  verified:true },
  { id:'p3',  name:'Yaw Darko',           init:'YD', img:'https://i.pravatar.cc/80?img=7',  cat:'Plumbing',    price:60,  rating:4.7, reviews:203, loc:'Takoradi, Western',   bio:'10 years experience. Pipes, drainage, bathroom installations and emergency fixes.',    tags:['Pipes','Drainage'],          verified:true },
  { id:'p4',  name:'Akua Ofori',          init:'AO', img:'https://i.pravatar.cc/80?img=47', cat:'Cleaning',    price:40,  rating:4.8, reviews:156, loc:'Accra, Greater',      bio:'Professional deep cleaner. Residential, commercial, post-construction cleaning.',      tags:['Deep Clean','Office'],       verified:true },
  { id:'p5',  name:'Abena Asare',         init:'AA', img:'https://i.pravatar.cc/80?img=48', cat:'Photography', price:150, rating:5.0, reviews:42,  loc:'Accra, Greater',      bio:'Award-winning event photographer. Weddings, corporate events and portraits.',         tags:['Events','Portraits'],        verified:true },
  { id:'p6',  name:'Kofi Mensah',         init:'KM', img:'https://i.pravatar.cc/80?img=12', cat:'Painting',    price:70,  rating:4.6, reviews:74,  loc:'Kumasi, Ashanti',     bio:'Interior & exterior painting. Quality finishes for homes and commercial spaces.',     tags:['Interior','Exterior'],       verified:true },
  { id:'p7',  name:'Kwabena Adu',         init:'KA', img:'https://i.pravatar.cc/80?img=15', cat:'Carpentry',   price:90,  rating:4.5, reviews:38,  loc:'Takoradi, Western',   bio:'Custom furniture, installations and repairs. Hardwood specialist.',                    tags:['Furniture','Hardwood'],      verified:true },
  { id:'p8',  name:'Efua Koomson',        init:'EK', img:'https://i.pravatar.cc/80?img=25', cat:'Catering',    price:200, rating:4.7, reviews:61,  loc:'Cape Coast, Central', bio:'Professional caterer for events, parties and corporate lunches across Ghana.',         tags:['Events','Corporate'],        verified:true },
  { id:'p9',  name:'Nana Osei',           init:'NO', img:'https://i.pravatar.cc/80?img=14', cat:'Security',    price:120, rating:4.6, reviews:29,  loc:'Tamale, Northern',    bio:'Trained security professional. CCTV, manned guarding and risk assessment.',           tags:['CCTV','Guarding'],           verified:true },
  { id:'p10', name:'Adwoa Amponsah',      init:'AA', img:'https://i.pravatar.cc/80?img=49', cat:'Cleaning',    price:35,  rating:4.9, reviews:98,  loc:'Accra, Greater',      bio:'Trusted cleaner. Thorough, reliable and discreet. Residential specialist.',           tags:['Residential','Laundry'],     verified:true },
  { id:'p11', name:'Kwame Frimpong',      init:'KF', img:'https://i.pravatar.cc/80?img=13', cat:'Electrical',  price:65,  rating:4.4, reviews:55,  loc:'Accra, Greater',      bio:'Industrial and domestic electrician. Emergency call-outs available.',                 tags:['Industrial','Emergency'],    verified:true },
  { id:'p12', name:'Esi Quartey',         init:'EQ', img:'https://i.pravatar.cc/80?img=45', cat:'Tutoring',    price:45,  rating:4.7, reviews:84,  loc:'Kumasi, Ashanti',     bio:'JHS and SHS tutor. French, English and Social Studies. Patient and result-driven.',  tags:['French','English'],          verified:true },
  { id:'p13', name:'Paa Kwesi',           init:'PK', img:'https://i.pravatar.cc/80?img=17', cat:'Landscaping', price:80,  rating:4.8, reviews:33,  loc:'Accra, Greater',      bio:'Garden design, lawn care and tree trimming. Eco-friendly methods.',                    tags:['Garden','Lawn Care'],        verified:true },
  { id:'p14', name:'Mavis Sarpong',       init:'MS', img:'https://i.pravatar.cc/80?img=44', cat:'Catering',    price:180, rating:4.5, reviews:47,  loc:'Takoradi, Western',   bio:'Ghanaian and continental cuisine for events up to 500 guests.',                       tags:['Ghanaian','Continental'],    verified:true },
  { id:'p15', name:'Baffour Acheampong',  init:'BA', img:'https://i.pravatar.cc/80?img=18', cat:'Plumbing',    price:55,  rating:4.6, reviews:72,  loc:'Kumasi, Ashanti',     bio:'Affordable and reliable plumbing. Same-day service available.',                       tags:['Same-day','Affordable'],     verified:true },
  { id:'p16', name:'Akosua Darko',        init:'AD', img:'https://i.pravatar.cc/80?img=26', cat:'Photography', price:120, rating:4.6, reviews:31,  loc:'Tamale, Northern',    bio:'Documentary and wedding photographer. Northern Ghana specialist.',                     tags:['Wedding','Documentary'],     verified:true },
];

/* 
   STATE
──*/
const LIMIT = 9;
let state = {
  query:       '',
  categories:  [],
  location:    '',
  priceMin:    null,
  priceMax:    null,
  minRating:   0,
  sort:        'rating',
  verifiedOnly: true,
  page:        1,
  view:        'grid',
};

/* 
   BOOT
──*/
window.addEventListener('DOMContentLoaded', () => {
  readUrlParams();
  applyFilters();
  initReveal();
  buildDrawer();
});

function readUrlParams() {
  const p = new URLSearchParams(window.location.search);
  if (p.get('q'))        { state.query = p.get('q'); document.getElementById('hsrInput').value = state.query; }
  if (p.get('category')) {
    state.categories = [p.get('category')];
    document.getElementById('hsrCat').value = p.get('category');
    syncCatChips();
  }
  if (p.get('location')) {
    state.location = p.get('location');
    document.getElementById('hsrLoc').value     = state.location;
    document.getElementById('sidebarLoc').value = state.location;
  }
}

/* 
   FILTER & SORT ENGINE
──*/
function applyFilters() {
  state.query        = document.getElementById('hsrInput').value.trim().toLowerCase();
  state.location     = (document.getElementById('sidebarLoc').value || document.getElementById('hsrLoc').value).trim().toLowerCase();
  state.priceMin     = parseFloat(document.getElementById('priceMin').value) || null;
  state.priceMax     = parseFloat(document.getElementById('priceMax').value) || null;
  state.sort         = document.getElementById('sortSelect').value;
  state.verifiedOnly = document.getElementById('verifiedToggle').checked;
  state.page         = 1;

  const herocat = document.getElementById('hsrCat').value;
  if (herocat && !state.categories.includes(herocat)) {
    state.categories = [herocat];
    syncCatChips();
  }

  renderResults();
  updateActiveChips();
  updateFilterBadge();
  updateUrl();
}

function filterData() {
  let data = [...ALL_PROVIDERS];

  if (state.verifiedOnly) data = data.filter(p => p.verified);

  if (state.query) {
    data = data.filter(p =>
      p.name.toLowerCase().includes(state.query) ||
      p.cat.toLowerCase().includes(state.query)  ||
      p.bio.toLowerCase().includes(state.query)  ||
      p.tags.some(t => t.toLowerCase().includes(state.query))
    );
  }
  if (state.categories.length > 0) {
    data = data.filter(p => state.categories.includes(p.cat));
  }
  if (state.location) {
    data = data.filter(p => p.loc.toLowerCase().includes(state.location));
  }
  if (state.priceMin !== null) data = data.filter(p => p.price >= state.priceMin);
  if (state.priceMax !== null) data = data.filter(p => p.price <= state.priceMax);
  if (state.minRating > 0)     data = data.filter(p => p.rating >= state.minRating);

  if (state.sort === 'rating')     data.sort((a, b) => b.rating  - a.rating);
  if (state.sort === 'price_asc')  data.sort((a, b) => a.price   - b.price);
  if (state.sort === 'price_desc') data.sort((a, b) => b.price   - a.price);
  if (state.sort === 'reviews')    data.sort((a, b) => b.reviews - a.reviews);

  return data;
}

/* 
   RENDER
──*/
function renderResults() {
  const container = document.getElementById('cardsContainer');
  const countEl   = document.getElementById('countNum');

  container.innerHTML = `<div class="spinner-wrap"><div class="spinner"></div><div class="spinner-text">Finding providers…</div></div>`;

  setTimeout(() => {
    const filtered   = filterData();
    const total      = filtered.length;
    const totalPages = Math.ceil(total / LIMIT);
    const start      = (state.page - 1) * LIMIT;
    const paged      = filtered.slice(start, start + LIMIT);

    countEl.textContent = total;

    if (paged.length === 0) {
      container.innerHTML = `
        <div class="no-results rv">
          <div class="no-results-icon">🔍</div>
          <div class="no-results-title">No providers found</div>
          <div class="no-results-sub">Try adjusting your filters or searching a different term.</div>
          <button class="no-results-btn" onclick="clearAllFilters()">Clear Filters</button>
        </div>`;
      document.getElementById('pagination').innerHTML = '';
      setTimeout(initReveal, 30);
      return;
    }

    if (state.view === 'grid') {
      container.innerHTML = `<div class="providers-grid">${paged.map(buildGridCard).join('')}</div>`;
    } else {
      container.innerHTML = `<div class="providers-list">${paged.map(buildListCard).join('')}</div>`;
    }

    buildPagination(state.page, totalPages, total);
    setTimeout(initReveal, 30);
  }, 350);
}

/* 
   CARD BUILDERS
──*/
function buildGridCard(p) {
  const href = getProfileUrl(p);
  return `
  <div class="pcard rv"
       onclick="goToProfile('${p.id}','${p.cat}')"
       tabindex="0" role="button"
       aria-label="View ${p.name}'s profile">
    <div class="pcard-glow"></div>
    <div class="pcard-top">
      <div class="pcard-avatar">
        <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'"/>${p.init}
      </div>
      <div class="pcard-identity">
        <div class="pcard-name">${p.name}</div>
        <div class="pcard-cat">${p.cat}</div>
        <div class="pcard-loc">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>${p.loc}
        </div>
      </div>
      ${p.verified ? verifiedBadge() : ''}
    </div>
    <p class="pcard-bio">${p.bio}</p>
    <div class="pcard-stats">
      <div class="pcard-rating">★ ${p.rating} <em>(${p.reviews})</em></div>
      <div class="pcard-price">₵${p.price}<small>/session</small></div>
    </div>
    <div class="pcard-tags">${p.tags.map(t => `<span class="pcard-tag">${t}</span>`).join('')}</div>
    <button class="pcard-btn"
      onclick="event.stopPropagation(); goToProfile('${p.id}','${p.cat}')">
      View Profile →
    </button>
  </div>`;
}

function buildListCard(p) {
  return `
  <div class="pcard-list rv"
       onclick="goToProfile('${p.id}','${p.cat}')"
       tabindex="0" role="button"
       aria-label="View ${p.name}'s profile">
    <div class="pcard-list-avatar">
      <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'"/>${p.init}
    </div>
    <div class="pcard-list-info">
      <div class="pcard-list-top">
        <span class="pcard-list-name">${p.name}</span>
        <span class="pcard-list-cat">${p.cat}</span>
        ${p.verified ? verifiedBadge() : ''}
      </div>
      <div class="pcard-list-bio">${p.bio}</div>
      <div class="pcard-list-loc">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>${p.loc}
      </div>
    </div>
    <div class="pcard-list-right">
      <div class="pcard-list-price">₵${p.price}<small>/session</small></div>
      <div class="pcard-list-rating">★ ${p.rating} <em>(${p.reviews})</em></div>
      <button class="pcard-list-btn"
        onclick="event.stopPropagation(); goToProfile('${p.id}','${p.cat}')">
        View Profile →
      </button>
    </div>
  </div>`;
}

/* Shared verified badge markup */
function verifiedBadge() {
  return `<div class="pcard-verified">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  </div>`;
}

/* 
   NAVIGATION
   Builds the target URL from CATEGORY_ROUTES and
   appends the provider id as a query parameter so the
   destination page knows which provider to display.

   Result examples:
     Tutoring    → /HTML/CLIENT/tutor.html?id=p1
     Electrical  → /HTML/CLIENT/electrician.html?id=p2
     Photography → /HTML/CLIENT/photographer.html?id=p5
 */
function getProfileUrl(providerOrId, cat) {
  /* Accept either a provider object or (id, cat) strings */
  let id, category;
  if (typeof providerOrId === 'object') {
    id = providerOrId.id;
    category = providerOrId.cat;
  } else {
    id = providerOrId;
    category = cat;
  }

  const basePath = CATEGORY_ROUTES[category] || '/HTML/CLIENT/provider-profile.html';
  return `${basePath}?id=${id}`;
}

function goToProfile(id, cat) {
  window.location.href = getProfileUrl(id, cat);
}

/* 
   PAGINATION
──*/
function buildPagination(current, total, totalResults) {
  const wrap = document.getElementById('pagination');
  if (total <= 1) { wrap.innerHTML = ''; return; }

  let html = `<span class="pag-info">Page ${current} of ${total} · ${totalResults} providers</span>`;

  html += `<button class="pag-btn" ${current === 1 ? 'disabled' : ''} onclick="goPage(${current - 1})">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="15 18 9 12 15 6"/>
    </svg></button>`;

  buildPageRange(current, total).forEach(p => {
    if (p === '…') {
      html += `<div class="pag-ellipsis">…</div>`;
    } else {
      html += `<button class="pag-btn ${p === current ? 'active' : ''}" onclick="goPage(${p})">${p}</button>`;
    }
  });

  html += `<button class="pag-btn" ${current === total ? 'disabled' : ''} onclick="goPage(${current + 1})">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="9 18 15 12 9 6"/>
    </svg></button>`;

  wrap.innerHTML = html;
}

function buildPageRange(cur, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (cur <= 4)         return [1, 2, 3, 4, 5, '…', total];
  if (cur >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '…', cur - 1, cur, cur + 1, '…', total];
}

function goPage(p) {
  state.page = p;
  renderResults();
  document.getElementById('resultsPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* 
   CATEGORY CHIPS
──*/
function toggleCat(el, cat) {
  el.classList.toggle('on');
  if (el.classList.contains('on')) {
    if (!state.categories.includes(cat)) state.categories.push(cat);
  } else {
    state.categories = state.categories.filter(c => c !== cat);
  }
  applyFilters();
}

function syncCatChips() {
  document.querySelectorAll('.cat-chip').forEach(chip => {
    const cat = chip.textContent.replace(/^✓\s+/, '').trim().replace(/^[^\w]+/, '');
    chip.classList.toggle('on', state.categories.some(c => cat.includes(c)));
  });
}

/* 
   RATING FILTER
──*/
function selectRating(el, val) {
  document.querySelectorAll('.rating-opt').forEach(o => o.classList.remove('on'));
  el.classList.add('on');
  state.minRating = val;
  applyFilters();
}

/* 
   ACTIVE CHIPS
──*/
function updateActiveChips() {
  const wrap  = document.getElementById('activeChips');
  const chips = [];

  state.categories.forEach(c => chips.push({
    label: c,
    remove: () => { state.categories = state.categories.filter(x => x !== c); syncCatChips(); applyFilters(); }
  }));
  if (state.location) chips.push({
    label: '📍 ' + state.location,
    remove: () => { state.location = ''; document.getElementById('sidebarLoc').value = ''; document.getElementById('hsrLoc').value = ''; applyFilters(); }
  });
  if (state.priceMin) chips.push({
    label: `Min ₵${state.priceMin}`,
    remove: () => { document.getElementById('priceMin').value = ''; state.priceMin = null; applyFilters(); }
  });
  if (state.priceMax) chips.push({
    label: `Max ₵${state.priceMax}`,
    remove: () => { document.getElementById('priceMax').value = ''; state.priceMax = null; applyFilters(); }
  });
  if (state.minRating > 0) chips.push({
    label: `${state.minRating}+ ★`,
    remove: () => { selectRating(document.querySelector('.rating-opt'), 0); }
  });

  if (chips.length === 0) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'flex';
  wrap.innerHTML = chips.map((c, i) =>
    `<div class="ac-chip">${c.label}<button class="ac-chip-x" onclick="__chips[${i}].remove()">✕</button></div>`
  ).join('');
  window.__chips = chips;
}

function updateFilterBadge() {
  const count = state.categories.length
    + (state.location ? 1 : 0)
    + (state.priceMin || state.priceMax ? 1 : 0)
    + (state.minRating ? 1 : 0);
  const badge = document.getElementById('filterCountBadge');
  badge.textContent   = count;
  badge.style.display = count > 0 ? 'inline' : 'none';
}

/* 
   CLEAR ALL FILTERS
──*/
function clearAllFilters() {
  state.categories = [];
  state.location   = '';
  state.priceMin   = null;
  state.priceMax   = null;
  state.minRating  = 0;
  state.query      = '';

  document.getElementById('hsrInput').value         = '';
  document.getElementById('hsrCat').value           = '';
  document.getElementById('hsrLoc').value           = '';
  document.getElementById('sidebarLoc').value       = '';
  document.getElementById('priceMin').value         = '';
  document.getElementById('priceMax').value         = '';
  document.getElementById('sortSelect').value       = 'rating';
  document.getElementById('verifiedToggle').checked = true;
  document.querySelectorAll('.cat-chip').forEach(c  => c.classList.remove('on'));
  document.querySelectorAll('.rating-opt').forEach((o, i) => o.classList.toggle('on', i === 0));

  applyFilters();
  showToast('info', 'Filters cleared', 'Showing all providers.');
}

/* 
   VIEW TOGGLE
──*/
function setView(v) {
  state.view = v;
  document.getElementById('gridViewBtn').classList.toggle('active', v === 'grid');
  document.getElementById('listViewBtn').classList.toggle('active', v === 'list');
  renderResults();
}

/* 
   MOBILE FILTER DRAWER
──*/
function buildDrawer() {
  const sidebar = document.getElementById('filterSidebar').innerHTML;
  document.getElementById('drawerFilters').innerHTML = sidebar
    .replace('id="filterSidebar"', '')
    .replace('Apply Filters', '');
}

function openFilterDrawer() {
  document.getElementById('filterDrawer').classList.add('open');
  document.getElementById('drawerOverlay').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeFilterDrawer() {
  document.getElementById('filterDrawer').classList.remove('open');
  document.getElementById('drawerOverlay').style.display = 'none';
  document.body.style.overflow = '';
}

/* 
   NAV SEARCH
──*/
function triggerNavSearch() {
  const q = document.getElementById('navSearchInput').value.trim();
  if (q) { document.getElementById('hsrInput').value = q; applyFilters(); }
}

/* 
   URL SYNC
──*/
function updateUrl() {
  const p = new URLSearchParams();
  if (state.query)             p.set('q',        state.query);
  if (state.categories.length) p.set('category', state.categories.join(','));
  if (state.location)          p.set('location', state.location);
  if (state.page > 1)          p.set('page',     state.page);
  const newUrl = window.location.pathname + (p.toString() ? '?' + p : '');
  history.replaceState(null, '', newUrl);
}

/* 
   SCROLL REVEAL
──*/
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('on'), i * 45);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.06 });
  document.querySelectorAll('.rv:not(.on)').forEach(el => obs.observe(el));
}

/* 
   TOAST
──*/
function showToast(type, title, msg) {
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  const stack = document.getElementById('toastStack');
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `
    <div class="toast-icon">${icons[type] || 'ℹ️'}</div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${msg}</div>
    </div>
    <button class="toast-x"
      onclick="this.closest('.toast').classList.remove('show'); setTimeout(() => this.closest('.toast').remove(), 320)">✕</button>`;
  stack.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 320); }, 4500);
}

