(function() {
  const SESSION_KEY = 'roamingSession';
  const CART_KEY = 'roamingCart';

  // ===== FUNGSI SESI =====
  function getSession() {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch(e) { return null; }
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    window.location.reload();
  }

  // ===== FUNGSI BADGE KERANJANG =====
  function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    try {
      const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      if (total > 0) {
        badge.textContent = total;
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    } catch(e) {
      badge.style.display = 'none';
    }
  }

  // ===== RENDER NAVBAR =====
  function renderNavUser() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    // Hapus elemen user lama jika ada (untuk menghindari duplikasi saat pemanggilan ulang)
    const oldUserDiv = nav.querySelector('.nav-user');
    if (oldUserDiv) oldUserDiv.remove();

    const session = getSession();
    const userDiv = document.createElement('div');
    userDiv.className = 'nav-user';

    if (session) {
      userDiv.innerHTML = `
        <button class="nav-user-btn" id="navUserBtn" title="Akun Saya">
          <i class="fas fa-user-circle"></i>
        </button>
        <div class="nav-user-dropdown hidden" id="navUserDropdown">
          <div class="dropdown-header">
            <i class="fas fa-fire"></i> ${session.username}
          </div>
          <a href="profile.html" class="dropdown-profile-link">
            <i class="fas fa-id-card"></i> Profilku
          </a>
          <button class="dropdown-logout" id="dropdownLogoutBtn">
            <i class="fas fa-sign-out-alt"></i> Keluar
          </button>
        </div>
      `;

      const userBtn = userDiv.querySelector('#navUserBtn');
      const dropdown = userDiv.querySelector('#navUserDropdown');
      const logoutBtn = userDiv.querySelector('#dropdownLogoutBtn');

      userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
      });

      logoutBtn.addEventListener('click', () => {
        if (confirm('Keluar dari perapian?')) {
          clearSession();
        }
      });

      document.addEventListener('click', (e) => {
        if (!userDiv.contains(e.target)) {
          dropdown.classList.add('hidden');
        }
      });

    } else {
      userDiv.innerHTML = `
        <a href="login.html" class="nav-login-link" title="Masuk ke Perapian">
          <i class="fas fa-sign-in-alt"></i>
        </a>
      `;
    }

    nav.appendChild(userDiv);
  }

  // ===== INISIALISASI =====
  renderNavUser();
  updateCartBadge();

  // Dengarkan perubahan localStorage dari tab lain (untuk badge keranjang & sesi)
  window.addEventListener('storage', function(e) {
    if (e.key === CART_KEY) {
      updateCartBadge();
    }
    if (e.key === SESSION_KEY) {
      renderNavUser();
    }
  });

  // Expose fungsi updateCartBadge ke global scope agar bisa dipanggil dari skrip lain
  window.updateCartBadge = updateCartBadge;
})();