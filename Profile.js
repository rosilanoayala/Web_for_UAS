document.addEventListener("DOMContentLoaded", () => {
  // 1. PROTEKSI LOGIN
  if (localStorage.getItem("isLoggedIn") !== "true") {
    alert("🔒 Sesi Anda telah berakhir atau Anda belum masuk. Silakan login.");
    window.location.href = "login.html";
    return;
  }

  // 2. REFERENSI ELEMEN
  const form = document.getElementById("profileForm");
  const inputNama = document.getElementById("inputNama");
  const inputEmail = document.getElementById("inputEmail");
  const inputTelepon = document.getElementById("inputTelepon");
  const inputAlamat = document.getElementById("inputAlamat");
  
  const displayNama = document.getElementById("displayNama");
  const displayEmail = document.getElementById("displayEmail");
  const userAvatar = document.getElementById("userAvatar");
  const statusNotice = document.getElementById("statusNotice");
  const logoutBtn = document.getElementById("logoutBtn");

  // 3. LOAD DATA DARI LOCAL STORAGE
  function loadProfileInfo() {
    const nama = localStorage.getItem("userName") || "Pengguna";
    const email = localStorage.getItem("userEmail") || "";
    const telepon = localStorage.getItem("userPhone") || "";
    const alamat = localStorage.getItem("userAddress") || "";

    // Isi Form
    inputNama.value = nama;
    inputEmail.value = email;
    inputTelepon.value = telepon;
    inputAlamat.value = alamat;

    // Tampilkan di Kartu
    displayNama.textContent = nama;
    displayEmail.textContent = email;
    userAvatar.textContent = nama.charAt(0).toUpperCase();
  }

  loadProfileInfo();

  // 4. SIMPAN PERUBAHAN
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Mencegah reload halaman

    const namaBaru = inputNama.value.trim();
    const emailBaru = inputEmail.value.trim();
    const teleponBaru = inputTelepon.value.trim();
    const alamatBaru = inputAlamat.value.trim();

    if (namaBaru === "" || emailBaru === "") {
      alert("Nama dan Email tidak boleh kosong!");
      return;
    }

    // Simpan ke memory browser
    localStorage.setItem("userName", namaBaru);
    localStorage.setItem("userEmail", emailBaru);
    localStorage.setItem("userPhone", teleponBaru);
    localStorage.setItem("userAddress", alamatBaru);

    // Update Banner
    loadProfileInfo();

    // Munculkan notifikasi sukses
    statusNotice.textContent = "✅ Profil berhasil diperbarui!";
    statusNotice.style.display = "block";

    setTimeout(() => {
      statusNotice.style.display = "none";
    }, 3000);
  });

  // 5. TERMINAL LOGOUT HACKER
  const loadingScreen = document.getElementById('loadingScreen');
  const terminalText = document.getElementById('terminalText');
  let typeInterval;

  function typeWriter(text, element, speed, callback) {
    let index = 0;
    element.innerHTML = '';
    clearInterval(typeInterval);
    typeInterval = setInterval(() => {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
      } else {
        clearInterval(typeInterval);
        if (callback) callback();
      }
    }, speed);
  }

  logoutBtn.addEventListener("click", () => {
    // Tampilkan terminal
    loadingScreen.style.display = 'flex';
    
    const consoleLines = [
      "Initiating logout protocol...",
      `Terminating active socket connection for [${localStorage.getItem("userName")}]...`,
      "Clearing session vectors...",
      "Flushing local memory cache...",
      "Status: [OK]",
      "Disconnection successful (0ms latency).",
      "Goodbye."
    ].join('\n');

    // Hapus data login namun biarkan data pendaftaran/akun
    localStorage.setItem("isLoggedIn", "false");
    
    // Ketik tulisan ala hacker
    typeWriter(consoleLines, terminalText, 30, () => {
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 500); // Redirect setelah teks habis diketik
    });
  });
});
