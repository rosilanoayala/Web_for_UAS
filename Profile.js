document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    alert("🔒 Sesi Anda telah berakhir atau Anda belum masuk. Silakan login.");
    window.location.href = "login.html";
    return;
  }

  // Elemen
  const form = document.getElementById("profileForm");
  const inputNama = document.getElementById("inputNama");
  const inputEmail = document.getElementById("inputEmail");
  const inputTelepon = document.getElementById("inputTelepon");
  const inputAlamat = document.getElementById("inputAlamat");
  const genderRadios = document.querySelectorAll('input[name="gender"]');
  const displayNama = document.getElementById("displayNama");
  const displayEmail = document.getElementById("displayEmail");
  const userAvatar = document.getElementById("userAvatar");
  const statusNotice = document.getElementById("statusNotice");
  const logoutBtn = document.getElementById("logoutBtn");

  // Ganti password
  const oldPass = document.getElementById("oldPassword");
  const newPass = document.getElementById("newPassword");
  const confirmPass = document.getElementById("confirmPassword");
  const changePassBtn = document.getElementById("changePasswordBtn");

  // Komplain
  const complaintSubject = document.getElementById("complaintSubject");
  const complaintMessage = document.getElementById("complaintMessage");
  const sendComplaintBtn = document.getElementById("sendComplaintBtn");
  const complaintListDiv = document.getElementById("complaintList");

  // Load data profil
  function loadProfileInfo() {
    const nama = localStorage.getItem("userName") || "Pengguna";
    const email = localStorage.getItem("userEmail") || "";
    const telepon = localStorage.getItem("userPhone") || "";
    const alamat = localStorage.getItem("userAddress") || "";
    const gender = localStorage.getItem("userGender") || "";

    inputNama.value = nama;
    inputEmail.value = email;
    inputTelepon.value = telepon;
    inputAlamat.value = alamat;
    genderRadios.forEach(radio => {
      if (radio.value === gender) radio.checked = true;
    });

    displayNama.textContent = nama;
    displayEmail.textContent = email;
    userAvatar.textContent = nama.charAt(0).toUpperCase();
  }

  loadProfileInfo();

  // Simpan data diri (termasuk gender)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const namaBaru = inputNama.value.trim();
    const emailBaru = inputEmail.value.trim();
    const teleponBaru = inputTelepon.value.trim();
    const alamatBaru = inputAlamat.value.trim();
    let selectedGender = "";
    genderRadios.forEach(radio => {
      if (radio.checked) selectedGender = radio.value;
    });

    if (namaBaru === "" || emailBaru === "") {
      alert("Nama dan Email tidak boleh kosong!");
      return;
    }

    localStorage.setItem("userName", namaBaru);
    localStorage.setItem("userEmail", emailBaru);
    localStorage.setItem("userPhone", teleponBaru);
    localStorage.setItem("userAddress", alamatBaru);
    localStorage.setItem("userGender", selectedGender);

    loadProfileInfo();
    statusNotice.textContent = "✅ Profil berhasil diperbarui!";
    statusNotice.style.display = "block";
    setTimeout(() => { statusNotice.style.display = "none"; }, 3000);
  });

  changePassBtn.addEventListener("click", () => {
  const old = oldPass.value;
  const newPwd = newPass.value;
  const confirm = confirmPass.value;
  const email = localStorage.getItem("userEmail");
  if (!email) return alert("Email tidak ditemukan.");

  let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  const userIndex = users.findIndex(u => u.email === email);
  if (userIndex === -1) return alert("Akun tidak ditemukan.");
  if (users[userIndex].password !== old) return alert("Password lama salah.");
  if (newPwd.length < 6) return alert("Password baru minimal 6 karakter.");
  if (newPwd !== confirm) return alert("Konfirmasi tidak cocok.");

  users[userIndex].password = newPwd;
  localStorage.setItem("registeredUsers", JSON.stringify(users));
  alert("✅ Password berhasil diubah!");
  oldPass.value = newPass.value = confirmPass.value = "";
});

  // Load & tampilkan komplain
  function loadComplaints() {
    const complaints = JSON.parse(localStorage.getItem("userComplaints") || "[]");
    if (!complaintListDiv) return;
    if (complaints.length === 0) {
      complaintListDiv.innerHTML = "<p style='color:#94a3b8;'>Belum ada komplain.</p>";
      return;
    }
    complaintListDiv.innerHTML = complaints.map((c, idx) => `
      <div class="complaint-item" data-idx="${idx}">
        <strong>📌 ${escapeHtml(c.subject)}</strong>
        <small>${new Date(c.timestamp).toLocaleString()} - ${c.email}</small>
        <p>${escapeHtml(c.message)}</p>
        <button class="btn-delete-complaint" data-idx="${idx}">Hapus</button>
      </div>
    `).join("");

    document.querySelectorAll(".btn-delete-complaint").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = btn.getAttribute("data-idx");
        let arr = JSON.parse(localStorage.getItem("userComplaints") || "[]");
        arr.splice(idx, 1);
        localStorage.setItem("userComplaints", JSON.stringify(arr));
        loadComplaints();
      });
    });
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>]/g, function(m) {
      if (m === "&") return "&amp;";
      if (m === "<") return "&lt;";
      if (m === ">") return "&gt;";
      return m;
    });
  }

  // Kirim komplain
  sendComplaintBtn.addEventListener("click", () => {
    const subject = complaintSubject.value.trim();
    const message = complaintMessage.value.trim();
    const email = localStorage.getItem("userEmail") || "anonymous";
    if (!subject || !message) {
      alert("Subjek dan pesan tidak boleh kosong.");
      return;
    }

    const complaints = JSON.parse(localStorage.getItem("userComplaints") || "[]");
    complaints.unshift({
      subject: subject,
      message: message,
      email: email,
      timestamp: Date.now()
    });
    localStorage.setItem("userComplaints", JSON.stringify(complaints));
    complaintSubject.value = "";
    complaintMessage.value = "";
    loadComplaints();
    alert("✅ Komplain terkirim. Terima kasih atas masukannya.");
  });

  // Logout dengan terminal & hapus semua data
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
    loadingScreen.style.display = 'flex';
    const consoleLines = [
      "Initiating logout protocol...",
      `Terminating session for [${localStorage.getItem("userName")}]...`,
      "Clearing all local data...",
      "Deleting credentials, profile, and history...",
      "Status: [OK]",
      "Disconnection successful.",
      "Goodbye."
    ].join('\n');

    // Hapus SEMUA data user (bukan hanya isLoggedIn)
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userAddress");
    localStorage.removeItem("userGender");
    localStorage.removeItem("userPassword");
    localStorage.removeItem("userComplaints");
    // Jangan hapus redirectAfterLogin jika ingin digunakan nanti

    typeWriter(consoleLines, terminalText, 30, () => {
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 500);
    });
  });

  // Muat komplain saat awal
  loadComplaints();
});