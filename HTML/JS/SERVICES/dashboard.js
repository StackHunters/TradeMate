/* 
   DATA
 */
const bookings = [
  { id: 'BK001', customer: 'Kofi Brebo', avatar: 'KB', avatarColor: '#667eea', service: 'Deep Cleaning', category: 'cleaning', date: '2026-03-05', time: '09:00 AM', location: 'East Legon, Accra', price: 320, status: 'pending', payStatus: 'pending', special: 'Please bring eco-friendly products. 3-bedroom apartment.' },
  { id: 'BK002', customer: 'Abena Mensah', avatar: 'AM', avatarColor: '#764ba2', service: 'Pipe Repair', category: 'plumbing', date: '2026-03-04', time: '02:30 PM', location: 'Osu, Accra', price: 180, status: 'accepted', payStatus: 'pending', special: 'Kitchen sink is leaking under the cabinet.' },
  { id: 'BK003', customer: 'Kofi Boateng', avatar: 'KB', avatarColor: '#3fb950', service: 'Electrical Wiring', category: 'electrical', date: '2026-03-03', time: '11:00 AM', location: 'Tema, Accra', price: 450, status: 'completed', payStatus: 'paid', special: 'New panel installation in garage.' },
  { id: 'BK004', customer: 'Akosua Darko', avatar: 'AD', avatarColor: '#d29922', service: 'Wall Painting', category: 'painting', date: '2026-03-02', time: '08:00 AM', location: 'Airport Hills', price: 280, status: 'inprogress', payStatus: 'pending', special: 'Two rooms - living room and master bedroom.' },
  { id: 'BK005', customer: 'Yaw Amponsah', avatar: 'YA', avatarColor: '#f85149', service: 'Deep Cleaning', category: 'cleaning', date: '2026-02-28', time: '10:00 AM', location: 'Adabraka, Accra', price: 200, status: 'cancelled', payStatus: 'paid', special: 'None' },
  { id: 'BK006', customer: 'Efua Owusu', avatar: 'EO', avatarColor: '#58a6ff', service: 'Plumbing Check', category: 'plumbing', date: '2026-02-26', time: '03:00 PM', location: 'Dansoman, Accra', price: 120, status: 'rejected', payStatus: 'paid', special: 'Annual maintenance check.' },
];

const services = [
  { id: 'SV001', title: 'Deep Home Cleaning', category: 'Cleaning', price: 280, unit: '/session', status: 'active', bookings: 14, rating: 4.9, views: 342, convRate: '18.4%', revenue: 3920, lastBooked: '2 days ago', emoji: '🧹' },
  { id: 'SV002', title: 'Pipe & Plumbing Repair', category: 'Plumbing', price: 180, unit: '/job', status: 'active', bookings: 8, rating: 4.7, views: 189, convRate: '11.2%', revenue: 1440, lastBooked: '5 days ago', emoji: '🔧' },
  { id: 'SV003', title: 'Electrical Installation', category: 'Electrical', price: 450, unit: '/job', status: 'active', bookings: 5, rating: 5.0, views: 122, convRate: '13.9%', revenue: 2250, lastBooked: '1 week ago', emoji: '⚡' },
  { id: 'SV004', title: 'Interior Wall Painting', category: 'Painting', price: 300, unit: '/room', status: 'paused', bookings: 3, rating: 4.8, views: 97, convRate: '9.3%', revenue: 900, lastBooked: '2 weeks ago', emoji: '🎨' },
  { id: 'SV005', title: 'AC Servicing & Repair', category: 'Appliances', price: 150, unit: '/unit', status: 'draft', bookings: 0, rating: 0, views: 0, convRate: '0%', revenue: 0, lastBooked: 'Never', emoji: '❄️' },
];

