(function() {
  // ===== 1. TOMBOL BELI (ALERT HANGAT) =====
  const buyButtons = document.querySelectorAll('.btn-buy');
  buyButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const product = this.getAttribute('data-product') || 'barang ini';
      alert(`🔥 Roaming: Terima kasih telah memilih ${product}. Semoga hangat ini menemanimu.`);
    });
  });

  // ===== 2. CANVAS API UNGGUN (FOOTER) =====
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
      constructor() {
        this.reset();
      }
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
        this.y -= this.speedY;
        this.x += this.speedX;
        this.life -= 0.004;
        this.size *= 0.995;
        if (this.y < 0 || this.life <= 0.05 || this.x < 0 || this.x > canvas.width) {
          this.reset();
          this.y = canvas.height - 5;
          this.life = 1.0;
          this.size = Math.random() * 12 + 4;
        }
      }
      draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 2, this.x+3, this.y-2, this.size);
        gradient.addColorStop(0, '#ffb56b');
        gradient.addColorStop(0.5, '#d94a38');
        gradient.addColorStop(1, '#5e1e0c');
        ctx.fillStyle = gradient;
        ctx.shadowColor = '#ff6a2e';
        ctx.shadowBlur = 15;
        ctx.arc(this.x, this.y, this.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 55; i++) {
      particles.push(new Ember());
    }

    function drawFireBase() {
      const grad = ctx.createLinearGradient(0, canvas.height-15, 0, canvas.height);
      grad.addColorStop(0, '#9f391e');
      grad.addColorStop(1, '#2d1108');
      ctx.fillStyle = grad;
      ctx.shadowBlur = 25;
      ctx.shadowColor = '#c94f2e';
      ctx.beginPath();
      ctx.rect(0, canvas.height-15, canvas.width, 20);
      ctx.fill();

      for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        let x = (i * 70 + Date.now() * 0.01) % canvas.width;
        let y = canvas.height - 10 + Math.sin(Date.now() * 0.005 + i) * 3;
        let grad2 = ctx.createRadialGradient(x, y, 2, x, y, 20);
        grad2.addColorStop(0, '#f97c3e');
        grad2.addColorStop(1, '#631f0c');
        ctx.fillStyle = grad2;
        ctx.arc(x, y, 16, 0, Math.PI*2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }

    function animateFire() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawFireBase();
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateFire);
    }
    animateFire();
  }

  // ===== 3. CANVAS GLOBAL (BARA MENGAMBANG DI LATAR) =====
  const globalCanvas = document.createElement('canvas');
  globalCanvas.id = 'emberCanvas';
  document.body.prepend(globalCanvas);

  const gCtx = globalCanvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  
  function resizeGlobalCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    globalCanvas.width = width;
    globalCanvas.height = height;
  }
  window.addEventListener('resize', resizeGlobalCanvas);
  resizeGlobalCanvas();

  const globalParticles = [];
  const PARTICLE_COUNT = 40;

  class GlobalEmber {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 4 + 1.5;
      this.speedY = Math.random() * 0.3 + 0.1;
      this.speedX = (Math.random() - 0.5) * 0.15;
      this.opacity = Math.random() * 0.2 + 0.1;
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      
      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
        this.y = height + 10;
        this.x = Math.random() * width;
      }
    }
    draw() {
      gCtx.beginPath();
      const gradient = gCtx.createRadialGradient(this.x, this.y, 1, this.x+2, this.y-1, this.size*1.5);
      gradient.addColorStop(0, `rgba(255, 160, 80, ${this.opacity*1.2})`);
      gradient.addColorStop(1, `rgba(200, 70, 20, ${this.opacity*0.5})`);
      gCtx.fillStyle = gradient;
      gCtx.shadowColor = '#d94a38';
      gCtx.shadowBlur = 8;
      gCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      gCtx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    globalParticles.push(new GlobalEmber());
  }

  function animateGlobal() {
    gCtx.clearRect(0, 0, width, height);
    gCtx.shadowBlur = 8;
    globalParticles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateGlobal);
  }
  animateGlobal();

  window.addEventListener('resize', () => {
    globalParticles.forEach(p => {
      if (p.x > width) p.x = width - 5;
      if (p.y > height) p.y = height - 5;
    });
  });

  // ===== 4. AMBIENT SOUND API UNGGUN =====
  const ambientAudio = document.getElementById('fireAmbient');
  const soundControl = document.getElementById('soundControl');
  const soundIcon = soundControl?.querySelector('i');

  if (ambientAudio && soundControl && soundIcon) {
    ambientAudio.volume = 0.5;
    
    let isMuted = false;
    let audioReady = false;
    
    function attemptPlay() {
      if (ambientAudio.paused) {
        ambientAudio.play().then(() => {
          soundControl.classList.remove('muted');
          soundIcon.className = 'fas fa-volume-up';
          isMuted = false;
          audioReady = true;
        }).catch(err => {
          console.log("Audio autoplay diblokir. Menunggu interaksi pengguna.");
          soundControl.classList.add('muted');
          soundIcon.className = 'fas fa-volume-mute';
          isMuted = true;
          audioReady = false;
        });
      }
    }
    
    attemptPlay();
    
    function onFirstInteraction() {
      if (!audioReady) {
        attemptPlay();
      }
      document.removeEventListener('click', onFirstInteraction);
      document.removeEventListener('touchstart', onFirstInteraction);
      document.removeEventListener('keydown', onFirstInteraction);
    }
    
    document.addEventListener('click', onFirstInteraction);
    document.addEventListener('touchstart', onFirstInteraction);
    document.addEventListener('keydown', onFirstInteraction);
    
    function toggleSound(e) {
      e.stopPropagation();
      
      if (isMuted) {
        ambientAudio.play().then(() => {
          soundControl.classList.remove('muted');
          soundIcon.className = 'fas fa-volume-up';
          isMuted = false;
          audioReady = true;
        }).catch(err => {
          console.log("Gagal memutar audio:", err);
        });
      } else {
        ambientAudio.pause();
        soundControl.classList.add('muted');
        soundIcon.className = 'fas fa-volume-mute';
        isMuted = true;
      }
    }
    
    soundControl.addEventListener('click', toggleSound);
  }

  // ===== KERANJANG (TAMBAH DARI MARKET) =====
const CART_KEY = 'roamingCart';

function getCart() {
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(id, title, price, quantity = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id, title, price, quantity });
  }
  saveCart(cart);
  // Animasi notifikasi kecil (opsional)
  const btn = event.target.closest('.add-to-cart');
  if (btn) {
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => btn.style.transform = '', 150);
  }
  alert(`${title} telah ditambahkan ke keranjang! 🔥`);
}

// Event listener untuk semua tombol "Tambah ke Keranjang"
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', function() {
    const card = this.closest('.product-card');
    const id = card.dataset.id;
    const title = card.dataset.title;
    const price = parseInt(card.dataset.price);
    addToCart(id, title, price);
  });
});

})();