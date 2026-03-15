/* ── Set min date to today ── */
const today = new Date().toISOString().split('T')[0];
document.getElementById('bookDate').min = today;
document.getElementById('bookDate').value = today;

/* ── Scroll reveal ── */
const revEls = document.querySelectorAll('.reveal, .reveal-left');
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('visible'); revObs.unobserve(e.target); }
  });
}, { threshold: 0.08 });
revEls.forEach(el => revObs.observe(el));

/* ── Navbar scroll ── */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 50
    ? 'rgba(13,17,23,.98)' : 'rgba(13,17,23,.92)';
});

/* ── Pricing card click (left col) ── */
function selectPackage(el, id, price) {
  document.querySelectorAll('.price-card').forEach(c => c.style.borderColor = '');
  el.style.borderColor = 'rgba(102,126,234,.5)';
  // Sync booking card
  const periods = { basic:'/ session', standard:'/ week', premium:'/ month' };
  document.getElementById('selectedPrice').textContent = '₵' + price;
  document.getElementById('selectedPeriod').textContent = periods[id];
  document.querySelector('.mobile-book-amount').textContent = '₵' + price;
  // Sync service option
  const options = document.querySelectorAll('.service-option');
  options.forEach((o,i) => {
    o.classList.toggle('selected', i === ['basic','standard','premium'].indexOf(id));
  });
}

/* ── Service selector (booking card) ── */
function selectService(el, name, price, period) {
  document.querySelectorAll('.service-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('selectedPrice').textContent = price;
  document.getElementById('selectedPeriod').textContent = period;
  document.querySelector('.mobile-book-amount').textContent = price;
}

/* ── Filter reviews ── */
function filterReviews(btn, filter) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.review-item').forEach(item => {
    const show = filter === 'all' || item.dataset.stars === filter;
    item.style.display = show ? '' : 'none';
    item.style.opacity = show ? '1' : '0';
  });
}

/* ── Pagination ── */
function changePage(btn) {
  document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // In production: fetch page from API
  document.getElementById('reviewsList').style.opacity = '0.5';
  setTimeout(() => { document.getElementById('reviewsList').style.opacity = '1'; }, 400);
}

/* ── Scroll to booking card ── */
function scrollToBook() {
  const el = document.getElementById('bookingCard');
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => {
    document.querySelector('.booking-card').style.boxShadow = '0 0 0 2px rgba(102,126,234,.6), 0 8px 40px rgba(0,0,0,.3)';
    setTimeout(() => { document.querySelector('.booking-card').style.boxShadow = ''; }, 1800);
  }, 600);
}

/* ── Share profile ── */
function shareProfile() {
  if(navigator.share) {
    navigator.share({
      title: 'Kwame Asante — Private Tutor | TradeMate',
      text: 'Check out this highly rated tutor on TradeMate',
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(window.location.href).then(() => {
      const btn = document.querySelector('.nav-share-btn');
      const orig = btn.innerHTML;
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
      btn.style.color = 'var(--success)';
      setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
    });
  }
}

/* ── Handle booking ── */
function handleBooking() {
  const date = document.getElementById('bookDate').value;
  const time = document.getElementById('bookTime').value;
  const msg  = document.getElementById('bookMessage').value;
  const price = document.getElementById('selectedPrice').textContent;

  if(!date) {
    document.getElementById('bookDate').style.borderColor = 'rgba(239,68,68,.5)';
    setTimeout(() => { document.getElementById('bookDate').style.borderColor = ''; }, 2000);
    return;
  }

  // In production: POST /api/bookings with { providerId, date, time, message, package }
  const btn = document.querySelector('.book-btn');
  const orig = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:17px;height:17px;animation:spin .8s linear infinite"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> Booking…';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = '✓ Booking Confirmed!';
    btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      // window.location.href = `/book/kwame-asante?date=${date}&time=${time}`;
    }, 3000);
  }, 1800);
}

/* ── Handle contact ── */
function handleContact() {
  const btn = document.querySelector('.contact-btn');
  btn.textContent = '✓ Message sent!';
  btn.style.color = 'var(--success)';
  btn.style.borderColor = 'rgba(34,197,94,.4)';
  setTimeout(() => {
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Message Kwame';
    btn.style.color = '';
    btn.style.borderColor = '';
  }, 2500);
}

/* Spin animation for loader */
const style = document.createElement('style');
style.textContent = '@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}';
document.head.appendChild(style);