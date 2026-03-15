// Mobile nav
  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');
  hamburger.addEventListener('click', () => navbar.classList.toggle('nav-mobile-open'));

  // Filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // Pagination
  document.querySelectorAll('.page-btn:not(.arrow)').forEach(btn => {
    if (btn.textContent === '…') return;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.page-btn:not(.arrow)').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Modal
  const overlay = document.getElementById('modalOverlay');
  document.getElementById('openModal').addEventListener('click', () => overlay.classList.add('open'));
  document.getElementById('closeModal').addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });

  // Star picker
  let selectedRating = 0;
  document.querySelectorAll('.star-pick').forEach(star => {
    star.addEventListener('mouseover', () => {
      const val = +star.dataset.val;
      document.querySelectorAll('.star-pick').forEach((s, i) => {
        s.style.color = i < val ? 'var(--star)' : 'rgba(255,255,255,0.15)';
      });
    });
    star.addEventListener('mouseleave', () => {
      document.querySelectorAll('.star-pick').forEach((s, i) => {
        s.style.color = i < selectedRating ? 'var(--star)' : 'rgba(255,255,255,0.15)';
      });
    });
    star.addEventListener('click', () => {
      selectedRating = +star.dataset.val;
      document.querySelectorAll('.star-pick').forEach((s, i) => {
        s.classList.toggle('selected', i < selectedRating);
        s.style.color = i < selectedRating ? 'var(--star)' : 'rgba(255,255,255,0.15)';
      });
    });
  });

  // Helpful button
  function toggleHelpful(btn) {
    const isLiked = btn.classList.toggle('liked');
    const countEl = btn.querySelector('.count');
    countEl.textContent = isLiked ? +countEl.textContent + 1 : +countEl.textContent - 1;
  }

  // Read more
  function toggleRead(id, btn) {
    const body = document.getElementById(id);
    const collapsed = body.classList.toggle('collapsed');
    btn.textContent = collapsed ? 'Read more' : 'Read less';
  }

  // Animate bars on load
  window.addEventListener('load', () => {
    document.querySelectorAll('.bar-fill').forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0%';
      requestAnimationFrame(() => setTimeout(() => bar.style.width = w, 100));
    });
  });

  // Submit button feedback
  document.querySelector('.submit-btn').addEventListener('click', function() {
    this.textContent = '✓ Review Submitted!';
    this.style.background = 'linear-gradient(135deg, #43e97b, #38f9d7)';
    setTimeout(() => {
      overlay.classList.remove('open');
      this.textContent = 'Submit Review';
      this.style.background = '';
      selectedRating = 0;
      document.querySelectorAll('.star-pick').forEach(s => { s.classList.remove('selected'); s.style.color = ''; });
    }, 1600);
  });