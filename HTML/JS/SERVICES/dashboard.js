

function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem('tm_users');
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function getSessionIndex() {
  try {
    const raw = localStorage.getItem('tm_session');
    if (!raw) return 0;
    return JSON.parse(raw).index ?? 0;
  } catch { return 0; }
}

function getActiveProvider() {
  const users = getRegisteredUsers();
  const idx   = getSessionIndex();
  if (users.length > 0 && users[idx]) return users[idx];
  return {
    firstName : 'KOFI',
    lastName  : '',
    fullName  : 'KOFI BREBO EFFUM ',
    email     : 'smartbwoy48@gmail.com',
    phone     : '',
    role      : 'provider',
    isVerified: true,
  };
}

/* 
   MOCK DATA
    */
const BOOKINGS = [
  { id:'b1', customer:'Abena Agyemang',  service:'Weekly Tutoring',    date:'Mar 10, 2025', time:'9:00 AM',  location:'East Legon', status:'completed'   },
  { id:'b2', customer:'Kofi Owusu',       service:'WASSCE Maths Prep',  date:'Mar 12, 2025', time:'10:00 AM', location:'Tema',       status:'accepted'    },
  { id:'b3', customer:'Ama Asante',        service:'Weekly Tutoring',    date:'Mar 14, 2025', time:'2:00 PM',  location:'Accra',      status:'pending'     },
  { id:'b4', customer:'Nana Yaw',          service:'Science Tutoring',   date:'Mar 16, 2025', time:'11:00 AM', location:'East Legon', status:'in-progress' },
  { id:'b5', customer:'Efua Koomson',      service:'English Language',   date:'Mar 5, 2025',  time:'3:00 PM',  location:'Adenta',     status:'cancelled'   },
  { id:'b6', customer:'Mensah Darko',      service:'University Calculus',date:'Mar 18, 2025', time:'9:00 AM',  location:'Legon',      status:'pending'     },
];

const SERVICES_DATA = [
  { id:'s1', name:'WASSCE Maths &amp; Science',  cat:'Tutoring', price:'₵50/session', active:true  },
  { id:'s2', name:'University-Level Calculus',    cat:'Tutoring', price:'₵80/session', active:true  },
  { id:'s3', name:'English Language (JHS/SHS)',   cat:'Tutoring', price:'₵45/session', active:false },
];

const TRANSACTIONS = [
  { client:'Abena Agyemang', service:'Weekly Tutoring', date:'Mar 10', amount:120, comm:12 },
  { client:'Kofi Owusu',      service:'WASSCE Prep',     date:'Mar 08', amount:80,  comm:8  },
  { client:'Ama Asante',       service:'Weekly Tutoring', date:'Mar 05', amount:120, comm:12 },
  { client:'Nana Yaw',         service:'Science',         date:'Feb 28', amount:60,  comm:6  },
];

const REVIEWS_DATA = [
  { name:'Abena Agyemang', init:'AA', stars:5, text:'Excellent tutor! My daughter went from a D to a B+ in Maths in two months.', date:'Mar 2, 2025' },
  { name:'Kofi Owusu',      init:'KO', stars:5, text:'Very patient and knowledgeable. Worth every pesewa.', date:'Feb 15, 2025' },
  { name:'Esi Amoah',        init:'EA', stars:4, text:'Good tutor. Very thorough. Minor timing issue once.', date:'Jan 28, 2025' },
];

const NOTIFICATIONS_DATA = [
  { type:'booking',  title:'New Booking Request',  msg:'Mensah Darko wants to book University Calculus on Mar 18.', time:'2m ago',  unread:true },
  { type:'payment',  title:'Payment Received',     msg:'GH&#8373;120 received for Abena Agyemang\'s session.',      time:'1h ago',  unread:true },
  { type:'review',   title:'New Review',            msg:'Kofi Owusu left you a 5-star review.',                      time:'3h ago',  unread:true },
  { type:'booking',  title:'Booking Confirmed',    msg:'Kofi Owusu\'s booking for Mar 12 is confirmed.',            time:'1d ago',  unread:false },
  { type:'account',  title:'Profile Verified',     msg:'Your ID verification has been approved.',                   time:'2d ago',  unread:false },
];

