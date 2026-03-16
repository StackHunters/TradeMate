/* 
       PRICES  (in GH₵)
     */
    const PRICES = { 'Home Cleaning': 80, 'Plumbing': 120, 'Electrician': 100 };

    /* ── Refs ── */
    const dateEl     = document.getElementById('date');
    const timeEl     = document.getElementById('time');
    const durationEl = document.getElementById('duration');
    const locationEl = document.getElementById('location');
    const geoBtn     = document.getElementById('geoBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    const clearBtn   = document.getElementById('clearBtn');
    const coordsInfo = document.getElementById('coordsInfo');

    const sumService  = document.getElementById('sumService');
    const sumDate     = document.getElementById('sumDate');
    const sumTime     = document.getElementById('sumTime');
    const sumDuration = document.getElementById('sumDuration');
    const sumLocation = document.getElementById('sumLocation');
    const sumTotal    = document.getElementById('sumTotal');

    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalBody     = document.getElementById('modalBody');
    const modalCancel   = document.getElementById('modalCancel');
    const modalConfirm  = document.getElementById('modalConfirm');
    const toast         = document.getElementById('toast');
    const Home = document.getElementById('home');
    
    /* ── Date minimum = today ── */
    dateEl.min = new Date().toISOString().slice(0, 10);

    /* 
       SERVICE SELECTION
     */
    function getSelectedService() {
      return document.querySelector('[name="service"]:checked').value;
    }

    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        card.querySelector('input[type="radio"]').checked = true;
        updateSummary();
        validateEnable();
      });
    });

    /* 
       SUMMARY UPDATE
     */
    function updateSummary() {
      const serv = getSelectedService();
      sumService.textContent  = serv;
      sumDate.textContent     = dateEl.value || '—';
      sumTime.textContent     = timeEl.value || '—';
      sumDuration.textContent = durationEl.value + (durationEl.value === '1' ? ' hour' : ' hours');
      sumLocation.textContent = locationEl.value || '—';
      const total = PRICES[serv] * Number(durationEl.value);
      sumTotal.textContent = `GH₵${total}`;
    }

    /* 
       VALIDATION
     */
    function isBusinessHour(t) {
      if (!t) return false;
      const [hh, mm] = t.split(':').map(Number);
      const mins = hh * 60 + mm;
      return mins >= 480 && mins <= 1200; // 08:00 – 20:00
    }

    function formValid() {
      if (!dateEl.value || !timeEl.value || !locationEl.value) return false;
      const dt = new Date(dateEl.value + 'T' + timeEl.value);
      if (isNaN(dt) || dt <= new Date()) return false;
      if (!isBusinessHour(timeEl.value)) return false;
      return true;
    }

    function validateEnable() {
      confirmBtn.disabled = !formValid();
    }

    [dateEl, timeEl, durationEl, locationEl].forEach(el =>
      el.addEventListener('input', () => { updateSummary(); validateEnable(); })
    );

    /* 
       GEO
     */
    geoBtn.addEventListener('click', () => {
      coordsInfo.textContent = 'Locating…';
      if (!navigator.geolocation) {
        coordsInfo.textContent = 'Geolocation not supported.';
        return;
      }
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude: lat, longitude: lng } = pos.coords;
          coordsInfo.textContent = `Coords: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
          if (!locationEl.value)
            locationEl.value = `Lat ${lat.toFixed(5)}, Lon ${lng.toFixed(5)}`;
          updateSummary();
          validateEnable();
        },
        () => { coordsInfo.textContent = 'Could not get location — permission denied.'; },
        { timeout: 10000 }
      );
    });

    /* 
       CLEAR
     */
    clearBtn.addEventListener('click', () => {
      document.querySelector('[name="service"][value="Home Cleaning"]').checked = true;
      document.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
      document.querySelector('[data-service="Home Cleaning"]').classList.add('selected');
      dateEl.value = '';
      timeEl.value = '';
      durationEl.value = '1';
      locationEl.value = '';
      coordsInfo.textContent = '';
      updateSummary();
      validateEnable();
    });

    /* 
       CONFIRM BUTTON → show modal
     */
    confirmBtn.addEventListener('click', () => {
      if (!formValid()) return;
      const serv  = getSelectedService();
      const total = PRICES[serv] * Number(durationEl.value);
      const rows  = [
        ['Service',  serv],
        ['Date',     dateEl.value],
        ['Time',     timeEl.value],
        ['Duration', durationEl.value + ' hour(s)'],
        ['Location', locationEl.value],
        ['Total',    `GH₵${total}`],
      ];
      modalBody.innerHTML = rows.map(([k, v]) => `
        <div class="modal-row">
          <span class="modal-key">${k}</span>
          <span class="modal-val">${v}</span>
        </div>
      `).join('');
      modalBackdrop.style.display = 'flex';
      modalConfirm.focus();
    });

    /* ── Modal dismiss ── */
    modalCancel.addEventListener('click', () => { modalBackdrop.style.display = 'none'; });
    modalBackdrop.addEventListener('click', e => {
      if (e.target === modalBackdrop) modalBackdrop.style.display = 'none';
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') modalBackdrop.style.display = 'none';
    });

    /* ── Modal confirm → save ── */
    modalConfirm.addEventListener('click', () => {
      const booking = {
        service:   getSelectedService(),
        date:      dateEl.value,
        time:      timeEl.value,
        duration:  durationEl.value,
        location:  locationEl.value,
        createdAt: new Date().toISOString(),
      };
      const all = JSON.parse(localStorage.getItem('bookings') || '[]');
      all.push(booking);
      localStorage.setItem('bookings', JSON.stringify(all));
      modalBackdrop.style.display = 'none';
      showToast('✅ Booking confirmed! View it in My Bookings.');
      clearBtn.click();
      setTimeout(updateBookingsList, 200);
    });

    /* 
       TOAST
     */
    function showToast(msg) {
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3800);
    }

    /* 
       BOOKINGS LIST
     */
    function updateBookingsList() {
      const listRoot = document.getElementById('bookingsList');
      if (!listRoot) return;
      const all = JSON.parse(localStorage.getItem('bookings') || '[]');
      listRoot.innerHTML = '';

      if (!all.length) {
        listRoot.innerHTML = `
          <div class="empty-state">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>
            <p>No bookings yet. Book your first service!</p>
          </div>`;
        return;
      }

      [...all].reverse().forEach((b, idx) => {
        const realIdx = all.length - 1 - idx;
        const el = document.createElement('div');
        el.className = 'booking-item';
        el.innerHTML = `
          <div class="booking-item-left">
            <div class="booking-item-title">${b.service} — ${b.date} at ${b.time} (${b.duration}h)</div>
            <div class="booking-item-meta">${b.location}</div>
          </div>
          <div class="booking-item-right">
            <div class="booking-item-date">${new Date(b.createdAt).toLocaleString()}</div>
            <button class="btn btn-secondary" style="margin-top:8px;padding:6px 12px;font-size:12px;" data-index="${realIdx}">Delete</button>
          </div>`;
        el.querySelector('button').addEventListener('click', () => {
          const arr = JSON.parse(localStorage.getItem('bookings') || '[]');
          arr.splice(Number(el.querySelector('button').dataset.index), 1);
          localStorage.setItem('bookings', JSON.stringify(arr));
          updateBookingsList();
          showToast('Booking deleted.');
        });
        listRoot.appendChild(el);
      });
    }

    /* 
       NAVIGATION
     */
    const navBtns      = document.querySelectorAll('.nav-btn');
    const bookingCard  = document.getElementById('bookingCard');
    const bookingsPanel = document.getElementById('bookingsPanel');
    const contactPanel  = document.getElementById('contactPanel');
    const pageTitle     = document.getElementById('pageTitle');

    const pageTitles = {
      services:     { h: 'Book a <em>Service</em>',   lead: 'Choose a service, pick a date &amp; time, enter your location, and confirm your booking.' },
      book:         { h: 'Book a <em>Service</em>',   lead: 'Choose a service, pick a date &amp; time, enter your location, and confirm your booking.' },
      'my-bookings':{ h: 'My <em>Bookings</em>',      lead: 'All your saved bookings, stored locally in your browser.' },
      contact:      { h: 'Contact <em>Us</em>',        lead: 'Questions? Send us a message and we\'ll get back within 24 hours.' },
    };

    function showPage(page) {
      /* nav highlight */
      navBtns.forEach(b => b.classList.toggle('active', b.dataset.page === page));

      /* update page title */
      const t = pageTitles[page] || pageTitles.services;
      pageTitle.querySelector('h1').innerHTML = t.h;
      pageTitle.querySelector('.lead').innerHTML = t.lead;

      /* panel visibility */
      const isBookPage = page === 'services' || page === 'book';
      bookingCard.style.display   = isBookPage     ? 'grid'  : 'none';
      bookingsPanel.style.display = page === 'my-bookings' ? 'block' : 'none';
      contactPanel.style.display  = page === 'contact'     ? 'block' : 'none';

      if (page === 'my-bookings') updateBookingsList();
      if (page === 'book') setTimeout(() => dateEl.focus(), 60);

      /* close mobile nav */
      siteNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navBtns.forEach(btn =>
      btn.addEventListener('click', () => showPage(btn.dataset.page))
    );

    /* ── Hamburger ── */
    const hamburger = document.getElementById('hamburger');
    const siteNav   = document.getElementById('siteNav');

    hamburger.addEventListener('click', () => {
      const open = siteNav.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });

    document.addEventListener('click', e => {
      if (!e.target.closest('#siteHeader')) {
        siteNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && siteNav.classList.contains('open')) {
        siteNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    });

    /* ── Contact send ── */
    document.getElementById('contactSend').addEventListener('click', () => {
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const msg   = document.getElementById('contactMessage').value.trim();
      if (!name || !email || !msg) { showToast('Please complete all fields.'); return; }
      showToast('✉️ Message sent — we\'ll respond soon!');
      document.getElementById('contactForm').reset();
    });

    /* ── Init ── */
    updateSummary();
    validateEnable();
    showPage('services');