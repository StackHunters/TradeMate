/* 
   STATE
 */
let currentRole    = 'user';
let identifierMode = 'email'; // 'email' | 'phone'
let rememberMe     = false;
let loginAttempts  = 0;
const MAX_ATTEMPTS = 5;
let lockUntil      = null;
let forgotStep     = 1;
let resetResendTimer;

/* 
   ROLE TOGGLE
 */
function setRole(role) {
  currentRole = role;
  const wrap   = document.getElementById('roleWrap');

  document.getElementById('userRoleBtn').classList.toggle('active', role === 'user');
  document.getElementById('provRoleBtn').classList.toggle('active', role === 'provider');
  wrap.classList.toggle('provider', role === 'provider');

  const title  = document.getElementById('formTitle');
  const sub    = document.getElementById('formSub');
  const btnLbl = document.getElementById('btnLabel');

  if (role === 'provider') {
    title.textContent  = 'Provider sign in';
    sub.textContent    = 'Access your provider dashboard';
    btnLbl.textContent = 'Sign In as Provider';
  } else {
    title.textContent  = 'Welcome back';
    sub.textContent    = 'Sign in to continue to your dashboard';
    btnLbl.textContent = 'Sign In';
  }

  hideBanners();
}

/* 
   IDENTIFIER MODE (email / phone)
 */
function setIdentifier(mode) {
  identifierMode = mode;
  const input  = document.getElementById('identifier');
  const prefix = document.getElementById('phonePrefix');
  const lbl    = document.getElementById('identifierLabel');

  document.getElementById('emailToggle').classList.toggle('active', mode === 'email');
  document.getElementById('phoneToggle').classList.toggle('active', mode === 'phone');

  if (mode === 'phone') {
    input.type = 'tel';
    input.placeholder = '24 456 7890';
    input.setAttribute('autocomplete', 'tel');
    input.setAttribute('maxlength', '12');
    input.classList.add('phone-mode');
    prefix.classList.add('show');
    lbl.textContent = 'Phone Number';
  } else {
    input.type = 'email';
    input.placeholder = 'you@example.com';
    input.setAttribute('autocomplete', 'username');
    input.removeAttribute('maxlength');
    input.classList.remove('phone-mode');
    prefix.classList.remove('show');
    lbl.textContent = 'Email Address';
  }

  input.value = '';
  clearFieldErr('identifierErr');
  input.classList.remove('valid', 'invalid');
}

/* 
   VALIDATION
 */
function validateIdentifier() {
  const val   = document.getElementById('identifier').value.trim();
  const input = document.getElementById('identifier');

  if (!val) {
    showFieldErr('identifierErr', `${identifierMode === 'email' ? 'Email' : 'Phone number'} is required`);
    input.classList.add('invalid'); input.classList.remove('valid');
    return false;
  }
  if (identifierMode === 'email') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      showFieldErr('identifierErr', 'Please enter a valid email address');
      input.classList.add('invalid'); input.classList.remove('valid');
      return false;
    }
  } else {
    if (!/^\d{9,10}$/.test(val.replace(/\s/g, ''))) {
      showFieldErr('identifierErr', 'Enter a valid 9–10 digit phone number');
      input.classList.add('invalid'); input.classList.remove('valid');
      return false;
    }
  }

  clearFieldErr('identifierErr');
  input.classList.remove('invalid'); input.classList.add('valid');
  return true;
}

function validatePassword() {
  const val   = document.getElementById('password').value;
  const input = document.getElementById('password');

  if (!val) {
    showFieldErr('passwordErr', 'Password is required');
    input.classList.add('invalid');
    return false;
  }
  if (val.length < 8) {
    showFieldErr('passwordErr', 'Password must be at least 8 characters');
    input.classList.add('invalid');
    return false;
  }

  clearFieldErr('passwordErr');
  input.classList.remove('invalid');
  return true;
}

function showFieldErr(id, msg) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>${msg}`;
}

function clearFieldErr(id) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = '';
}

/* 
   EYE TOGGLE
 */
function toggleEye(inputId, iconId) {
  const input  = document.getElementById(inputId);
  const icon   = document.getElementById(iconId);
  const isPass = input.type === 'password';
  input.type   = isPass ? 'text' : 'password';
  icon.innerHTML = isPass
    ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`
    : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
}