const MESSAGES_DATA = [
  { name:'Abena Agyemang', init:'AA', last:'Thank you so much!', unread:1 },
  { name:'Kofi Owusu',      init:'KO', last:'Can we reschedule to 11am?', unread:0 },
  { name:'Ama Asante',      init:'AA2', last:'See you tomorrow!', unread:1 },
];

const CHAT_HISTORY = [
  { from:'them', text:'Good morning! Are you available on Friday?', time:'9:02 AM' },
  { from:'me',   text:'Good morning Abena! Yes, Friday works perfectly. What time suits you?', time:'9:05 AM' },
  { from:'them', text:'Maybe 10am? We need to cover Chapter 7 on quadratics.', time:'9:07 AM' },
  { from:'me',   text:'Perfect. I will prepare practice questions for you. See you then.', time:'9:10 AM' },
];

/* 
   THEME SYSTEM
   ─────────────────────────────────────────────
   Requirements implemented:
   1. CSS class toggling (no page reload)
   2. localStorage persistence
   3. System preference detection
   4. Smooth CSS transitions (defined in CSS)
   5. ARIA label updates for accessibility
   6. Settings page toggle sync
   7. SVG sun/moon icons (no emoji)
    */

/**
 * Returns the resolved theme: checks localStorage first,
 * then falls back to the OS preference.
 */
