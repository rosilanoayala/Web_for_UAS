// shared.js - Fungsi utilitas untuk semua halaman [VERSI DIPERBAIKI]

// ================= HASH PASSWORD (SHA-256) =================
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ================= VALIDASI EMAIL =================
// ✅ FIX: Regex yang benar untuk validasi email sederhana
function isValidEmail(email) {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// ================= VALIDASI PASSWORD =================
// ✅ FIX: Gunakan \d atau [0-9] tanpa backslash ekstra
function isStrongPassword(pwd) {
  if (!pwd) return false;
  return pwd.length >= 6 && /\d/.test(pwd);
}

// ================= VALIDASI NOMOR TELEPON =================
// ✅ FIX: Regex benar + handle format dengan spasi/-/()
function isValidPhone(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  return /^[0-9]{10,13}$/.test(cleaned);
}

// ================= TAMPILKAN PESAN ERROR/NOTICE =================
function showNotice(elementId, message, isError = true) {
  const el = document.getElementById(elementId);
  if (!el) {
    console.warn(`Element dengan id "${elementId}" tidak ditemukan`);
    return;
  }
  el.textContent = message;
  el.style.display = 'block';
  el.style.backgroundColor = isError ? '#fee2e2' : '#e0f2fe';
  el.style.color = isError ? '#b91c1c' : '#0c4e6e';
  el.style.padding = '10px 14px';
  el.style.borderRadius = '8px';
  el.style.marginBottom = '16px';
  el.style.fontSize = '0.875rem';
  el.style.fontWeight = '600';
  el.style.border = `1px solid ${isError ? '#fecaca' : '#bae6fd'}`;
  
  // Auto hide setelah 4 detik
  setTimeout(() => { 
    el.style.transition = 'opacity 0.3s';
    el.style.opacity = '0';
    setTimeout(() => { el.style.display = 'none'; }, 300);
  }, 4000);
}

// ================= CEK STATUS LOGIN =================
function isLoggedIn() {
  return sessionStorage.getItem('isLoggedIn') === 'true';
}

function getCurrentUser() {
  return {
    email: sessionStorage.getItem('userEmail'),
    name: sessionStorage.getItem('userName'),
    isGuest: sessionStorage.getItem('isGuest') === 'true'
  };
}

// ================= LOGOUT =================
function logout() {
  sessionStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('userEmail');
  sessionStorage.removeItem('userName');
  sessionStorage.removeItem('isGuest');
  
  // Redirect ke login dengan pesan
  localStorage.setItem('loginMessage', '✅ Anda telah logout.');
  window.location.href = 'login.html';
}

// ================= REDIRECT AMAN =================
function safeRedirect(url) {
  if (!url || typeof url !== 'string') return;
  // Cegah javascript: protocol
  if (url.toLowerCase().startsWith('javascript:')) return;
  window.location.href = url;
}

// ================= UPDATE NAVBAR DINAMIS =================
// ✅ FIX: Fungsi ini akan dipanggil di setiap halaman yang punya navbar
function updateNavbarAuth() {
  const authBtn = document.getElementById('authButton');
  const logoutBtn = document.getElementById('logoutBtn');
  const accountWrapper = document.getElementById('accountWrapper');
  
  if (!authBtn) return; // Tidak ada navbar, skip
  
  const user = getCurrentUser();
  
  if (user.isLoggedIn || user.name || user.email) {
    // User sudah login
    const displayName = user.name || user.email || 'User';
    const initial = displayName.charAt(0).toUpperCase();
    
    authBtn.innerHTML = `
      <span class="user-avatar">${initial}</span>
      <span class="user-name">${displayName}</span>
      <span class="dropdown-arrow">▼</span>
    `;
    authBtn.href = '#';
    authBtn.onclick = (e) => {
      e.preventDefault();
      if (accountWrapper) {
        accountWrapper.classList.toggle('active');
      }
    };
    
    if (logoutBtn) {
      logoutBtn.style.display = 'block';
      logoutBtn.onclick = (e) => {
        e.preventDefault();
        logout();
      };
    }
  } else {
    // User belum login
    authBtn.innerHTML = '🔐 Login / Daftar';
    authBtn.href = '#';
    authBtn.onclick = (e) => {
      e.preventDefault();
      // Simpan halaman saat ini untuk redirect setelah login
      if (window.location.pathname.includes('Project/')) {
        localStorage.setItem('redirectAfterLogin', window.location.href);
      }
      window.location.href = 'login.html';
    };
    
    if (logoutBtn) {
      logoutBtn.style.display = 'none';
    }
  }
  
  // Tutup dropdown saat klik di luar
  document.addEventListener('click', (e) => {
    if (accountWrapper && !accountWrapper.contains(e.target) && e.target !== authBtn) {
      accountWrapper.classList.remove('active');
    }
  });
}

// ================= INISIALISASI GLOBAL =================
// ✅ FIX: Pastikan fungsi ini dipanggil setelah DOM load di setiap halaman
function initSharedFeatures() {
  // Update navbar jika ada
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavbarAuth);
  } else {
    updateNavbarAuth();
  }
}