/* 
   REMEMBER ME
 */
function toggleRemember() {
  rememberMe = !rememberMe;
  document.getElementById('rememberCheck').classList.toggle('on', rememberMe);
}

/* 
   RATE LIMITING
 */
function isLocked() {
  if (!lockUntil) return false;
  if (Date.now() < lockUntil) return true;
  lockUntil = null;
  loginAttempts = 0;
  hideBanners();
  return false;
}

function triggerLock(seconds) {
  lockUntil = Date.now() + seconds * 1000;
  const banner  = document.getElementById('rateBanner');
  const timerEl = document.getElementById('rateTimer');
  banner.classList.add('show');
  document.getElementById('submitBtn').disabled = true;

  const tick = setInterval(() => {
    const rem = Math.ceil((lockUntil - Date.now()) / 1000);
    if (rem <= 0) {
      clearInterval(tick);
      lockUntil = null;
      loginAttempts = 0;
      banner.classList.remove('show');
      document.getElementById('submitBtn').disabled = false;
      return;
    }
    timerEl.textContent = rem;
  }, 500);
}

function hideBanners() {
  document.getElementById('rateBanner')?.classList.remove('show');
  document.getElementById('verifyBanner')?.classList.remove('show');
}

/* 
   LOGIN HANDLER
 */
async function handleLogin(e) {
  e.preventDefault();

  if (isLocked()) {
    showToast('error', 'Account locked', 'Too many failed attempts. Please wait.');
    return;
  }

  const idValid = validateIdentifier();
  const pwValid = validatePassword();
  if (!idValid || !pwValid) return;

  const identifierRaw = document.getElementById('identifier').value.trim();
  const passwordVal   = document.getElementById('password').value;

  const identifier = identifierMode === 'phone'
    ? identifierRaw.replace(/\s/g, '')
    : identifierRaw.toLowerCase();

  /* ── Loading state ── */
  const btn = document.getElementById('submitBtn');
  btn.classList.add('loading');
  btn.disabled = true;

  try {
    /*
  
    PRODUCTION — replace await sleep() below with a real call:

    const res = await fetch('/api/auth/login', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier,
        identifierType : identifierMode,   // 'email' | 'phone'
        password       : passwordVal,
        role           : currentRole,
        rememberMe,
      }),
    });
    const data = await res.json();

    Expected server responses:
      200  →  { user: { name, role }, token }
      401  →  { code: 'INVALID_CREDENTIALS' }
      401  →  { code: 'UNVERIFIED' }
      429  →  { code: 'RATE_LIMITED', retryAfter: 30 }

    if (!res.ok) throw { code: data.code, retryAfter: data.retryAfter };

    Persist token:
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('tm_token', data.token);
    storage.setItem('tm_role',  data.user.role);

    handleLoginSuccess(data.user);
  
    */

    await sleep(1300); // ← remove in production

    /* Demo: use the role the user selected to drive the redirect.
       Remove simulatedUser when your API is connected.           */
    const simulatedUser = { name: '', role: currentRole };
    handleLoginSuccess(simulatedUser);

  } catch (err) {
    btn.classList.remove('loading');
    btn.disabled = false;

    if (err.code === 'UNVERIFIED') {
      document.getElementById('verifyBanner')?.classList.add('show');
      showToast('warning', 'Verification required', 'Check your email or phone for a verification link.');
      return;
    }
    if (err.code === 'RATE_LIMITED') {
      triggerLock(err.retryAfter || 30);
      showToast('error', 'Account temporarily locked', `Too many attempts. Wait ${err.retryAfter || 30}s.`);
      return;
    }

    /* INVALID_CREDENTIALS or any unexpected server error */
    loginAttempts++;
    handleFailedAttempt();
    showGenericError();
  }
}

/* 
   LOGIN SUCCESS — toast + redirect
 */
function handleLoginSuccess(user) {
  loginAttempts = 0;

  const isProvider  = user.role === 'provider';
  const redirectUrl = isProvider
    ? '/HTML/SERVICES/dashboard.html'
    : '/HTML/CLIENT/user-dashboard.html';
  const destination = isProvider ? 'Provider Dashboard' : 'User Dashboard';

  showToast(
    'success',
    'Signed in successfully! 🎉',
    `Welcome back${user.name ? ', ' + user.name : ''}! Redirecting to your ${destination}…`
  );

  setTimeout(() => {
    window.location.href = redirectUrl;
  }, 2000);
}