function getResolvedTheme() {
  const saved = localStorage.getItem('tm_theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Applies a theme by toggling the .light class on <html>.
 * Updates aria-label and syncs the Settings toggle.
 * Does NOT save to localStorage — call saveTheme() for that.
 */
function applyTheme(theme) {
  const html = document.documentElement;
  const btn  = document.getElementById('themeToggleBtn');
  const settingsToggle = document.getElementById('settingsDarkToggle');

  if (theme === 'light') {
    html.classList.add('light');
    if (btn) {
      btn.setAttribute('aria-label', 'Switch to dark mode');
      btn.setAttribute('title', 'Switch to dark mode');
    }
    if (settingsToggle) settingsToggle.checked = false;
  } else {
    html.classList.remove('light');
    if (btn) {
      btn.setAttribute('aria-label', 'Switch to light mode');
      btn.setAttribute('title', 'Switch to light mode');
    }
    if (settingsToggle) settingsToggle.checked = true;
  }
}

/**
 * Saves the chosen theme to localStorage and applies it.
 */
function saveTheme(theme) {
  localStorage.setItem('tm_theme', theme);
  applyTheme(theme);
}

/**
 * Toggles between light and dark. Called by the topbar button.
 */
function toggleTheme() {
  const current = document.documentElement.classList.contains('light') ? 'light' : 'dark';
  const next    = current === 'light' ? 'dark' : 'light';
  saveTheme(next);
  showToast('info',
    next === 'dark' ? 'Dark mode on' : 'Light mode on',
    next === 'dark' ? 'Eye-friendly dark theme activated.' : 'Bright light theme activated.'
  );
}

/**
 * Called by the Settings page toggle checkbox.
 */
function handleSettingsToggle(checkbox) {
  const theme = checkbox.checked ? 'dark' : 'light';
  saveTheme(theme);
  showToast('info',
    theme === 'dark' ? 'Dark mode on' : 'Light mode on',
    theme === 'dark' ? 'Eye-friendly dark theme activated.' : 'Bright light theme activated.'
  );
}

/**
 * Listen for OS-level theme changes (e.g., user changes system setting).
 * Only auto-applies if the user has not made an explicit choice.
 */
function initSystemThemeWatcher() {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', function(e) {
    /* Only auto-switch when user has no saved preference */
    if (!localStorage.getItem('tm_theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

/**
 * Keyboard: allow Enter/Space to activate the toggle button.
 * (Buttons handle Enter natively; Space needs explicit handling
 *  when role isn't "button" — here it IS a <button> so this is
 *  belt-and-suspenders for older browsers.)
 */
function initThemeKeyboard() {
  const btn = document.getElementById('themeToggleBtn');
  if (!btn) return;
  btn.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  });
}

/* 
   SECTION NAVIGATION
    */
const PAGE_NAMES = {
  overview:'Overview', bookings:'Bookings', messages:'Messages',
  earnings:'Earnings', services:'Services', calendar:'Calendar',
  reviews:'Reviews',   notifications:'Notifications',
  profile:'Profile',   settings:'Settings'
};

function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('sec-' + name);
  if (target) target.classList.add('active');
  document.querySelectorAll('.sb-item[data-section]').forEach(i => i.classList.remove('active'));
  const sbItem = document.querySelector(`.sb-item[data-section="${name}"]`);
  if (sbItem) sbItem.classList.add('active');
  document.getElementById('topbarPageName').textContent = PAGE_NAMES[name] || name;

  /* Re-sync settings toggle whenever we navigate to settings */
  if (name === 'settings') {
    const isDark = !document.documentElement.classList.contains('light');
    const settingsToggle = document.getElementById('settingsDarkToggle');
    if (settingsToggle) settingsToggle.checked = isDark;
  }

  setTimeout(initReveal, 30);
  closeSidebar();
}

/* 
   SIDEBAR TOGGLE
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
   WELCOME
    */
function initWelcome() {
  const provider = getActiveProvider();
  const firstName = provider.firstName || provider.fullName.split(' ')[0] || 'Provider';

  document.getElementById('welcomeFirstName').textContent = firstName;
  document.getElementById('sbProviderName').textContent = provider.fullName || firstName;

  const d    = new Date();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const mos  = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dateEl = document.getElementById('welcomeDate');
  dateEl.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>${days[d.getDay()]}, ${mos[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

  document.getElementById('welcomeSub').textContent =
    `Welcome back, ${firstName}! Here is your business summary for today.`;

  document.getElementById('pName').value  = provider.fullName  || '';
  document.getElementById('pEmail').value = provider.email     || '';
  if (provider.phone) document.getElementById('pPhone').value = provider.phone;
}

/* 
   BOOKINGS TABLE
    */
function renderBookingsTable(data, tbodyId, isRecent) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  const ST = {
    pending:'st-pending', accepted:'st-accepted', 'in-progress':'st-in-progress',
    completed:'st-completed', cancelled:'st-cancelled', rejected:'st-rejected'
  };
  tbody.innerHTML = data.map(b => `
    <tr>
      <td class="bk-customer">${b.customer}</td>
      <td class="bk-service">${b.service}</td>
      <td>${b.date} · ${b.time}</td>
      ${!isRecent ? `<td>${b.location}</td>` : ''}
      <td><span class="bk-status ${ST[b.status] || 'st-pending'}">${b.status.replace('-',' ')}</span></td>
      <td>
        <div class="bk-actions">
          ${b.status === 'pending' ? `
            <button class="bk-btn accept"  onclick="updateBooking('${b.id}','accepted')">Accept</button>
            <button class="bk-btn reject"  onclick="updateBooking('${b.id}','rejected')">Reject</button>` : ''}
          ${b.status === 'accepted' || b.status === 'in-progress' ? `
            <button class="bk-btn complete" onclick="updateBooking('${b.id}','completed')">Complete</button>` : ''}
          <button class="bk-btn" onclick="showSection('messages')">Message</button>
        </div>
      </td>
    </tr>`).join('');
}

function updateBooking(id, newStatus) {
  const b = BOOKINGS.find(x => x.id === id);
  if (!b) return;
  b.status = newStatus;
  renderBookingsTable(BOOKINGS, 'allBookingsBody', false);
  renderBookingsTable(BOOKINGS.slice(0,4), 'recentBookingsBody', true);
  showToast('success', 'Booking updated', `Booking marked as ${newStatus}.`);
  document.getElementById('bookingsBadge').textContent =
    BOOKINGS.filter(x => x.status === 'pending').length;
}

let currentFilter = 'all';
function filterBookings(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('#bkFilterRow .bk-btn').forEach(b => b.classList.remove('active-filter'));
  btn.classList.add('active-filter');
  const filtered = filter === 'all' ? BOOKINGS : BOOKINGS.filter(b => b.status === filter);
  renderBookingsTable(filtered, 'allBookingsBody', false);
}

/* 
   SERVICES
    */
let servicesData = [...SERVICES_DATA];
const SVC_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
</svg>`;

function renderServices() {
  const list = document.getElementById('servicesList');
  list.innerHTML = servicesData.map(s => `
    <div class="service-row">
      <div class="service-row-icon">${SVC_SVG}</div>
      <div class="service-row-info">
        <div class="service-row-name">${s.name}</div>
        <div class="service-row-cat">${s.cat}</div>
      </div>
      <div class="service-row-price">${s.price}</div>
      <label class="service-row-toggle" title="${s.active ? 'Active' : 'Paused'}">
        <input type="checkbox" ${s.active ? 'checked' : ''} onchange="toggleService('${s.id}',this)"/>
        <div class="toggle-track"></div>
      </label>
      <button class="svc-btn" onclick="editService('${s.id}')">Edit</button>
      <button class="svc-btn delete" onclick="deleteService('${s.id}')">Delete</button>
    </div>`).join('');
}

function toggleService(id, cb) {
  const s = servicesData.find(x => x.id === id);
  if (s) { s.active = cb.checked; showToast('info', s.active ? 'Service active' : 'Service paused', s.name); }
}
function editService(id) {
  const s = servicesData.find(x => x.id === id);
  if (!s) return;
  document.getElementById('modalTitle').textContent = 'Edit Service';
  document.getElementById('svcTitle').value = s.name.replace(/&amp;/g,'&');
  document.getElementById('svcPrice').value = parseInt(s.price);
  openServiceModal();
}
function deleteService(id) {
  if (!confirm('Delete this service?')) return;
  servicesData = servicesData.filter(x => x.id !== id);
  renderServices();
  showToast('info', 'Service deleted', 'The service has been removed.');
}
function openServiceModal()  { document.getElementById('serviceModal').classList.add('open'); }
function closeServiceModal() { document.getElementById('serviceModal').classList.remove('open'); }
function saveService() {
  const title = document.getElementById('svcTitle').value.trim();
  const cat   = document.getElementById('svcCat').value;
  const price = document.getElementById('svcPrice').value;
  const ptype = document.getElementById('svcPricingType').value;
  if (!title || !price) { showToast('error','Missing fields','Please fill in title and price.'); return; }
  servicesData.push({ id:'s'+Date.now(), name:title, cat, price:`₵${price}/${ptype==='Hourly Rate'?'hr':'session'}`, active:true });
  renderServices();
  closeServiceModal();
  showToast('success','Service added!',`"${title}" is now live on your profile.`);
  ['svcTitle','svcPrice','svcDuration','svcDesc'].forEach(id => { document.getElementById(id).value=''; });
}

/* 
   TRANSACTIONS
    */
function renderTransactions() {
  document.getElementById('txBody').innerHTML = TRANSACTIONS.map(t => `
    <tr>
      <td>${t.client}</td>
      <td>${t.service}</td>
      <td>${t.date}</td>
      <td class="tx-amount">&#8373;${t.amount}</td>
      <td class="tx-comm">-&#8373;${t.comm}</td>
      <td style="font-weight:700;color:var(--success)">&#8373;${t.amount - t.comm}</td>
    </tr>`).join('');
}
function requestWithdrawal() {
  showToast('success','Request submitted!','Your withdrawal is being processed.');
}

/* 
   REVIEWS
    */
function starSVG(filled) {
  return `<svg class="star-svg" viewBox="0 0 24 24"><polygon class="${filled ? 'star-fill' : 'star-empty'}" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
}
function starsHTML(n) {
  return Array.from({length:5},(_,i)=>starSVG(i<n)).join('');
}

function renderReviews() {
  document.getElementById('overallStars').innerHTML = starsHTML(5);
  document.getElementById('reviewsList').innerHTML = REVIEWS_DATA.map(r => `
    <div class="review-item">
      <div class="review-top">
        <div class="reviewer-info">
          <div class="reviewer-ava">${r.init}</div>
          <div><div class="reviewer-name">${r.name}</div><div class="reviewer-date">${r.date}</div></div>
        </div>
        <div class="star-row">${starsHTML(r.stars)}</div>
      </div>
      <p class="review-text">${r.text}</p>
      <button class="review-reply-btn" onclick="replyReview(this)">Reply publicly</button>
    </div>`).join('');
}

function replyReview(btn) {
  const parent = btn.closest('.review-item');
  if (parent.querySelector('.reply-input-row')) { parent.querySelector('.reply-input-row').remove(); return; }
  const row = document.createElement('div');
  row.className = 'reply-input-row';
  row.style.cssText = 'display:flex;gap:8px;margin-top:10px';
  row.innerHTML = `<input class="form-input" style="flex:1" placeholder="Write a public reply…"/>
    <button class="btn-primary" style="padding:7px 16px;font-size:.8rem" onclick="submitReply(this)">Post</button>`;
  parent.insertBefore(row, btn);
}
function submitReply(btn) {
  if (!btn.previousElementSibling.value.trim()) return;
  btn.closest('.reply-input-row').remove();
  showToast('success','Reply posted','Your reply is now visible.');
}

/* 
   NOTIFICATIONS
    */
const NOTIF_ICONS = {
  booking: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--accent)"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  payment: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--success)"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  review:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--warning)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  account: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--accent-2)"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
};
const NOTIF_BG = {
  booking:'rgba(102,126,234,.12)',
  payment:'rgba(34,197,94,.12)',
  review:'rgba(245,158,11,.12)',
  account:'rgba(118,75,162,.12)'
};

