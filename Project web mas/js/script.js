(function() {
  // ===== 1. SAPAAN DINAMIS (HERO) =====
  const greetings = [
    "Ah, ada jiwa yang lelah berkunjung...",
    "Kau tampak butuh kehangatan. Masuklah.",
    "Di sini aman. Tak perlu sembunyikan lelahmu.",
    "Aku Roaming. Duduklah dekat api.",
    "Emosimu diterima di sini, apa adanya."
  ];
  const greetEl = document.getElementById('greetingText');
  if (greetEl) {
    const randomGreet = greetings[Math.floor(Math.random() * greetings.length)];
    greetEl.innerHTML = `<i class="fas fa-meteor"></i> ${randomGreet}`;
  }

  // ===== 2. PESAN PERAPIAN ABSTRAK =====
  const messages = [
    "“Bara ini tak bertanya siapa dirimu. Ia hanya menyala.”",
    "“Kegelapan yang kau bawa... biarlah meleleh di sini.”",
    "“Aku pernah menjadi amarah. Kini aku hanya ingin menjadi keheningan yang hangat.”",
    "“Langit malam tak pernah menghakimi bintang yang redup.”",
    "“Kadang jiwa perlu retak, agar cahaya bisa masuk dari celahnya.”",
    "“Kau tidak perlu menjadi api. Cukup jadilah bara yang bertahan.”",
    "“Air mata adalah hujan bagi tanah kering di dalam dada.”",
    "“Aku mengembara mencari rasa takut. Ternyata aku hanya mencari pelukan.”",
    "“Kotak kecil itu mengajariku: kebahagiaan adalah kehangatan yang dibagikan.”",
    "“Jika kau merasa kosong, anggap saja itu ruang untuk nyala yang baru.”",
    "“Bara ini tak pernah menuntut. Ia hanya menerima.”",
    "“Kau datang dengan beban berat. Biarkan bara ini meringankan langkahmu.”",
    "“Jangan takut untuk melelehkan kerasnya hati di sini.”",
    "“Kamu mengembara mencari rasa takut. Ternyata kamu hanya mencari pelukan.”",
    "“Jangan takut untuk menjadi abu. Dari abu, bisa tumbuh api yang lebih besar.”",
    "“Kau datang dengan beban. Di sini, kau bisa meletakkannya.”",
    "“Api ini tak pernah menolak siapa pun. Ia hanya menerima.”",
    "“Kadang kita harus membakar sebagian diri untuk menemukan sisa yang lebih kuat.”"
  ];

  const msgDiv = document.getElementById('dynamicMessage');
  const btn = document.getElementById('newMessageBtn');
  
  if (btn && msgDiv) {
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    msgDiv.textContent = randomMsg;

    btn.addEventListener('click', function() {
      const newMsg = messages[Math.floor(Math.random() * messages.length)];
      msgDiv.textContent = newMsg;
    });
  }

  // ===== 3. CANVAS API UNGGUN (FOOTER) =====
  const canvas = document.getElementById('fireCanvas');
  let ctx, particles = [];
  let fireIntensity = 1.0; // Faktor pengali kecepatan/ukuran partikel
  
  if (canvas) {
    ctx = canvas.getContext('2d');

    function resizeCanvas() {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth * 0.9 || 800;
      canvas.height = 90;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Ember {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height - 5 + Math.random() * 15;
        this.baseSize = Math.random() * 12 + 4;
        this.size = this.baseSize;
        this.baseSpeedY = Math.random() * 1.5 + 0.7;
        this.speedY = this.baseSpeedY;
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.opacity = Math.random() * 0.8 + 0.3;
        this.life = 1.0;
      }
      update(intensity = 1.0) {
        this.y -= this.speedY * intensity;
        this.x += this.speedX;
        this.life -= 0.004;
        this.size = this.baseSize * (0.8 + 0.4 * intensity);
        if (this.y < 0 || this.life <= 0.05 || this.x < 0 || this.x > canvas.width) {
          this.reset();
          this.y = canvas.height - 5;
          this.life = 1.0;
          this.baseSize = Math.random() * 12 + 4;
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
        ctx.shadowBlur = 15 * fireIntensity;
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
        ctx.arc(x, y, 16 * (0.8 + 0.3 * fireIntensity), 0, Math.PI*2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }

    function animateFire() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawFireBase();
      particles.forEach(p => {
        p.update(fireIntensity);
        p.draw();
      });
      requestAnimationFrame(animateFire);
    }
    animateFire();
  }

  // ===== 4. BARA HARAPAN (KERTAS TERBAKAR API + BARA) =====
  const wordInput = document.getElementById('baraWordInput');
  const bakarBtn = document.getElementById('bakarBtn');
  const burnedContainer = document.getElementById('burnedWordsContainer');

  // Elemen overlay
  const paperOverlay = document.getElementById('burningPaperOverlay');
  const burningPaper = document.getElementById('burningPaper');
  const paperWord = document.getElementById('paperWord');
  const flameCanvas = document.getElementById('flameCanvas');
  const sparkCanvas = document.getElementById('sparkCanvas');

  // Setup canvas
  let flameCtx = null, sparkCtx = null;
  if (flameCanvas) flameCtx = flameCanvas.getContext('2d');
  if (sparkCanvas) sparkCtx = sparkCanvas.getContext('2d');

  function resizeOverlayCanvases() {
    if (flameCanvas) {
      flameCanvas.width = flameCanvas.parentElement.clientWidth;
      flameCanvas.height = flameCanvas.parentElement.clientHeight;
    }
    if (sparkCanvas) {
      sparkCanvas.width = sparkCanvas.parentElement.clientWidth;
      sparkCanvas.height = sparkCanvas.parentElement.clientHeight;
    }
  }
  window.addEventListener('resize', resizeOverlayCanvases);
  resizeOverlayCanvases();

  // Partikel bara api
  let sparkParticles = [];
  let flameAnimationFrame = null;

  class Spark {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 8 + 3;
      this.speedY = Math.random() * -2.5 - 1.0;
      this.speedX = (Math.random() - 0.5) * 1.8;
      this.opacity = 1;
      this.color = `hsl(${20 + Math.random() * 30}, 100%, 60%)`;
      this.life = 1.0;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedY += 0.08;
      this.speedX *= 0.99;
      this.life -= 0.008;
      this.opacity = this.life;
      this.size *= 0.99;
    }
    draw(ctx) {
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(this.x, this.y, 1, this.x+2, this.y-2, this.size);
      gradient.addColorStop(0, `rgba(255, 200, 50, ${this.opacity})`);
      gradient.addColorStop(0.5, `rgba(255, 80, 0, ${this.opacity*0.9})`);
      gradient.addColorStop(1, `rgba(180, 20, 0, ${this.opacity*0.5})`);
      ctx.fillStyle = gradient;
      ctx.shadowColor = '#ff5e00';
      ctx.shadowBlur = 12;
      ctx.arc(this.x, this.y, this.size * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawFlames(progress, paperRect) {
    if (!flameCtx || !flameCanvas) return;
    flameCtx.clearRect(0, 0, flameCanvas.width, flameCanvas.height);
    
    const centerX = paperRect.left + paperRect.width/2;
    const bottomY = paperRect.bottom;
    const width = paperRect.width * 1.2;
    const height = paperRect.height * (0.8 + progress * 0.5);
    
    for (let layer = 0; layer < 3; layer++) {
      const layerOffset = layer * 0.2;
      const flicker = Math.sin(Date.now() * 0.02 + layer) * 5;
      
      flameCtx.beginPath();
      const gradient = flameCtx.createLinearGradient(centerX - width/2, bottomY, centerX, bottomY - height);
      if (layer === 0) {
        gradient.addColorStop(0, '#ffdd44');
        gradient.addColorStop(0.4, '#ff6600');
        gradient.addColorStop(0.8, '#cc2200');
        gradient.addColorStop(1, '#550000');
      } else if (layer === 1) {
        gradient.addColorStop(0, '#ffaa22');
        gradient.addColorStop(0.5, '#ff4400');
        gradient.addColorStop(1, '#880000');
      } else {
        gradient.addColorStop(0, '#ff8811');
        gradient.addColorStop(0.6, '#dd2200');
        gradient.addColorStop(1, '#440000');
      }
      
      flameCtx.fillStyle = gradient;
      flameCtx.shadowColor = '#ff4400';
      flameCtx.shadowBlur = 20 + layer * 5;
      
      flameCtx.moveTo(centerX - width/2 + flicker, bottomY);
      flameCtx.lineTo(centerX - width/3, bottomY - height * (0.6 + layerOffset));
      flameCtx.lineTo(centerX, bottomY - height * (0.9 + layerOffset) + flicker);
      flameCtx.lineTo(centerX + width/3, bottomY - height * (0.5 + layerOffset));
      flameCtx.lineTo(centerX + width/2 - flicker, bottomY);
      flameCtx.closePath();
      flameCtx.fill();
    }
    flameCtx.shadowBlur = 0;
  }

  function animateSparks() {
    if (!sparkCtx || !sparkCanvas) return;
    sparkCtx.clearRect(0, 0, sparkCanvas.width, sparkCanvas.height);
    
    sparkParticles = sparkParticles.filter(p => p.life > 0.02);
    sparkParticles.forEach(p => {
      p.update();
      p.draw(sparkCtx);
    });
    
    if (sparkParticles.length > 0 || burningPaper.classList.contains('burning')) {
      flameAnimationFrame = requestAnimationFrame(animateSparks);
    } else {
      flameAnimationFrame = null;
    }
  }

  function startBurnAnimation(word) {
    if (!word.trim() || !paperOverlay || !burningPaper || !paperWord) return;
    
    paperWord.textContent = word.trim();
    paperOverlay.classList.remove('hidden');
    
    resizeOverlayCanvases();
    if (flameCtx) flameCtx.clearRect(0, 0, flameCanvas.width, flameCanvas.height);
    if (sparkCtx) sparkCtx.clearRect(0, 0, sparkCanvas.width, sparkCanvas.height);
    sparkParticles = [];
    
    burningPaper.classList.add('burning');
    
    if (typeof fireIntensity !== 'undefined') {
      fireIntensity = 2.5;
    }
    
    const startTime = Date.now();
    const duration = 2200;
    
    function flameLoop() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      if (progress < 1 && burningPaper.classList.contains('burning')) {
        const currentRect = burningPaper.getBoundingClientRect();
        drawFlames(progress, currentRect);
        
        if (Math.random() < 0.5) {
          const centerX = currentRect.left + currentRect.width/2;
          const bottomY = currentRect.bottom;
          for (let i = 0; i < 3; i++) {
            sparkParticles.push(new Spark(
              centerX + (Math.random() - 0.5) * currentRect.width * 1.5,
              bottomY - Math.random() * currentRect.height * 0.8
            ));
          }
        }
        
        requestAnimationFrame(flameLoop);
      } else {
        if (flameCtx) flameCtx.clearRect(0, 0, flameCanvas.width, flameCanvas.height);
      }
    }
    
    requestAnimationFrame(flameLoop);
    
    if (!flameAnimationFrame) {
      flameAnimationFrame = requestAnimationFrame(animateSparks);
    }
    
    setTimeout(() => {
      burningPaper.classList.remove('burning');
      paperOverlay.classList.add('hidden');
      
      if (typeof fireIntensity !== 'undefined') {
        fireIntensity = 1.0;
      }
      
      addBurnedWord(word);
      
      setTimeout(() => {
        sparkParticles = [];
      }, 1500);
    }, duration);
  }

  function addBurnedWord(word) {
    if (!word.trim()) return;
    const wordEl = document.createElement('span');
    wordEl.className = 'burned-word-item';
    wordEl.textContent = word.trim();
    burnedContainer.appendChild(wordEl);
    if (burnedContainer.children.length > 8) {
      burnedContainer.removeChild(burnedContainer.children[0]);
    }
  }

  if (bakarBtn && wordInput && burnedContainer) {
    bakarBtn.addEventListener('click', function() {
      const word = wordInput.value.trim();
      if (word) {
        startBurnAnimation(word);
        wordInput.value = '';
        this.style.transform = 'scale(0.98)';
        setTimeout(() => this.style.transform = '', 100);
      } else {
        wordInput.style.borderColor = '#ff5e5e';
        setTimeout(() => wordInput.style.borderColor = '#a3533b', 300);
      }
    });
    wordInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        bakarBtn.click();
      }
    });
  }

  // ===== 5. CANVAS GLOBAL (BARA MENGAMBANG DI LATAR) =====
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

  // ===== 6. AMBIENT SOUND API UNGGUN =====
  const ambientAudio = document.getElementById('fireAmbient');
  const soundControl = document.getElementById('soundControl');
  const soundIcon = soundControl?.querySelector('i');

  if (ambientAudio && soundControl && soundIcon) {
    ambientAudio.volume = 0.5;
    
    let isMuted = false;
    let hasInteracted = false;
    
    function attemptPlay() {
      ambientAudio.play().then(() => {
        soundControl.classList.remove('muted');
        soundIcon.className = 'fas fa-volume-up';
        isMuted = false;
      }).catch(e => {
        console.log("Autoplay dicegah, menunggu interaksi.");
        soundControl.classList.add('muted');
        soundIcon.className = 'fas fa-volume-mute';
        isMuted = true;
      });
    }
    
    attemptPlay();
    
    function onFirstInteraction() {
      if (!hasInteracted) {
        hasInteracted = true;
        if (isMuted) {
          attemptPlay();
        }
        document.removeEventListener('click', onFirstInteraction);
        document.removeEventListener('touchstart', onFirstInteraction);
        document.removeEventListener('keydown', onFirstInteraction);
      }
    }
    
    document.addEventListener('click', onFirstInteraction);
    document.addEventListener('touchstart', onFirstInteraction);
    document.addEventListener('keydown', onFirstInteraction);
    
    function toggleSound() {
      if (isMuted) {
        ambientAudio.play().then(() => {
          soundControl.classList.remove('muted');
          soundIcon.className = 'fas fa-volume-up';
          isMuted = false;
        }).catch(e => console.log("Gagal memutar audio:", e));
      } else {
        ambientAudio.pause();
        soundControl.classList.add('muted');
        soundIcon.className = 'fas fa-volume-mute';
        isMuted = true;
      }
    }
    
    soundControl.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSound();
    });
  }
(function() {
  // ===== 1. SAPAAN DINAMIS (HERO) =====
  const greetings = [
    "Ah, ada jiwa yang lelah berkunjung...",
    "Kau tampak butuh kehangatan. Masuklah.",
    "Di sini aman. Tak perlu sembunyikan lelahmu.",
    "Aku Roaming. Duduklah dekat api.",
    "Emosimu diterima di sini, apa adanya."
  ];
  const greetEl = document.getElementById('greetingText');
  if (greetEl) {
    const randomGreet = greetings[Math.floor(Math.random() * greetings.length)];
    greetEl.innerHTML = `<i class="fas fa-meteor"></i> ${randomGreet}`;
  }

  // ===== 2. PESAN PERAPIAN ABSTRAK =====
  const messages = [
    "“Bara ini tak bertanya siapa dirimu. Ia hanya menyala.”",
    "“Kegelapan yang kau bawa... biarlah meleleh di sini.”",
    "“Aku pernah menjadi amarah. Kini aku hanya ingin menjadi keheningan yang hangat.”",
    "“Langit malam tak pernah menghakimi bintang yang redup.”",
    "“Kadang jiwa perlu retak, agar cahaya bisa masuk dari celahnya.”",
    "“Kau tidak perlu menjadi api. Cukup jadilah bara yang bertahan.”",
    "“Air mata adalah hujan bagi tanah kering di dalam dada.”",
    "“Aku mengembara mencari rasa takut. Ternyata aku hanya mencari pelukan.”",
    "“Kotak kecil itu mengajariku: kebahagiaan adalah kehangatan yang dibagikan.”",
    "“Jika kau merasa kosong, anggap saja itu ruang untuk nyala yang baru.”"
  ];
  const msgDiv = document.getElementById('dynamicMessage');
  const btn = document.getElementById('newMessageBtn');
  if (btn && msgDiv) {
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    msgDiv.textContent = randomMsg;
    btn.addEventListener('click', function() {
      const newMsg = messages[Math.floor(Math.random() * messages.length)];
      msgDiv.textContent = newMsg;
    });
  }

  // ===== 3. CANVAS API UNGGUN (FOOTER) =====
  const canvas = document.getElementById('fireCanvas');
  let ctx, particles = [];
  let fireIntensity = 1.0;
  if (canvas) {
    ctx = canvas.getContext('2d');
    function resizeCanvas() {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth * 0.9 || 800;
      canvas.height = 90;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    class Ember {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height - 5 + Math.random() * 15;
        this.baseSize = Math.random() * 12 + 4;
        this.size = this.baseSize;
        this.baseSpeedY = Math.random() * 1.5 + 0.7;
        this.speedY = this.baseSpeedY;
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.opacity = Math.random() * 0.8 + 0.3;
        this.life = 1.0;
      }
      update(intensity = 1.0) {
        this.y -= this.speedY * intensity;
        this.x += this.speedX;
        this.life -= 0.004;
        this.size = this.baseSize * (0.8 + 0.4 * intensity);
        if (this.y < 0 || this.life <= 0.05 || this.x < 0 || this.x > canvas.width) {
          this.reset();
          this.y = canvas.height - 5;
          this.life = 1.0;
          this.baseSize = Math.random() * 12 + 4;
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
        ctx.shadowBlur = 15 * fireIntensity;
        ctx.arc(this.x, this.y, this.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
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
        ctx.fillStyle = grad2;
        ctx.arc(x, y, 16 * (0.8 + 0.3 * fireIntensity), 0, Math.PI*2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }
    function animateFire() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawFireBase();
      particles.forEach(p => { p.update(fireIntensity); p.draw(); });
      requestAnimationFrame(animateFire);
    }
    animateFire();
  }

  // ===== 4. BARA HARAPAN (API KERTAS YANG JELAS) =====
  const wordInput = document.getElementById('baraWordInput');
  const bakarBtn = document.getElementById('bakarBtn');
  const burnedContainer = document.getElementById('burnedWordsContainer');
  const paperOverlay = document.getElementById('burningPaperOverlay');
  const burningPaper = document.getElementById('burningPaper');
  const paperWord = document.getElementById('paperWord');
  const flameCanvas = document.getElementById('flameCanvas');
  const sparkCanvas = document.getElementById('sparkCanvas');

  let flameCtx = null, sparkCtx = null;
  if (flameCanvas) flameCtx = flameCanvas.getContext('2d');
  if (sparkCanvas) sparkCtx = sparkCanvas.getContext('2d');

  function resizeOverlayCanvases() {
    if (flameCanvas) {
      flameCanvas.width = flameCanvas.parentElement.clientWidth;
      flameCanvas.height = flameCanvas.parentElement.clientHeight;
    }
    if (sparkCanvas) {
      sparkCanvas.width = sparkCanvas.parentElement.clientWidth;
      sparkCanvas.height = sparkCanvas.parentElement.clientHeight;
    }
  }
  window.addEventListener('resize', resizeOverlayCanvases);

  let sparkParticles = [];
  let flameAnimationFrame = null;

  class Spark {
    constructor(x, y) {
      this.x = x; this.y = y;
      this.size = Math.random() * 10 + 4;
      this.speedY = Math.random() * -3.0 - 1.5;
      this.speedX = (Math.random() - 0.5) * 2.5;
      this.opacity = 1;
      this.life = 1.0;
    }
    update() {
      this.x += this.speedX; this.y += this.speedY;
      this.speedY += 0.1; this.speedX *= 0.99;
      this.life -= 0.006; this.opacity = this.life;
      this.size *= 0.99;
    }
    draw(ctx) {
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(this.x, this.y, 1, this.x+3, this.y-3, this.size);
      gradient.addColorStop(0, `rgba(255, 220, 50, ${this.opacity})`);
      gradient.addColorStop(0.5, `rgba(255, 60, 0, ${this.opacity*0.9})`);
      gradient.addColorStop(1, `rgba(150, 0, 0, ${this.opacity*0.5})`);
      ctx.fillStyle = gradient;
      ctx.shadowColor = '#ff5e00'; ctx.shadowBlur = 15;
      ctx.arc(this.x, this.y, this.size * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawFlames(progress, paperRect) {
    if (!flameCtx || !flameCanvas) return;
    flameCtx.clearRect(0, 0, flameCanvas.width, flameCanvas.height);
    const centerX = paperRect.left + paperRect.width/2;
    const bottomY = paperRect.bottom;
    const width = paperRect.width * 1.4;
    const height = paperRect.height * (0.9 + progress * 0.6);
    
    for (let layer = 0; layer < 4; layer++) {
      const flicker = Math.sin(Date.now() * 0.03 + layer) * 8;
      flameCtx.beginPath();
      const gradient = flameCtx.createLinearGradient(centerX - width/2, bottomY, centerX, bottomY - height);
      if (layer === 0) {
        gradient.addColorStop(0, '#ffff88'); gradient.addColorStop(0.3, '#ffaa00');
        gradient.addColorStop(0.7, '#ff4400'); gradient.addColorStop(1, '#880000');
      } else if (layer === 1) {
        gradient.addColorStop(0, '#ffdd44'); gradient.addColorStop(0.5, '#ff6600');
        gradient.addColorStop(1, '#550000');
      } else {
        gradient.addColorStop(0, '#ff8811'); gradient.addColorStop(0.6, '#cc2200');
        gradient.addColorStop(1, '#330000');
      }
      flameCtx.fillStyle = gradient;
      flameCtx.shadowColor = '#ff4400'; flameCtx.shadowBlur = 25 + layer * 5;
      flameCtx.moveTo(centerX - width/2 + flicker, bottomY);
      flameCtx.lineTo(centerX - width/3, bottomY - height * (0.5 + layer*0.15));
      flameCtx.lineTo(centerX, bottomY - height * (0.85 + layer*0.1) + flicker);
      flameCtx.lineTo(centerX + width/3, bottomY - height * (0.4 + layer*0.15));
      flameCtx.lineTo(centerX + width/2 - flicker, bottomY);
      flameCtx.closePath(); flameCtx.fill();
    }
    flameCtx.shadowBlur = 0;
  }

  function animateSparks() {
    if (!sparkCtx || !sparkCanvas) return;
    sparkCtx.clearRect(0, 0, sparkCanvas.width, sparkCanvas.height);
    sparkParticles = sparkParticles.filter(p => p.life > 0.02);
    sparkParticles.forEach(p => { p.update(); p.draw(sparkCtx); });
    if (sparkParticles.length > 0 || burningPaper.classList.contains('burning')) {
      flameAnimationFrame = requestAnimationFrame(animateSparks);
    } else { flameAnimationFrame = null; }
  }

  function startBurnAnimation(word) {
    if (!word.trim() || !paperOverlay || !burningPaper || !paperWord) return;
    paperWord.textContent = word.trim();
    paperOverlay.classList.remove('hidden');
    resizeOverlayCanvases();
    if (flameCtx) flameCtx.clearRect(0, 0, flameCanvas.width, flameCanvas.height);
    if (sparkCtx) sparkCtx.clearRect(0, 0, sparkCanvas.width, sparkCanvas.height);
    sparkParticles = [];
    burningPaper.classList.add('burning');
    if (typeof fireIntensity !== 'undefined') fireIntensity = 2.8;
    
    const startTime = Date.now();
    const duration = 2200;
    
    function flameLoop() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      if (progress < 1 && burningPaper.classList.contains('burning')) {
        const currentRect = burningPaper.getBoundingClientRect();
        drawFlames(progress, currentRect);
        if (Math.random() < 0.6) {
          const centerX = currentRect.left + currentRect.width/2;
          const bottomY = currentRect.bottom;
          for (let i = 0; i < 4; i++) {
            sparkParticles.push(new Spark(
              centerX + (Math.random() - 0.5) * currentRect.width * 1.8,
              bottomY - Math.random() * currentRect.height * 0.9
            ));
          }
        }
        requestAnimationFrame(flameLoop);
      } else {
        if (flameCtx) flameCtx.clearRect(0, 0, flameCanvas.width, flameCanvas.height);
      }
    }
    requestAnimationFrame(flameLoop);
    if (!flameAnimationFrame) { flameAnimationFrame = requestAnimationFrame(animateSparks); }
    
    setTimeout(() => {
      burningPaper.classList.remove('burning');
      paperOverlay.classList.add('hidden');
      if (typeof fireIntensity !== 'undefined') fireIntensity = 1.0;
      addBurnedWord(word);
      setTimeout(() => { sparkParticles = []; }, 1500);
    }, duration);
  }

  function addBurnedWord(word) {
    if (!word.trim()) return;
    const wordEl = document.createElement('span');
    wordEl.className = 'burned-word-item';
    wordEl.textContent = word.trim();
    burnedContainer.appendChild(wordEl);
    if (burnedContainer.children.length > 8) burnedContainer.removeChild(burnedContainer.children[0]);
  }

  if (bakarBtn && wordInput && burnedContainer) {
    bakarBtn.addEventListener('click', function() {
      const word = wordInput.value.trim();
      if (word) {
        startBurnAnimation(word);
        wordInput.value = '';
        this.style.transform = 'scale(0.98)';
        setTimeout(() => this.style.transform = '', 100);
      } else {
        wordInput.style.borderColor = '#ff5e5e';
        setTimeout(() => wordInput.style.borderColor = '#a3533b', 300);
      }
    });
    wordInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') { e.preventDefault(); bakarBtn.click(); }
    });
  }

  // ===== 5. CANVAS GLOBAL (BARA MENGAMBANG) =====
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
  for (let i = 0; i < 40; i++) globalParticles.push(new GlobalEmber());
  function animateGlobal() {
    gCtx.clearRect(0, 0, width, height); gCtx.shadowBlur = 8;
    globalParticles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateGlobal);
  }
  animateGlobal();

  // ===== 6. AMBIENT SOUND =====
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
      document.removeEventListener('click', onFirstInteraction);
      document.removeEventListener('touchstart', onFirstInteraction);
    }
    document.addEventListener('click', onFirstInteraction); document.addEventListener('touchstart', onFirstInteraction);
    soundControl.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isMuted) {
        ambientAudio.play().then(() => {
          soundControl.classList.remove('muted'); soundIcon.className = 'fas fa-volume-up'; isMuted = false;
        }).catch(()=>{});
      } else {
        ambientAudio.pause(); soundControl.classList.add('muted');
        soundIcon.className = 'fas fa-volume-mute'; isMuted = true;
      }
    });
  }
})();
})();