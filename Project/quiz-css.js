// ================= BANK SOAL CSS (50 soal berdasarkan materi TutorialCSS) =================
const nkCss = [
    // 1. Pengantar CSS
    { text: "Apa kepanjangan dari CSS?", options: ["Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"], correct: 2, explanation: "CSS adalah singkatan dari Cascading Style Sheets, bahasa untuk mengatur tampilan halaman web." },
    // 2. Cara menyisipkan CSS
    { text: "Manakah cara menulis CSS yang direkomendasikan untuk proyek besar?", options: ["Inline CSS", "Internal CSS", "External CSS", "JavaScript CSS"], correct: 2, explanation: "External CSS (file terpisah) paling rapi dan mudah dipelihara untuk proyek besar." },
    // 3. Syntax dasar
    { text: "Manakah sintaks CSS yang benar?", options: ["body:color=black;", "{body;color:black;}", "body {color: black;}", "{body:color=black;}"], correct: 2, explanation: "Sintaks CSS: selector { property: value; }" },
    // 4. Selector universal
    { text: "Selector universal di CSS ditulis dengan?", options: ["*", "#", ".", "&"], correct: 0, explanation: "Selector universal (*) memilih semua elemen di halaman." },
    // 5. Element selector
    { text: "Selector `p` akan memengaruhi elemen apa?", options: ["Semua paragraf", "Semua heading", "Semua div", "Semua link"], correct: 0, explanation: "Selector p memilih semua elemen <p> (paragraf)." },
    // 6. Class selector
    { text: "Manakah penulisan class selector yang benar?", options: [".myclass", "#myclass", "myclass", "*myclass"], correct: 0, explanation: "Class selector ditulis dengan titik diikuti nama class." },
    // 7. ID selector
    { text: "Selector `#header` akan memilih elemen dengan?", options: ["class='header'", "id='header'", "name='header'", "tag header"], correct: 1, explanation: "ID selector (#) memilih elemen dengan id tertentu." },
    // 8. Prioritas selector (specificity)
    { text: "Manakah yang memiliki prioritas tertinggi dalam CSS?", options: ["Element selector", "Class selector", "ID selector", "Universal selector"], correct: 2, explanation: "ID selector memiliki spesifisitas tertinggi (100), mengalahkan class dan element." },
    // 9. Cascading
    { text: "Jika ada dua aturan dengan spesifisitas sama, aturan mana yang diterapkan?", options: ["Aturan pertama", "Aturan terakhir", "Aturan dengan !important", "Aturan dengan warna"], correct: 1, explanation: "Last rule wins: aturan yang ditulis terakhir akan diterapkan." },
    // 10. Warna CSS
    { text: "Manakah format warna yang benar untuk merah?", options: ["#ff0000", "rgb(0,0,255)", "hsl(240,100%,50%)", "color: red;"], correct: 0, explanation: "#ff0000 adalah kode HEX untuk merah. rgb(0,0,255) adalah biru." },
    // 11. Border
    { text: "Properti CSS untuk membuat garis tepi solid berwarna hitam setebal 2px?", options: ["border: 2px black solid;", "border: solid 2px black;", "border: 2px solid black;", "Semua benar"], correct: 3, explanation: "Semua urutan tersebut valid, yang umum: border: 2px solid black;" },
    // 12. Border-radius
    { text: "Properti untuk membuat sudut elemen melengkung?", options: ["border-curve", "border-radius", "corner-radius", "round-corner"], correct: 1, explanation: "border-radius membuat sudut elemen melengkung." },
    // 13. Margin
    { text: "Margin digunakan untuk mengatur?", options: ["Jarak luar elemen", "Jarak dalam elemen", "Ketebalan border", "Ukuran font"], correct: 0, explanation: "Margin adalah jarak di luar border, memisahkan elemen dengan elemen lain." },
    // 14. Padding
    { text: "Padding digunakan untuk mengatur?", options: ["Jarak luar elemen", "Jarak dalam elemen", "Warna latar", "Jarak antar teks"], correct: 1, explanation: "Padding adalah jarak antara konten dan border." },
    // 15. Box Model
    { text: "Urutan yang benar dari dalam ke luar pada box model?", options: ["Margin, Border, Padding, Content", "Content, Padding, Border, Margin", "Padding, Content, Border, Margin", "Border, Padding, Content, Margin"], correct: 1, explanation: "Box model: Content → Padding → Border → Margin." },
    // 16. Box-sizing
    { text: "Apa efek `box-sizing: border-box;`?", options: ["Lebar total = width + padding + border", "Lebar total = width saja (padding & border di dalam)", "Padding dan border diabaikan", "Margin ikut dihitung"], correct: 1, explanation: "border-box membuat width sudah termasuk padding dan border." },
    // 17. Text-align
    { text: "Properti untuk meratakan teks ke tengah?", options: ["text-align: middle;", "text-align: center;", "align: center;", "vertical-align: middle;"], correct: 1, explanation: "text-align: center; untuk perataan horizontal tengah." },
    // 18. Text-decoration
    { text: "Properti untuk memberi garis bawah pada teks?", options: ["text-underline", "text-decoration: underline;", "border-bottom", "text-line"], correct: 1, explanation: "text-decoration: underline; menambahkan garis bawah." },
    // 19. Font family
    { text: "Manakah cara menulis font-family dengan fallback yang benar?", options: ["font-family: Arial, sans-serif;", "font-family: 'Arial', 'sans-serif';", "font-family: Arial sans-serif;", "font: Arial, sans-serif;"], correct: 0, explanation: "font-family: 'Arial', sans-serif; (koma memisahkan font)." },
    // 20. Font size
    { text: "Satuan ukuran font yang relatif terhadap ukuran font root adalah?", options: ["px", "em", "rem", "%"], correct: 2, explanation: "rem relatif terhadap ukuran font elemen <html>." },
    // 21. Display block vs inline
    { text: "Manakah elemen yang secara default memiliki display: block?", options: ["<span>", "<a>", "<div>", "<img>"], correct: 2, explanation: "<div> adalah block-level, sedangkan span, a, img adalah inline." },
    // 22. Display inline-block
    { text: "Apa kelebihan `display: inline-block`?", options: ["Bisa diatur lebar/tinggi dan tetap dalam baris", "Selalu full width", "Tidak bisa diatur margin", "Seperti inline biasa"], correct: 0, explanation: "inline-block menggabungkan kelebihan inline (sejajar) dan block (bisa diatur dimensi)." },
    // 23. Position static
    { text: "Nilai default position adalah?", options: ["relative", "absolute", "fixed", "static"], correct: 3, explanation: "position: static adalah nilai default." },
    // 24. Position relative
    { text: "Apa efek `position: relative; top: 20px;`?", options: ["Elemen bergeser 20px ke bawah dari posisi normal", "Elemen tetap di tempat", "Elemen bergeser 20px ke atas", "Elemen menjadi absolute"], correct: 0, explanation: "relative menggeser elemen dari posisi normalnya, ruang asli tetap." },
    // 25. Position absolute
    { text: "Elemen dengan `position: absolute` diposisikan relatif terhadap?", options: ["Viewport", "Parent terdekat yang non-static", "Elemen body", "Posisi normal"], correct: 1, explanation: "absolute diposisikan terhadap ancestor terdekat dengan position non-static." },
    // 26. Position fixed
    { text: "Elemen dengan `position: fixed` akan?", options: ["Mengikuti scroll", "Tetap pada posisi relatif terhadap viewport", "Mengikuti parent", "Bergerak lambat"], correct: 1, explanation: "fixed tetap di posisi yang sama saat discroll." },
    // 27. Z-index
    { text: "Properti `z-index` mengatur?", options: ["Urutan tumpukan elemen", "Ukuran elemen", "Posisi horizontal", "Transparansi"], correct: 0, explanation: "z-index menentukan elemen mana yang tampil di atas." },
    // 28. Overflow
    { text: "Apa fungsi `overflow: auto;`?", options: ["Memotong konten berlebih", "Menampilkan scrollbar jika diperlukan", "Selalu menampilkan scrollbar", "Menyembunyikan konten"], correct: 1, explanation: "auto menampilkan scrollbar hanya jika konten melebihi ukuran." },
    // 29. Float
    { text: "Apa efek `float: left;` pada gambar?", options: ["Gambar di kiri, teks mengelilingi kanan", "Gambar di kanan", "Gambar menjadi block", "Gambar tersembunyi"], correct: 0, explanation: "float: left membuat gambar mengambang ke kiri dan teks mengelilinginya." },
    // 30. Clear
    { text: "Properti `clear: both;` digunakan untuk?", options: ["Menghentikan efek float di kedua sisi", "Membersihkan margin", "Menghapus border", "Mengatur posisi"], correct: 0, explanation: "clear: both menghentikan efek float di kiri dan kanan." },
    // 31. Align horizontal
    { text: "Cara memusatkan elemen block (misal div) secara horizontal?", options: ["text-align: center", "margin: 0 auto", "align: center", "position: center"], correct: 1, explanation: "margin: 0 auto memusatkan elemen block jika lebar ditentukan." },
    // 32. Flexbox center
    { text: "Cara memusatkan elemen secara horizontal dan vertikal dengan flexbox?", options: ["display: flex; justify-content: center;", "display: flex; align-items: center;", "display: flex; justify-content: center; align-items: center;", "display: flex; text-align: center;"], correct: 2, explanation: "Kombinasi justify-content: center (horizontal) dan align-items: center (vertikal)." },
    // 33. Combinator descendant
    { text: "Selector `div p` akan memilih?", options: ["Paragraf anak langsung div", "Semua paragraf di dalam div (termasuk yang di dalam elemen lain)", "Div yang berada di dalam paragraf", "Semua div dan paragraf"], correct: 1, explanation: "Spasi menunjukkan descendant selector: semua p di dalam div, di level mana pun." },
    // 34. Combinator child
    { text: "Selector `div > p` akan memilih?", options: ["Semua paragraf di dalam div", "Paragraf yang merupakan anak langsung dari div", "Div yang merupakan anak langsung paragraf", "Semua div dan paragraf"], correct: 1, explanation: "> adalah child selector, hanya anak langsung." },
    // 35. Pseudo-class hover
    { text: "Manakah pseudo-class untuk gaya saat mouse di atas elemen?", options: [":active", ":hover", ":focus", ":visited"], correct: 1, explanation: ":hover diterapkan saat kursor mouse berada di atas elemen." },
    // 36. Pseudo-class first-child
    { text: "Selector `li:first-child` akan memilih?", options: ["Semua elemen li", "Li pertama dari setiap parent", "Li terakhir", "Li yang memiliki kelas first-child"], correct: 1, explanation: ":first-child memilih elemen pertama di antara saudara-saudaranya." },
    // 37. Pseudo-element before
    { text: "Manakah sintaks untuk menambahkan konten sebelum elemen?", options: [":before", "::before", "before", "::after"], correct: 1, explanation: "::before (CSS3) atau :before (CSS2) menambahkan konten sebelum elemen." },
    // 38. Pseudo-element first-line
    { text: "Pseudo-element untuk menata baris pertama teks adalah?", options: ["::first-line", ":first-line", "::first-line-text", "first-line"], correct: 0, explanation: "::first-line menarget baris pertama dari sebuah blok teks." },
    // 39. Opacity
    { text: "Apa nilai opacity untuk elemen sepenuhnya transparan?", options: ["0", "1", "0.5", "transparent"], correct: 0, explanation: "opacity: 0 membuat elemen sepenuhnya transparan." },
    // 40. Box-shadow
    { text: "Properti untuk menambahkan bayangan pada kotak?", options: ["box-shadow", "text-shadow", "shadow", "drop-shadow"], correct: 0, explanation: "box-shadow menambahkan bayangan pada elemen kotak." },
    // 41. Transition
    { text: "Properti untuk membuat perubahan properti secara halus?", options: ["animation", "transition", "transform", "keyframes"], correct: 1, explanation: "transition mengubah properti secara halus dalam durasi tertentu." },
    // 42. Media query
    { text: "Apa fungsi media query?", options: ["Membuat animasi", "Desain responsif berdasarkan kondisi", "Mengimpor font", "Mengatur grid"], correct: 1, explanation: "Media query digunakan untuk desain responsif (berdasarkan lebar layar, dll)." },
    // 43. Flex container
    { text: "Properti apa yang menjadikan elemen sebagai flex container?", options: ["display: flex;", "display: block;", "position: flex;", "flex: container;"], correct: 0, explanation: "display: flex mengaktifkan flexbox pada container." },
    // 44. Grid
    { text: "Properti untuk membuat layout grid?", options: ["display: grid;", "display: flex;", "display: inline-block;", "display: table;"], correct: 0, explanation: "display: grid digunakan untuk CSS Grid Layout." },
    // 45. Responsive unit vw
    { text: "Satuan `vw` berarti?", options: ["1% dari lebar viewport", "1% dari tinggi viewport", "1% dari lebar parent", "1% dari ukuran font"], correct: 0, explanation: "1vw = 1% dari lebar viewport." },
    // 46. Background image
    { text: "Properti untuk menampilkan gambar latar belakang?", options: ["background-image", "background-color", "background-img", "image-background"], correct: 0, explanation: "background-image: url('gambar.jpg');" },
    // 47. Background size cover
    { text: "Apa efek `background-size: cover;`?", options: ["Gambar memenuhi seluruh area, mungkin terpotong", "Gambar ditampilkan utuh", "Gambar diulang", "Gambar tidak berubah"], correct: 0, explanation: "cover membuat gambar memenuhi area, proporsional, bisa terpotong." },
    // 48. List style
    { text: "Properti untuk menghilangkan bullet pada list?", options: ["list-style: none;", "bullet: none;", "list-type: none;", "marker: none;"], correct: 0, explanation: "list-style: none; menghilangkan bullet atau numbering." },
    // 49. Cursor pointer
    { text: "Properti CSS untuk mengubah kursor menjadi tangan saat hover?", options: ["cursor: hand;", "cursor: pointer;", "cursor: click;", "cursor: default;"], correct: 1, explanation: "cursor: pointer; menampilkan tangan seperti pada link." },
    // 50. Outline
    { text: "Apa perbedaan outline dan border?", options: ["Outline tidak mempengaruhi layout", "Outline selalu di luar margin", "Outline tidak bisa diwarnai", "Outline hanya untuk link"], correct: 0, explanation: "Outline tidak mempengaruhi ukuran/layout elemen, sedangkan border mempengaruhi." }
];

// ================= KONFIGURASI (GANTI SESUAI BAHASA) =================
const QUESTIONS_PER_SESSION = 10;          // Jumlah soal per sesi
const LEADERBOARD_KEY = 'quiz_css_leaderboard';  // Kunci localStorage (harus unik per bahasa)
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
    const shuffledBank = shuffleArray([...nkCss]);
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
    
    // Cek apakah nilai di bawah 70%
    const passingScore = Math.ceil(totalQuestions * 0.7);
    if (correctCount < passingScore) {
        alert("😔 Maaf, kecerdasan anda belum cukup. Mari kembali belajar.");
        window.location.href = "TutorialCSS.html";
        return;
    }
    
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