function renderNotifications() {
  document.getElementById('notifList').innerHTML = NOTIFICATIONS_DATA.map((n,i) => `
    <div class="notif-item ${n.unread ? 'unread' : ''}" id="notif-${i}">
      <div class="notif-icon" style="background:${NOTIF_BG[n.type] || 'var(--bg-raised)'}">${NOTIF_ICONS[n.type] || NOTIF_ICONS.account}</div>
      <div class="notif-body"><div class="notif-title">${n.title}</div><div class="notif-msg">${n.msg}</div></div>
      <div class="notif-time">${n.time}</div>
      ${n.unread ? '<div class="notif-unread-dot"></div>' : ''}
    </div>`).join('');
}
function markAllRead() {
  NOTIFICATIONS_DATA.forEach(n => n.unread = false);
  renderNotifications();
  showToast('info','All caught up!','All notifications marked as read.');
}

/* 
   MESSAGES
    */
function renderMessages() {
  document.getElementById('msgList').innerHTML = MESSAGES_DATA.map((m,i) => `
    <div class="msg-preview ${i===0?'active':''}" onclick="selectConversation(this,'${m.name}')">
      <div class="msg-preview-ava">${m.init}</div>
      <div class="msg-preview-info">
        <div class="msg-preview-name">${m.name}</div>
        <div class="msg-preview-last">${m.last}</div>
      </div>
      ${m.unread ? `<div class="msg-unread-badge">${m.unread}</div>` : ''}
    </div>`).join('');
}
function renderChat() {
  const area = document.getElementById('chatMessages');
  area.innerHTML = CHAT_HISTORY.map(m => `
    <div class="chat-msg ${m.from}">
      <div class="chat-bubble">${m.text}</div>
      <div class="chat-time">${m.time}</div>
    </div>`).join('');
  area.scrollTop = area.scrollHeight;
}
function selectConversation(el, name) {
  document.querySelectorAll('.msg-preview').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('chatName').textContent = name;
}
function sendMessage() {
  const input = document.getElementById('chatInput');
  const text  = input.value.trim();
  if (!text) return;
  const area = document.getElementById('chatMessages');
  const div  = document.createElement('div');
  div.className = 'chat-msg me';
  div.innerHTML = `<div class="chat-bubble">${text}</div><div class="chat-time">Just now</div>`;
  area.appendChild(div);
  input.value = '';
  area.scrollTop = area.scrollHeight;
  showToast('success','Message sent','Your message has been delivered.');
}