const earnings = [
  { job: 'Electrical Installation', customer: 'Kofi Boateng', category: 'electrical', date: '2026-03-03', gross: 450, commission: 67.5, net: 382.5, status: 'paid' },
  { job: 'Deep Home Cleaning', customer: 'Abena Mensah', category: 'cleaning', date: '2026-02-28', gross: 280, commission: 42, net: 238, status: 'paid' },
  { job: 'Pipe Repair', customer: 'Yaw Amponsah', category: 'plumbing', date: '2026-02-25', gross: 180, commission: 27, net: 153, status: 'paid' },
  { job: 'Wall Painting (2 rooms)', customer: 'Akosua Darko', category: 'painting', date: '2026-02-22', gross: 600, commission: 90, net: 510, status: 'paid' },
  { job: 'AC Servicing', customer: 'Efua Owusu', category: 'electrical', date: '2026-02-18', gross: 150, commission: 22.5, net: 127.5, status: 'pending' },
  { job: 'Deep Home Cleaning', customer: 'Kwame Acheampong', category: 'cleaning', date: '2026-02-15', gross: 280, commission: 42, net: 238, status: 'paid' },
];

const withdrawals = [
  { amount: 500, method: 'MTN MoMo', date: 'Feb 20, 2026', status: 'approved' },
  { amount: 300, method: 'GCB Bank', date: 'Feb 10, 2026', status: 'approved' },
  { amount: 750, method: 'MTN MoMo', date: 'Jan 28, 2026', status: 'approved' },
  { amount: 200, method: 'MTN MoMo', date: 'Jan 14, 2026', status: 'rejected' },
];

const messages = [
  { id: 1, name: 'Kwame Acheampong', avatar: 'KA', color: '#667eea', preview: 'When can you come tomorrow?', time: '10:22 AM', unread: true },
  { id: 2, name: 'Abena Mensah', avatar: 'AM', color: '#764ba2', preview: 'Thank you so much! Great job.', time: 'Yesterday', unread: true },
  { id: 3, name: 'Kofi Boateng', avatar: 'KB', color: '#3fb950', preview: 'Can you help with the socket?', time: 'Feb 28', unread: false },
  { id: 4, name: 'Akosua Darko', avatar: 'AD', color: '#d29922', preview: 'Please bring white paint.', time: 'Feb 26', unread: false },
];

const chatHistory = [
  { from: 'incoming', text: 'Hello James, I booked a cleaning for tomorrow. Can you confirm?', time: '9:45 AM' },
  { from: 'outgoing', text: 'Hi Kwame! Yes, confirmed for 9 AM. I will bring all supplies.', time: '9:48 AM' },
  { from: 'incoming', text: 'Perfect! Just one question - do you do windows too?', time: '10:00 AM' },
  { from: 'outgoing', text: 'Absolutely, interior and exterior windows are included in the deep clean package!', time: '10:05 AM' },
  { from: 'incoming', text: 'When can you come tomorrow?', time: '10:22 AM' },
];

const reviews = [
  { name: 'Kofi Blebo', avatar: 'KB', color: '#3fb950', service: 'Electrical Installation', rating: 5, text: 'James was absolutely professional. Showed up on time, did the work cleanly, and even explained everything he was doing. Will definitely hire again!', date: 'March 3, 2026' },
  { name: 'Abena Mensah', avatar: 'AM', color: '#764ba2', service: 'Pipe Repair', rating: 5, text: 'Quick, efficient, and very reasonably priced. Fixed my leaking pipe in under an hour. Very happy with the service.', date: 'Feb 28, 2026' },
  { name: 'Yaw Amponsah', avatar: 'YA', color: '#f85149', service: 'Deep Cleaning', rating: 4, text: 'Good work overall. The apartment was spotless afterwards. Would have given 5 stars but was 20 mins late.', date: 'Feb 26, 2026' },
  { name: 'Efua Owusu', avatar: 'EO', color: '#58a6ff', service: 'Plumbing Check', rating: 5, text: 'Very thorough inspection. Found issues I didn\'t even know existed and fixed them right away. Great value!', date: 'Feb 22, 2026' },
];

