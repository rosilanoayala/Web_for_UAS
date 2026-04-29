// Profile.js - dengan toggle untuk Ganti Password dan Saran
document.addEventListener('DOMContentLoaded', async () => {
    // Proteksi: jika belum login, redirect
    if (!isLoggedIn()) {
        alert('Silakan login terlebih dahulu');
        window.location.href = 'login.html';
        return;
    }

    // ================= LOAD DATA USER =================
    const email = sessionStorage.getItem('userEmail');
    let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    let currentUser = users.find(u => u.email === email);
    if (!currentUser) {
        alert('Data user tidak ditemukan, silakan login ulang');
        logout();
        return;
    }

    // Tampilkan data di form profil
    const inputNama = document.getElementById('inputNama');
    const inputEmail = document.getElementById('inputEmail');
    const inputTelepon = document.getElementById('inputTelepon');
    const inputAlamat = document.getElementById('inputAlamat');
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    const displayNama = document.getElementById('displayNama');
    const displayEmail = document.getElementById('displayEmail');
    const userAvatar = document.getElementById('userAvatar');

    inputNama.value = currentUser.name || '';
    inputEmail.value = currentUser.email;
    inputEmail.disabled = true; // email tidak bisa diubah
    inputTelepon.value = currentUser.phone || '';
    inputAlamat.value = currentUser.address || '';
    genderRadios.forEach(radio => {
        if (radio.value === currentUser.gender) radio.checked = true;
    });
    displayNama.textContent = currentUser.name || 'Pengguna';
    displayEmail.textContent = currentUser.email;
    userAvatar.textContent = (currentUser.name || 'U').charAt(0).toUpperCase();

    // ================= SIMPAN PERUBAHAN DATA DIRI =================
    document.getElementById('profileForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const newName = inputNama.value.trim();
        const phone = inputTelepon.value.trim();
        const address = inputAlamat.value.trim();
        let gender = '';
        genderRadios.forEach(r => { if (r.checked) gender = r.value; });

        if (!newName) {
            showNotice('statusNotice', 'Nama tidak boleh kosong', true);
            return;
        }
        if (phone && !isValidPhone(phone)) {
            showNotice('statusNotice', 'Nomor telepon harus 10-13 digit', true);
            return;
        }

        const index = users.findIndex(u => u.email === email);
        users[index].name = newName;
        users[index].phone = phone;
        users[index].address = address;
        users[index].gender = gender;
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        sessionStorage.setItem('userName', newName);
        displayNama.textContent = newName;
        userAvatar.textContent = newName.charAt(0).toUpperCase();
        showNotice('statusNotice', '✅ Profil berhasil diperbarui', false);
    });

    // ================= TOGGLE GANTI PASSWORD =================
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const passwordSection = document.getElementById('passwordSection');
    togglePasswordBtn.addEventListener('click', () => {
        if (passwordSection.classList.contains('hidden-section')) {
            passwordSection.classList.remove('hidden-section');
            togglePasswordBtn.textContent = '🔒 Sembunyikan Form Ganti Password';
        } else {
            passwordSection.classList.add('hidden-section');
            togglePasswordBtn.textContent = '🔐 Ganti Password';
        }
    });

    // ================= GANTI PASSWORD =================
    document.getElementById('changePasswordBtn').addEventListener('click', async () => {
        const oldPwd = document.getElementById('oldPassword').value;
        const newPwd = document.getElementById('newPassword').value;
        const confirm = document.getElementById('confirmPassword').value;

        if (!oldPwd || !newPwd || !confirm) {
            showNotice('statusNotice', 'Semua field password harus diisi', true);
            return;
        }
        const hashedOld = await hashPassword(oldPwd);
        if (hashedOld !== currentUser.passwordHash) {
            showNotice('statusNotice', 'Password lama salah', true);
            return;
        }
        if (!isStrongPassword(newPwd)) {
            showNotice('statusNotice', 'Password baru minimal 6 karakter dan mengandung angka', true);
            return;
        }
        if (newPwd !== confirm) {
            showNotice('statusNotice', 'Password baru tidak cocok', true);
            return;
        }
        const hashedNew = await hashPassword(newPwd);
        const index = users.findIndex(u => u.email === email);
        users[index].passwordHash = hashedNew;
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        showNotice('statusNotice', '✅ Password berhasil diubah', false);
        document.getElementById('oldPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    });

    // ================= TOGGLE KOMPLAIN / SARAN =================
    const toggleComplaintBtn = document.getElementById('toggleComplaintBtn');
    const complaintSection = document.getElementById('complaintSection');
    toggleComplaintBtn.addEventListener('click', () => {
        if (complaintSection.classList.contains('hidden-section')) {
            complaintSection.classList.remove('hidden-section');
            toggleComplaintBtn.textContent = '📝 Sembunyikan Form Komplain';
        } else {
            complaintSection.classList.add('hidden-section');
            toggleComplaintBtn.textContent = '📢 Kirim Komplain / Saran';
        }
    });

    // ================= KIRIM KOMPLAIN =================
    document.getElementById('sendComplaintBtn').addEventListener('click', () => {
        const subject = document.getElementById('complaintSubject').value.trim();
        const message = document.getElementById('complaintMessage').value.trim();
        if (!subject || !message) {
            showNotice('statusNotice', 'Subjek dan pesan harus diisi', true);
            return;
        }
        let complaints = JSON.parse(localStorage.getItem('userComplaints')) || [];
        complaints.unshift({
            subject, message,
            email: currentUser.email,
            timestamp: Date.now()
        });
        localStorage.setItem('userComplaints', JSON.stringify(complaints));
        showNotice('statusNotice', '✅ Komplain terkirim', false);
        document.getElementById('complaintSubject').value = '';
        document.getElementById('complaintMessage').value = '';
        loadComplaints();
    });

    // ================= LOAD RIWAYAT KOMPLAIN =================
    function loadComplaints() {
        const complaints = JSON.parse(localStorage.getItem('userComplaints')) || [];
        const container = document.getElementById('complaintList');
        if (complaints.length === 0) {
            container.innerHTML = '<p style="color:#94a3b8;">Belum ada komplain.</p>';
            return;
        }
        container.innerHTML = complaints.map((c, idx) => `
            <div class="complaint-item" data-idx="${idx}">
                <strong>📌 ${escapeHtml(c.subject)}</strong>
                <small>${new Date(c.timestamp).toLocaleString()} - ${c.email}</small>
                <p>${escapeHtml(c.message)}</p>
                <button class="btn-delete-complaint" data-idx="${idx}">Hapus</button>
            </div>
        `).join('');
        // Event listener untuk tombol hapus
        document.querySelectorAll('.btn-delete-complaint').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = btn.getAttribute('data-idx');
                let arr = JSON.parse(localStorage.getItem('userComplaints') || '[]');
                arr.splice(idx, 1);
                localStorage.setItem('userComplaints', JSON.stringify(arr));
                loadComplaints();
            });
        });
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    loadComplaints();

    // ================= LOGOUT =================
    const loadingScreen = document.getElementById('loadingScreen');
    const terminalText = document.getElementById('terminalText');
    document.getElementById('logoutBtn').addEventListener('click', () => {
        if (loadingScreen && terminalText) {
            loadingScreen.style.display = 'flex';
            terminalText.textContent = '';
            const lines = [
                "#include <iostream>",
                "using namespace std;",
                "",
                "int main(){",
                '    cout << "Clearing session...\\n";',
                '    cout << "Destroying token...\\n";',
                '    cout << "Logging out user...\\n";',
                "    return 0;",
                "}",
                "",
                "$ g++ logout.cpp -o logoutApp",
                "Compiling...",
                "Build successful.",
                "Running program...",
                "Session terminated successfully ✔"
            ];
            let i = 0, j = 0;
            function type() {
                if (i >= lines.length) {
                    setTimeout(() => {
                        logout();
                    }, 800);
                    return;
                }
                if (j < lines[i].length) {
                    terminalText.textContent += lines[i][j++];
                    setTimeout(type, 18);
                } else {
                    terminalText.textContent += "\n";
                    i++; j = 0;
                    setTimeout(type, 250);
                }
            }
            type();
        } else {
            logout();
        }
    });
});