/* 
   CALENDAR
    */
let calDate = new Date();
const BOOKED_DAYS = [5,12,14,18,22];
const FREE_DAYS   = [3,6,9,15,20,25];

function renderCalendar() {
  const year  = calDate.getFullYear();
  const month = calDate.getMonth();
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('calMonthLabel').textContent = `${months[month]} ${year}`;
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today       = new Date();
  const isCurrent   = today.getFullYear()===year && today.getMonth()===month;
  let html = '';
  for (let i=0;i<firstDay;i++) html += `<div class="cal-day empty"></div>`;
  for (let d=1;d<=daysInMonth;d++) {
    let cls='cal-day';
    if      (isCurrent && d===today.getDate()) cls+=' today';
    else if (BOOKED_DAYS.includes(d)) cls+=' booked';
    else if (FREE_DAYS.includes(d))   cls+=' free';
    html += `<div class="${cls}" onclick="calDayClick(${d})">${d}</div>`;
  }
  document.getElementById('calDays').innerHTML = html;
}
function changeMonth(dir) { calDate.setMonth(calDate.getMonth()+dir); renderCalendar(); }
function calDayClick(d)   { showToast('info',`Day ${d} selected`,'You can block or assign this date.'); }

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
let activeDays = [1,2,3,4,5];
function renderAvailDays() {
  document.getElementById('availDays').innerHTML = DAYS.map((d,i) => `
    <div class="avail-day-btn ${activeDays.includes(i)?'on':''}" onclick="toggleDay(${i},this)">${d}</div>`).join('');
}
function toggleDay(i,el) {
  el.classList.toggle('on');
  activeDays.includes(i) ? activeDays=activeDays.filter(x=>x!==i) : activeDays.push(i);
}
function saveAvailability() { showToast('success','Availability saved','Your working schedule has been updated.'); }

