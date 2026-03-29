/* 
   DATA  (replace with API calls in production)
    */
const BOOKINGS = [
  { id:'b1', customer:'Abena Agyemang',  service:'Weekly Tutoring',    date:'Mar 10, 2025', time:'9:00 AM', location:'East Legon', status:'completed'   },
  { id:'b2', customer:'Kofi Owusu',       service:'WASSCE Maths Prep',  date:'Mar 12, 2025', time:'10:00 AM',location:'Tema',       status:'accepted'    },
  { id:'b3', customer:'Ama Asante',        service:'Weekly Tutoring',    date:'Mar 14, 2025', time:'2:00 PM', location:'Accra',      status:'pending'     },
  { id:'b4', customer:'Nana Yaw',          service:'Science Tutoring',   date:'Mar 16, 2025', time:'11:00 AM',location:'East Legon', status:'in-progress' },
  { id:'b5', customer:'Effum Kofi',      service:'English Language',   date:'Mar 5, 2025',  time:'3:00 PM', location:'Adenta',     status:'cancelled'   },
  { id:'b6', customer:'Mensah Darko',      service:'University Calculus',date:'Mar 18, 2025', time:'9:00 AM', location:'Legon',      status:'pending'     },
];

const SERVICES_DATA = [
  { id:'s1', icon:'📚', name:'WASSCE Maths &amp; Science',  cat:'Tutoring',  price:'₵50/session', active:true  },
  { id:'s2', icon:'📖', name:'University-Level Calculus',    cat:'Tutoring',  price:'₵80/session', active:true  },
  { id:'s3', icon:'🇬🇧', name:'English Language (JHS/SHS)', cat:'Tutoring',  price:'₵45/session', active:false },
];

const TRANSACTIONS = [
  { client:'Abena Agyemang', service:'Weekly Tutoring',  date:'Mar 10',  amount:120, comm:12  },
  { client:'Kofi Owusu',      service:'WASSCE Prep',      date:'Mar 08',  amount:80,  comm:8   },
  { client:'Ama Asante',       service:'Weekly Tutoring',  date:'Mar 05',  amount:120, comm:12  },
  { client:'Nana Yaw',         service:'Science',          date:'Feb 28',  amount:60,  comm:6   },
];

const REVIEWS_DATA = [
  { name:'Abena Agyemang', init:'AA', stars:5, text:'Kwame is amazing! My daughter went from a D to a B+ in Maths in two months.', date:'Mar 2, 2025' },
  { name:'Kofi Owusu',      init:'KO', stars:5, text:'Excellent communicator. Very patient. Worth every pesewa.', date:'Feb 15, 2025' },
  { name:'Esi Amoah',       init:'EA', stars:4, text:'Good tutor. Very knowledgeable. Minor issue with timing once.', date:'Jan 28, 2025' },
];

const NOTIFICATIONS_DATA = [
  { icon:'📅', title:'New Booking Request', msg:'Mensah Darko wants to book University Calculus on Mar 18.', time:'2m ago', unread:true, bg:'rgba(102,126,234,.12)' },
  { icon:'💰', title:'Payment Received',    msg:'₵120 received for Abena Agyemang\'s session.', time:'1h ago', unread:true, bg:'rgba(34,197,94,.12)' },
  { icon:'⭐', title:'New Review',           msg:'Kofi Owusu left you a 5-star review!', time:'3h ago', unread:true, bg:'rgba(245,158,11,.12)' },
  { icon:'📅', title:'Booking Accepted',    msg:'Kofi Owusu\'s booking for Mar 12 is confirmed.', time:'1d ago', unread:false, bg:'rgba(102,126,234,.12)' },
  { icon:'🔔', title:'Profile Update',      msg:'Your ID verification was approved.', time:'2d ago', unread:false, bg:'rgba(118,75,162,.12)' },
];

const MESSAGES_DATA = [
  { name:'Abena Agyemang', init:'AA', last:'Thank you so much!', unread:1 },
  { name:'Kofi Owusu',      init:'KO', last:'Can we reschedule to 11am?', unread:0 },
  { name:'Ama Asante',      init:'AA2', last:'See you tomorrow!', unread:1 },
];

const CHAT_HISTORY = [
  { from:'them', text:'Good morning Mr. Kwame! Are you available on Friday?', time:'9:02 AM' },
  { from:'me',   text:'Good morning Abena! Yes, Friday works perfectly. What time suits you?', time:'9:05 AM' },
  { from:'them', text:'Maybe 10am? We need to cover Chapter 7 on quadratics.', time:'9:07 AM' },
  { from:'me',   text:'Perfect. I will prepare some practice questions for you. See you then! 👍', time:'9:10 AM' },
];

/* 
   SECTION NAVIGATION
    */
