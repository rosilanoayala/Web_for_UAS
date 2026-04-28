(function() {
  const SESSION_KEY = 'roamingSession';

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

  const session = getSession();
  const nav = document.querySelector('nav');

  if (nav) {
    // Buat container user di pojok kanan
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
          <button class="dropdown-logout" id="dropdownLogoutBtn">
            <i class="fas fa-sign-out-alt"></i> Keluar
          </button>
        </div>
      `;

      const userBtn = userDiv.querySelector('#navUserBtn');
      const dropdown = userDiv.querySelector('#navUserDropdown');
      const logoutBtn = userDiv.querySelector('#dropdownLogoutBtn');

      // Toggle dropdown
      userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
      });

      // Logout
      logoutBtn.addEventListener('click', () => {
        if (confirm('Keluar dari perapian?')) {
          clearSession();
        }
      });

      // Klik di luar tutup dropdown
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

    nav.appendChild(userDiv);
  }
})();