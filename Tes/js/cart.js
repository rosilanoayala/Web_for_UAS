(function() {
  const CART_KEY = 'roamingCart';

  function getCart() {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function formatPrice(price) {
    return 'Rp ' + price.toLocaleString('id-ID');
  }

  function renderCart() {
    const cart = getCart();
    const itemsContainer = document.getElementById('cartItems');
    const emptyState = document.getElementById('cartEmpty');
    const cartContent = document.getElementById('cartContent');
    const cartTotal = document.getElementById('cartTotal');
    const btnCheckout = document.getElementById('btnCheckout');

    if (!itemsContainer || !emptyState || !cartContent) return;

    if (cart.length === 0) {
      cartContent.classList.add('hidden');
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');
    cartContent.classList.remove('hidden');

    let totalPrice = 0;
    itemsContainer.innerHTML = '';

    cart.forEach(item => {
      totalPrice += item.price * item.quantity;

      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <div class="item-info">
          <div class="item-name">${item.title}</div>
          <div class="item-price">${formatPrice(item.price)} / item</div>
        </div>
        <div class="item-quantity">
          <button class="btn-qty minus" data-id="${item.id}">−</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="btn-qty plus" data-id="${item.id}">+</button>
        </div>
        <div class="item-total">${formatPrice(item.price * item.quantity)}</div>
        <button class="btn-remove" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
      `;
      itemsContainer.appendChild(itemEl);
    });

    if (cartTotal) cartTotal.textContent = formatPrice(totalPrice);
    if (btnCheckout) btnCheckout.disabled = false;

    // Event listeners
    itemsContainer.querySelectorAll('.minus').forEach(btn => {
      btn.addEventListener('click', () => changeQty(btn.dataset.id, -1));
    });
    itemsContainer.querySelectorAll('.plus').forEach(btn => {
      btn.addEventListener('click', () => changeQty(btn.dataset.id, 1));
    });
    itemsContainer.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', () => removeItem(btn.dataset.id));
    });
  }

  function changeQty(id, delta) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        const index = cart.indexOf(item);
        cart.splice(index, 1);
      }
    }
    saveCart(cart);
    renderCart();
    if (window.updateCartBadge) window.updateCartBadge();
  }

  function removeItem(id) {
    let cart = getCart();
    cart = cart.filter(i => i.id !== id);
    saveCart(cart);
    renderCart();
    if (window.updateCartBadge) window.updateCartBadge();
  }

  // Checkout
  const btnCheckout = document.getElementById('btnCheckout');
  if (btnCheckout) {
    btnCheckout.addEventListener('click', () => {
      const cart = getCart();
      if (cart.length === 0) {
        alert('Keranjang masih kosong.');
        return;
      }
      alert('Fitur pembayaran akan segera hadir! 🔥');
    });
  }

  // Clear cart
  const btnClear = document.getElementById('btnClearCart');
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      if (confirm('Kosongkan seluruh keranjang?')) {
        saveCart([]);
        renderCart();
        if (window.updateCartBadge) window.updateCartBadge();
      }
    });
  }

  // Canvas footer
  const canvas = document.getElementById('fireCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
      canvas.width = canvas.parentElement.clientWidth * 0.9 || 800;
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

  // Audio
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

  renderCart();
})();