const PAGE_NAMES = {
  overview:'Overview', bookings:'Bookings', messages:'Messages',
  earnings:'Earnings', services:'Services', calendar:'Calendar',
  reviews:'Reviews', notifications:'Notifications',
  profile:'Profile', settings:'Settings'
};

function showSection(name) {
  /* Hide all sections */
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  /* Show target */
  const target = document.getElementById('sec-' + name);
  if (target) target.classList.add('active');
  /* Update sidebar active state */
  document.querySelectorAll('.sb-item').forEach(i => i.classList.remove('active'));
  const sbItem = document.querySelector(`.sb-item[data-section="${name}"]`);
  if (sbItem) sbItem.classList.add('active');
  /* Update topbar page name */
  document.getElementById('topbarPageName').textContent = PAGE_NAMES[name] || name;
  /* Update bottom nav */
  document.querySelectorAll('.bn-item').forEach(i => i.classList.remove('active'));
  /* Re-run reveal for the new section */
  setTimeout(initReveal, 30);
  /* Close sidebar on mobile */
  closeSidebar();
}

/* 
   SIDEBAR TOGGLE (mobile)
    */
function toggleSidebar() {
  const sb  = document.getElementById('sidebar');
  const ov  = document.getElementById('sbOverlay');
  const btn = document.getElementById('hamBtn');
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
   RENDER BOOKINGS TABLE
    */
function renderBookingsTable(data, tbodyId, isRecent) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  const ST = {
    pending:     'st-pending',     accepted:'st-accepted',
    'in-progress':'st-in-progress', completed:'st-completed',
    cancelled:   'st-cancelled',   rejected:'st-rejected'
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
  /* Update pending badge */
  const pending = BOOKINGS.filter(x => x.status === 'pending').length;
  document.getElementById('bookingsBadge').textContent = pending;
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
   RENDER SERVICES
    */
let servicesData = [...SERVICES_DATA];
function renderServices() {
  const list = document.getElementById('servicesList');
  list.innerHTML = servicesData.map(s => `
    <div class="service-row">
      <div class="service-row-icon">${s.icon}</div>
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
  showToast('info','Service deleted','The service has been removed.');
}

/* 
   SERVICE MODAL
    */
function openServiceModal() { document.getElementById('serviceModal').classList.add('open'); }
function closeServiceModal() { document.getElementById('serviceModal').classList.remove('open'); }

function saveService() {
  const title    = document.getElementById('svcTitle').value.trim();
  const cat      = document.getElementById('svcCat').value;
  const price    = document.getElementById('svcPrice').value;
  const pricingT = document.getElementById('svcPricingType').value;
  if (!title || !price) { showToast('error','Missing fields','Please fill in the title and price.'); return; }
  const newSvc = {
    id:     's' + Date.now(),
    icon:   '🔧',
    name:   title,
    cat,
    price:  `₵${price}/${pricingT === 'Hourly Rate' ? 'hr' : 'session'}`,
    active: true
  };
  servicesData.push(newSvc);
  renderServices();
  closeServiceModal();
  showToast('success','Service added!',`"${title}" is now live on your profile.`);
  /* Clear form */
  ['svcTitle','svcPrice','svcDuration','svcDesc'].forEach(id => { document.getElementById(id).value = ''; });
}

/* 
   RENDER EARNINGS TRANSACTIONS
    */
function renderTransactions() {
  const tbody = document.getElementById('txBody');
  tbody.innerHTML = TRANSACTIONS.map(t => `
    <tr>
      <td>${t.client}</td>
      <td>${t.service}</td>
      <td>${t.date}</td>
      <td class="tx-amount">₵${t.amount}</td>
      <td class="tx-comm">-₵${t.comm}</td>
      <td style="font-weight:700;color:var(--success)">₵${t.amount - t.comm}</td>
    </tr>`).join('');
}

function requestWithdrawal() {
  showToast('success','Request submitted!','Your withdrawal is being processed. You will be notified shortly.');
}

/* 
   RENDER REVIEWS
    */
function renderReviews() {
  const list = document.getElementById('reviewsList');
  list.innerHTML = REVIEWS_DATA.map(r => `
    <div class="review-item">
      <div class="review-top">
        <div class="reviewer-info">
          <div class="reviewer-ava">${r.init}</div>
          <div>
            <div class="reviewer-name">${r.name}</div>
            <div class="reviewer-date">${r.date}</div>
          </div>
        </div>
        <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div>
      </div>
      <p class="review-text">${r.text}</p>
      <button class="review-reply-btn" onclick="replyReview(this)">Reply publicly</button>
    </div>`).join('');
}

function replyReview(btn) {
  /* Simple inline reply */
  const parent = btn.closest('.review-item');
  if (parent.querySelector('.reply-input-row')) { parent.querySelector('.reply-input-row').remove(); return; }
  const row = document.createElement('div');
  row.className = 'reply-input-row';
  row.style.cssText = 'display:flex;gap:8px;margin-top:10px';
  row.innerHTML = `
    <input class="form-input" style="flex:1" placeholder="Write a public reply…"/>
    <button class="btn-primary" style="padding:7px 16px;font-size:.8rem" onclick="submitReply(this)">Post</button>`;
  parent.insertBefore(row, btn);
}
function submitReply(btn) {
  const val = btn.previousElementSibling.value.trim();
  if (!val) return;
  btn.closest('.reply-input-row').remove();
  showToast('success','Reply posted','Your reply is now visible.');
}

/* 
   RENDER NOTIFICATIONS
    */
function renderNotifications() {
  const list = document.getElementById('notifList');
  list.innerHTML = NOTIFICATIONS_DATA.map((n,i) => `
    <div class="notif-item ${n.unread ? 'unread' : ''}" id="notif-${i}">
      <div class="notif-icon" style="background:${n.bg}">${n.icon}</div>
      <div class="notif-body">
        <div class="notif-title">${n.title}</div>
        <div class="notif-msg">${n.msg}</div>
      </div>
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
   RENDER MESSAGES
    */
function renderMessages() {
  const list = document.getElementById('msgList');
  list.innerHTML = MESSAGES_DATA.map((m,i) => `
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
const BOOKED_DAYS  = [5, 12, 14, 18, 22];
const FREE_DAYS    = [3, 6, 9, 15, 20, 25];

function renderCalendar() {
  const year  = calDate.getFullYear();
  const month = calDate.getMonth();
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('calMonthLabel').textContent = `${months[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const grid = document.getElementById('calDays');
  let html = '';

  /* Empty cells before first day */
  for (let i = 0; i < firstDay; i++) html += `<div class="cal-day empty"></div>`;
  /* Day cells */
  for (let d = 1; d <= daysInMonth; d++) {
    let cls = 'cal-day';
    if (isCurrentMonth && d === today.getDate()) cls += ' today';
    else if (BOOKED_DAYS.includes(d)) cls += ' booked';
    else if (FREE_DAYS.includes(d))   cls += ' free';
    html += `<div class="${cls}" onclick="calDayClick(${d})">${d}</div>`;
  }
  grid.innerHTML = html;
}

function changeMonth(dir) { calDate.setMonth(calDate.getMonth() + dir); renderCalendar(); }
function calDayClick(d)   { showToast('info', `Day ${d} selected`, 'You can block or assign this date.'); }

/* Availability day buttons */
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
let activeDays = [1,2,3,4,5]; /* Mon-Fri */
function renderAvailDays() {
  const wrap = document.getElementById('availDays');
  wrap.innerHTML = DAYS.map((d,i) => `
    <div class="avail-day-btn ${activeDays.includes(i) ? 'on' : ''}"
         onclick="toggleDay(${i},this)">${d}</div>`).join('');
}
function toggleDay(i, el) {
  el.classList.toggle('on');
  if (activeDays.includes(i)) { activeDays = activeDays.filter(x=>x!==i); }
  else { activeDays.push(i); }
}
function saveAvailability() { showToast('success','Availability saved','Your working schedule has been updated.'); }

/* 
   PROFILE SAVE
    */
function saveProfile() {
  const name = document.getElementById('pName').value.trim();
  if (name) { document.getElementById('sbProviderName').textContent = name; }
  showToast('success','Profile updated','Your changes have been saved successfully.');
}
function resetProfile() { showToast('info','Cancelled','No changes were made.'); }

function previewAvatar(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const imgs = document.querySelectorAll('.avatar-big img, .sb-avatar img, .tb-avatar img');
    imgs.forEach(img => { img.src = ev.target.result; img.style.display = 'block'; });
  };
  reader.readAsDataURL(file);
}

/* 
   LOGOUT
    */
function handleLogout() {
  showToast('info','Signing out…','See you next time!');
  setTimeout(() => { window.location.href = '/HTML/ADMIN/LandingPage.html'; }, 1700);
}

/* 
   SCROLL REVEAL
    */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) { setTimeout(() => e.target.classList.add('on'), i * 55); obs.unobserve(e.target); }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll('.rv:not(.on)').forEach(el => obs.observe(el));
}

/* 
   TOAST
    */
function showToast(type, title, msg) {
  const icons = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };
  const stack = document.getElementById('toastStack');
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<div class="toast-icon">${icons[type]||'ℹ️'}</div>
    <div class="toast-body"><div class="toast-title">${title}</div><div class="toast-msg">${msg}</div></div>
    <button class="toast-x" onclick="this.closest('.toast').classList.remove('show');setTimeout(()=>this.closest('.toast').remove(),300)">✕</button>`;
  stack.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 5000);
}

/* 
   BOOT  — render all data on page load
    */
document.addEventListener('DOMContentLoaded', () => {
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