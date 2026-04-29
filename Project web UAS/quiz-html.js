// ================= BANK SOAL HTML (50 soal berdasarkan TutorialHTML) =================
const Html = [
    // 1. HTML Introduction
    { text: "Apa kepanjangan dari HTML?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correct: 0, explanation: "HTML adalah singkatan dari Hyper Text Markup Language, bahasa standar untuk membuat halaman web." },
    // 2. Tag gambar
    { text: "Tag HTML mana yang digunakan untuk menampilkan gambar?", options: ["<img>", "<pic>", "<src>", "</table>"], correct: 0, explanation: "Tag <img> digunakan untuk menampilkan gambar. Atribut src menentukan URL gambar." },
    // 3. Semantic HTML
    { text: "Manakah yang merupakan elemen semantic HTML?", options: ["<div>", "<span>", "<article>", "<b>"], correct: 2, explanation: "<article> adalah elemen semantic karena memiliki makna (artikel mandiri). <div> dan <span> tidak memiliki makna khusus." },
    // 4. Atribut alt
    { text: "Atribut mana yang digunakan untuk memberikan deskripsi teks alternatif pada gambar?", options: ["title", "alt", "src", "href"], correct: 1, explanation: "Atribut alt memberikan teks alternatif jika gambar gagal dimuat, dan membantu aksesibilitas." },
    // 5. Komentar
    { text: "Manakah yang benar untuk membuat komentar di HTML?", options: ["// komentar", "/* komentar */", "<!-- komentar -->", "# komentar"], correct: 2, explanation: "Komentar HTML ditulis dengan <!-- ... -->. Tidak akan ditampilkan di browser." },
    // 6. Hyperlink
    { text: "Tag HTML manakah yang digunakan untuk membuat hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], correct: 1, explanation: "Tag <a> (anchor) digunakan untuk membuat hyperlink. Atribut href menentukan tujuan link." },
    // 7. Block-level
    { text: "Manakah yang termasuk elemen block-level di HTML?", options: ["<span>", "<div>", "<img>", "<a>"], correct: 1, explanation: "<div> adalah elemen block-level yang memenuhi lebar parent. <span> adalah inline." },
    // 8. target blank
    { text: "Atribut `target=\"_blank\"` pada tag <a> berfungsi untuk?", options: ["Membuka link di tab yang sama", "Membuka link di tab baru", "Membuka link di frame", "Membuka link di jendela baru"], correct: 1, explanation: "target=\"_blank\" membuka link di tab atau jendela browser baru." },
    // 9. Ordered list
    { text: "Tag HTML manakah untuk membuat daftar berurutan (numbered list)?", options: ["<ul>", "<ol>", "<li>", "<dl>"], correct: 1, explanation: "<ol> (ordered list) digunakan untuk daftar berurutan dengan angka atau huruf." },
    // 10. meta charset
    { text: "Apa fungsi dari tag <meta charset=\"UTF-8\">?", options: ["Mengatur warna teks", "Mengatur encoding karakter", "Mengatur ukuran font", "Mengatur layout halaman"], correct: 1, explanation: "meta charset menentukan encoding karakter agar teks seperti aksara lokal tidak rusak." },
    // 11. Atribut wajib img
    { text: "Manakah yang merupakan atribut wajib pada tag <img>?", options: ["src dan alt", "src dan title", "width dan height", "alt dan title"], correct: 0, explanation: "src (sumber gambar) dan alt (teks alternatif) adalah atribut wajib pada tag <img>." },
    // 12. Line break
    { text: "Tag HTML manakah untuk membuat baris baru?", options: ["<br>", "<p>", "<hr>", "<div>"], correct: 0, explanation: "<br> (break) digunakan untuk membuat baris baru tanpa memulai paragraf baru." },
    // 13. Heading terbesar
    { text: "Manakah tag untuk heading terbesar?", options: ["<h1>", "<h2>", "<h6>", "<head>"], correct: 0, explanation: "<h1> adalah heading level tertinggi (paling besar dan penting)." },
    // 14. Title tag
    { text: "Apa fungsi dari tag <title>?", options: ["Menampilkan judul di body", "Menampilkan judul di tab browser", "Membuat tooltip", "Membuat heading"], correct: 1, explanation: "Tag <title> menentukan judul halaman yang muncul di tab browser." },
    // 15. Paragraf
    { text: "Manakah yang benar untuk membuat paragraf?", options: ["<para>", "<p>", "<pg>", "<paragraph>"], correct: 1, explanation: "Tag <p> digunakan untuk membuat paragraf." },
    // 16. href
    { text: "Atribut `href` pada tag <a> berfungsi untuk?", options: ["Menentukan warna link", "Menentukan URL tujuan", "Menentukan target", "Menentukan ukuran link"], correct: 1, explanation: "href (Hypertext Reference) menentukan alamat tujuan link." },
    // 17. Void element
    { text: "Manakah yang merupakan elemen void (tidak memiliki tag penutup)?", options: ["<div>", "<p>", "<img>", "<h1>"], correct: 2, explanation: "<img> adalah void element, tidak memiliki tag penutup." },
    // 18. Strong vs bold
    { text: "Apa fungsi dari tag <strong>?", options: ["Membuat teks tebal secara visual", "Memberi penekanan penting (semantik)", "Membuat teks miring", "Membuat teks besar"], correct: 1, explanation: "<strong> memberi penekanan penting (secara semantik), tidak hanya visual." },
    // 19. Unordered list
    { text: "Manakah yang digunakan untuk membuat daftar tidak berurutan (bullet list)?", options: ["<ul>", "<ol>", "<li>", "<dl>"], correct: 0, explanation: "<ul> (unordered list) digunakan untuk daftar dengan bullet." },
    // 20. Heading level
    { text: "Apa output dari tag `<h1>Judul</h1>`?", options: ["Judul kecil", "Judul besar", "Judul miring", "Judul tebal"], correct: 1, explanation: "<h1> menghasilkan heading terbesar." },
    // 21. Tabel
    { text: "Manakah tag untuk membuat tabel?", options: ["<table>", "<tab>", "<tbl>", "<grid>"], correct: 0, explanation: "Tag <td> digunakan untuk membuat tabel." },
    // 22. Colspan
    { text: "Atribut `colspan` pada tag <td> berfungsi untuk?", options: ["Menggabungkan baris", "Menggabungkan kolom", "Mengatur warna", "Mengatur lebar"], correct: 1, explanation: "colspan menggabungkan beberapa kolom menjadi satu sel." },
    // 23. Form method
    { text: "Tag `<form>` memiliki atribut `method` dengan nilai apa saja?", options: ["GET dan POST", "SEND dan RECEIVE", "PUT dan DELETE", "HEAD dan BODY"], correct: 0, explanation: "Method GET dan POST digunakan untuk mengirim data form." },
    // 24. Radio button
    { text: "Manakah tipe input untuk menampilkan tombol radio?", options: ["radio", "checkbox", "button", "submit"], correct: 0, explanation: "input type='radio' untuk tombol pilihan tunggal." },
    // 25. Label
    { text: "Apa fungsi dari tag `<label>`?", options: ["Memberi label pada input", "Membuat teks tebal", "Membuat heading", "Membuat link"], correct: 0, explanation: "Tag <label> menghubungkan teks dengan input, meningkatkan aksesibilitas." },
    // 26. Semantic header
    { text: "Manakah yang termasuk elemen semantic HTML5?", options: ["<header>", "<div>", "<span>", "<b>"], correct: 0, explanation: "<header> adalah elemen semantic untuk bagian atas halaman." },
    // 27. Footer
    { text: "Apa fungsi dari tag `<footer>`?", options: ["Bagian bawah halaman", "Bagian atas halaman", "Navigasi", "Konten utama"], correct: 0, explanation: "<footer> merepresentasikan footer dari halaman atau section." },
    // 28. External CSS
    { text: "Manakah yang benar untuk menyisipkan CSS eksternal?", options: ["<link rel='stylesheet' href='style.css'>", "<style src='style.css'>", "<css src='style.css'>", "<script src='style.css'>"], correct: 0, explanation: "<link> dengan rel='stylesheet' digunakan untuk menghubungkan file CSS eksternal." },
    // 29. Placeholder
    { text: "Atribut `placeholder` pada input digunakan untuk?", options: ["Memberi nilai default", "Memberi teks petunjuk", "Memberi nama input", "Memberi validasi"], correct: 1, explanation: "placeholder menampilkan teks petunjuk di dalam input." },
    // 30. Inline element
    { text: "Manakah yang merupakan elemen inline?", options: ["<div>", "<p>", "<span>", "<h1>"], correct: 2, explanation: "<span> adalah elemen inline, tidak memulai baris baru." },
    // 31. DOCTYPE
    { text: "Apa fungsi dari `<!DOCTYPE html>`?", options: ["Memberi tahu jenis dokumen HTML5", "Mendeklarasikan CSS", "Membuat komentar", "Mendefinisikan JavaScript"], correct: 0, explanation: "DOCTYPE memberi tahu browser bahwa dokumen menggunakan HTML5." },
    // 32. Horizontal rule
    { text: "Tag HTML manakah untuk membuat garis horizontal?", options: ["<hr>", "<br>", "<line>", "<rule>"], correct: 0, explanation: "<hr> (horizontal rule) membuat garis horizontal." },
    // 33. Target blank (ulang)
    { text: "Manakah atribut untuk membuka link di tab baru?", options: ["target='_self'", "target='_blank'", "target='_top'", "target='_parent'"], correct: 1, explanation: "target='_blank' membuka link di tab atau jendela baru." },
    // 34. Unordered list fungsi
    { text: "Apa fungsi dari tag `<ul>`?", options: ["Daftar berurutan", "Daftar tidak berurutan", "Daftar definisi", "Daftar tabel"], correct: 1, explanation: "<ul> (unordered list) membuat daftar dengan bullet." },
    // 35. Table header
    { text: "Manakah tag untuk membuat sel header tabel?", options: ["<td>", "<th>", "<tr>", "<thead>"], correct: 1, explanation: "<th> (table header) digunakan untuk sel judul kolom/baris." },
    // 36. Required attribute
    { text: "Apa fungsi dari atribut `required` pada input?", options: ["Membuat input wajib diisi", "Memberi nilai default", "Mematikan input", "Membuat input read-only"], correct: 0, explanation: "required membuat field harus diisi sebelum form disubmit." },
    // 37. Video tag
    { text: "Manakah yang merupakan tag untuk menampilkan video?", options: ["<video>", "<media>", "<movie>", "<vid>"], correct: 0, explanation: "Tag <video> digunakan untuk menyematkan video." },
    // 38. Nav tag
    { text: "Apa fungsi dari tag `<nav>`?", options: ["Navigasi menu", "Footer", "Header", "Section"], correct: 0, explanation: "<nav> digunakan untuk menu navigasi." },
    // 39. HTML entity less than
    { text: "Manakah yang merupakan karakter escape untuk tanda kurang dari (<) di HTML?", options: ["&lt;", "&gt;", "&amp;", "&copy;"], correct: 0, explanation: "&lt; adalah entity untuk tanda <." },
    // 40. Iframe
    { text: "Apa fungsi dari tag `<iframe>`?", options: ["Menyematkan halaman lain", "Menyematkan gambar", "Menyematkan audio", "Menyematkan video"], correct: 0, explanation: "iframe digunakan untuk menyematkan dokumen HTML lain di dalam halaman." },
    // 41. Tabel width
    { text: "Manakah yang merupakan atribut untuk mengatur lebar tabel?", options: ["width", "height", "size", "colwidth"], correct: 0, explanation: "Atribut width (dalam HTML) atau CSS width mengatur lebar tabel." },
    // 42. Line break output
    { text: "Apa output dari `<p>Halo<br>Dunia</p>`?", options: ["Halo Dunia (satu baris)", "Halo\nDunia (dua baris)", "Halo<br>Dunia (teks mentah)", "Error"], correct: 1, explanation: "<br> membuat baris baru, sehingga teks tampil dua baris." },
    // 43. Dropdown
    { text: "Manakah tag untuk membuat dropdown list?", options: ["<select>", "<dropdown>", "<list>", "<input type='dropdown'>"], correct: 0, explanation: "Tag <select> dengan <option> membuat dropdown." },
    // 44. Fieldset
    { text: "Apa fungsi dari tag `<fieldset>`?", options: ["Mengelompokkan elemen form", "Membuat field input", "Membuat legend", "Membuat button"], correct: 0, explanation: "<fieldset> mengelompokkan elemen-elemen dalam form." },
    // 45. Input password
    { text: "Manakah yang merupakan nilai dari atribut `type` pada input untuk password?", options: ["text", "password", "secret", "hidden"], correct: 1, explanation: "input type='password' menyembunyikan karakter yang diketik." },
    // 46. Article
    { text: "Apa fungsi dari tag `<article>`?", options: ["Konten independen (artikel, berita)", "Navigasi", "Footer", "Header"], correct: 0, explanation: "<article> untuk konten yang berdiri sendiri, seperti posting blog." },
    // 47. Subscript
    { text: "Manakah tag untuk membuat subscript (tulisan kecil di bawah)?", options: ["<sub>", "<sup>", "<small>", "<down>"], correct: 0, explanation: "<sub> (subscript) membuat teks kecil di bawah garis normal." },
    // 48. Aside
    { text: "Apa fungsi dari tag `<aside>`?", options: ["Konten sampingan (sidebar)", "Konten utama", "Navigasi", "Footer"], correct: 0, explanation: "<aside> untuk konten yang terkait namun tidak utama (misal sidebar)." },
    // 49. Class selector
    { text: "Manakah yang merupakan cara menuliskan class di CSS?", options: [".nama", "#nama", "*nama", "nama"], correct: 0, explanation: "Class selector dalam CSS ditulis dengan titik." },
    // 50. Div vs span
    { text: "Apa perbedaan utama antara `<div>` dan `<span>`?", options: ["<div> inline, <span> block", "<div> block, <span> inline", "Keduanya block", "Keduanya inline"], correct: 1, explanation: "<div> adalah elemen block (mengambil lebar penuh), <span> adalah inline (tidak memulai baris baru)." }
];

// ================= KONFIGURASI (GANTI SESUAI BAHASA) =================
const QUESTIONS_PER_SESSION = 10;          // Jumlah soal per sesi
const LEADERBOARD_KEY = 'quiz_html_leaderboard';  // Kunci localStorage (harus unik per bahasa)
const MAX_LEADERBOARD = 10;                // Maksimal entri leaderboard

let quizActive = true;                     // Status quiz (untuk proteksi navbar)
let scoreSaved = false;                    // Pelacak: apakah skor sudah disimpan?

// ================= FUNGSI UTILITAS =================

/** Mengunci/membuka navbar saat quiz berlangsung */
function setNavbarLock(locked) {
    const logoutBtn = document.getElementById('logoutBtn');
    const profileLink = document.querySelector('.dropdown-menu a[href="Profile.html"]');
    if (locked) {
        if (logoutBtn) {
            logoutBtn.style.pointerEvents = 'none';
            logoutBtn.style.opacity = '0.5';
            logoutBtn.title = 'Tidak bisa logout saat quiz berlangsung';
        }
        if (profileLink) {
            profileLink.style.pointerEvents = 'none';
            profileLink.style.opacity = '0.5';
            profileLink.title = 'Tidak bisa buka profile saat quiz berlangsung';
        }
    } else {
        if (logoutBtn) {
            logoutBtn.style.pointerEvents = 'auto';
            logoutBtn.style.opacity = '1';
            logoutBtn.title = '';
        }
        if (profileLink) {
            profileLink.style.pointerEvents = 'auto';
            profileLink.style.opacity = '1';
            profileLink.title = '';
        }
    }
}

/** Mengacak array (Fisher–Yates) */
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/** Memilih n soal acak dari bank soal */
function selectRandomQuestions(n) {
    const shuffledBank = shuffleArray([...Html]);
    return shuffledBank.slice(0, n);
}

/** Escape karakter HTML untuk mencegah XSS */
function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// ================= LEADERBOARD STORAGE =================

function getLeaderboard() {
    const data = localStorage.getItem(LEADERBOARD_KEY);
    return data ? JSON.parse(data) : [];
}

function saveLeaderboard(leaderboard) {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
}

function addScoreToLeaderboard(name, score) {
    if (!name || name.trim() === '') name = 'Anonymous';
    name = name.trim().substring(0, 20);
    const newEntry = { name, score, date: new Date().toLocaleString() };
    let leaderboard = getLeaderboard();
    leaderboard.push(newEntry);
    leaderboard.sort((a, b) => {
        if (a.score !== b.score) return b.score - a.score;
        return new Date(b.date) - new Date(a.date);
    });
    leaderboard = leaderboard.slice(0, MAX_LEADERBOARD);
    saveLeaderboard(leaderboard);
    return leaderboard;
}

function renderLeaderboard() {
    const leaderboard = getLeaderboard();
    const container = document.getElementById('leaderboardList');
    if (!container) return;
    if (leaderboard.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:20px;">Belum ada data. Selesaikan quiz dan simpan skor Anda!</div>';
        return;
    }
    let html = '';
    leaderboard.forEach((entry, idx) => {
        let rankClass = '';
        if (idx === 0) rankClass = 'top-1';
        else if (idx === 1) rankClass = 'top-2';
        else if (idx === 2) rankClass = 'top-3';
        html += `
            <div class="leaderboard-item ${rankClass}">
                <div class="rank">${idx + 1}</div>
                <div class="name">${escapeHtml(entry.name)}</div>
                <div class="score">${entry.score}</div>
                <div class="date">${entry.date}</div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function resetLeaderboard() {
    if (confirm('Hapus semua data peringkat? Tindakan ini tidak bisa dibatalkan.')) {
        localStorage.removeItem(LEADERBOARD_KEY);
        renderLeaderboard();
        alert('Peringkat telah direset.');
    }
}

// ================= STATE KUIS =================
let currentQuestions = [];
let currentIndex = 0;
let userAnswers = [];
let totalQuestions = QUESTIONS_PER_SESSION;
let finalScore = 0;

// DOM elements
const questionText = document.getElementById('questionText');
const optionsList = document.getElementById('optionsList');
const feedbackArea = document.getElementById('feedbackArea');
const restartArea = document.getElementById('restartArea');
const quizCard = document.getElementById('quizCard');
const questionCounter = document.getElementById('questionCounter');
const progressFill = document.getElementById('progressFill');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const finalScoreSpan = document.getElementById('finalScore');
const totalQuestionsSpan = document.getElementById('totalQuestions');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const resetLeaderboardBtn = document.getElementById('resetLeaderboardBtn');
const playerNameInput = document.getElementById('playerName');

// ================= FUNGSI QUIZ =================

function updateProgress() {
    questionCounter.textContent = `Soal ${currentIndex + 1} / ${totalQuestions}`;
    const percent = (currentIndex / totalQuestions) * 100;
    progressFill.style.width = `${percent}%`;
}

function renderCurrentQuestion() {
    const q = currentQuestions[currentIndex];
    questionText.textContent = q.text;
    const prefixes = ['A', 'B', 'C', 'D'];
    let html = '';
    q.options.forEach((opt, idx) => {
        html += `
            <div class="option-btn" data-opt-index="${idx}">
                <span class="option-prefix">${prefixes[idx]}</span>
                <span>${escapeHtml(opt)}</span>
            </div>
        `;
    });
    optionsList.innerHTML = html;
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.optIndex)));
    });
    feedbackArea.style.display = 'none';
}

function handleAnswer(selectedIdx) {
    if (userAnswers[currentIndex]) return;
    const q = currentQuestions[currentIndex];
    const isCorrect = (selectedIdx === q.correct);
    userAnswers[currentIndex] = { selected: selectedIdx, isCorrect };

    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.style.pointerEvents = 'none';
        btn.classList.add('disabled-opt');
    });
    const allOptions = document.querySelectorAll('.option-btn');
    allOptions.forEach((btn, idx) => {
        if (idx === q.correct) btn.classList.add('correct-answer');
        if (idx === selectedIdx && !isCorrect) btn.classList.add('wrong-answer');
    });

    const feedbackIcon = document.getElementById('feedbackIcon');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const feedbackExplanation = document.getElementById('feedbackExplanation');
    if (isCorrect) {
        feedbackIcon.textContent = '✅';
        feedbackMessage.textContent = 'Benar! 🎉';
        feedbackMessage.style.color = '#10b981';
        feedbackExplanation.textContent = q.explanation;
    } else {
        feedbackIcon.textContent = '❌';
        feedbackMessage.textContent = 'Salah! 😢';
        feedbackMessage.style.color = '#dc2626';
        const correctAnswerText = q.options[q.correct];
        feedbackExplanation.textContent = `${q.explanation} Jawaban yang benar adalah: ${correctAnswerText}.`;
    }
    feedbackArea.style.display = 'block';
}

function nextQuestion() {
    if (!userAnswers[currentIndex]) {
        alert('Jawab dulu soalnya!');
        return;
    }
    if (currentIndex + 1 < totalQuestions) {
        currentIndex++;
        renderCurrentQuestion();
        updateProgress();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    const correctCount = userAnswers.filter(a => a && a.isCorrect).length;
    
    finalScore = correctCount;
    finalScoreSpan.textContent = correctCount;
    totalQuestionsSpan.textContent = totalQuestions;
    quizCard.style.display = 'none';
    restartArea.style.display = 'block';
    progressFill.style.width = '100%';
    questionCounter.textContent = `Selesai! ${correctCount}/${totalQuestions}`;

    const loggedName = sessionStorage.getItem('userName') || '';
    if (playerNameInput) playerNameInput.value = loggedName;

    // Reset status penyimpanan dan tampilkan form input leaderboard
    scoreSaved = false;
    const leaderboardForm = document.getElementById('leaderboardForm');
    if (leaderboardForm) leaderboardForm.style.display = 'flex';
    if (saveScoreBtn) saveScoreBtn.disabled = false;
    if (playerNameInput) playerNameInput.disabled = false;

    renderLeaderboard();
    setNavbarLock(false);
    quizActive = false;
}

function restartQuiz() {
    currentQuestions = selectRandomQuestions(QUESTIONS_PER_SESSION);
    currentIndex = 0;
    userAnswers = [];
    quizCard.style.display = 'block';
    restartArea.style.display = 'none';
    renderCurrentQuestion();
    updateProgress();
    setNavbarLock(true);
    quizActive = true;
    scoreSaved = false;   // Reset pelacak penyimpanan
}

function saveCurrentScore() {
    // Cegah penyimpanan ganda dalam satu sesi
    if (scoreSaved) {
        alert('Anda sudah menyimpan skor untuk sesi ini. Mulai ulang quiz untuk mencoba lagi.');
        return;
    }

    let name = playerNameInput ? playerNameInput.value.trim() : '';
    if (name === '') name = 'Anonymous';

    addScoreToLeaderboard(name, finalScore);
    renderLeaderboard();
    alert(`Skor ${finalScore} berhasil disimpan untuk ${name}!`);

    // Tandai sudah disimpan dan SEMBUNYIKAN form input
    scoreSaved = true;
    const leaderboardForm = document.getElementById('leaderboardForm');
    if (leaderboardForm) leaderboardForm.style.display = 'none';
}

function initQuiz() {
    currentQuestions = selectRandomQuestions(QUESTIONS_PER_SESSION);
    totalQuestionsSpan.textContent = totalQuestions;
    renderCurrentQuestion();
    updateProgress();
    setNavbarLock(true);
    quizActive = true;
}

// ================= EVENT LISTENERS =================
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
if (saveScoreBtn) saveScoreBtn.addEventListener('click', saveCurrentScore);
if (resetLeaderboardBtn) resetLeaderboardBtn.addEventListener('click', resetLeaderboard);

// ================= MULAI QUIZ =================
initQuiz();

// ================= AUTENTIKASI NAVBAR (SESSIONSTORAGE) =================
function handleLogout(e) {
    e.preventDefault();
    if (quizActive) {
        alert('Tidak bisa logout saat quiz sedang berlangsung! Selesaikan quiz terlebih dahulu.');
        return;
    }
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    window.location.href = 'login.html';
}

function updateNavbar() {
    const authBtn = document.getElementById('authButton');
    const wrapper = document.getElementById('accountWrapper');
    const logoutBtn = document.getElementById('logoutBtn');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const displayName = sessionStorage.getItem('userName') || sessionStorage.getItem('userEmail') || '';
    if (isLoggedIn && displayName && authBtn) {
        const initial = displayName.charAt(0).toUpperCase();
        authBtn.innerHTML = `<span style="background:#0f6e3f;color:white;padding:6px 10px;border-radius:50%;margin-right:8px;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;font-weight:bold;">${initial}</span>${displayName} ▼`;
        authBtn.href = '#';
        authBtn.addEventListener('click', (e) => { e.preventDefault(); wrapper.classList.toggle('active'); });
        if (logoutBtn) {
            logoutBtn.style.display = 'block';
            logoutBtn.removeEventListener('click', handleLogout);
            logoutBtn.addEventListener('click', handleLogout);
        }
    } else {
        if (authBtn) {
            authBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.setItem('redirectAfterLogin', window.location.href);
                window.location.href = 'login.html';
            });
        }
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
    document.addEventListener('click', (e) => {
        if (wrapper && !wrapper.contains(e.target)) wrapper.classList.remove('active');
    });
    setNavbarLock(quizActive);
}
updateNavbar();