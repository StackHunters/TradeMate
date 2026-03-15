// ── STATE ──
let currentStep = 1;
const TOTAL_STEPS = 7;
const completionMap = { 1: 0, 2: 14, 3: 28, 4: 42, 5: 56, 6: 70, 7: 85, success: 100 };

const subcatMap = {
  carpenter:  ['General Carpentry','Kitchen Cabinetry','Furniture Making','Decking & Flooring','Roofing Frames'],
  plumber:    ['General Plumbing','Pipe Installation','Drain Clearing','Bathroom Fitting','Geyser/Boiler'],
  electrician:['General Electrical','Wiring & Rewiring','Solar Installation','CCTV / Security','Generator Setup'],
  painter:    ['Interior Painting','Exterior Painting','Texture Coating','Wall Murals','Waterproofing'],
  cleaner:    ['Residential Cleaning','Deep Cleaning','Office Cleaning','Post-Construction','Carpet Cleaning'],
  tutor:      ['Math Tutor','Science Tutor','English Tutor','ICT Tutor','Primary School'],
  driver:     ['Private Driver','Delivery Driver','Airport Transfer','Long Distance','Van Hire'],
};

// ── STEP NAVIGATION ──
function goStep(n) {
  if (n > currentStep) return; // prevent skipping forward
  switchStep(n);
}

