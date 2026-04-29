(function() {
  // Canvas global bara
  const globalCanvas = document.createElement('canvas');
  globalCanvas.id = 'emberCanvas';
  document.body.prepend(globalCanvas);
  const gCtx = globalCanvas.getContext('2d');
  let width = window.innerWidth, height = window.innerHeight;
  function resize() {
    width = window.innerWidth; height = window.innerHeight;
    globalCanvas.width = width; globalCanvas.height = height;
  }
  window.addEventListener('resize', resize); resize();
  const particles = [];
  class Ember {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * width; this.y = Math.random() * height;
      this.size = Math.random() * 4 + 1.5; this.speedY = Math.random() * 0.3 + 0.1;
      this.speedX = (Math.random() - 0.5) * 0.15; this.opacity = Math.random() * 0.2 + 0.1;
    }
    update() {
      this.y -= this.speedY; this.x += this.speedX;
      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset(); this.y = height + 10;
      }
    }
    draw() {
      gCtx.beginPath();
      const grad = gCtx.createRadialGradient(this.x, this.y, 1, this.x+2, this.y-1, this.size*1.5);
      grad.addColorStop(0, `rgba(255, 160, 80, ${this.opacity*1.2})`);
      grad.addColorStop(1, `rgba(200, 70, 20, ${this.opacity*0.5})`);
      gCtx.fillStyle = grad; gCtx.shadowColor = '#d94a38'; gCtx.shadowBlur = 8;
      gCtx.arc(this.x, this.y, this.size, 0, Math.PI*2); gCtx.fill();
    }
  }
  for (let i=0; i<40; i++) particles.push(new Ember());
  function animate() {
    gCtx.clearRect(0, 0, width, height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();

  // Canvas api footer
  const canvas = document.getElementById('fireCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth * 0.9 || 800;
      canvas.height = 90;
    }
    window.addEventListener('resize', resizeCanvas); resizeCanvas();
    const embers = [];
    class FooterEmber {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height - 5 + Math.random() * 15;
        this.size = Math.random() * 12 + 4;
        this.speedY = Math.random() * 1.5 + 0.7;
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.life = 1.0;
      }
      update() {
        this.y -= this.speedY; this.x += this.speedX;
        this.life -= 0.004; this.size *= 0.995;
        if (this.y < 0 || this.life <= 0.05 || this.x < 0 || this.x > canvas.width) {
          this.reset(); this.y = canvas.height - 5; this.life = 1.0;
        }
      }
      draw() {
        ctx.beginPath();
        const grad = ctx.createRadialGradient(this.x, this.y, 2, this.x+3, this.y-2, this.size);
        grad.addColorStop(0, '#ffb56b'); grad.addColorStop(0.5, '#d94a38'); grad.addColorStop(1, '#5e1e0c');
        ctx.fillStyle = grad; ctx.shadowColor = '#ff6a2e'; ctx.shadowBlur = 15;
        ctx.arc(this.x, this.y, this.size*0.7, 0, Math.PI*2); ctx.fill();
      }
    }
    for (let i=0; i<55; i++) embers.push(new FooterEmber());
    function drawBase() {
      const grad = ctx.createLinearGradient(0, canvas.height-15, 0, canvas.height);
      grad.addColorStop(0, '#9f391e'); grad.addColorStop(1, '#2d1108');
      ctx.fillStyle = grad; ctx.shadowBlur = 25; ctx.shadowColor = '#c94f2e';
      ctx.beginPath(); ctx.rect(0, canvas.height-15, canvas.width, 20); ctx.fill();
      ctx.shadowBlur = 0;
    }
    function animateFooter() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBase();
      embers.forEach(e => { e.update(); e.draw(); });
      requestAnimationFrame(animateFooter);
    }
    animateFooter();
  }

  // Audio
  const audio = document.getElementById('fireAmbient');
  const sndCtrl = document.getElementById('soundControl');
  const sndIcon = sndCtrl?.querySelector('i');
  if (audio && sndCtrl) {
    audio.volume = 0.5;
    let muted = false;
    function tryPlay() {
      audio.play().then(() => {
        sndCtrl.classList.remove('muted'); sndIcon.className = 'fas fa-volume-up'; muted = false;
      }).catch(() => {
        sndCtrl.classList.add('muted'); sndIcon.className = 'fas fa-volume-mute'; muted = true;
      });
    }
    tryPlay();
    document.addEventListener('click', function first() {
      if (muted) tryPlay();
      document.removeEventListener('click', first);
    }, { once: true });
    sndCtrl.addEventListener('click', (e) => {
      e.stopPropagation();
      if (muted) {
        audio.play().then(() => {
          sndCtrl.classList.remove('muted'); sndIcon.className = 'fas fa-volume-up'; muted = false;
        }).catch(()=>{});
      } else {
        audio.pause(); sndCtrl.classList.add('muted'); sndIcon.className = 'fas fa-volume-mute'; muted = true;
      }
    });
  }

  // Download buttons (placeholder alert)
  document.querySelectorAll('.btn-download').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('🔥 File akan segera tersedia. Terima kasih telah mengambil bara gratis!');
    });
  });
})();