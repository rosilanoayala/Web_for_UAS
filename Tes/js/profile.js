(function() {
  const SESSION_KEY = 'roamingSession';
  const USERS_KEY = 'roamingUsers';
  const FANART_KEY = 'roamingFanArt';
  const CLIP_KEY = 'roamingClips';
  // Bara yang dibakar (burnedWords) belum disimpan, kita bisa buat key baru jika perlu,
  // tapi untuk saat ini kita tampilkan 0 dulu.

  function getSession() {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch(e) { return null; }
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'login.html';
  }

  const session = getSession();
  const notLoggedIn = document.getElementById('notLoggedIn');
  const loggedInProfile = document.getElementById('loggedInProfile');

  if (!session) {
    notLoggedIn.classList.remove('hidden');
    if (loggedInProfile) loggedInProfile.classList.add('hidden');
  } else {
    notLoggedIn.classList.add('hidden');
    loggedInProfile.classList.remove('hidden');

    // Tampilkan nama
    document.getElementById('profileName').textContent = session.username;

    // Tampilkan tanggal bergabung
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    const userData = users[session.username];
    if (userData && userData.createdAt) {
      const created = new Date(userData.createdAt);
      const formatted = created.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      document.getElementById('profileJoined').textContent = `Bergabung sejak ${formatted}`;
    } else {
      document.getElementById('profileJoined').textContent = '';
    }

    // Hitung FanArt
    const fanarts = JSON.parse(localStorage.getItem(FANART_KEY) || '[]');
    const userFanarts = fanarts.filter(art => art.artist && art.artist.toLowerCase() === session.username);
    document.getElementById('fanartCount').textContent = userFanarts.length;

    // Hitung Klip
    const clips = JSON.parse(localStorage.getItem(CLIP_KEY) || '[]');
    const userClips = clips.filter(clip => clip.author && clip.author.toLowerCase() === session.username);
    document.getElementById('clipCount').textContent = userClips.length;

    // Bara dibakar (placeholder)
    document.getElementById('emberCount').textContent = '—';

    // Tombol logout
    document.getElementById('profileLogoutBtn').addEventListener('click', () => {
      if (confirm('Keluar dari perapian?')) {
        clearSession();
      }
    });
  }

  // ===== CANVAS API FOOTER =====
  const canvas = document.getElementById('fireCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth * 0.9 || 800;
      canvas.height = 90;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles = [];
    class Ember {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height - 5 + Math.random() * 15;
        this.size = Math.random() * 12 + 4;
        this.speedY = Math.random() * 1.5 + 0.7;
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.opacity = Math.random() * 0.8 + 0.3;
        this.life = 1.0;
      }
      update() {
        this.y -= this.speedY; this.x += this.speedX;
        this.life -= 0.004; this.size *= 0.995;
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
    for (let i = 0; i < 55; i++) particles.push(new Ember());
    function drawFireBase() {
      const grad = ctx.createLinearGradient(0, canvas.height-15, 0, canvas.height);
      grad.addColorStop(0, '#9f391e'); grad.addColorStop(1, '#2d1108');
      ctx.fillStyle = grad; ctx.shadowBlur = 25; ctx.shadowColor = '#c94f2e';
      ctx.beginPath(); ctx.rect(0, canvas.height-15, canvas.width, 20); ctx.fill();
      for (let i = 0; i < 15; i++) {
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
})();