function nextStep(from) {
  switchStep(from + 1);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function prevStep(from) {
  switchStep(from - 1);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchStep(n) {
  document.getElementById('panel-' + currentStep)?.classList.remove('active');
  document.getElementById('panel-success')?.classList.remove('active');

  const targetId = n === 'success' ? 'panel-success' : 'panel-' + n;
  const panel = document.getElementById(targetId);
  if (panel) panel.classList.add('active');

  // Update stepper
  document.querySelectorAll('.step-item').forEach(item => {
    const s = +item.dataset.step;
    item.classList.remove('active','completed');
    if (s < n) item.classList.add('completed');
    else if (s === n) item.classList.add('active');
    // Mark completed circles
    const circle = item.querySelector('.step-circle');
    if (s < n) { circle.innerHTML = '✓'; }
    else if (s === n) { circle.textContent = s; }
    else { circle.textContent = s; }
  });

  // Completion %
  const pct = n === 'success' ? 100 : completionMap[n] || 0;
  document.getElementById('completionPct').textContent = pct + '%';
  document.getElementById('completionFill').style.width = pct + '%';

  // Top step label
  if (n !== 'success') {
    document.getElementById('topStepNum').textContent = n;
    currentStep = n;
  }
}

// ── AVATAR ──
function previewAvatar(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const preview = document.getElementById('avatarPreview');
    document.getElementById('avatarInitials').style.display = 'none';
    let img = preview.querySelector('img');
    if (!img) { img = document.createElement('img'); preview.appendChild(img); }
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
function removeAvatar() {
  document.getElementById('avatarInput').value = '';
  const preview = document.getElementById('avatarPreview');
  const img = preview.querySelector('img');
  if (img) img.remove();
  document.getElementById('avatarInitials').style.display = '';
}
function updateInitials(name) {
  const parts = name.trim().split(' ').filter(Boolean);
  const initials = parts.length >= 2 ? parts[0][0] + parts[1][0] : (parts[0] ? parts[0].substring(0,2) : 'TM');
  document.getElementById('avatarInitials').textContent = initials.toUpperCase();
}

// ── OTP ──
let otpSent = false;
function sendOTP() {
  const phone = document.getElementById('phoneNum').value.trim();
  if (!phone) { alert('Enter a phone number first.'); return; }
  const btn = document.getElementById('sendOtpBtn');
  btn.disabled = true; btn.textContent = 'Sent ✓';
  document.getElementById('otpVerifyRow').style.display = 'block';
  otpSent = true;
}
function verifyOTP() {
  const code = document.getElementById('otpInput').value.trim();
  if (code.length === 6 || code === '123456') { // demo: any 6-digit or 123456
    document.getElementById('otpVerifyRow').style.display = 'none';
    document.getElementById('phoneVerifiedPill').style.display = 'block';
  } else {
    alert('Invalid OTP. For demo, enter any 6 digits.');
  }
}

// ── SUBCATEGORIES ──
function updateSubcats() {
  const val = document.getElementById('primaryCat').value;
  const sel = document.getElementById('subcat');
  sel.innerHTML = '<option value="">— Select subcategory —</option>';
  (subcatMap[val] || []).forEach(s => {
    const opt = document.createElement('option'); opt.textContent = s; sel.appendChild(opt);
  });
}

// ── CHAR COUNT ──
function updateCharCount(el, countId, max) {
  const len = el.value.length;
  document.getElementById(countId).textContent = len + ' / ' + max;
}

// ── TAG INPUT ──
function handleTagInput(e, inputId, wrapId) {
  const input = document.getElementById(inputId);
  if ((e.key === 'Enter' || e.key === ',') && input.value.trim()) {
    e.preventDefault();
    addTag(input.value.trim().replace(/,/g,''), wrapId, inputId);
    input.value = '';
  } else if (e.key === 'Backspace' && !input.value) {
    const wrap = document.getElementById(wrapId);
    const tags = wrap.querySelectorAll('.tag');
    if (tags.length) tags[tags.length-1].remove();
  }
}
function addTag(text, wrapId, inputId) {
  const wrap = document.getElementById(wrapId);
  const tag = document.createElement('span');
  tag.className = 'tag';
  tag.innerHTML = text + '<button type="button" onclick="this.parentNode.remove()" aria-label="Remove">×</button>';
  wrap.insertBefore(tag, document.getElementById(inputId));
}

// ── PRICING SELECTION ──
function selectPricing(val) {
  ['pmFixed','pmHourly','pmStarting'].forEach(id => document.getElementById(id).classList.remove('selected'));
  const map = { fixed:'pmFixed', hourly:'pmHourly', starting:'pmStarting' };
  document.getElementById(map[val]).classList.add('selected');
  const label = document.getElementById('priceAmount');
  label.placeholder = val === 'hourly' ? 'Rate per hour (GH₵)' : val === 'starting' ? 'Starting from (GH₵)' : 'Fixed price (GH₵)';
}

// ── LOCATION SELECTION ──
function selectLoc(val) {
  ['locClient','locMine','locOnline'].forEach(id => document.getElementById(id).classList.remove('selected'));
  const map = { client:'locClient', mine:'locMine', online:'locOnline' };
  document.getElementById(map[val]).classList.add('selected');
}

// ── PORTFOLIO IMAGES ──
function addPortfolioImages(input) {
  const grid = document.getElementById('portfolioGrid');
  const existing = grid.querySelectorAll('.portfolio-item img').length;
  const files = Array.from(input.files).slice(0, 6 - existing);
  files.forEach(file => {
    if (grid.querySelectorAll('.portfolio-item').length >= 7) return; // 6 images + 1 add button
    const reader = new FileReader();
    reader.onload = e => {
      const item = document.createElement('div'); item.className = 'portfolio-item';
      item.innerHTML = `<img src="${e.target.result}" alt=""><button class="portfolio-del" onclick="this.parentNode.remove()">×</button>`;
      grid.insertBefore(item, grid.querySelector('.portfolio-item:last-child'));
    };
    reader.readAsDataURL(file);
  });
  input.value = '';
}

// ── FILE UPLOAD SIMULATION ──
function simUpload(input, progId, zoneId, successId) {
  const file = input.files[0]; if (!file) return;
  const allowed = ['image/jpeg','image/png','application/pdf'];
  if (!allowed.includes(file.type) || file.size > 5*1024*1024) { alert('Invalid file or exceeds 5MB.'); return; }
  const prog = document.getElementById(progId);
  prog.classList.add('show');
  document.getElementById(successId).style.display = 'none';
  const barId = progId.replace('Prog','Bar');
  const pctId = progId.replace('Prog','Pct');
  const fnId  = progId.replace('Prog','Filename');
  document.getElementById(fnId).textContent = file.name;
  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.random() * 20 + 5;
    if (pct >= 100) { pct = 100; clearInterval(interval);
      setTimeout(() => {
        prog.classList.remove('show');
        document.getElementById(successId).style.display = 'flex';
      }, 300);
    }
    document.getElementById(barId).style.width = pct + '%';
    document.getElementById(pctId).textContent = Math.round(pct) + '%';
  }, 90);
}

// ── PAYMENT ──
function selectPayMethod(val) {
  ['pm-mtn','pm-voda','pm-airtel','pm-bank'].forEach(id => {
    const el = document.getElementById(id); if(el) el.classList.remove('selected');
  });
  document.getElementById('pm-' + val).classList.add('selected');
  const bankGrp = document.getElementById('bankNameGroup');
  const numLabel = document.getElementById('acctNumLabel');
  if (val === 'bank') {
    bankGrp.style.display = 'flex';
    numLabel.innerHTML = 'Account Number <span class="lbl-req">*</span>';
    document.getElementById('acctNum').placeholder = 'e.g. 1234567890';
  } else {
    bankGrp.style.display = 'none';
    numLabel.innerHTML = 'Mobile Number <span class="lbl-req">*</span>';
    document.getElementById('acctNum').placeholder = 'e.g. 0244 000 000';
  }
}

let masked = true;
function toggleMask() {
  masked = !masked;
  const input = document.getElementById('acctNum');
  input.style.letterSpacing = masked ? '2px' : 'normal';
}

// ── TOGGLES ──
function toggleEmergency(cb) {
  const track = document.getElementById('toggleTrack');
  const thumb = document.getElementById('toggleThumb');
  if (cb.checked) {
    track.style.background = 'rgba(102,126,234,0.3)';
    track.style.borderColor = 'rgba(102,126,234,0.5)';
    thumb.style.left = '23px'; thumb.style.background = 'var(--accent)';
  } else {
    track.style.background = 'var(--dark)'; track.style.borderColor = 'var(--border)';
    thumb.style.left = '3px'; thumb.style.background = 'var(--muted)';
  }
}
function toggleVacation(cb) {
  const track = document.getElementById('vacTrack');
  const thumb = document.getElementById('vacThumb');
  if (cb.checked) {
    track.style.background = 'rgba(245,200,66,0.3)'; track.style.borderColor = 'rgba(245,200,66,0.5)';
    thumb.style.left = '23px'; thumb.style.background = 'var(--yellow)';
  } else {
    track.style.background = 'var(--dark)'; track.style.borderColor = 'var(--border)';
    thumb.style.left = '3px'; thumb.style.background = 'var(--muted)';
  }
}

// ── URL PREVIEW ──
function updateUrl() {
  const slug = document.getElementById('slugInput')?.value;
  const name = document.getElementById('fullName')?.value || '';
  let preview = slug
    ? slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g,'-').replace(/^-|-$/g,'')
    : name.toLowerCase().trim().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
  document.getElementById('urlPreview').textContent = preview || 'your-name';
}

// ── TERMS SUBMIT ──
function submitProfile() {
  const t = document.getElementById('termsCheck').checked;
  const c = document.getElementById('commissionCheck').checked;
  const can = document.getElementById('cancelCheck').checked;
  if (!t || !c || !can) {
    document.getElementById('termsErr').classList.add('show');
    document.getElementById('termsErr').scrollIntoView({ behavior:'smooth', block:'center' });
    return;
  }
  document.getElementById('termsErr').classList.remove('show');
  // Show success
  document.getElementById('panel-7').classList.remove('active');
  document.getElementById('panel-success').classList.add('active');
  document.getElementById('completionPct').textContent = '100%';
  document.getElementById('completionFill').style.width = '100%';
  document.querySelectorAll('.step-item').forEach(item => {
    item.classList.remove('active'); item.classList.add('completed');
    item.querySelector('.step-circle').textContent = '✓';
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── SAVE DRAFT ──
function saveDraft() {
  const toast = document.getElementById('draftToast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ── INIT ──
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('completionFill').style.width = '0%';
  // Pre-seed demo skills
  ['Carpentry','Power Tools','Cabinet Making'].forEach(s => addTag(s,'skillsWrap','skillInput'));
});