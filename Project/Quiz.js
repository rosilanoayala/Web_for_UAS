// ================= BANK SOAL (50+ soal dari HTML, CSS, C++, JS) =================
// Setiap sesi hanya akan mengambil 20 soal secara acak dari bank ini
const questionBank = [
    // HTML (1-12)
    {
        text: "Apa kepanjangan dari HTML?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
        correct: 0,
        explanation: "HTML adalah singkatan dari Hyper Text Markup Language, bahasa standar untuk membuat halaman web."
    },
    {
        text: "Tag HTML mana yang digunakan untuk menampilkan gambar?",
        options: ["<img>", "<td>", "<pic>", "<src>"],
        correct: 0,
        explanation: "Tag <img> digunakan untuk menampilkan gambar. Atribut src menentukan URL gambar."
    },
    {
        text: "Manakah yang merupakan elemen semantic HTML?",
        options: ["<div>", "<span>", "<article>", "<b>"],
        correct: 2,
        explanation: "<article> adalah elemen semantic karena memiliki makna (artikel mandiri). <div> dan <span> tidak memiliki makna khusus."
    },
    {
        text: "Atribut mana yang digunakan untuk memberikan deskripsi teks alternatif pada gambar?",
        options: ["title", "alt", "src", "href"],
        correct: 1,
        explanation: "Atribut alt memberikan teks alternatif yang akan ditampilkan jika gambar gagal dimuat, dan membantu aksesibilitas."
    },
    {
        text: "Manakah yang benar untuk membuat komentar di HTML?",
        options: ["// komentar", "/* komentar */", "<!-- komentar -->", "# komentar"],
        correct: 2,
        explanation: "Komentar HTML ditulis dengan <!-- ... -->. Tidak akan ditampilkan di browser."
    },
    {
        text: "Tag HTML manakah yang digunakan untuk membuat hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correct: 1,
        explanation: "Tag <a> (anchor) digunakan untuk membuat hyperlink. Atribut href menentukan tujuan link."
    },
    {
        text: "Manakah yang termasuk elemen block-level di HTML?",
        options: ["<span>", "<div>", "<img>", "<a>"],
        correct: 1,
        explanation: "<div> adalah elemen block-level yang memenuhi lebar parent. <span> adalah inline."
    },
    {
        text: "Atribut `target=\"_blank\"` pada tag <a> berfungsi untuk?",
        options: ["Membuka link di tab yang sama", "Membuka link di tab baru", "Membuka link di frame", "Membuka link di jendela baru"],
        correct: 1,
        explanation: "target=\"_blank\" membuka link di tab atau jendela browser baru."
    },
    {
        text: "Tag HTML manakah untuk membuat daftar berurutan (numbered list)?",
        options: ["<ul>", "<ol>", "<li>", "<dl>"],
        correct: 1,
        explanation: "<ol> (ordered list) digunakan untuk daftar berurutan dengan angka atau huruf."
    },
    {
        text: "Apa fungsi dari tag <meta charset=\"UTF-8\">?",
        options: ["Mengatur warna teks", "Mengatur encoding karakter", "Mengatur ukuran font", "Mengatur layout halaman"],
        correct: 1,
        explanation: "meta charset menentukan encoding karakter agar teks seperti aksara lokal tidak rusak."
    },
    {
        text: "Manakah yang merupakan atribut wajib pada tag <img>?",
        options: ["src dan alt", "src dan title", "width dan height", "alt dan title"],
        correct: 0,
        explanation: "src (sumber gambar) dan alt (teks alternatif) adalah atribut wajib pada tag <img>."
    },
    {
        text: "Tag HTML manakah untuk membuat baris baru?",
        options: ["<br>", "<p>", "<hr>", "<div>"],
        correct: 0,
        explanation: "<br> (break) digunakan untuk membuat baris baru tanpa memulai paragraf baru."
    },
    // CSS (13-24)
    {
        text: "Properti CSS mana yang mengubah warna teks?",
        options: ["text-color", "color", "font-color", "background-color"],
        correct: 1,
        explanation: "Properti 'color' digunakan untuk mengatur warna teks. 'background-color' untuk latar belakang."
    },
    {
        text: "Manakah selector yang tepat untuk memilih elemen dengan id 'header'?",
        options: [".header", "#header", "header", "*header"],
        correct: 1,
        explanation: "Selector id menggunakan tanda pagar (#). Jadi #header memilih elemen dengan id='header'."
    },
    {
        text: "Properti CSS mana yang mengatur jarak di dalam border (antara konten dan border)?",
        options: ["margin", "padding", "border-spacing", "gap"],
        correct: 1,
        explanation: "Padding adalah jarak di dalam border, antara konten dan border. Margin adalah jarak luar."
    },
    {
        text: "Apa nilai default dari position?",
        options: ["relative", "absolute", "fixed", "static"],
        correct: 3,
        explanation: "Nilai default position adalah static, di mana elemen mengikuti alur normal dokumen."
    },
    {
        text: "Manakah yang merupakan unit panjang relatif di CSS?",
        options: ["px", "pt", "em", "cm"],
        correct: 2,
        explanation: "em adalah unit relatif terhadap ukuran font elemen parent. px, pt, cm adalah unit absolut."
    },
    {
        text: "Properti CSS mana yang digunakan untuk membuat sudut elemen melengkung?",
        options: ["border-curve", "border-radius", "corner-radius", "round-corner"],
        correct: 1,
        explanation: "border-radius digunakan untuk membuat sudut elemen melengkung."
    },
    {
        text: "Manakah yang benar untuk memusatkan elemen block secara horizontal?",
        options: ["text-align: center", "margin: 0 auto", "align: center", "position: center"],
        correct: 1,
        explanation: "margin: 0 auto akan memusatkan elemen block jika lebar ditentukan."
    },
    {
        text: "Properti CSS manakah yang mengatur jenis huruf?",
        options: ["font-type", "font-family", "font-style", "font-weight"],
        correct: 1,
        explanation: "font-family menentukan jenis huruf yang digunakan."
    },
    {
        text: "Apa kegunaan properti `display: flex`?",
        options: ["Membuat layout grid", "Membuat layout fleksibel satu dimensi", "Membuat elemen tersembunyi", "Membuat animasi"],
        correct: 1,
        explanation: "Flexbox adalah model layout satu dimensi untuk mengatur elemen secara fleksibel."
    },
    {
        text: "Manakah pseudo-class yang digunakan untuk gaya saat mouse di atas elemen?",
        options: [":active", ":hover", ":focus", ":visited"],
        correct: 1,
        explanation: ":hover diterapkan saat kursor mouse berada di atas elemen."
    },
    {
        text: "Apa fungsi dari `z-index`?",
        options: ["Mengatur posisi sumbu X", "Mengatur urutan tumpukan elemen", "Mengatur ukuran elemen", "Mengatur transparansi"],
        correct: 1,
        explanation: "z-index menentukan urutan tumpukan (stacking order) elemen yang saling tumpang tindih."
    },
    {
        text: "Manakah yang merupakan properti untuk menambahkan bayangan pada kotak?",
        options: ["box-shadow", "text-shadow", "shadow-box", "drop-shadow"],
        correct: 0,
        explanation: "box-shadow digunakan untuk menambahkan efek bayangan pada elemen kotak."
    },
    // C++ (25-37)
    {
        text: "Apa output dari `cout << (5 / 2);` dalam C++?",
        options: ["2.5", "2", "2.0", "Error"],
        correct: 1,
        explanation: "Pembagian integer (5/2) menghasilkan 2 karena pecahan dibuang. Untuk hasil desimal, gunakan double."
    },
    {
        text: "Manakah yang benar untuk mendeklarasikan pointer ke integer?",
        options: ["int ptr;", "int* ptr;", "&int ptr;", "ptr int*;"],
        correct: 1,
        explanation: "Pointer ke integer dideklarasikan dengan int* ptr; atau int *ptr;"
    },
    {
        text: "Apa fungsi dari `cin` dalam C++?",
        options: ["Menampilkan output", "Membaca input dari keyboard", "Membuka file", "Menghapus variabel"],
        correct: 1,
        explanation: "cin adalah objek untuk membaca input dari pengguna (keyboard)."
    },
    {
        text: "Manakah yang merupakan loop dengan kondisi di awal?",
        options: ["do-while", "while", "for", "switch"],
        correct: 1,
        explanation: "Loop while mengecek kondisi di awal sebelum mengeksekusi blok. do-while mengecek di akhir."
    },
    {
        text: "Apa output dari program berikut? `int a=5; int &b=a; b=10; cout<<a;`",
        options: ["5", "10", "Error", "0"],
        correct: 1,
        explanation: "b adalah reference ke a, mengubah b juga mengubah a. Jadi a menjadi 10."
    },
    {
        text: "Manakah keyword untuk mengalokasikan memori dinamis di C++?",
        options: ["malloc", "new", "alloc", "create"],
        correct: 1,
        explanation: "Operator 'new' digunakan untuk alokasi memori dinamis di C++."
    },
    {
        text: "Apa fungsi dari `namespace std`?",
        options: ["Mendefinisikan fungsi standar", "Memudahkan akses ke library standar", "Membuat variabel global", "Mengatur memori"],
        correct: 1,
        explanation: "using namespace std; memungkinkan kita menggunakan elemen standar (cout, cin) tanpa std:: prefix."
    },
    {
        text: "Manakah tipe data yang tepat untuk menyimpan bilangan desimal presisi ganda?",
        options: ["float", "double", "int", "long"],
        correct: 1,
        explanation: "double memiliki presisi sekitar 15-16 digit desimal, lebih tinggi dari float."
    },
    {
        text: "Apa output dari `cout << (10 % 3);`?",
        options: ["3", "1", "0", "3.33"],
        correct: 1,
        explanation: "Operator % (modulus) menghasilkan sisa bagi, 10 % 3 = 1."
    },
    {
        text: "Manakah yang merupakan cara benar untuk mendefinisikan fungsi di C++?",
        options: ["function add(int a, int b) { return a+b; }", "int add(int a, int b) { return a+b; }", "add(int a, int b) => a+b", "def add(a,b): return a+b"],
        correct: 1,
        explanation: "Fungsi di C++ harus diawali tipe data return, lalu nama fungsi, parameter, dan body."
    },
    {
        text: "Apa fungsi dari `#include <iostream>`?",
        options: ["Memasukkan library input/output", "Mendefinisikan fungsi main", "Membuat objek cout", "Mengatur namespace"],
        correct: 0,
        explanation: "#include <iostream> menyertakan library standar untuk input/output (cin, cout)."
    },
    {
        text: "Manakah operator perbandingan yang benar untuk 'tidak sama dengan'?",
        options: ["=", "==", "!=", "<>"],
        correct: 2,
        explanation: "Operator != digunakan untuk membandingkan apakah dua nilai tidak sama."
    },
    {
        text: "Apa output dari `int x = 5; cout << ++x;`?",
        options: ["5", "6", "Error", "++5"],
        correct: 1,
        explanation: "++x (pre-increment) menambah nilai x menjadi 6, lalu mencetak 6."
    },
    // JavaScript (38-50)
    {
        text: "Apa output dari `console.log(typeof 42)`?",
        options: ["'number'", "'string'", "'object'", "'undefined'"],
        correct: 0,
        explanation: "typeof 42 menghasilkan 'number' karena 42 adalah tipe data number di JavaScript."
    },
    {
        text: "Manakah cara yang benar untuk mendeklarasikan variabel konstanta di JavaScript modern?",
        options: ["var x = 5;", "let x = 5;", "const x = 5;", "constant x = 5;"],
        correct: 2,
        explanation: "const digunakan untuk mendeklarasikan variabel yang nilainya tidak boleh diubah setelah inisialisasi."
    },
    {
        text: "Apa fungsi dari `addEventListener`?",
        options: ["Mendaftarkan event handler", "Mengubah style CSS", "Membuat elemen baru", "Menghapus elemen"],
        correct: 0,
        explanation: "addEventListener digunakan untuk mendaftarkan fungsi yang akan dipanggil saat event tertentu terjadi."
    },
    {
        text: "Manakah yang termasuk tipe data primitif di JavaScript?",
        options: ["Object", "Array", "Boolean", "Function"],
        correct: 2,
        explanation: "Boolean adalah tipe data primitif. Object, Array, Function adalah tipe referensi."
    },
    {
        text: "Apa hasil dari `'5' + 3` di JavaScript?",
        options: ["8", "53", "Error", "undefined"],
        correct: 1,
        explanation: "Operator + dengan string akan melakukan konkatenasi (penggabungan), sehingga '5' + 3 = '53'."
    },
    {
        text: "Manakah cara mengakses elemen dengan id 'demo'?",
        options: ["document.getElementsByClassName('demo')", "document.getElementById('demo')", "document.querySelectorAll('.demo')", "document.getElementsByTagName('demo')"],
        correct: 1,
        explanation: "getElementById() adalah metode tercepat untuk mengakses elemen berdasarkan id."
    },
    {
        text: "Apa output dari `console.log(2 == '2')`?",
        options: ["true", "false", "Error", "undefined"],
        correct: 0,
        explanation: "Operator == melakukan konversi tipe, sehingga 2 == '2' menghasilkan true."
    },
    {
        text: "Manakah yang merupakan fungsi array untuk menambahkan elemen di akhir?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: 0,
        explanation: "push() menambahkan satu atau lebih elemen ke akhir array."
    },
    {
        text: "Apa hasil dari `Boolean(0)`?",
        options: ["true", "false", "0", "undefined"],
        correct: 1,
        explanation: "0 adalah falsy value di JavaScript, sehingga Boolean(0) menghasilkan false."
    },
    {
        text: "Manakah cara yang benar untuk membuat objek di JavaScript?",
        options: ["{nama: 'Andi'}", "['Andi']", "'Andi'", "new Object('Andi')"],
        correct: 0,
        explanation: "Objek literal {key: value} adalah cara paling umum membuat objek."
    },
    {
        text: "Apa fungsi dari `setTimeout`?",
        options: ["Menjalankan fungsi setelah jeda waktu", "Menjalankan fungsi berulang", "Menghentikan eksekusi", "Membuat interval"],
        correct: 0,
        explanation: "setTimeout menjalankan fungsi sekali setelah waktu yang ditentukan (dalam milidetik)."
    },
    {
        text: "Manakah yang merupakan loop for...of digunakan untuk?",
        options: ["Iterasi properti objek", "Iterasi nilai iterable (array, string)", "Iterasi angka", "Iterasi kondisi"],
        correct: 1,
        explanation: "for...of digunakan untuk mengiterasi nilai dari objek iterable seperti array, string, Map."
    },
    {
        text: "Apa hasil dari `3 === 3`?",
        options: ["true", "false", "Error", "undefined"],
        correct: 0,
        explanation: "=== membandingkan nilai dan tipe data, 3 (number) === 3 (number) true."
    }
];