/* 
   FAILED ATTEMPTS
 */
function showGenericError() {
  /* Generic message — never reveal whether email/phone exists or if it's a role mismatch */
  showFieldErr('identifierErr', 'Invalid credentials. Please check and try again.');
  document.getElementById('identifier').classList.add('invalid');
  document.getElementById('password').classList.add('invalid');
}

function handleFailedAttempt() {
  if (loginAttempts >= MAX_ATTEMPTS) {
    triggerLock(30); /* Production: use exponential back-off */
    showToast('error', 'Account temporarily locked', `${MAX_ATTEMPTS} failed attempts. Please wait 30 seconds.`);
  } else {
    const rem = MAX_ATTEMPTS - loginAttempts;
    showToast('warning', 'Login failed', `Invalid credentials. ${rem} attempt${rem !== 1 ? 's' : ''} remaining.`);
  }
}

/* 
   FORGOT PASSWORD FLOW
 */
function openForgot() {
  goStep(1);
  document.getElementById('resetId').value = '';
  clearFieldErr('resetIdErr');
  document.getElementById('forgotOverlay').classList.add('open');
}

function closeForgot() {
  document.getElementById('forgotOverlay').classList.remove('open');
  clearInterval(resetResendTimer);
}

function handleModalOverlayClick(e) {
  if (e.target.id === 'forgotOverlay') closeForgot();
}

function goStep(n) {
  document.querySelectorAll('.modal-step').forEach((s, i) => {
    s.classList.toggle('active', i + 1 === n);
  });
  forgotStep = n;
}

async function sendResetCode() {
  const val = document.getElementById('resetId').value.trim();
  if (!val) { showFieldErr('resetIdErr', 'Please enter your email or phone number'); return; }

  const isEmail = val.includes('@');
  const isPhone = /^\d{9,10}$/.test(val.replace(/\s/g, ''));
  if (!isEmail && !isPhone) {
    showFieldErr('resetIdErr', 'Enter a valid email or phone number');
    return;
  }

  const btn = document.getElementById('sendCodeBtn');
  btn.classList.add('loading'); btn.disabled = true;

  /*

  PRODUCTION:

  const res = await fetch('/api/auth/forgot-password', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ identifier: val }),
  });
  if (!res.ok) {
    showFieldErr('resetIdErr', 'Could not send reset code. Please try again.');
    btn.classList.remove('loading'); btn.disabled = false;
    return;
  }

  */

  await sleep(1200); // ← remove in production

  btn.classList.remove('loading'); btn.disabled = false;
  document.getElementById('resetTarget').textContent = isEmail ? val : '+233' + val.replace(/\s/g, '');
  goStep(2);
  startOtpResendTimer();
  showToast('success', 'Code sent!', `Reset code sent to ${val}`);
}

/* ── OTP digit inputs ── */
function rotpInput(idx) {
  const el = document.getElementById('rotp' + idx);
  el.value = el.value.replace(/\D/g, '').slice(-1);
  el.classList.toggle('filled', !!el.value);
  if (el.value && idx < 5) document.getElementById('rotp' + (idx + 1)).focus();
  const code = Array.from({ length: 6 }, (_, i) => document.getElementById('rotp' + i).value).join('');
  document.getElementById('verifyOtpBtn').disabled = code.length < 6;
  clearFieldErr('otpErr');
}

function rotpKey(e, idx) {
  if (e.key === 'Backspace' && !document.getElementById('rotp' + idx).value && idx > 0) {
    document.getElementById('rotp' + (idx - 1)).focus();
  }
}

/* Paste support */
document.addEventListener('paste', function (e) {
  if (!document.querySelector('#step2.active')) return;
  const text = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
  if (text) {
    for (let i = 0; i < 6; i++) {
      const el = document.getElementById('rotp' + i);
      el.value = text[i] || '';
      el.classList.toggle('filled', !!el.value);
    }
    document.getElementById('verifyOtpBtn').disabled = text.length < 6;
    e.preventDefault();
  }
});

