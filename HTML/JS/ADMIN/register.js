/* ─────────────────────────────────────────
   STATE
───────────────────────────────────────── */
let currentRole   = 'user';
let termsAccepted = false;
let formData      = {};
let resendInterval;

/* ─────────────────────────────────────────
   ROLE TOGGLE
───────────────────────────────────────── */
function setRole(role) {
  currentRole = role;
  const toggle      = document.getElementById('roleToggle');
  const userBtn     = document.getElementById('userBtn');
  const providerBtn = document.getElementById('providerBtn');
  const provFields  = document.getElementById('providerFields');
  const userFields  = document.getElementById('userFields');
  const title       = document.getElementById('cardTitle');
  const sub         = document.getElementById('cardSub');
  const btnText     = document.getElementById('btnText');

  if (role === 'provider') {
    toggle.classList.add('provider-active');
    userBtn.classList.remove('active');
    providerBtn.classList.add('active');
    provFields.classList.add('visible');
    userFields.style.display = 'none';
    title.textContent   = 'Become a Provider';
    sub.textContent     = 'Start earning on Trade Mate today';
    btnText.textContent = 'Create Provider Account';
  } else {
    toggle.classList.remove('provider-active');
    userBtn.classList.add('active');
    providerBtn.classList.remove('active');
    provFields.classList.remove('visible');
    userFields.style.display = 'block';
    title.textContent   = 'Create your account';
    sub.textContent     = 'Join thousands using Trade Mate every day';
    btnText.textContent = 'Create Account';
  }
}

/* ─────────────────────────────────────────
   PASSWORD STRENGTH
───────────────────────────────────────── */
function onPasswordInput() {
  const val  = document.getElementById('password').value;
  const bars = document.getElementById('pwStrength');
  const reqs = document.getElementById('pwReqs');

  if (val.length === 0) {
    bars.style.display = 'none';
    reqs.style.display = 'none';
    clearFieldState('password');
    return;
  }
  bars.style.display = 'block';
  reqs.style.display = 'grid';

  const hasLen   = val.length >= 8;
  const hasUpper = /[A-Z]/.test(val);
  const hasLower = /[a-z]/.test(val);
  const hasNum   = /[0-9]/.test(val);

  setReq('req-len',   hasLen);
  setReq('req-upper', hasUpper);
  setReq('req-lower', hasLower);
  setReq('req-num',   hasNum);

  const score = [hasLen, hasUpper, hasLower, hasNum].filter(Boolean).length;
  const b1 = document.getElementById('bar1');
  const b2 = document.getElementById('bar2');
  const b3 = document.getElementById('bar3');
  const b4 = document.getElementById('bar4');
  const lbl = document.getElementById('pwLabel');

  [b1, b2, b3, b4].forEach(b => { b.className = 'pw-bar'; });

  if (score <= 1) {
    [b1].forEach(b => b.classList.add('filled-weak'));
    lbl.className = 'pw-label weak';
    lbl.textContent = 'Weak';
  } else if (score === 2) {
    [b1, b2].forEach(b => b.classList.add('filled-medium'));
    lbl.className = 'pw-label medium';
    lbl.textContent = 'Fair';
  } else if (score === 3) {
    [b1, b2, b3].forEach(b => b.classList.add('filled-medium'));
    lbl.className = 'pw-label medium';
    lbl.textContent = 'Good';
  } else {
    [b1, b2, b3, b4].forEach(b => b.classList.add('filled-strong'));
    lbl.className = 'pw-label strong';
    lbl.textContent = 'Strong ✓';
  }

  if (!hasLen || !hasUpper || !hasLower || !hasNum) {
    setFieldError('password', 'Password does not meet all requirements');
  } else {
    clearFieldError('password');
    setFieldValid('password');
  }

  if (document.getElementById('confirmPw').value) validateField('confirmPw');
}

