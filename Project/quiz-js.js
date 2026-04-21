// ================= BANK SOAL JAVASCRIPT (50 soal, akan diacak 10 per sesi) =================
const questionBankJs = [
    // 1-10: Dasar
    { text: "Apa fungsi utama JavaScript dalam pengembangan web?", options: ["Mengatur struktur halaman", "Mengatur tampilan", "Membuat halaman dinamis dan interaktif", "Menyimpan data server"], correct: 2, explanation: "JavaScript membuat halaman web menjadi dinamis dan interaktif, berbeda dengan HTML (struktur) dan CSS (tampilan)." },
    { text: "Manakah cara yang benar untuk menulis JavaScript eksternal?", options: ["<script src='script.js'>", "<script href='script.js'>", "<js src='script.js'>", "<link src='script.js'>"], correct: 0, explanation: "Tag <script> dengan atribut src digunakan untuk menghubungkan file JavaScript eksternal." },
    { text: "Apa output dari `console.log(typeof 42)`?", options: ["'number'", "'string'", "'object'", "'undefined'"], correct: 0, explanation: "typeof 42 menghasilkan 'number' karena 42 adalah tipe data number." },
    { text: "Manakah keyword untuk mendeklarasikan variabel yang nilainya tidak bisa diubah?", options: ["let", "var", "const", "constant"], correct: 2, explanation: "const digunakan untuk variabel yang nilainya tetap (konstan) setelah diinisialisasi." },
    { text: "Apa hasil dari `'5' + 3` di JavaScript?", options: ["8", "53", "Error", "undefined"], correct: 1, explanation: "Operator + dengan string melakukan konkatenasi (penggabungan), sehingga '5' + 3 = '53'." },
    { text: "Manakah yang merupakan tipe data primitif di JavaScript?", options: ["Object", "Array", "Boolean", "Function"], correct: 2, explanation: "Boolean adalah tipe data primitif. Object, Array, Function adalah tipe referensi." },
    { text: "Apa fungsi dari `addEventListener`?", options: ["Mendaftarkan event handler", "Mengubah style CSS", "Membuat elemen baru", "Menghapus elemen"], correct: 0, explanation: "addEventListener digunakan untuk mendaftarkan fungsi yang akan dipanggil saat event tertentu terjadi." },
    { text: "Manakah cara mengakses elemen dengan id 'demo'?", options: ["document.getElementsByClassName('demo')", "document.getElementById('demo')", "document.querySelectorAll('.demo')", "document.getElementsByTagName('demo')"], correct: 1, explanation: "getElementById() adalah metode tercepat untuk mengakses elemen berdasarkan id." },
    { text: "Apa output dari `console.log(2 == '2')`?", options: ["true", "false", "Error", "undefined"], correct: 0, explanation: "Operator == melakukan konversi tipe, sehingga 2 == '2' menghasilkan true." },
    { text: "Manakah fungsi array untuk menambahkan elemen di akhir?", options: ["push()", "pop()", "shift()", "unshift()"], correct: 0, explanation: "push() menambahkan satu atau lebih elemen ke akhir array." },
    // 11-20: Tipe data & operator
    { text: "Apa hasil dari `Boolean(0)`?", options: ["true", "false", "0", "undefined"], correct: 1, explanation: "0 adalah falsy value di JavaScript, sehingga Boolean(0) menghasilkan false." },
    { text: "Manakah cara yang benar untuk membuat objek di JavaScript?", options: ["{nama: 'Andi'}", "['Andi']", "'Andi'", "new Object('Andi')"], correct: 0, explanation: "Objek literal {key: value} adalah cara paling umum membuat objek." },
    { text: "Apa fungsi dari `setTimeout`?", options: ["Menjalankan fungsi setelah jeda waktu", "Menjalankan fungsi berulang", "Menghentikan eksekusi", "Membuat interval"], correct: 0, explanation: "setTimeout menjalankan fungsi sekali setelah waktu yang ditentukan (dalam milidetik)." },
    { text: "Manakah loop yang digunakan untuk mengiterasi nilai array?", options: ["for...in", "for...of", "while", "do...while"], correct: 1, explanation: "for...of digunakan untuk mengiterasi nilai dari objek iterable seperti array, string, Map." },
    { text: "Apa hasil dari `3 === 3`?", options: ["true", "false", "Error", "undefined"], correct: 0, explanation: "=== membandingkan nilai dan tipe data, 3 (number) === 3 (number) true." },
    { text: "Manakah yang merupakan event handler untuk klik mouse?", options: ["onclick", "onmouseover", "onchange", "onsubmit"], correct: 0, explanation: "onclick adalah event handler untuk klik mouse." },
    { text: "Apa output dari `let x = 5; console.log(x++);`?", options: ["5", "6", "Error", "undefined"], correct: 0, explanation: "x++ (post-increment) mengembalikan nilai asli (5), lalu menambah x menjadi 6." },
    { text: "Manakah cara menyimpan data permanen di browser?", options: ["sessionStorage", "localStorage", "cookie", "Semua benar"], correct: 3, explanation: "localStorage, sessionStorage, dan cookie dapat menyimpan data di browser dengan karakteristik berbeda." },
    { text: "Apa fungsi dari `document.querySelector('.class')`?", options: ["Mengambil elemen dengan class tertentu", "Mengambil elemen dengan id", "Mengambil semua elemen dengan tag", "Mengambil elemen pertama yang cocok dengan selector"], correct: 3, explanation: "querySelector() mengembalikan elemen pertama yang cocok dengan selector CSS." },
    { text: "Manakah yang merupakan operator logika AND?", options: ["&&", "||", "!", "&"], correct: 0, explanation: "&& adalah operator logika AND, bernilai true hanya jika kedua operand true." },
    // 21-30: Percabangan, fungsi, array methods
    { text: "Apa output dari `console.log(5 > 3 ? 'Yes' : 'No');`?", options: ["Yes", "No", "true", "false"], correct: 0, explanation: "Operator ternary: kondisi 5 > 3 true, maka output 'Yes'." },
    { text: "Manakah cara membuat fungsi di JavaScript?", options: ["function myFunc() {}", "def myFunc() {}", "create myFunc() {}", "func myFunc() {}"], correct: 0, explanation: "Fungsi dideklarasikan dengan keyword function diikuti nama dan parameter." },
    { text: "Apa hasil dari `typeof null`?", options: ["'null'", "'object'", "'undefined'", "'number'"], correct: 1, explanation: "typeof null mengembalikan 'object' karena kesalahan historis di JavaScript." },
    { text: "Manakah yang termasuk metode array untuk mengubah isi array?", options: ["map()", "filter()", "reduce()", "Semua benar"], correct: 3, explanation: "map(), filter(), reduce() adalah metode array untuk transformasi dan agregasi." },
    { text: "Apa fungsi dari `preventDefault()`?", options: ["Mencegah event bubbling", "Mencegah aksi default browser", "Menghentikan propagasi event", "Menghentikan eksekusi script"], correct: 1, explanation: "preventDefault() mencegah aksi default browser seperti submit form atau klik link." },
    { text: "Manakah yang merupakan cara mengubah konten HTML elemen?", options: ["element.innerHTML = 'teks'", "element.textContent = 'teks'", "element.innerText = 'teks'", "Semua benar"], correct: 3, explanation: "innerHTML, textContent, innerText dapat digunakan untuk mengubah konten elemen." },
    { text: "Apa output dari `console.log(0.1 + 0.2 === 0.3);`?", options: ["true", "false", "Error", "undefined"], correct: 1, explanation: "Karena presisi floating point, 0.1 + 0.2 tidak persis 0.3." },
    { text: "Manakah keyword untuk melempar error?", options: ["throw", "catch", "try", "error"], correct: 0, explanation: "throw digunakan untuk melempar exception secara manual." },
    { text: "Apa fungsi dari `JSON.stringify()`?", options: ["Mengubah string menjadi objek", "Mengubah objek menjadi string JSON", "Mengubah JSON menjadi array", "Mengubah array menjadi string"], correct: 1, explanation: "JSON.stringify() mengubah objek JavaScript menjadi string JSON." },
    { text: "Manakah yang merupakan cara mengubah warna latar elemen dengan JavaScript?", options: ["element.style.backgroundColor = 'red'", "element.style.background = 'red'", "element.style.bgcolor = 'red'", "Semua benar"], correct: 0, explanation: "element.style.backgroundColor adalah cara standar mengubah warna latar." },
    // 31-40: Lanjutan
    { text: "Apa output dari `console.log(!!'hello');`?", options: ["true", "false", "'hello'", "Error"], correct: 0, explanation: "!! (double NOT) mengkonversi nilai menjadi boolean, string non-kosong menjadi true." },
    { text: "Manakah yang termasuk event pada form?", options: ["submit", "change", "input", "Semua benar"], correct: 3, explanation: "submit, change, input adalah event yang umum pada elemen form." },
    { text: "Apa fungsi dari `Array.isArray()`?", options: ["Mengecek apakah suatu variabel adalah array", "Mengubah array menjadi string", "Menggabungkan array", "Memotong array"], correct: 0, explanation: "Array.isArray() mengembalikan true jika variabel adalah array." },
    { text: "Manakah cara menghentikan interval yang dibuat dengan `setInterval()`?", options: ["clearInterval()", "stopInterval()", "endInterval()", "removeInterval()"], correct: 0, explanation: "clearInterval() digunakan untuk menghentikan eksekusi setInterval()." },
    { text: "Apa output dari `console.log(2 + '2' - 1);`?", options: ["21", "3", "22", "Error"], correct: 0, explanation: "2 + '2' menghasilkan '22' (string), lalu '22' - 1 menghasilkan 21 (number)." },
    { text: "Manakah yang merupakan cara mengakses properti objek?", options: ["obj.prop", "obj['prop']", "Keduanya benar", "Tidak ada yang benar"], correct: 2, explanation: "Dot notation dan bracket notation sama-sama valid untuk mengakses properti objek." },
    { text: "Apa fungsi dari `Promise` dalam JavaScript?", options: ["Menangani operasi asynchronous", "Membuat array baru", "Mengubah tipe data", "Membuat fungsi"], correct: 0, explanation: "Promise digunakan untuk menangani operasi asynchronous (seperti fetch data)." },
    { text: "Manakah yang merupakan cara membuat elemen baru di DOM?", options: ["document.createElement()", "document.newElement()", "document.addElement()", "document.appendElement()"], correct: 0, explanation: "document.createElement() membuat elemen HTML baru." },
    { text: "Apa output dari `console.log(5 + null);`?", options: ["5", "null", "Error", "5null"], correct: 0, explanation: "null dikonversi menjadi 0 dalam operasi aritmatika, sehingga 5 + 0 = 5." },
    { text: "Manakah yang merupakan cara menulis komentar satu baris di JavaScript?", options: ["// komentar", "/* komentar */", "# komentar", "<!-- komentar -->"], correct: 0, explanation: "// digunakan untuk komentar satu baris di JavaScript." },
    // 41-50: Lebih lanjut
    { text: "Apa fungsi dari `this` dalam method objek?", options: ["Merujuk ke objek global", "Merujuk ke objek yang memanggil method", "Merujuk ke parent function", "Merujuk ke window"], correct: 1, explanation: "this dalam method objek merujuk ke objek tersebut." },
    { text: "Manakah yang merupakan operator rest parameter?", options: ["...", "..", "***", "&&"], correct: 0, explanation: "Rest parameter (...) memungkinkan fungsi menerima jumlah argumen tak terbatas." },
    { text: "Apa output dari `console.log([] + []);`?", options: ["[]", "'' (string kosong)", "Error", "0"], correct: 1, explanation: "Array kosong dikonversi menjadi string kosong, lalu digabung menjadi string kosong." },
    { text: "Manakah yang merupakan cara mengubah huruf menjadi kapital semua?", options: ["toUpperCase()", "toLowerCase()", "capitalize()", "toCapital()"], correct: 0, explanation: "toUpperCase() mengubah string menjadi huruf kapital semua." },
    { text: "Apa fungsi dari `Math.random()`?", options: ["Menghasilkan angka acak 0-1", "Menghasilkan angka acak 0-100", "Menghasilkan bilangan bulat acak", "Menghasilkan angka negatif"], correct: 0, explanation: "Math.random() menghasilkan angka floating-point acak antara 0 (inklusif) dan 1 (eksklusif)." },
    { text: "Manakah yang merupakan cara memeriksa apakah suatu variabel adalah array?", options: ["Array.isArray(var)", "typeof var === 'array'", "var instanceof Array", "A dan C benar"], correct: 3, explanation: "Array.isArray() dan instanceof Array dapat digunakan untuk mengecek array." },
    { text: "Apa output dari `console.log(1 < 2 < 3);`?", options: ["true", "false", "Error", "undefined"], correct: 0, explanation: "1 < 2 menghasilkan true (1), lalu true < 3 (1 < 3) menghasilkan true." },
    { text: "Manakah yang merupakan cara menghentikan eksekusi loop?", options: ["break", "continue", "return", "exit"], correct: 0, explanation: "break menghentikan loop sepenuhnya." },
    { text: "Apa fungsi dari `localStorage.setItem(key, value)`?", options: ["Menyimpan data dengan key-value", "Menghapus data", "Mengambil data", "Menghapus semua data"], correct: 0, explanation: "setItem() menyimpan data ke localStorage." },
    { text: "Manakah yang merupakan perbedaan antara `let` dan `var`?", options: ["let memiliki block scope, var function scope", "var memiliki block scope, let function scope", "Tidak ada perbedaan", "let hanya bisa digunakan di global scope"], correct: 0, explanation: "let memiliki block scope (dibatasi oleh {}) sedangkan var memiliki function scope." }
];

// ================= KONFIGURASI (GANTI SESUAI BAHASA) =================
const QUESTIONS_PER_SESSION = 10;          // Jumlah soal per sesi
const LEADERBOARD_KEY = 'quiz_js_leaderboard';  // Kunci localStorage (harus unik per bahasa)
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
    const shuffledBank = shuffleArray([...questionBankJs]);
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