/* 
   NAVIGATION
 */
const pageTitles = {
  dashboard: 'Dashboard <span>Overview</span>',
  bookings: 'Booking <span>Requests</span>',
  services: 'My <span>Services</span>',
  earnings: 'Earnings & <span>Withdrawals</span>',
  messages: '<span>Messages</span>',
  reviews: 'Reviews & <span>Ratings</span>',
  settings: 'Account <span>Settings</span>',
};

function navigate(page, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  if (el) el.classList.add('active');
  document.getElementById('topbarTitle').innerHTML = pageTitles[page] || page;
  closeSidebar();
}

/* 
   SIDEBAR TOGGLE
 */
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}

/* 
   MODAL
 */
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
// Close on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) { if (e.target === this) this.classList.remove('open'); });
});

/* 
   TOAST
 */
function showToast(msg, type = 'info') {
  const icons = { success: '✅', error: '❌', info: '💡' };
  const tc = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  tc.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(30px)'; t.style.transition = '.3s'; setTimeout(() => t.remove(), 300); }, 3000);
}

/* 
   STATUS HELPERS
 */
function statusBadge(status) {
  const map = { pending: 'badge-pending', accepted: 'badge-accepted', inprogress: 'badge-inprogress', completed: 'badge-completed', cancelled: 'badge-cancelled', rejected: 'badge-rejected', paid: 'badge-paid', active: 'badge-active', paused: 'badge-paused', draft: 'badge-draft' };
  const labels = { inprogress: 'In Progress' };
  const label = labels[status] || (status.charAt(0).toUpperCase() + status.slice(1));
  return `<span class="badge ${map[status] || ''}">${label}</span>`;
}

function stars(n) {
  return n ? '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n)) : 'No ratings yet';
}

/* 
   RENDER: RECENT BOOKINGS (DASHBOARD)
 */
function renderRecentBookings() {
  const tbody = document.getElementById('recentBookingsBody');
  const recent = bookings.slice(0, 5);
  tbody.innerHTML = recent.map(b => `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:9px">
          <div style="width:32px;height:32px;border-radius:50%;background:${b.avatarColor};display:grid;place-items:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0">${b.avatar}</div>
          <div class="td-main">${b.customer}</div>
        </div>
      </td>
      <td>${b.service}</td>
      <td>${b.date}</td>
      <td>${statusBadge(b.status)}</td>
      <td><button class="btn btn-outline btn-sm" onclick="openBookingDetail('${b.id}')">View</button></td>
    </tr>
  `).join('');
}

/* 
   RENDER: ACTIVE SERVICES SUMMARY
 */
function renderActiveSummary() {
  const el = document.getElementById('activeSummaryList');
  el.innerHTML = services.filter(s => s.status === 'active').map(s => `
    <div style="display:flex;align-items:center;gap:12px;padding:12px 18px;border-bottom:1px solid rgba(102,126,234,0.06)">
      <span style="font-size:22px">${s.emoji}</span>
      <div style="flex:1;min-width:0">
        <div style="font-size:13.5px;font-weight:600;color:#e6edf3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${s.title}</div>
        <div style="font-size:11.5px;color:var(--muted)">${s.bookings} bookings · ★ ${s.rating}</div>
      </div>
      <div style="font-family:'Times New Roman',serif;font-size:15px;font-weight:700;color:var(--accent)">GH₵${s.price}</div>
    </div>
  `).join('');
}

/* 
   RENDER: BOOKINGS TABLE
 */
let filteredBookings = [...bookings];