// Jumlah soal yang akan ditampilkan per sesi
const QUESTIONS_PER_SESSION = 20;

// ================= SHUFFLE FUNCTION =================
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ================= AMBIL N SOAL ACAK DARI BANK =================
function selectRandomQuestions(n) {
    // Shuffle bank soal terlebih dahulu, lalu ambil n pertama
    const shuffledBank = shuffleArray([...questionBank]);
    return shuffledBank.slice(0, n);
}

// ================= LEADERBOARD STORAGE =================
const LEADERBOARD_KEY = 'quiz_leaderboard';
const MAX_LEADERBOARD = 10;

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
    const newEntry = {
        name: name,
        score: score,
        date: new Date().toLocaleString()
    };
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

function updateProgress() {
    questionCounter.textContent = `Soal ${currentIndex + 1} / ${totalQuestions}`;
    const percent = (currentIndex / totalQuestions) * 100;
    progressFill.style.width = `${percent}%`;
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
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
    userAnswers[currentIndex] = { selected: selectedIdx, isCorrect: isCorrect };
    
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
    let correctCount = userAnswers.filter(a => a && a.isCorrect).length;
    finalScore = correctCount;
    finalScoreSpan.textContent = correctCount;
    totalQuestionsSpan.textContent = totalQuestions;
    quizCard.style.display = 'none';
    restartArea.style.display = 'block';
    progressFill.style.width = '100%';
    questionCounter.textContent = `Selesai! ${correctCount}/${totalQuestions}`;
    
    const loggedName = sessionStorage.getItem('userName') || '';
    if (playerNameInput) playerNameInput.value = loggedName;
    
    renderLeaderboard();
}

