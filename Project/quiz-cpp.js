// ================= BANK SOAL C++ (50 SOAL MURNI) =================
// Setiap sesi akan mengambil 10 soal secara acak dari 50 soal ini
const nkCpp = [
    // Dasar C++
    { text: "Apa output dari `cout << (5 / 2);` dalam C++?", options: ["2.5", "2", "2.0", "Error"], correct: 1, explanation: "Pembagian integer (5/2) menghasilkan 2 karena pecahan dibuang. Untuk hasil desimal, gunakan double atau float." },
    { text: "Manakah yang benar untuk mendeklarasikan pointer ke integer?", options: ["int ptr;", "int* ptr;", "&int ptr;", "ptr int*;"], correct: 1, explanation: "Pointer ke integer dideklarasikan dengan int* ptr; atau int *ptr;" },
    { text: "Apa fungsi dari `cin` dalam C++?", options: ["Menampilkan output", "Membaca input dari keyboard", "Membuka file", "Menghapus variabel"], correct: 1, explanation: "cin adalah objek untuk membaca input dari pengguna (keyboard)." },
    { text: "Manakah yang merupakan loop dengan kondisi di awal?", options: ["do-while", "while", "for", "switch"], correct: 1, explanation: "Loop while mengecek kondisi di awal sebelum mengeksekusi blok. do-while mengecek di akhir." },
    { text: "Apa output dari `int a=5; int &b=a; b=10; cout<<a;`", options: ["5", "10", "Error", "0"], correct: 1, explanation: "b adalah reference ke a, mengubah b juga mengubah a. Jadi a menjadi 10." },
    { text: "Manakah keyword untuk alokasi memori dinamis di C++?", options: ["malloc", "new", "alloc", "create"], correct: 1, explanation: "Operator 'new' digunakan untuk alokasi memori dinamis di C++. 'malloc' adalah cara C." },
    { text: "Apa fungsi dari `namespace std`?", options: ["Mendefinisikan fungsi standar", "Memudahkan akses ke library standar", "Membuat variabel global", "Mengatur memori"], correct: 1, explanation: "using namespace std; memungkinkan kita menggunakan elemen standar (cout, cin) tanpa std:: prefix." },
    { text: "Manakah tipe data yang tepat untuk menyimpan bilangan desimal presisi ganda?", options: ["float", "double", "int", "long"], correct: 1, explanation: "double memiliki presisi sekitar 15-16 digit desimal, lebih tinggi dari float (6-7 digit)." },
    { text: "Apa output dari `cout << (10 % 3);`?", options: ["3", "1", "0", "3.33"], correct: 1, explanation: "Operator % (modulus) menghasilkan sisa bagi, 10 % 3 = 1." },
    { text: "Manakah cara benar mendefinisikan fungsi di C++?", options: ["function add(int a, int b) { return a+b; }", "int add(int a, int b) { return a+b; }", "add(int a, int b) => a+b", "def add(a,b): return a+b"], correct: 1, explanation: "Fungsi di C++ harus diawali tipe data return, lalu nama fungsi, parameter, dan body." },
    { text: "Apa fungsi dari `#include <iostream>`?", options: ["Memasukkan library input/output", "Mendefinisikan fungsi main", "Membuat objek cout", "Mengatur namespace"], correct: 0, explanation: "#include <iostream> menyertakan library standar untuk input/output (cin, cout)." },
    { text: "Manakah operator perbandingan untuk 'tidak sama dengan'?", options: ["=", "==", "!=", "<>"], correct: 2, explanation: "Operator != digunakan untuk membandingkan apakah dua nilai tidak sama." },
    { text: "Apa output dari `int x = 5; cout << ++x;`?", options: ["5", "6", "Error", "++5"], correct: 1, explanation: "++x (pre-increment) menambah nilai x menjadi 6, lalu mencetak 6." },
    { text: "Manakah yang termasuk access modifier di C++?", options: ["public", "static", "final", "abstract"], correct: 0, explanation: "public, private, protected adalah access modifier untuk mengatur visibilitas anggota class." },
    { text: "Apa output dari `int x = 5; cout << x++;`?", options: ["5", "6", "Error", "++5"], correct: 0, explanation: "x++ (post-increment) mencetak nilai asli (5), lalu menambah x menjadi 6." },
    { text: "Manakah cara menginisialisasi array 5 elemen?", options: ["int arr[5] = {1,2,3,4,5};", "int arr[5] = 1,2,3,4,5;", "int arr[] = 5;", "arr = [1,2,3,4,5];"], correct: 0, explanation: "Inisialisasi array dengan kurung kurawal adalah cara yang benar." },
    { text: "Apa fungsi dari `virtual` dalam C++?", options: ["Membuat fungsi statis", "Membuat fungsi dapat di-override", "Membuat fungsi inline", "Membuat fungsi privat"], correct: 1, explanation: "virtual memungkinkan fungsi di-override di kelas turunan (polimorfisme)." },
    { text: "Manakah yang merupakan constructor?", options: ["~Class()", "Class()", "void Class()", "Class*()"], correct: 1, explanation: "Constructor memiliki nama sama dengan class, tanpa tipe return." },
    { text: "Apa output dari `cout << (true && false);`?", options: ["1", "0", "true", "false"], correct: 1, explanation: "true && false menghasilkan false, yang dicetak sebagai 0." },
    { text: "Manakah cara membuat konstanta di C++?", options: ["#define PI 3.14", "const double PI = 3.14;", "PI = 3.14", "constant PI = 3.14;"], correct: 1, explanation: "const adalah cara modern untuk mendeklarasikan konstanta. #define adalah preprocessor." },
    { text: "Apa output dari `cout << (3 > 2 ? \"Yes\" : \"No\");`?", options: ["Yes", "No", "1", "0"], correct: 0, explanation: "Operator ternary: kondisi 3 > 2 true, maka output 'Yes'." },
    { text: "Manakah yang termasuk STL container?", options: ["vector", "iostream", "string", "cmath"], correct: 0, explanation: "vector adalah container STL (Standard Template Library). iostream adalah header." },
    { text: "Apa fungsi dari `break` dalam loop?", options: ["Melanjutkan iterasi", "Menghentikan loop", "Melompat ke fungsi lain", "Mengulang loop"], correct: 1, explanation: "break menghentikan loop sepenuhnya dan keluar." },
    { text: "Manakah tipe data yang tepat untuk `'A'`?", options: ["string", "char", "int", "bool"], correct: 1, explanation: "Karakter tunggal menggunakan tipe char, ditulis dalam kutip tunggal." },
    { text: "Apa output dari `cout << (5 == 5);`?", options: ["true", "1", "5", "Error"], correct: 1, explanation: "Perbandingan true direpresentasikan sebagai 1 dalam output numerik." },
    { text: "Manakah yang merupakan loop tak terbatas?", options: ["for(;;)", "while(1)", "do{}while(1)", "Semua benar"], correct: 3, explanation: "Ketiga bentuk tersebut menghasilkan infinite loop karena kondisi selalu true." },
    { text: "Apa fungsi dari `sizeof` operator?", options: ["Mengubah ukuran variabel", "Mengembalikan ukuran dalam byte", "Mengalokasi memori", "Menghapus variabel"], correct: 1, explanation: "sizeof mengembalikan ukuran memori suatu tipe atau variabel dalam byte." },
    { text: "Manakah yang merupakan reference?", options: ["int *ptr", "int &ref", "int ref", "int*& ref"], correct: 1, explanation: "Reference dideklarasikan dengan & setelah tipe, contoh: int &ref = variabel;" },
    { text: "Apa output dari `cout << (3.0/2);`?", options: ["1", "1.5", "1.0", "Error"], correct: 1, explanation: "Karena 3.0 adalah double, hasil pembagian adalah double (1.5)." },
    { text: "Manakah keyword untuk inheritance public?", options: [": public Base", "extends Base", "implements Base", "inherits Base"], correct: 0, explanation: "Sintaks inheritance: class Derived : public Base {};" },
    { text: "Apa output dari `int a=5; int *p=&a; cout << *p;`?", options: ["Alamat a", "5", "0", "Error"], correct: 1, explanation: "*p dereference pointer, mengakses nilai a yaitu 5." },
    { text: "Manakah fungsi untuk mengakhiri program?", options: ["exit(0)", "return 0", "break", "continue"], correct: 0, explanation: "exit(0) menghentikan program segera, return 0 hanya mengakhiri fungsi main." },
    { text: "Apa output dari `cout << (2 << 1);`?", options: ["2", "4", "1", "0"], correct: 1, explanation: "Shift left: 2 (10 biner) << 1 = 4 (100 biner)." },
    { text: "Manakah yang termasuk tipe data unsigned?", options: ["int", "unsigned int", "float", "double"], correct: 1, explanation: "unsigned int hanya menyimpan nilai positif (tanpa tanda)." },
    { text: "Apa fungsi dari `friend` function?", options: ["Membuat fungsi menjadi privat", "Mengizinkan akses ke private member", "Membuat fungsi statis", "Meng-overload operator"], correct: 1, explanation: "friend function dapat mengakses private dan protected member class meskipun bukan member." },
    { text: "Manakah cara menangani exception di C++?", options: ["try-catch", "if-else", "switch", "loop"], correct: 0, explanation: "try-catch digunakan untuk exception handling." },
    { text: "Apa output dari `int x=10; int &y=x; y=20; cout<<x;`?", options: ["10", "20", "Error", "0"], correct: 1, explanation: "y adalah reference ke x, mengubah y mengubah x menjadi 20." },
    { text: "Manakah operator untuk alamat memori?", options: ["&", "*", "->", "."], correct: 0, explanation: "Operator & mengembalikan alamat memori variabel." },
    { text: "Apa output dari `cout << (5 | 3);`?", options: ["5", "7", "3", "1"], correct: 1, explanation: "Bitwise OR: 5 (101) | 3 (011) = 7 (111)." },
    { text: "Manakah yang termasuk preprocessor directive?", options: ["#include", "using namespace", "int main", "return 0"], correct: 0, explanation: "#include adalah preprocessor directive yang diproses sebelum kompilasi." },
    { text: "Apa fungsi dari `const` pada parameter fungsi?", options: ["Mencegah perubahan parameter", "Membuat parameter default", "Membuat parameter statis", "Membuat parameter reference"], correct: 0, explanation: "const parameter tidak dapat diubah di dalam fungsi, melindungi dari modifikasi." },
    { text: "Manakah cara membuat array dinamis?", options: ["int arr = new int[5];", "int* arr = new int[5];", "int arr[5];", "int arr = malloc(5);"], correct: 1, explanation: "new mengembalikan pointer ke array dinamis. int* arr = new int[5];" },
    { text: "Apa output dari `cout << (5 && 3);`?", options: ["1", "0", "5", "3"], correct: 0, explanation: "Operator logika AND mengembalikan true (1) karena kedua nilai non-nol." },
    { text: "Manakah yang merupakan destructor?", options: ["~Class()", "Class()", "~Class", "Class::~Class"], correct: 0, explanation: "Destructor memiliki tanda tilde (~) diikuti nama class, tanpa parameter." },
    { text: "Apa output dari `int x=5; cout << (x>3 ? x++ : x--);`?", options: ["5", "6", "4", "Error"], correct: 0, explanation: "Kondisi true, maka x++ mengembalikan nilai asli (5)." },
    { text: "Manakah keyword untuk mewarisi secara private?", options: [": private Base", ": protected Base", ": public Base", "private Base"], correct: 0, explanation: "Inheritance private menggunakan : private Base, semua member menjadi private." },
    { text: "Apa output dari `cout << (0.1 + 0.2 == 0.3);`?", options: ["true", "false", "1", "0"], correct: 1, explanation: "Karena presisi floating point, 0.1 + 0.2 tidak persis 0.3, hasilnya false." },
    { text: "Manakah yang termasuk compile-time polymorphism?", options: ["Function overloading", "Virtual function", "Inheritance", "Encapsulation"], correct: 0, explanation: "Function overloading diselesaikan saat kompilasi (compile-time polymorphism)." },
    { text: "Manakah cara yang benar untuk mendeklarasikan vector di C++ (STL)?", options: ["vector<int> v;", "vector v;", "v<int> vector;", "int vector v;"], correct: 0, explanation: "Vector dideklarasikan dengan vector<tipe_data> nama_vector; dan memerlukan #include <vector>." },
    { text: "Apa output dari `int a[3] = {1,2,3}; cout << a[2];`?", options: ["1", "2", "3", "Error"], correct: 2, explanation: "Indeks array dimulai dari 0, a[2] adalah elemen ketiga yaitu 3." }
];

// ================= KONFIGURASI (GANTI SESUAI BAHASA) =================
const QUESTIONS_PER_SESSION = 10;          // Jumlah soal per sesi
const LEADERBOARD_KEY = 'quiz_cpp_leaderboard';  // Kunci localStorage (harus unik per bahasa)
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
    const shuffledBank = shuffleArray([...nkCpp]);
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