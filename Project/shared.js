// shared.js - Fungsi utilitas untuk semua halaman

// ================= HASH PASSWORD (SHA-256) =================
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ================= VALIDASI EMAIL =================
function isValidEmail(email) {
    const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return re.test(email);
}

// ================= VALIDASI PASSWORD (min 6 karakter, minimal 1 angka) =================
function isStrongPassword(pwd) {
    return pwd.length >= 6 && /[0-9]/.test(pwd);
}

// ================= VALIDASI NOMOR TELEPON (opsional, minimal 10 digit) =================
function isValidPhone(phone) {
    return /^[0-9]{10,13}$/.test(phone);
}

// ================= TAMPILKAN PESAN ERROR/NOTICE =================
function showNotice(elementId, message, isError = true) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = message;
    el.style.display = 'block';
    el.style.backgroundColor = isError ? '#fee2e2' : '#e0f2fe';
    el.style.color = isError ? '#b91c1c' : '#0c4e6e';
    setTimeout(() => { el.style.display = 'none'; }, 4000);
}

// ================= CEK STATUS LOGIN (untuk proteksi halaman) =================
function isLoggedIn() {
    return sessionStorage.getItem('isLoggedIn') === 'true';
}

// ================= LOGOUT (bersihkan session & localStorage) =================
function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    // Jangan hapus registeredUsers, biarkan tetap ada
    window.location.href = 'login.html';
}