function setReq(id, met) {
  const el = document.getElementById(id);
  el.classList.toggle('met', met);
  const checkSVG = `<svg class="req-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>`;
  const infoSVG  = `<svg class="req-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
  el.innerHTML   = (met ? checkSVG : infoSVG) + el.innerHTML.replace(/<svg[^>]*>.*?<\/svg>/s, '').trim();
}

/* ─────────────────────────────────────────
   FIELD VALIDATION
───────────────────────────────────────── */
const VALIDATORS = {
  fullName(v)          { return v.trim().length >= 2 ? null : 'Please enter your full name (min 2 characters)'; },
  email(v)             { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : 'Please enter a valid email address'; },
  phone(v)             { const c = v.replace(/\s/g, ''); return /^\d{9,10}$/.test(c) ? null : 'Enter a valid 9–10 digit Ghana phone number'; },
  password(v)          {
    if (v.length < 8)     return 'Min 8 characters required';
    if (!/[A-Z]/.test(v)) return 'At least one uppercase letter required';
    if (!/[a-z]/.test(v)) return 'At least one lowercase letter required';
    if (!/[0-9]/.test(v)) return 'At least one number required';
    return null;
  },
  confirmPw(v)         {
    const pw = document.getElementById('password').value;
    if (!v)      return 'Please confirm your password';
    if (v !== pw) return 'Passwords do not match';
    return null;
  },
  serviceCategory(v)   { return currentRole === 'user' && !v ? 'Please select a service category' : null; },
  providerCategory(v)  { return currentRole === 'provider' && !v ? 'Please select your primary category' : null; },
  serviceArea(v)       { return currentRole === 'provider' && !v.trim() ? 'Please enter your service area' : null; },
};

function validateField(fieldId) {
  const el  = document.getElementById(fieldId);
  if (!el) return true;
  const fn  = VALIDATORS[fieldId];
  if (!fn) return true;
  const err = fn(el.value);
  if (err) { setFieldError(fieldId, err); return false; }
  clearFieldError(fieldId);
  setFieldValid(fieldId);
  return true;
}

function setFieldError(id, msg) {
  const el  = document.getElementById(id);
  const err = document.getElementById(id + '-err');
  if (el)  { el.classList.add('invalid'); el.classList.remove('valid'); }
  if (err) err.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>${msg}`;
}

function clearFieldError(id) {
  const err = document.getElementById(id + '-err');
  if (err) err.innerHTML = '';
}

function setFieldValid(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('invalid'); el.classList.add('valid'); }
}

function clearFieldState(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('invalid', 'valid');
}

/* ─────────────────────────────────────────
   EMAIL / PHONE — live format validation only
   (uniqueness is enforced server-side)
───────────────────────────────────────── */
function asyncEmailCheck() {
  const el  = document.getElementById('email');
  const err = VALIDATORS.email(el.value.trim());
  if (err) { setFieldError('email', err); return; }
  clearFieldError('email');
  setFieldValid('email');
}

function asyncPhoneCheck() {
  const el  = document.getElementById('phone');
  const err = VALIDATORS.phone(el.value);
  if (err) { setFieldError('phone', err); return; }
  clearFieldError('phone');
  setFieldValid('phone');
}

/* ─────────────────────────────────────────
   TERMS
───────────────────────────────────────── */
function toggleTerms() {
  termsAccepted = !termsAccepted;
  document.getElementById('termsBox').classList.toggle('checked', termsAccepted);
  if (termsAccepted) clearFieldError('terms');
}