function restartQuiz() {
    // Ambil 20 soal acak dari bank
    currentQuestions = selectRandomQuestions(QUESTIONS_PER_SESSION);
    currentIndex = 0;
    userAnswers = [];
    quizCard.style.display = 'block';
    restartArea.style.display = 'none';
    renderCurrentQuestion();
    updateProgress();
}

function saveCurrentScore() {
    let name = playerNameInput ? playerNameInput.value.trim() : '';
    if (name === '') name = 'Anonymous';
    addScoreToLeaderboard(name, finalScore);
    renderLeaderboard();
    alert(`Skor ${finalScore} berhasil disimpan untuk ${name}!`);
}

function initQuiz() {
    currentQuestions = selectRandomQuestions(QUESTIONS_PER_SESSION);
    totalQuestionsSpan.textContent = totalQuestions;
    renderCurrentQuestion();
    updateProgress();
    renderLeaderboard();
}

// Event listeners
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
if (saveScoreBtn) saveScoreBtn.addEventListener('click', saveCurrentScore);
if (resetLeaderboardBtn) resetLeaderboardBtn.addEventListener('click', resetLeaderboard);

// Mulai quiz
initQuiz();

// ========== SESSIONSTORAGE untuk autentikasi (navbar) ==========
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
        if (logoutBtn) logoutBtn.style.display = 'block';
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
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('userEmail');
            sessionStorage.removeItem('userName');
            window.location.href = 'login.html';
        });
    }
}
updateNavbar();