async function verifyResetOTP() {
  const code = Array.from({ length: 6 }, (_, i) => document.getElementById('rotp' + i).value).join('');
  const btn  = document.getElementById('verifyOtpBtn');
  btn.classList.add('loading'); btn.disabled = true;

  /*

  PRODUCTION:

  const res = await fetch('/api/auth/verify-reset-otp', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ otp: code }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Invalid code');

  */

  await sleep(900); // ← remove in production
  btn.classList.remove('loading');

  /* Demo: accept any complete 6-digit entry — remove in production */
  const isValid = code.length === 6;

  if (isValid) {
    goStep(3);
  } else {
    showFieldErr('otpErr', 'Invalid code. Please try again.');
    btn.disabled = false;
    for (let i = 0; i < 6; i++) {
      const el = document.getElementById('rotp' + i);
      el.style.borderColor = 'rgba(239,68,68,.6)';
      setTimeout(() => { el.style.borderColor = ''; }, 1200);
    }
  }
}

function startOtpResendTimer() {
  clearInterval(resetResendTimer);
  let t = 30;
  const btn  = document.getElementById('rotpResendBtn');
  const span = document.getElementById('rotpTimer');
  btn.disabled     = true;
  span.textContent = t;

  resetResendTimer = setInterval(() => {
    t--;
    span.textContent = t;
    if (t <= 0) {
      clearInterval(resetResendTimer);
      btn.disabled    = false;
      btn.textContent = 'Resend code';
    }
  }, 1000);
}

function resendCode() {
  showToast('info', 'Code resent', 'A new reset code has been sent.');
  startOtpResendTimer();
  clearFieldErr('otpErr');
}

/* ── New password strength meter ── */
function onNewPwInput() {
  const v    = document.getElementById('newPw').value;
  const bars = [
    document.getElementById('rpb1'), document.getElementById('rpb2'),
    document.getElementById('rpb3'), document.getElementById('rpb4'),
  ];
  const lbl = document.getElementById('rpwLbl');
  bars.forEach(b => { b.className = 'pw-bar'; });

  const score = [v.length >= 8, /[A-Z]/.test(v), /[a-z]/.test(v), /[0-9]/.test(v)].filter(Boolean).length;

  if (score <= 1) {
    bars[0].classList.add('w');
    lbl.className = 'pw-strength-lbl w'; lbl.textContent = 'Weak';
  } else if (score === 2) {
    bars.slice(0, 2).forEach(b => b.classList.add('m'));
    lbl.className = 'pw-strength-lbl m'; lbl.textContent = 'Fair';
  } else if (score === 3) {
    bars.slice(0, 3).forEach(b => b.classList.add('m'));
    lbl.className = 'pw-strength-lbl m'; lbl.textContent = 'Good';
  } else {
    bars.forEach(b => b.classList.add('s'));
    lbl.className = 'pw-strength-lbl s'; lbl.textContent = 'Strong ✓';
  }
}

async function confirmReset() {
  const pw  = document.getElementById('newPw').value;
  const cpw = document.getElementById('confirmNewPw').value;

  if (pw.length < 8) { showFieldErr('confirmNewPwErr', 'Password must be at least 8 characters'); return; }
  if (!/[A-Z]/.test(pw) || !/[a-z]/.test(pw) || !/[0-9]/.test(pw)) {
    showFieldErr('confirmNewPwErr', 'Password must include uppercase, lowercase and a number');
    return;
  }
  if (pw !== cpw) { showFieldErr('confirmNewPwErr', 'Passwords do not match'); return; }

  const btn = document.getElementById('resetPwBtn');
  btn.classList.add('loading'); btn.disabled = true;

  /*

  PRODUCTION:

  const res = await fetch('/api/auth/reset-password', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ newPassword: pw }),
  });
  if (!res.ok) {
    showFieldErr('confirmNewPwErr', 'Reset failed. Please start over.');
    btn.classList.remove('loading'); btn.disabled = false;
    return;
  }

  */

  await sleep(1000); // ← remove in production

  btn.classList.remove('loading'); btn.disabled = false;
  goStep(4);
  showToast('success', 'Password updated ✓', 'You can now sign in with your new password.');
}

/* 
   TOAST
 */
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
    <button class="toast-x" onclick="removeToast(this.closest('.toast'))">✕</button>`;

  stack.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => removeToast(t), 5000);
}

function removeToast(el) {
  if (!el) return;
  el.classList.remove('show');
  setTimeout(() => el.remove(), 350);
}

/* 
   UTIL
 */
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }