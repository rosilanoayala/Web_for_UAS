(function() {
  // ===== KONFIGURASI =====
  const MOD_PASSWORD = 'roamingapi';
  const STORAGE_KEY = 'roamingSchedule';
  
  let isModerator = false;
  let schedules = [];
  let editIndex = -1;
  
  // Elemen DOM – pengecekan null disertakan di setiap blok
  const modPanel = document.getElementById('modPanel');
  const scheduleList = document.getElementById('scheduleList');
  const emptyState = document.getElementById('emptySchedule');
  const loginTrigger = document.getElementById('secretLoginTrigger');
  const logoutBtn = document.getElementById('logoutModBtn');
  const addBtn = document.getElementById('addEventBtn');
  
  const titleInput = document.getElementById('eventTitle');
  const dateInput = document.getElementById('eventDate');
  const timeInput = document.getElementById('eventTime');
  const linkInput = document.getElementById('eventLink');
  const descInput = document.getElementById('eventDesc');
  const imageInput = document.getElementById('eventImage');

  // ===== COUNTDOWN & AURA ELEMENTS (SATU KANVAS BESAR) =====
  const countdownSection = document.getElementById('countdownSection');
  const digitDays = document.getElementById('digitDays');
  const digitHours = document.getElementById('digitHours');
  const digitMinutes = document.getElementById('digitMinutes');
  const digitSeconds = document.getElementById('digitSeconds');
  const countdownEventName = document.getElementById('countdownEventName');
  const countdownTimer = document.getElementById('countdownTimer');
  
  // Hentikan inisialisasi countdown jika elemen wajib tidak ada
  if (!countdownSection || !countdownTimer) {
    console.warn('Elemen countdown tidak ditemukan. Countdown dinonaktifkan.');
    // inisialisasi lainnya (global canvas, audio, schedule) tetap berjalan
  }
  
  // Buat kanvas besar dan sisipkan ke dalam countdownTimer (hanya jika ada)
  let auraCanvas = null;
  let ctxAura = null;
  let auraParticles = [];
  const AURA_COUNT = 70;
  
  if (countdownTimer) {
    auraCanvas = document.createElement('canvas');
    auraCanvas.id = 'countdownAuraCanvas';
    auraCanvas.className = 'countdown-aura-canvas';
    countdownTimer.style.position = 'relative';
    countdownTimer.prepend(auraCanvas);
    ctxAura = auraCanvas.getContext('2d');
  }
  
  // ===== CANVAS GLOBAL (BARA) =====
  const globalCanvas = document.createElement('canvas');
  globalCanvas.id = 'emberCanvas';
  document.body.prepend(globalCanvas);
  const gCtx = globalCanvas.getContext('2d');
  let width = window.innerWidth, height = window.innerHeight;
  function resizeGlobalCanvas() {
    width = window.innerWidth; height = window.innerHeight;
    globalCanvas.width = width; globalCanvas.height = height;
  }
  window.addEventListener('resize', resizeGlobalCanvas); resizeGlobalCanvas();
  const globalParticles = [];
  class GlobalEmber {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * width; this.y = Math.random() * height;
      this.size = Math.random() * 4 + 1.5; this.speedY = Math.random() * 0.3 + 0.1;
      this.speedX = (Math.random() - 0.5) * 0.15; this.opacity = Math.random() * 0.2 + 0.1;
    }
    update() {
      this.y -= this.speedY; this.x += this.speedX;
      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset(); this.y = height + 10; this.x = Math.random() * width;
      }
    }
    draw() {
      gCtx.beginPath();
      const gradient = gCtx.createRadialGradient(this.x, this.y, 1, this.x+2, this.y-1, this.size*1.5);
      gradient.addColorStop(0, `rgba(255, 160, 80, ${this.opacity*1.2})`);
      gradient.addColorStop(1, `rgba(200, 70, 20, ${this.opacity*0.5})`);
      gCtx.fillStyle = gradient; gCtx.shadowColor = '#d94a38'; gCtx.shadowBlur = 8;
      gCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2); gCtx.fill();
    }
  }
  for (let i=0; i<40; i++) globalParticles.push(new GlobalEmber());
  function animateGlobal() {
    gCtx.clearRect(0, 0, width, height); gCtx.shadowBlur = 8;
    globalParticles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateGlobal);
  }
  animateGlobal();
  
  // ===== CANVAS API FOOTER =====
  const canvas = document.getElementById('fireCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth * 0.9 || 800;
      canvas.height = 90;
    }
    window.addEventListener('resize', resizeCanvas); resizeCanvas();
    const particles = [];
    class Ember {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width; this.y = canvas.height - 5 + Math.random() * 15;
        this.size = Math.random() * 12 + 4; this.speedY = Math.random() * 1.5 + 0.7;
        this.speedX = (Math.random() - 0.5) * 0.7; this.opacity = Math.random() * 0.8 + 0.3; this.life = 1.0;
      }
      update() {
        this.y -= this.speedY; this.x += this.speedX; this.life -= 0.004; this.size *= 0.995;
        if (this.y < 0 || this.life <= 0.05 || this.x < 0 || this.x > canvas.width) {
          this.reset(); this.y = canvas.height - 5; this.life = 1.0; this.size = Math.random() * 12 + 4;
        }
      }
      draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 2, this.x+3, this.y-2, this.size);
        gradient.addColorStop(0, '#ffb56b'); gradient.addColorStop(0.5, '#d94a38'); gradient.addColorStop(1, '#5e1e0c');
        ctx.fillStyle = gradient; ctx.shadowColor = '#ff6a2e'; ctx.shadowBlur = 15;
        ctx.arc(this.x, this.y, this.size * 0.7, 0, Math.PI * 2); ctx.fill();
      }
    }
    for (let i=0; i<55; i++) particles.push(new Ember());
    function drawFireBase() {
      const grad = ctx.createLinearGradient(0, canvas.height-15, 0, canvas.height);
      grad.addColorStop(0, '#9f391e'); grad.addColorStop(1, '#2d1108');
      ctx.fillStyle = grad; ctx.shadowBlur = 25; ctx.shadowColor = '#c94f2e';
      ctx.beginPath(); ctx.rect(0, canvas.height-15, canvas.width, 20); ctx.fill();
      for (let i=0; i<15; i++) {
        ctx.beginPath();
        let x = (i * 70 + Date.now() * 0.01) % canvas.width;
        let y = canvas.height - 10 + Math.sin(Date.now() * 0.005 + i) * 3;
        let grad2 = ctx.createRadialGradient(x, y, 2, x, y, 20);
        grad2.addColorStop(0, '#f97c3e'); grad2.addColorStop(1, '#631f0c');
        ctx.fillStyle = grad2; ctx.arc(x, y, 16, 0, Math.PI*2); ctx.fill();
      }
      ctx.shadowBlur = 0;
    }
    function animateFire() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); drawFireBase();
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animateFire);
    }
    animateFire();
  }
  
  // ===== AUDIO =====
  const ambientAudio = document.getElementById('fireAmbient');
  const soundControl = document.getElementById('soundControl');
  const soundIcon = soundControl?.querySelector('i');
  if (ambientAudio && soundControl && soundIcon) {
    ambientAudio.volume = 0.5; let isMuted = false, hasInteracted = false;
    function attemptPlay() {
      ambientAudio.play().then(() => {
        soundControl.classList.remove('muted'); soundIcon.className = 'fas fa-volume-up'; isMuted = false;
      }).catch(() => {
        soundControl.classList.add('muted'); soundIcon.className = 'fas fa-volume-mute'; isMuted = true;
      });
    }
    attemptPlay();
    function onFirstInteraction() {
      if (!hasInteracted) { hasInteracted = true; if (isMuted) attemptPlay(); }
      document.removeEventListener('click', onFirstInteraction); document.removeEventListener('touchstart', onFirstInteraction);
    }
    document.addEventListener('click', onFirstInteraction); document.addEventListener('touchstart', onFirstInteraction);
    soundControl.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isMuted) {
        ambientAudio.play().then(() => {
          soundControl.classList.remove('muted'); soundIcon.className = 'fas fa-volume-up'; isMuted = false;
        }).catch(()=>{});
      } else {
        ambientAudio.pause(); soundControl.classList.add('muted'); soundIcon.className = 'fas fa-volume-mute'; isMuted = true;
      }
    });
  }
  
  // ===== FUNGSI SCHEDULE =====
  function loadSchedules() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const now = new Date();
        const hasUpcoming = parsed.some(event => new Date(`${event.date}T${event.time}`) > now);
        if (hasUpcoming) schedules = parsed;
        else schedules = getDefaultSchedules();
      } else {
        schedules = getDefaultSchedules();
      }
    } catch(e) {
      schedules = getDefaultSchedules();
    }
    saveSchedules();
  }
  
  function getDefaultSchedules() {
    const now = new Date();
    const tomorrow = new Date(now); tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(now); nextWeek.setDate(nextWeek.getDate() + 7);
    const formatDate = (d) => d.toISOString().split('T')[0];
    return [
      { title: 'Perkenalan Roaming', date: formatDate(tomorrow), time: '20:00', link: '#', desc: 'Stream perdana! Mari berkenalan dengan iblis merah.', image: '' },
      { title: 'Ngobrol Santai di Perapian', date: formatDate(nextWeek), time: '19:30', link: '#', desc: 'Sesi tanya jawab dan cerita.', image: '' }
    ];
  }
  
  function saveSchedules() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules)); } catch(e) {}
  }
  
  function renderSchedules() {
    if (!scheduleList) return;
    const sorted = [...schedules].sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
    if (sorted.length === 0) { scheduleList.innerHTML = ''; if (emptyState) emptyState.classList.remove('hidden'); return; }
    if (emptyState) emptyState.classList.add('hidden');
    let html = '';
    sorted.forEach((event) => {
      const originalIndex = schedules.indexOf(event);
      const dateObj = new Date(`${event.date}T${event.time}`);
      const formattedDate = dateObj.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      const formattedTime = dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      html += `<div class="schedule-card" data-index="${originalIndex}">
        <div class="schedule-image">${event.image ? `<img src="${event.image}" alt="${event.title}" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-fire\\'></i>'">` : '<i class="fas fa-fire"></i>'}</div>
        <div class="schedule-content">
          <div class="schedule-title">${event.title}</div>
          <div class="schedule-datetime"><span><i class="far fa-calendar-alt"></i> ${formattedDate}</span><span><i class="far fa-clock"></i> ${formattedTime} WIB</span></div>
          ${event.desc ? `<div class="schedule-desc">${event.desc}</div>` : ''}
          ${event.link ? `<a href="${event.link}" target="_blank" class="schedule-link"><i class="fas fa-external-link-alt"></i> Tonton / Info</a>` : ''}
          ${isModerator ? `<div class="schedule-actions"><button class="btn-edit" data-index="${originalIndex}"><i class="fas fa-edit"></i> Edit</button><button class="btn-delete" data-index="${originalIndex}"><i class="fas fa-trash-alt"></i> Hapus</button></div>` : ''}
        </div>
      </div>`;
    });
    scheduleList.innerHTML = html;
    if (isModerator) {
      document.querySelectorAll('.btn-edit').forEach(btn => btn.addEventListener('click', (e) => editSchedule(parseInt(btn.dataset.index))));
      document.querySelectorAll('.btn-delete').forEach(btn => btn.addEventListener('click', (e) => deleteSchedule(parseInt(btn.dataset.index))));
    }
  }
  
  function editSchedule(index) {
    const event = schedules[index];
    if (!event) return;
    if (titleInput) titleInput.value = event.title || '';
    if (dateInput) dateInput.value = event.date || '';
    if (timeInput) timeInput.value = event.time || '';
    if (linkInput) linkInput.value = event.link || '';
    if (descInput) descInput.value = event.desc || '';
    if (imageInput) imageInput.value = event.image || '';
    editIndex = index;
    if (addBtn) addBtn.innerHTML = '<i class="fas fa-save"></i> Simpan Perubahan';
    if (modPanel) modPanel.scrollIntoView({ behavior: 'smooth' });
  }
  
  function deleteSchedule(index) {
    if (confirm('Hapus jadwal ini? Bara akan padam.')) {
      schedules.splice(index, 1);
      saveSchedules(); renderSchedules();
      if (editIndex === index) resetForm();
    }
  }
  
  function resetForm() {
    if (titleInput) titleInput.value = '';
    if (dateInput) dateInput.value = '';
    if (timeInput) timeInput.value = '';
    if (linkInput) linkInput.value = '';
    if (descInput) descInput.value = '';
    if (imageInput) imageInput.value = '';
    editIndex = -1;
    if (addBtn) addBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Tambah Jadwal';
  }
  
  function handleAddOrUpdate() {
    const title = titleInput?.value.trim();
    const date = dateInput?.value;
    const time = timeInput?.value;
    if (!title || !date || !time) { alert('Judul, Tanggal, dan Waktu wajib diisi!'); return; }
    const newEvent = {
      title,
      date,
      time,
      link: linkInput?.value.trim() || '',
      desc: descInput?.value.trim() || '',
      image: imageInput?.value.trim() || ''
    };
    if (editIndex >= 0) schedules[editIndex] = newEvent;
    else schedules.push(newEvent);
    saveSchedules(); renderSchedules(); resetForm();
  }
  
  // ===== SATU PARTIKEL AURA UNTUK SELURUH COUNTDOWN =====
  class AuraParticle {
    constructor(canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth; this.canvasHeight = canvasHeight;
      this.reset();
    }
    reset() {
      this.x = Math.random() * this.canvasWidth;
      this.y = Math.random() * this.canvasHeight;
      this.size = Math.random() * 4 + 1;
      this.speedX = (Math.random() - 0.5) * 1.5;
      this.speedY = (Math.random() - 0.5) * 1.5;
      this.opacity = Math.random() * 0.6 + 0.3;
      this.life = 1.0;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= 0.003;
      this.opacity = Math.max(0, this.life * 0.7);
      if (this.life <= 0.05 || this.x < -20 || this.x > this.canvasWidth + 20 || this.y < -20 || this.y > this.canvasHeight + 20) {
        this.reset();
        this.life = 1.0;
      }
    }
    draw(ctx) {
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(this.x, this.y, 1, this.x+3, this.y-2, this.size);
      gradient.addColorStop(0, `rgba(255, 200, 50, ${this.opacity})`);
      gradient.addColorStop(0.6, `rgba(230, 80, 30, ${this.opacity*0.8})`);
      gradient.addColorStop(1, `rgba(150, 20, 0, 0)`);
      ctx.fillStyle = gradient;
      ctx.shadowColor = '#ff5e1a';
      ctx.shadowBlur = 12;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function resizeAuraCanvas() {
    if (!auraCanvas || !countdownTimer) return;
    const rect = countdownTimer.getBoundingClientRect();
    auraCanvas.width = rect.width + 50;
    auraCanvas.height = rect.height + 60;
    auraParticles = [];
    for (let i = 0; i < AURA_COUNT; i++) {
      auraParticles.push(new AuraParticle(auraCanvas.width, auraCanvas.height));
    }
  }
  
  function animateAura() {
    if (!ctxAura || !auraCanvas) return;
    ctxAura.clearRect(0, 0, auraCanvas.width, auraCanvas.height);
    auraParticles.forEach(p => { p.update(); p.draw(ctxAura); });
    requestAnimationFrame(animateAura);
  }
  
  function getNextSchedule() {
    const now = new Date();
    let nextEvent = null, nextDate = null;
    schedules.forEach(event => {
      const eventDate = new Date(`${event.date}T${event.time}`);
      if (eventDate > now && (!nextDate || eventDate < nextDate)) { nextDate = eventDate; nextEvent = event; }
    });
    return { event: nextEvent, date: nextDate };
  }
  
  function updateCountdown() {
    if (!countdownSection || !digitDays || !digitHours || !digitMinutes || !digitSeconds) return;
    const { event, date } = getNextSchedule();
    if (!event || !date) {
      countdownSection.classList.add('hidden');
      return;
    }
    countdownSection.classList.remove('hidden');
    if (countdownEventName) countdownEventName.textContent = `"${event.title}"`;
    const diff = Math.max(0, date - new Date());
    const totalSeconds = Math.floor(diff / 1000);
    digitDays.textContent = String(Math.floor(totalSeconds / 86400)).padStart(2, '0');
    digitHours.textContent = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, '0');
    digitMinutes.textContent = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    digitSeconds.textContent = String(totalSeconds % 60).padStart(2, '0');
  }
  
  function initCountdown() {
    if (!countdownSection || !countdownTimer) return;
    resizeAuraCanvas();
    window.addEventListener('resize', resizeAuraCanvas);
    updateCountdown();
    setInterval(updateCountdown, 1000);
    animateAura();
  }
  
  // ===== MODERATOR LOGIN =====
  let clickCount = 0, clickTimer = null;
  if (loginTrigger) {
    loginTrigger.addEventListener('click', () => {
      clickCount++;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => { clickCount = 0; }, 800);
      if (clickCount >= 3 && !isModerator) {
        const pass = prompt('Masukkan password moderator:');
        if (pass === MOD_PASSWORD) {
          isModerator = true;
          if (modPanel) modPanel.classList.remove('hidden');
          renderSchedules();
          alert('Selamat datang, Moderator. Api siap dikelola.');
        } else alert('Password salah. Bara menolak.');
        clickCount = 0;
      }
    });
  }
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      isModerator = false;
      if (modPanel) modPanel.classList.add('hidden');
      resetForm();
      renderSchedules();
    });
  }
  
  if (addBtn) addBtn.addEventListener('click', handleAddOrUpdate);
  
  // ===== INISIALISASI AKHIR =====
  loadSchedules();
  renderSchedules();
  initCountdown();
})();