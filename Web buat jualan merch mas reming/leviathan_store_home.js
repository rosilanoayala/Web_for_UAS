// ============================================================
//        HOME PAGE JS - LEVIATHAN STORE
// ============================================================
(function(){
  "use strict";

  // ---------- State & Data ----------
  const mockProducts = [
    { id: 'nintendo_switch_2', name: 'Nintendo Switch 2', tier: 'nereid', image: 'assets/console/nintendo_switch_2.jpg' },
    { id: 'xbox_series_x', name: 'Xbox Series X', tier: 'nereid', image: 'assets/console/x_box_series_x.jpg' },
    { id: 'ps5_pro', name: 'PS5 Pro', tier: 'nereid', image: 'assets/console/ps_5_pro.jpg' },
    { id: 'rog_phone_9_pro', name: 'ASUS ROG Phone 9 Pro', tier: 'leviathan', image: 'assets/handphone/leviathan/asus_rog_phone_9_pro.jpg' },
    { id: 'rog_zephyrus_g14_2025', name: 'ROG Zephyrus G14 2025', tier: 'leviathan', image: 'assets/laptop/leviathan/rog_zephyrus_g14_2025.jpg' },
    { id: 'set_eternal_melodies', name: 'Set Eternal Melodies (Miku)', tier: 'sovereign', image: 'assets/set_pc/sovereign/set_eternal_melodies_miku.jpg' },
    { id: 'set_white_devil', name: 'Set White Devil (Gundam)', tier: 'sovereign', image: 'assets/set_pc/sovereign/set_white_devil_gundam.jpg' },
  ];

  let cart = JSON.parse(localStorage.getItem('leviathanCart')) || [];

  // DOM Elements
  const header = document.getElementById('mainHeader');
  const searchInput = document.getElementById('globalSearch');
  const searchClear = document.getElementById('searchClear');
  const searchSuggestions = document.getElementById('searchSuggestions');
  const sliderTrack = document.getElementById('sliderTrack');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const backToTop = document.getElementById('backToTop');
  const toastEl = document.getElementById('toastNotif');
  const toastMsg = document.getElementById('toastMsg');
  const cartBadge = document.getElementById('cartBadge');
  const miniCartItems = document.getElementById('miniCartItems');
  const miniCartTotal = document.getElementById('miniCartTotal');
  const newsletterBtn = document.getElementById('newsletterBtn');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterNote = document.getElementById('newsletterNote');

  let currentSlide = 0;
  const slideCount = document.querySelectorAll('.slide-item').length;

  // ---------- Helper Functions ----------
  function showToast(message, type = 'info') {
    toastMsg.textContent = message;
    toastEl.className = `toast ${type}`;
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 3000);
  }

  function updateCartUI() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartBadge) {
      cartBadge.textContent = totalQty;
      cartBadge.classList.toggle('hidden', totalQty === 0);
    }
    // Update mini cart
    if (miniCartItems) {
      if (cart.length === 0) {
        miniCartItems.innerHTML = '<p class="mini-cart-empty">Cart is empty, Hunter.</p>';
      } else {
        miniCartItems.innerHTML = cart.map(item => `
          <div class="mini-cart-item">
            <img src="${item.image || 'assets/placeholder.png'}" alt="${item.name}">
            <span class="mini-cart-item-name">${item.name}</span>
            <span class="mini-cart-item-price">${item.qty} x ${item.price}</span>
          </div>
        `).join('');
      }
    }
    if (miniCartTotal) {
      const total = cart.reduce((sum, item) => sum + (item.priceValue || 0) * item.qty, 0);
      miniCartTotal.textContent = 'Rp ' + total.toLocaleString('id-ID');
    }
    localStorage.setItem('leviathanCart', JSON.stringify(cart));
  }

  // Simulasi add to cart (bisa dipanggil dari mana saja)
  window.addToCart = function(productId, name, price, priceValue, image) {
    const existing = cart.find(item => item.id === productId);
    if (existing) existing.qty += 1;
    else cart.push({ id: productId, name, price, priceValue, image, qty: 1 });
    updateCartUI();
    showToast(`${name} added to Arsenal`, 'success');
  };

  // ---------- Search Suggestions ----------
  function renderSuggestions(query) {
    if (!query) { searchSuggestions.classList.add('hidden'); return; }
    const filtered = mockProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    if (filtered.length === 0) { searchSuggestions.classList.add('hidden'); return; }
    searchSuggestions.innerHTML = filtered.map(p => `
      <div class="suggestion-item" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}">
        <div class="suggestion-item-info">
          <div class="suggestion-item-name">${p.name}</div>
          <div class="suggestion-item-kasta ${p.tier}">${p.tier.toUpperCase()}</div>
        </div>
      </div>
    `).join('');
    searchSuggestions.classList.remove('hidden');
    document.querySelectorAll('.suggestion-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.dataset.id;
        const prod = mockProducts.find(p => p.id === id);
        if (prod) window.location.href = `leviathan_store_market.html?id=${prod.id}`;
      });
    });
  }

  searchInput.addEventListener('input', (e) => {
    const val = e.target.value;
    searchClear.classList.toggle('hidden', val === '');
    renderSuggestions(val);
  });
  searchClear.addEventListener('click', () => { searchInput.value = ''; searchClear.classList.add('hidden'); searchSuggestions.classList.add('hidden'); });
  document.addEventListener('click', (e) => { if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) searchSuggestions.classList.add('hidden'); });

  // ---------- Slider ----------
  function goToSlide(index) {
    currentSlide = (index + slideCount) % slideCount;
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.slide-item').forEach((el, i) => el.classList.toggle('active', i === currentSlide));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  }
  nextBtn?.addEventListener('click', () => goToSlide(currentSlide + 1));
  prevBtn?.addEventListener('click', () => goToSlide(currentSlide - 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));
  // Auto slide
  setInterval(() => { if (document.visibilityState === 'visible') goToSlide(currentSlide + 1); }, 6000);

  // ---------- Scroll Effects ----------
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 10);
    backToTop?.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ---------- Newsletter ----------
  window.handleNewsletter = function() {
    const email = newsletterEmail.value.trim();
    if (!email) { showToast('Enter your email, Hunter.', 'warning'); return; }
    if (!/^\S+@\S+\.\S+$/.test(email)) { showToast('Invalid email format.', 'error'); return; }
    showToast('Transmission received. Welcome to the Abyss.', 'success');
    newsletterNote.textContent = '✓ You are now linked to the Abyss relay.';
    newsletterEmail.value = '';
    setTimeout(() => newsletterNote.textContent = '', 4000);
  };
  newsletterBtn?.addEventListener('click', handleNewsletter);
  newsletterEmail?.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleNewsletter(); });

  // ---------- Auth Simulation (Login state) ----------
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userEmail = localStorage.getItem('userEmail');
  const authContainer = document.getElementById('authContainer');
  if (isLoggedIn && userEmail) {
    const initial = userEmail.charAt(0).toUpperCase();
    authContainer.innerHTML = `
      <div class="user-profile-info" id="logoutBtn" title="Connected: ${userEmail}">
        <div class="user-initial">${initial}</div>
        <span class="user-email-text">${userEmail}</span>
      </div>
    `;
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
      if (confirm('Disconnect from System Leviathan?')) {
        localStorage.clear();
        location.reload();
      }
    });
  }

  // ---------- Initialize Cart UI ----------
  updateCartUI();

  // ---------- Notif Badge Simulation ----------
  const notifBadge = document.getElementById('notifBadge');
  if (notifBadge) { notifBadge.textContent = '3'; notifBadge.classList.remove('hidden'); }

  // Example: attach quick add to featured cards (optional)
  document.querySelectorAll('.btn-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // bisa tambah tracking atau animasi
    });
  });

})();