function renderBookingsTable(data) {
  const tbody = document.getElementById('bookingsTableBody');
  document.getElementById('bookingCount').textContent = `Showing ${data.length} of ${bookings.length} bookings`;
  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="empty-state"><div class="empty-icon">📭</div><p>No bookings match your filters.</p></td></tr>`;
    return;
  }
  tbody.innerHTML = data.map(b => `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:9px">
          <div style="width:34px;height:34px;border-radius:50%;background:${b.avatarColor};display:grid;place-items:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0">${b.avatar}</div>
          <div>
            <div class="td-main">${b.customer}</div>
            <div class="td-sub">#${b.id}</div>
          </div>
        </div>
      </td>
      <td>${b.service}</td>
      <td><div class="td-main">${b.date}</div><div class="td-sub">${b.time}</div></td>
      <td style="max-width:140px;white-space:normal">${b.location}</td>
      <td><div class="td-amount">GH₵ ${b.price}</div></td>
      <td>${statusBadge(b.status)}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn btn-info" onclick="openBookingDetail('${b.id}')">👁 View</button>
          ${b.status === 'pending' ? `
            <button class="action-btn btn-success" onclick="updateBookingStatus('${b.id}','accepted')">✓ Accept</button>
            <button class="action-btn btn-danger" onclick="openRejectModal('${b.id}')">✕ Reject</button>
          ` : ''}
          ${b.status === 'accepted' ? `
            <button class="action-btn btn-success" onclick="updateBookingStatus('${b.id}','inprogress')">▶ Start</button>
          ` : ''}
          ${b.status === 'inprogress' ? `
            <button class="action-btn btn-success" onclick="updateBookingStatus('${b.id}','completed')">✓ Complete</button>
          ` : ''}
          <button class="action-btn btn-info" onclick="navigate('messages', document.querySelectorAll('.nav-item')[4])">💬</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function filterBookings() {
  const status = document.getElementById('bookingStatusFilter').value;
  filteredBookings = bookings.filter(b => {
    if (status !== 'all' && b.status !== status) return false;
    return true;
  });
  renderBookingsTable(filteredBookings);
}

function resetBookingFilters() {
  document.getElementById('bookingStatusFilter').value = 'all';
  document.getElementById('bookingDateFrom').value = '';
  document.getElementById('bookingDateTo').value = '';
  filteredBookings = [...bookings];
  renderBookingsTable(filteredBookings);
}

function updateBookingStatus(id, newStatus) {
  const b = bookings.find(x => x.id === id);
  if (b) {
    b.status = newStatus;
    renderBookingsTable(filteredBookings.length === bookings.length ? bookings : filteredBookings);
    renderRecentBookings();
    showToast(`Booking ${id} status updated to ${newStatus}!`, 'success');
  }
}

/* 
   BOOKING DETAIL MODAL
 */
function openBookingDetail(id) {
  const b = bookings.find(x => x.id === id);
  if (!b) return;
  document.getElementById('bookingModalContent').innerHTML = `
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;padding:16px;background:var(--dark-3);border-radius:var(--radius-sm)">
      <div style="width:50px;height:50px;border-radius:50%;background:${b.avatarColor};display:grid;place-items:center;font-size:18px;font-weight:700;color:#fff">${b.avatar}</div>
      <div>
        <div style="font-size:16px;font-weight:600;color:#e6edf3">${b.customer}</div>
        <div style="font-size:12px;color:var(--muted)">${b.id} · Placed 2 days ago</div>
      </div>
      <div style="margin-left:auto">${statusBadge(b.status)}</div>
    </div>
    <div class="modal-detail-row"><span class="modal-detail-label">Service</span><span class="modal-detail-value">${b.service}</span></div>
    <div class="modal-detail-row"><span class="modal-detail-label">Category</span><span class="modal-detail-value">${b.category.charAt(0).toUpperCase()+b.category.slice(1)}</span></div>
    <div class="modal-detail-row"><span class="modal-detail-label">Date & Time</span><span class="modal-detail-value">${b.date} at ${b.time}</span></div>
    <div class="modal-detail-row"><span class="modal-detail-label">Location</span><span class="modal-detail-value">${b.location}</span></div>
    <div class="modal-detail-row"><span class="modal-detail-label">Price</span><span class="modal-detail-value" style="color:var(--success);font-family:'Times New Roman',serif;font-size:17px;font-weight:700">GH₵ ${b.price}</span></div>
    <div class="modal-detail-row"><span class="modal-detail-label">Payment Status</span><span class="modal-detail-value">${statusBadge(b.payStatus)}</span></div>
    <div class="modal-detail-row"><span class="modal-detail-label">Special Instructions</span><span class="modal-detail-value" style="max-width:55%;white-space:normal;text-align:right;line-height:1.5">${b.special}</span></div>
    <div class="modal-actions">
      ${b.status === 'pending' ? `
        <button class="btn btn-success btn-sm" onclick="updateBookingStatus('${b.id}','accepted');closeModal('bookingModal')">✓ Accept</button>
        <button class="btn btn-danger btn-sm" onclick="closeModal('bookingModal');openRejectModal('${b.id}')">✕ Reject</button>
      ` : ''}
      ${b.status === 'accepted' ? `<button class="btn btn-primary btn-sm" onclick="updateBookingStatus('${b.id}','inprogress');closeModal('bookingModal')">▶ Mark as In Progress</button>` : ''}
      ${b.status === 'inprogress' ? `<button class="btn btn-success btn-sm" onclick="updateBookingStatus('${b.id}','completed');closeModal('bookingModal')">✓ Mark Complete</button>` : ''}
      <button class="btn btn-info btn-sm" onclick="closeModal('bookingModal');navigate('messages',document.querySelectorAll('.nav-item')[4])">💬 Message</button>
      <button class="btn btn-outline btn-sm" onclick="closeModal('bookingModal')">Close</button>
    </div>
  `;
  openModal('bookingModal');
}

let rejectTargetId = null;
function openRejectModal(id) { rejectTargetId = id; openModal('rejectModal'); }
function confirmReject() {
  if (rejectTargetId) { updateBookingStatus(rejectTargetId, 'rejected'); closeModal('rejectModal'); rejectTargetId = null; }
}

/* 
   RENDER: SERVICES
 */
function renderServices() {
  const grid = document.getElementById('serviceGrid');
  grid.innerHTML = services.map(s => `
    <div class="service-card">
      <div class="service-thumb">
        <span>${s.emoji}</span>
        <div class="service-thumb-overlay"></div>
        <div class="service-status-badge">${statusBadge(s.status)}</div>
      </div>
      <div class="service-body">
        <div class="service-category">${s.category}</div>
        <div class="service-title">${s.title}</div>
        <div class="service-meta-row">
          <div class="service-price">GH₵ ${s.price}<span class="service-price-unit">${s.unit}</span></div>
          <div class="service-stat"><span class="stars">${stars(s.rating)}</span> <strong>${s.rating || 'N/A'}</strong></div>
        </div>
        <div class="service-stats">
          <div class="service-stat">📦 <strong>${s.bookings}</strong> bookings</div>
          <div class="service-stat">🕐 <strong>${s.lastBooked}</strong></div>
        </div>
        <div class="service-actions">
          <button class="btn btn-outline btn-sm" onclick="openServiceEdit('${s.id}')">✏️ Edit</button>
          <button class="btn btn-outline btn-sm" onclick="toggleServiceStatus('${s.id}')">${s.status === 'active' ? '⏸ Pause' : '▶ Activate'}</button>
          <button class="btn btn-danger btn-sm" onclick="deleteService('${s.id}')">${s.bookings > 0 ? '🗑 Archive' : '🗑 Delete'}</button>
          <button class="btn btn-info btn-sm" onclick="duplicateService('${s.id}')">📋</button>
        </div>
      </div>
      <div class="service-performance">
        <div class="perf-stat"><strong>${s.views}</strong>Views</div>
        <div class="perf-stat"><strong>${s.convRate}</strong>Conv.</div>
        <div class="perf-stat"><strong>GH₵${s.revenue}</strong>Revenue</div>
      </div>
    </div>
  `).join('');
}

function toggleServiceStatus(id) {
  const s = services.find(x => x.id === id);
  if (s) {
    s.status = s.status === 'active' ? 'paused' : 'active';
    renderServices();
    showToast(`Service ${s.status === 'active' ? 'activated' : 'paused'}!`, 'success');
  }
}

function deleteService(id) {
  const s = services.find(x => x.id === id);
  if (!s) return;
  if (s.bookings > 0) { showToast('Service archived (soft delete — active bookings exist).', 'info'); s.status = 'draft'; }
  else { services.splice(services.indexOf(s), 1); }
  renderServices();
}

function duplicateService(id) {
  const s = services.find(x => x.id === id);
  if (!s) return;
  const newS = { ...s, id: 'SV0' + (services.length + 1), title: s.title + ' (Copy)', status: 'draft', bookings: 0, revenue: 0 };
  services.push(newS);
  renderServices();
  showToast('Service duplicated as draft!', 'success');
}

let editServiceId = null;
function openServiceEdit(id) {
  const s = services.find(x => x.id === id);
  if (!s) return;
  editServiceId = id;
  document.getElementById('editServiceTitle').value = s.title;
  document.getElementById('editServicePrice').value = s.price;
  document.getElementById('editServiceDesc').value = s.title + ' — Professional ' + s.category.toLowerCase() + ' services.';
  openModal('serviceModal');
}
function saveServiceEdit() {
  const s = services.find(x => x.id === editServiceId);
  if (s) {
    s.title = document.getElementById('editServiceTitle').value;
    s.price = parseFloat(document.getElementById('editServicePrice').value) || s.price;
    renderServices();
    showToast('Service updated successfully!', 'success');
  }
  closeModal('serviceModal');
}

/* 
   RENDER: EARNINGS
 */
let filteredEarnings = [...earnings];

function renderEarningsTable(data) {
  const tbody = document.getElementById('earningsTableBody');
  document.getElementById('earningsCount').textContent = `Showing ${data.length} records`;
  if (!data.length) { tbody.innerHTML = `<tr><td colspan="8" class="empty-state"><p>No records match your filter.</p></td></tr>`; return; }
  tbody.innerHTML = data.map(e => `
    <tr>
      <td><div class="td-main">${e.job}</div></td>
      <td>${e.customer}</td>
      <td style="text-transform:capitalize">${e.category}</td>
      <td>${e.date}</td>
      <td class="td-amount">GH₵ ${e.gross.toFixed(2)}</td>
      <td class="td-commission">-GH₵ ${e.commission.toFixed(2)}</td>
      <td class="td-amount">GH₵ ${e.net.toFixed(2)}</td>
      <td>${statusBadge(e.status)}</td>
    </tr>
  `).join('');
}

function filterEarnings() {
  const cat = document.getElementById('earningCatFilter').value;
  const pay = document.getElementById('earningPayFilter').value;
  filteredEarnings = earnings.filter(e => {
    if (cat !== 'all' && e.category !== cat) return false;
    if (pay !== 'all' && e.status !== pay) return false;
    return true;
  });
  renderEarningsTable(filteredEarnings);
}

function renderWithdrawalHistory() {
  const el = document.getElementById('withdrawalHistory');
  el.innerHTML = withdrawals.map(w => `
    <div class="withdrawal-history-item">
      <div>
        <div class="wd-amount">GH₵ ${w.amount.toFixed(2)}</div>
        <div class="wd-date">${w.date} · ${w.method}</div>
      </div>
      ${statusBadge(w.status)}
    </div>
  `).join('');
}

function openWithdrawModal() { openModal('withdrawModal'); }
function confirmWithdraw() {
  const amount = parseFloat(document.getElementById('withdrawAmount').value);
  if (!amount || amount < 50) { showToast('Minimum withdrawal is GH₵ 50', 'error'); return; }
  if (amount > 2340) { showToast('Amount exceeds available balance', 'error'); return; }
  withdrawals.unshift({ amount, method: 'MTN MoMo', date: 'Mar 1, 2026', status: 'pending' });
  renderWithdrawalHistory();
  showToast(`Withdrawal request of GH₵ ${amount} submitted!`, 'success');
  closeModal('withdrawModal');
}

/* 
   RENDER: MESSAGES
 */
function renderMessages() {
  const el = document.getElementById('messagesList');
  el.innerHTML = messages.map((m, i) => `
    <div class="msg-item ${i === 0 ? 'active' : ''}" onclick="selectMessage(this)">
      <div class="msg-avatar" style="background:${m.color}">${m.avatar}</div>
      <div class="msg-info">
        <div class="msg-name">${m.name}</div>
        <div class="msg-preview">${m.preview}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
        <div class="msg-time">${m.time}</div>
        ${m.unread ? '<div class="msg-unread"></div>' : ''}
      </div>
    </div>
  `).join('');
}

function selectMessage(el) {
  document.querySelectorAll('.msg-item').forEach(m => m.classList.remove('active'));
  el.classList.add('active');
  el.querySelector('.msg-unread') && el.querySelector('.msg-unread').remove();
}

function renderChat() {
  const el = document.getElementById('chatMessages');
  el.innerHTML = chatHistory.map(m => `
    <div class="chat-bubble ${m.from}">
      ${m.text}
      <div class="bubble-time">${m.time}</div>
    </div>
  `).join('');
  el.scrollTop = el.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  chatHistory.push({ from: 'outgoing', text, time: 'Now' });
  input.value = '';
  renderChat();
}

function handleChatSend(e) { if (e.key === 'Enter') sendMessage(); }

/* 
   RENDER: REVIEWS
 */
function renderReviews() {
  const el = document.getElementById('reviewsList');
  el.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-header">
        <div class="reviewer-info">
          <div class="reviewer-avatar" style="background:${r.color}">${r.avatar}</div>
          <div>
            <div class="reviewer-name">${r.name}</div>
            <div class="reviewer-service">${r.service}</div>
          </div>
        </div>
        <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
      </div>
      <div class="review-text">${r.text}</div>
      <div class="review-date">${r.date}</div>
    </div>
  `).join('');
}

/* 
   SETTINGS
 */
function switchSettingsPanel(panel, el) {
  document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.settings-nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('settings-' + panel).classList.add('active');
  el.classList.add('active');
}

/* 
   INIT
 */
function init() {
  renderRecentBookings();
  renderActiveSummary();
  renderBookingsTable(bookings);
  renderServices();
  renderEarningsTable(earnings);
  renderWithdrawalHistory();
  renderMessages();
  renderChat();
  renderReviews();
  // set today's date defaults
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('bookingDateTo').value = today;
}

init();

/* ═════════════
   dashboard.js — RESPONSIVE PATCH
   Replace your existing toggleSidebar() and closeSidebar()
   with these versions, and add the resize listener at bottom.
   ═════════════ */

/* ── Replaces original toggleSidebar() ── */
function toggleSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sidebarOverlay');
  const isOpen   = sidebar.classList.contains('open');

  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
  // Prevent body scroll when sidebar is open on mobile
  document.body.classList.toggle('sidebar-open', !isOpen);
}

/* ── Replaces original closeSidebar() ── */
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
  document.body.classList.remove('sidebar-open');
}

/* ── Auto-close sidebar when resizing to desktop ── */
window.addEventListener('resize', () => {
  if (window.innerWidth > 1024) {
    closeSidebar();
  }
}, { passive: true });

/* ── Swipe-to-close sidebar on mobile (touch) ──
   Drag left on sidebar → closes it             */
(function () {
  let startX = 0;
  const sidebar = document.getElementById('sidebar');

  sidebar.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  sidebar.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (diff > 60) closeSidebar(); // swiped left 60px
  }, { passive: true });
})();