/* 
   PROFILE SAVE
    */
function saveProfile() {
  const name = document.getElementById('pName').value.trim();
  if (name) {
    document.getElementById('sbProviderName').textContent = name;
    const users = getRegisteredUsers();
    const idx   = getSessionIndex();
    if (users[idx]) {
      users[idx].fullName  = name;
      users[idx].firstName = name.split(' ')[0];
      localStorage.setItem('tm_users', JSON.stringify(users));
    }
  }
  showToast('success','Profile updated','Your changes have been saved successfully.');
}
function resetProfile() { showToast('info','Cancelled','No changes were made.'); }
function previewAvatar(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    document.querySelectorAll('.avatar-big img, .sb-avatar img, .tb-avatar img')
      .forEach(img => { img.src = ev.target.result; img.style.display = 'block'; });
  };
  reader.readAsDataURL(file);
}

/* 
   LOGOUT
    */
function handleLogout() {
  showToast('info','Signing out…','See you next time!');
  localStorage.removeItem('tm_session');
  setTimeout(() => { window.location.href = '/HTML/ADMIN/LandingPage.html'; }, 1700);
}

/* 
   SCROLL REVEAL
    */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e,i) => {
      if (e.isIntersecting) { setTimeout(()=>e.target.classList.add('on'), i*55); obs.unobserve(e.target); }
    });
  }, { threshold:0.07 });
  document.querySelectorAll('.rv:not(.on)').forEach(el => obs.observe(el));
}

/* 
   TOAST
    */
const TOAST_ICONS = {
  success: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
  error:   `<svg viewBox="0 0 24 24" fill="none" stroke="var(--danger)"  stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  info:    `<svg viewBox="0 0 24 24" fill="none" stroke="var(--info)"    stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--warning)" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
};

function showToast(type, title, msg) {
  const stack = document.getElementById('toastStack');
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<div class="toast-icon">${TOAST_ICONS[type]||TOAST_ICONS.info}</div>
    <div class="toast-body"><div class="toast-title">${title}</div><div class="toast-msg">${msg}</div></div>
    <button class="toast-x" onclick="this.closest('.toast').classList.remove('show');setTimeout(()=>this.closest('.toast').remove(),300)">&#10005;</button>`;
  stack.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); setTimeout(()=>t.remove(),300); }, 5000);
}

/* 
   BOOT
    */
document.addEventListener('DOMContentLoaded', () => {
  /* 1. Apply persisted/detected theme (HTML already applied it before
        first paint via the inline script, but we re-apply here to
        update ARIA labels and sync the Settings toggle) */
  applyTheme(getResolvedTheme());

  /* 2. Listen for OS-level changes */
  initSystemThemeWatcher();

  /* 3. Keyboard accessibility for the toggle button */
  initThemeKeyboard();

  /* 4. Render all sections */
  initWelcome();
  renderBookingsTable(BOOKINGS.slice(0,4), 'recentBookingsBody', true);
  renderBookingsTable(BOOKINGS, 'allBookingsBody', false);
  renderServices();
  renderTransactions();
  renderReviews();
  renderNotifications();
  renderMessages();
  renderChat();
  renderCalendar();
  renderAvailDays();
  initReveal();
});