/* ─────────────────────────────────────────
   EYE TOGGLE
───────────────────────────────────────── */
function toggleEye(inputId, iconId) {
  const input  = document.getElementById(inputId);
  const icon   = document.getElementById(iconId);
  const isPass = input.type === 'password';
  input.type   = isPass ? 'text' : 'password';
  icon.innerHTML = isPass
    ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`
    : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
}

/* ─────────────────────────────────────────
   FORM SUBMISSION
───────────────────────────────────────── */
async function handleSubmit(e) {
  e.preventDefault();

  /* ── Client-side field validation ── */
  const fields = ['fullName', 'email', 'phone', 'password', 'confirmPw'];
  if (currentRole === 'user')     fields.push('serviceCategory');
  if (currentRole === 'provider') fields.push('providerCategory', 'serviceArea');

  let allValid = true;
  fields.forEach(f => { if (!validateField(f)) allValid = false; });

  if (!termsAccepted) {
    setFieldError('terms', 'You must accept the Terms & Privacy Policy');
    allValid = false;
  }

  if (!allValid) {
    showToast('error', 'Fix the errors', 'Please correct the highlighted fields.');
    return;
  }

  /* ── Collect payload ── */
  formData = {
    role:     currentRole,
    fullName: document.getElementById('fullName').value.trim(),
    email:    document.getElementById('email').value.trim().toLowerCase(),
    phone:    '+233' + document.getElementById('phone').value.replace(/\s/g, ''),
    password: document.getElementById('password').value,
    category: currentRole === 'user'
      ? document.getElementById('serviceCategory').value
      : document.getElementById('providerCategory').value,
    ...(currentRole === 'provider' && {
      serviceArea:  document.getElementById('serviceArea').value.trim(),
      experience:   document.getElementById('experience')?.value || '',
      businessName: document.getElementById('businessName')?.value.trim() || '',
    }),
  };

  /* ── Loading state ── */
  const btn = document.getElementById('submitBtn');
  btn.classList.add('loading');
  btn.disabled = true;

  try {
    /*
    ════════════════════════════════════════════
    PRODUCTION — replace the block below with:

    const res = await fetch('/api/auth/register', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(formData),
    });
    const data = await res.json();

    if (!res.ok) {
      // Server returns { field: 'email', message: 'Already registered' }
      if (data.field) setFieldError(data.field, data.message);
      throw new Error(data.message || 'Registration failed');
    }
    ════════════════════════════════════════════
    */

    /* Simulated network request */
    await sleep(1500);

    /* ── OTP step ── */
    btn.classList.remove('loading');
    btn.disabled = false;
    openOTP();

  } catch (err) {
    btn.classList.remove('loading');
    btn.disabled = false;
    showToast('error', 'Registration failed', err.message || 'Something went wrong. Please try again.');
  }
}

/* ─────────────────────────────────────────
   OTP SYSTEM
───────────────────────────────────────── */
function openOTP() {
  document.getElementById('otpTarget').textContent = formData.phone;
  document.getElementById('otpOverlay').classList.add('open');
  document.getElementById('otpErr').textContent = '';

  for (let i = 0; i < 6; i++) {
    const el = document.getElementById('otp' + i);
    el.value = '';
    el.classList.remove('filled');
    el.style.borderColor = '';
  }
  document.getElementById('otpVerifyBtn').disabled = true;
  document.getElementById('otp0').focus();
  startResendTimer();
  showToast('success', 'Code sent!', `OTP sent to ${formData.phone}`);
}

function otpInput(idx) {
  const el = document.getElementById('otp' + idx);
  const v  = el.value.replace(/\D/g, '');
  el.value = v.slice(-1);
  el.classList.toggle('filled', !!el.value);

  if (el.value && idx < 5) document.getElementById('otp' + (idx + 1)).focus();

  const code = Array.from({ length: 6 }, (_, i) => document.getElementById('otp' + i).value).join('');
  document.getElementById('otpVerifyBtn').disabled = code.length < 6;
  document.getElementById('otpErr').textContent = '';
}

function otpKey(e, idx) {
  if (e.key === 'Backspace' && !document.getElementById('otp' + idx).value && idx > 0) {
    document.getElementById('otp' + (idx - 1)).focus();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('otpOverlay');
  if (!overlay) return;
  overlay.addEventListener('paste', e => {
    const text = (e.clipboardData || window.clipboardData)
      .getData('text').replace(/\D/g, '').slice(0, 6);
    if (text.length > 0) {
      for (let i = 0; i < 6; i++) {
        const el = document.getElementById('otp' + i);
        el.value = text[i] || '';
        el.classList.toggle('filled', !!el.value);
      }
      document.getElementById('otp' + Math.min(text.length, 5)).focus();
      document.getElementById('otpVerifyBtn').disabled = text.length < 6;
      e.preventDefault();
    }
  });
});

async function verifyOTP() {
  const code = Array.from({ length: 6 }, (_, i) => document.getElementById('otp' + i).value).join('');
  const btn  = document.getElementById('otpVerifyBtn');
  btn.disabled    = true;
  btn.textContent = 'Verifying…';

  try {
    /*
    ════════════════════════════════════════════
    PRODUCTION — replace simulation with:

    const res = await fetch('/api/auth/verify-otp', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ phone: formData.phone, otp: code }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Invalid OTP');
    ════════════════════════════════════════════
    */

    await sleep(900);

    /* Simulated OTP acceptance — remove hardcoded check in production */
    const isValid = code.length === 6; /* accept any 6-digit code in demo */

    if (!isValid) throw new Error('Incorrect code. Please try again.');

    /* ── Verified ── */
    formData.isVerified = true;
    document.getElementById('otpOverlay').classList.remove('open');
    showSuccess();

  } catch (err) {
    document.getElementById('otpErr').textContent = err.message;
    btn.disabled    = false;
    btn.textContent = 'Verify & Continue →';

    for (let i = 0; i < 6; i++) {
      const el = document.getElementById('otp' + i);
      el.style.borderColor = 'rgba(239,68,68,.6)';
      setTimeout(() => { el.style.borderColor = ''; }, 1200);
    }
  }
}

function startResendTimer() {
  clearInterval(resendInterval);
  let t = 30;
  const btn  = document.getElementById('resendBtn');
  const span = document.getElementById('resendTimer');
  btn.disabled     = true;
  span.textContent = t;

  resendInterval = setInterval(() => {
    t--;
    span.textContent = t;
    if (t <= 0) {
      clearInterval(resendInterval);
      btn.disabled    = false;
      btn.textContent = 'Resend code';
    }
  }, 1000);
}

function resendOTP() {
  showToast('info', 'Code resent', `New OTP sent to ${formData.phone}`);
  startResendTimer();
  document.getElementById('otpErr').textContent = '';
}

/* ─────────────────────────────────────────
   SUCCESS — toast then redirect
───────────────────────────────────────── */
function showSuccess() {
  const isProvider  = currentRole === 'provider';
  const redirectUrl = isProvider
    ? '/HTML/SERVICES/dashboard.html'
    : '/HTML/CLIENT/user-dashboard.html';
  const destination = isProvider ? 'Provider Dashboard' : 'User Dashboard';

  /* Update success overlay if it exists in the HTML */
  const titleEl = document.getElementById('successTitle');
  const subEl   = document.getElementById('successSub');
  if (titleEl) titleEl.textContent = isProvider ? 'Welcome aboard, provider! 🎉' : 'Welcome to Trade Mate! 🎉';
  if (subEl)   subEl.textContent   = isProvider
    ? 'Your provider account is live. Setting up your profile now.'
    : 'Your account is verified and ready. Discover local services near you.';
  document.getElementById('successOverlay')?.classList.add('open');

  /* Toast confirming account creation */
  showToast(
    'success',
    'Account created! 🎉',
    `Welcome, ${formData.fullName}! Redirecting you to your ${destination}…`
  );

  /* Redirect after toast is visible */
  setTimeout(() => {
    window.location.href = redirectUrl;
  }, 2500);
}

/* ─────────────────────────────────────────
   TOAST
───────────────────────────────────────── */
function showToast(type, title, msg) {
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
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
    <button class="toast-x" onclick="this.closest('.toast').remove()">✕</button>`;

  stack.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 350); }, 5000);
}

/* ─────────────────────────────────────────
   UTIL
───────────────────────────────────────── */
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }