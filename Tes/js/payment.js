(function() {
  const CART_KEY = 'roamingCart';
  const RECEIPT_KEY = 'lastReceipt';

  function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch(e) { return []; } }
  function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

  function renderOrderSummary() {
    const container = document.getElementById('orderSummary');
    if (!container) return;
    const cart = getCart();
    if (cart.length === 0) {
      container.innerHTML = '<p>Keranjang kosong. <a href="cart.html">Kembali ke keranjang</a></p>';
      return;
    }
    let total = 0;
    let html = '';
    cart.forEach(item => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
      html += `<div class="order-item"><span>${item.title} (x${item.quantity})</span><span>Rp ${subtotal.toLocaleString('id-ID')}</span></div>`;
    });
    html += `<div class="order-total"><span>Total</span><span>Rp ${total.toLocaleString('id-ID')}</span></div>`;
    container.innerHTML = html;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const cart = getCart();
    if (cart.length === 0) {
      alert('Keranjang kosong.');
      return;
    }

    const method = document.querySelector('input[name="method"]:checked')?.value || 'transfer';
    const bank = document.getElementById('bankSelect').value;
    const accountNumber = document.getElementById('accountNumber').value.trim();
    const accountName = document.getElementById('accountName').value.trim();
    const errorDiv = document.getElementById('paymentError');

    if (!accountNumber || !accountName) {
      if (errorDiv) { errorDiv.textContent = 'Mohon isi nomor rekening dan nama pemilik akun.'; errorDiv.classList.remove('hidden'); }
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const receipt = {
      date: new Date().toISOString(),
      method,
      bank,
      accountNumber,
      accountName,
      items: [...cart],
      total
    };
    localStorage.setItem(RECEIPT_KEY, JSON.stringify(receipt));
    saveCart([]);
    if (window.updateCartBadge) window.updateCartBadge();
    window.location.href = 'receipt.html';
  }

  document.getElementById('paymentForm').addEventListener('submit', handleSubmit);

  // Ganti opsi bank/e-wallet sesuai metode
  document.querySelectorAll('input[name="method"]').forEach(radio => {
    radio.addEventListener('change', function() {
      const bankSelect = document.getElementById('bankSelect');
      bankSelect.innerHTML = this.value === 'ewallet' 
        ? `<option value="gopay">GoPay</option><option value="ovo">OVO</option><option value="dana">DANA</option><option value="shopeepay">ShopeePay</option>`
        : `<option value="bca">BCA</option><option value="mandiri">Mandiri</option><option value="bni">BNI</option><option value="bri">BRI</option>`;
    });
  });

  // Canvas & audio
  const canvas = document.getElementById('fireCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    function resizeCanvas() { canvas.width = canvas.parentElement.clientWidth * 0.9 || 800; canvas.height = 90; }
    window.addEventListener('resize', resizeCanvas); resizeCanvas();
    const particles = [];
    class Ember {
      constructor() { this.reset(); }
      reset() { this.x = Math.random() * canvas.width; this.y = canvas.height - 5 + Math.random() * 15; this.size = Math.random() * 12 + 4; this.speedY = Math.random() * 1.5 + 0.7; this.speedX = (Math.random() - 0.5) * 0.7; this.opacity = Math.random() * 0.8 + 0.3; this.life = 1.0; }
      update() { this.y -= this.speedY; this.x += this.speedX; this.life -= 0.004; this.size *= 0.995; if (this.y < 0 || this.life <= 0.05 || this.x < 0 || this.x > canvas.width) { this.reset(); this.y = canvas.height - 5; this.life = 1.0; this.size = Math.random() * 12 + 4; } }
      draw() { ctx.beginPath(); const gradient = ctx.createRadialGradient(this.x, this.y, 2, this.x+3, this.y-2, this.size); gradient.addColorStop(0, '#ffb56b'); gradient.addColorStop(0.5, '#d94a38'); gradient.addColorStop(1, '#5e1e0c'); ctx.fillStyle = gradient; ctx.shadowColor = '#ff6a2e'; ctx.shadowBlur = 15; ctx.arc(this.x, this.y, this.size * 0.7, 0, Math.PI * 2); ctx.fill(); }
    }
    for (let i=0; i<55; i++) particles.push(new Ember());
    function drawFireBase() { const grad = ctx.createLinearGradient(0, canvas.height-15, 0, canvas.height); grad.addColorStop(0, '#9f391e'); grad.addColorStop(1, '#2d1108'); ctx.fillStyle = grad; ctx.shadowBlur = 25; ctx.shadowColor = '#c94f2e'; ctx.beginPath(); ctx.rect(0, canvas.height-15, canvas.width, 20); ctx.fill(); for (let i=0; i<15; i++) { ctx.beginPath(); let x = (i * 70 + Date.now() * 0.01) % canvas.width; let y = canvas.height - 10 + Math.sin(Date.now() * 0.005 + i) * 3; let grad2 = ctx.createRadialGradient(x, y, 2, x, y, 20); grad2.addColorStop(0, '#f97c3e'); grad2.addColorStop(1, '#631f0c'); ctx.fillStyle = grad2; ctx.arc(x, y, 16, 0, Math.PI*2); ctx.fill(); } ctx.shadowBlur = 0; }
    function animateFire() { ctx.clearRect(0, 0, canvas.width, canvas.height); drawFireBase(); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animateFire); }
    animateFire();
  }

  const audio = document.getElementById('fireAmbient');
  const sndBtn = document.getElementById('soundControl');
  if (audio && sndBtn) {
    audio.volume = 0.5; let muted = false, interacted = false;
    function play() { audio.play().then(() => { sndBtn.classList.remove('muted'); sndBtn.querySelector('i').className = 'fas fa-volume-up'; muted = false; }).catch(() => { sndBtn.classList.add('muted'); sndBtn.querySelector('i').className = 'fas fa-volume-mute'; muted = true; }); }
    play();
    function interact() { if (!interacted) { interacted = true; if (muted) play(); } document.removeEventListener('click', interact); document.removeEventListener('touchstart', interact); }
    document.addEventListener('click', interact); document.addEventListener('touchstart', interact);
    sndBtn.addEventListener('click', (e) => { e.stopPropagation(); muted ? play() : (audio.pause(), sndBtn.classList.add('muted'), sndBtn.querySelector('i').className = 'fas fa-volume-mute', muted = true); });
  }

  renderOrderSummary();
})();