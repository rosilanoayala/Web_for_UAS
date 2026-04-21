// ================= BANK SOAL (200 SOAL: 50 HTML + 50 CSS + 50 C++ + 50 JS) =================
const questionBank = [
    // ========== HTML (1-50) ==========
    { text: "Apa kepanjangan dari HTML?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correct: 0, explanation: "HTML adalah singkatan dari Hyper Text Markup Language, bahasa standar untuk membuat halaman web." },
    { text: "Tag HTML mana yang digunakan untuk menampilkan gambar?", options: ["<img>", "<pic>", "<src>", "<td>"], correct: 0, explanation: "Tag <img> digunakan untuk menampilkan gambar. Atribut src menentukan URL gambar." },
    { text: "Manakah yang merupakan elemen semantic HTML?", options: ["<div>", "<span>", "<article>", "<b>"], correct: 2, explanation: "<article> adalah elemen semantic karena memiliki makna (artikel mandiri)." },
    { text: "Atribut mana yang digunakan untuk memberikan deskripsi teks alternatif pada gambar?", options: ["title", "alt", "src", "href"], correct: 1, explanation: "Atribut alt memberikan teks alternatif jika gambar gagal dimuat." },
    { text: "Manakah yang benar untuk membuat komentar di HTML?", options: ["// komentar", "/* komentar */", "<!-- komentar -->", "# komentar"], correct: 2, explanation: "Komentar HTML ditulis dengan <!-- ... -->." },
    { text: "Tag HTML manakah yang digunakan untuk membuat hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], correct: 1, explanation: "Tag <a> (anchor) digunakan untuk membuat hyperlink." },
    { text: "Manakah yang termasuk elemen block-level di HTML?", options: ["<span>", "<div>", "<img>", "<a>"], correct: 1, explanation: "<div> adalah elemen block-level yang memenuhi lebar parent." },
    { text: "Atribut target=\"_blank\" pada tag <a> berfungsi untuk?", options: ["Membuka link di tab yang sama", "Membuka link di tab baru", "Membuka link di frame", "Membuka link di jendela baru"], correct: 1, explanation: "target=\"_blank\" membuka link di tab atau jendela browser baru." },
    { text: "Tag HTML manakah untuk membuat daftar berurutan (numbered list)?", options: ["<ul>", "<ol>", "<li>", "<dl>"], correct: 1, explanation: "<ol> (ordered list) digunakan untuk daftar berurutan." },
    { text: "Apa fungsi dari tag <meta charset=\"UTF-8\">?", options: ["Mengatur warna teks", "Mengatur encoding karakter", "Mengatur ukuran font", "Mengatur layout halaman"], correct: 1, explanation: "meta charset menentukan encoding karakter agar teks tidak rusak." },
    { text: "Manakah yang merupakan atribut wajib pada tag <img>?", options: ["src dan alt", "src dan title", "width dan height", "alt dan title"], correct: 0, explanation: "src (sumber gambar) dan alt (teks alternatif) adalah atribut wajib." },
    { text: "Tag HTML manakah untuk membuat baris baru?", options: ["<br>", "<p>", "<hr>", "<div>"], correct: 0, explanation: "<br> (break) digunakan untuk membuat baris baru." },
    { text: "Apa fungsi dari tag <title>?", options: ["Menampilkan judul di body", "Menampilkan judul di tab browser", "Membuat tooltip", "Membuat heading"], correct: 1, explanation: "Tag <title> menentukan judul halaman yang muncul di tab browser." },
    { text: "Tag HTML manakah untuk heading terbesar?", options: ["<h1>", "<h2>", "<h3>", "<h6>"], correct: 0, explanation: "<h1> adalah heading level tertinggi (paling besar)." },
    { text: "Manakah tag untuk membuat paragraf?", options: ["<para>", "<p>", "<pg>", "<paragraph>"], correct: 1, explanation: "Tag <p> digunakan untuk membuat paragraf." },
    { text: "Apa fungsi dari tag <strong>?", options: ["Membuat teks tebal secara visual", "Memberi penekanan penting (semantik)", "Membuat teks miring", "Membuat teks besar"], correct: 1, explanation: "<strong> memberi penekanan penting secara semantik." },
    { text: "Manakah yang merupakan elemen void (tidak memiliki tag penutup)?", options: ["<div>", "<p>", "<img>", "<h1>"], correct: 2, explanation: "<img> adalah void element, tidak memiliki tag penutup." },
    { text: "Tag HTML manakah untuk membuat daftar tidak berurutan (bullet list)?", options: ["<ul>", "<ol>", "<li>", "<dl>"], correct: 0, explanation: "<ul> (unordered list) digunakan untuk daftar dengan bullet." },
    { text: "Apa fungsi dari tag <hr>?", options: ["Membuat garis horizontal", "Membuat baris baru", "Membuat heading", "Membuat link"], correct: 0, explanation: "<hr> (horizontal rule) membuat garis horizontal." },
    { text: "Manakah tag untuk membuat tabel?", options: ["<table>", "<tab>", "<tbl>", "<grid>"], correct: 0, explanation: "Tag <tr> digunakan untuk membuat tabel." },
    { text: "Atribut colspan pada tag <td> berfungsi untuk?", options: ["Menggabungkan baris", "Menggabungkan kolom", "Mengatur warna", "Mengatur lebar"], correct: 1, explanation: "colspan menggabungkan beberapa kolom menjadi satu sel." },
    { text: "Tag HTML manakah untuk membuat form?", options: ["<form>", "<input>", "<fieldset>", "<button>"], correct: 0, explanation: "Tag <form> digunakan untuk membuat formulir." },
    { text: "Manakah tipe input untuk menampilkan tombol radio?", options: ["radio", "checkbox", "button", "submit"], correct: 0, explanation: "input type='radio' untuk tombol pilihan tunggal." },
    { text: "Apa fungsi dari tag <label>?", options: ["Memberi label pada input", "Membuat teks tebal", "Membuat heading", "Membuat link"], correct: 0, explanation: "Tag <label> menghubungkan teks dengan input, meningkatkan aksesibilitas." },
    { text: "Manakah yang termasuk elemen semantic HTML5?", options: ["<header>", "<div>", "<span>", "<b>"], correct: 0, explanation: "<header> adalah elemen semantic untuk bagian atas halaman." },
    { text: "Apa fungsi dari tag <footer>?", options: ["Bagian bawah halaman", "Bagian atas halaman", "Navigasi", "Konten utama"], correct: 0, explanation: "<footer> merepresentasikan footer dari halaman atau section." },
    { text: "Manakah yang benar untuk menyisipkan CSS eksternal?", options: ["<link rel='stylesheet' href='style.css'>", "<style src='style.css'>", "<css src='style.css'>", "<script src='style.css'>"], correct: 0, explanation: "<link> dengan rel='stylesheet' digunakan untuk menghubungkan file CSS eksternal." },
    { text: "Atribut placeholder pada input digunakan untuk?", options: ["Memberi nilai default", "Memberi teks petunjuk", "Memberi nama input", "Memberi validasi"], correct: 1, explanation: "placeholder menampilkan teks petunjuk di dalam input." },
    { text: "Manakah yang merupakan elemen inline?", options: ["<div>", "<p>", "<span>", "<h1>"], correct: 2, explanation: "<span> adalah elemen inline, tidak memulai baris baru." },
    { text: "Apa fungsi dari <!DOCTYPE html>?", options: ["Memberi tahu jenis dokumen HTML5", "Mendeklarasikan CSS", "Membuat komentar", "Mendefinisikan JavaScript"], correct: 0, explanation: "DOCTYPE memberi tahu browser bahwa dokumen menggunakan HTML5." },
    { text: "Manakah atribut untuk membuka link di tab baru?", options: ["target='_self'", "target='_blank'", "target='_top'", "target='_parent'"], correct: 1, explanation: "target='_blank' membuka link di tab atau jendela baru." },
    { text: "Tag HTML manakah untuk membuat baris dalam tabel?", options: ["<tr>", "<td>", "<th>", "<table>"], correct: 0, explanation: "<tr> (table row) digunakan untuk membuat baris tabel." },
    { text: "Apa fungsi dari atribut required pada input?", options: ["Membuat input wajib diisi", "Memberi nilai default", "Mematikan input", "Membuat input read-only"], correct: 0, explanation: "required membuat field harus diisi sebelum form disubmit." },
    { text: "Tag HTML manakah untuk menampilkan video?", options: ["<video>", "<media>", "<movie>", "<vid>"], correct: 0, explanation: "Tag <video> digunakan untuk menyematkan video." },
    { text: "Apa fungsi dari tag <nav>?", options: ["Navigasi menu", "Footer", "Header", "Section"], correct: 0, explanation: "<nav> digunakan untuk menu navigasi." },
    { text: "Manakah yang merupakan karakter escape untuk tanda kurang dari (<) di HTML?", options: ["&lt;", "&gt;", "&amp;", "&copy;"], correct: 0, explanation: "&lt; adalah entity untuk tanda <." },
    { text: "Apa fungsi dari tag <iframe>?", options: ["Menyematkan halaman lain", "Menyematkan gambar", "Menyematkan audio", "Menyematkan video"], correct: 0, explanation: "iframe digunakan untuk menyematkan dokumen HTML lain di dalam halaman." },
    { text: "Manakah tag untuk membuat dropdown list?", options: ["<select>", "<dropdown>", "<list>", "<input type='dropdown'>"], correct: 0, explanation: "Tag <select> dengan <option> membuat dropdown." },
    { text: "Apa fungsi dari tag <fieldset>?", options: ["Mengelompokkan elemen form", "Membuat field input", "Membuat legend", "Membuat button"], correct: 0, explanation: "<fieldset> mengelompokkan elemen-elemen dalam form." },
    { text: "Manakah yang merupakan nilai dari atribut type pada input untuk password?", options: ["text", "password", "secret", "hidden"], correct: 1, explanation: "input type='password' menyembunyikan karakter yang diketik." },
    { text: "Apa fungsi dari tag <article>?", options: ["Konten independen (artikel, berita)", "Navigasi", "Footer", "Header"], correct: 0, explanation: "<article> untuk konten yang berdiri sendiri, seperti posting blog." },
    { text: "Manakah tag untuk membuat subscript (tulisan kecil di bawah)?", options: ["<sub>", "<sup>", "<small>", "<down>"], correct: 0, explanation: "<sub> (subscript) membuat teks kecil di bawah garis normal." },
    { text: "Apa fungsi dari tag <aside>?", options: ["Konten sampingan (sidebar)", "Konten utama", "Navigasi", "Footer"], correct: 0, explanation: "<aside> untuk konten yang terkait namun tidak utama (misal sidebar)." },
    { text: "Manakah yang merupakan cara menuliskan class di CSS?", options: [".nama", "#nama", "*nama", "nama"], correct: 0, explanation: "Class selector dalam CSS ditulis dengan titik." },
    { text: "Apa perbedaan utama antara <div> dan <span>?", options: ["<div> inline, <span> block", "<div> block, <span> inline", "Keduanya block", "Keduanya inline"], correct: 1, explanation: "<div> adalah elemen block (mengambil lebar penuh), <span> adalah inline (tidak memulai baris baru)." },
    { text: "Tag HTML manakah untuk membuat superscript (tulisan kecil di atas)?", options: ["<sup>", "<sub>", "<small>", "<up>"], correct: 0, explanation: "<sup> (superscript) membuat teks kecil di atas garis normal." },
    { text: "Apa fungsi dari atribut action pada tag <form>?", options: ["URL tujuan pengiriman data", "Metode pengiriman", "Validasi form", "Mengatur enkripsi"], correct: 0, explanation: "action menentukan URL di mana data form akan dikirim." },
    { text: "Manakah yang merupakan tag untuk membuat daftar definisi?", options: ["<dl>", "<ul>", "<ol>", "<li>"], correct: 0, explanation: "<dl> (definition list) digunakan untuk daftar definisi." },
    { text: "Apa output dari <p>Halo<br>Dunia</p>?", options: ["Halo Dunia (satu baris)", "Halo\nDunia (dua baris)", "Halo<br>Dunia (teks mentah)", "Error"], correct: 1, explanation: "<br> membuat baris baru, sehingga teks tampil dua baris." },
    { text: "Apa fungsi dari tag <figure>?", options: ["Mengelompokkan ilustrasi (gambar, diagram, dll)", "Membuat tabel", "Membuat form", "Membuat footer"], correct: 0, explanation: "Tag <figure> digunakan untuk mengelompokkan konten ilustrasi seperti gambar, diagram, kode, dll, biasanya bersama <figcaption>." },

    // ========== CSS (51-100) ==========
    { text: "Apa kepanjangan dari CSS?", options: ["Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"], correct: 2, explanation: "CSS adalah singkatan dari Cascading Style Sheets, bahasa untuk mengatur tampilan halaman web." },
    { text: "Manakah cara menulis CSS yang direkomendasikan untuk proyek besar?", options: ["Inline CSS", "Internal CSS", "External CSS", "JavaScript CSS"], correct: 2, explanation: "External CSS (file terpisah) paling rapi dan mudah dipelihara untuk proyek besar." },
    { text: "Manakah sintaks CSS yang benar?", options: ["body:color=black;", "{body;color:black;}", "body {color: black;}", "{body:color=black;}"], correct: 2, explanation: "Sintaks CSS: selector { property: value; }" },
    { text: "Selector universal di CSS ditulis dengan?", options: ["", "#", ".", "&"], correct: 0, explanation: "Selector universal () memilih semua elemen di halaman." },
    { text: "Selector p akan memengaruhi elemen apa?", options: ["Semua paragraf", "Semua heading", "Semua div", "Semua link"], correct: 0, explanation: "Selector p memilih semua elemen <p> (paragraf)." },
    { text: "Manakah penulisan class selector yang benar?", options: [".myclass", "#myclass", "myclass", "*myclass"], correct: 0, explanation: "Class selector ditulis dengan titik diikuti nama class." },
    { text: "Selector #header akan memilih elemen dengan?", options: ["class='header'", "id='header'", "name='header'", "tag header"], correct: 1, explanation: "ID selector (#) memilih elemen dengan id tertentu." },
    { text: "Manakah yang memiliki prioritas tertinggi dalam CSS?", options: ["Element selector", "Class selector", "ID selector", "Universal selector"], correct: 2, explanation: "ID selector memiliki spesifisitas tertinggi (100), mengalahkan class dan element." },
    { text: "Jika ada dua aturan dengan spesifisitas sama, aturan mana yang diterapkan?", options: ["Aturan pertama", "Aturan terakhir", "Aturan dengan !important", "Aturan dengan warna"], correct: 1, explanation: "Last rule wins: aturan yang ditulis terakhir akan diterapkan." },
    { text: "Manakah format warna yang benar untuk merah?", options: ["#ff0000", "rgb(0,0,255)", "hsl(240,100%,50%)", "color: red;"], correct: 0, explanation: "#ff0000 adalah kode HEX untuk merah. rgb(0,0,255) adalah biru." },
    { text: "Properti CSS untuk membuat garis tepi solid berwarna hitam setebal 2px?", options: ["border: 2px black solid;", "border: solid 2px black;", "border: 2px solid black;", "Semua benar"], correct: 3, explanation: "Semua urutan tersebut valid, yang umum: border: 2px solid black;" },
    { text: "Properti untuk membuat sudut elemen melengkung?", options: ["border-curve", "border-radius", "corner-radius", "round-corner"], correct: 1, explanation: "border-radius membuat sudut elemen melengkung." },
    { text: "Margin digunakan untuk mengatur?", options: ["Jarak luar elemen", "Jarak dalam elemen", "Ketebalan border", "Ukuran font"], correct: 0, explanation: "Margin adalah jarak di luar border, memisahkan elemen dengan elemen lain." },
    { text: "Padding digunakan untuk mengatur?", options: ["Jarak luar elemen", "Jarak dalam elemen", "Warna latar", "Jarak antar teks"], correct: 1, explanation: "Padding adalah jarak antara konten dan border." },
    { text: "Urutan yang benar dari dalam ke luar pada box model?", options: ["Margin, Border, Padding, Content", "Content, Padding, Border, Margin", "Padding, Content, Border, Margin", "Border, Padding, Content, Margin"], correct: 1, explanation: "Box model: Content → Padding → Border → Margin." },
    { text: "Apa efek box-sizing: border-box;?", options: ["Lebar total = width + padding + border", "Lebar total = width saja (padding & border di dalam)", "Padding dan border diabaikan", "Margin ikut dihitung"], correct: 1, explanation: "border-box membuat width sudah termasuk padding dan border." },
    { text: "Properti untuk meratakan teks ke tengah?", options: ["text-align: middle;", "text-align: center;", "align: center;", "vertical-align: middle;"], correct: 1, explanation: "text-align: center; untuk perataan horizontal tengah." },
    { text: "Properti untuk memberi garis bawah pada teks?", options: ["text-underline", "text-decoration: underline;", "border-bottom", "text-line"], correct: 1, explanation: "text-decoration: underline; menambahkan garis bawah." },
    { text: "Manakah cara menulis font-family dengan fallback yang benar?", options: ["font-family: Arial, sans-serif;", "font-family: 'Arial', 'sans-serif';", "font-family: Arial sans-serif;", "font: Arial, sans-serif;"], correct: 0, explanation: "font-family: 'Arial', sans-serif; (koma memisahkan font)." },
    { text: "Satuan ukuran font yang relatif terhadap ukuran font root adalah?", options: ["px", "em", "rem", "%"], correct: 2, explanation: "rem relatif terhadap ukuran font elemen <html>." },
    { text: "Manakah elemen yang secara default memiliki display: block?", options: ["<span>", "<a>", "<div>", "<img>"], correct: 2, explanation: "<div> adalah block-level, sedangkan span, a, img adalah inline." },
    { text: "Apa kelebihan display: inline-block?", options: ["Bisa diatur lebar/tinggi dan tetap dalam baris", "Selalu full width", "Tidak bisa diatur margin", "Seperti inline biasa"], correct: 0, explanation: "inline-block menggabungkan kelebihan inline (sejajar) dan block (bisa diatur dimensi)." },
    { text: "Nilai default position adalah?", options: ["relative", "absolute", "fixed", "static"], correct: 3, explanation: "position: static adalah nilai default." },
    { text: "Apa efek position: relative; top: 20px;?", options: ["Elemen bergeser 20px ke bawah dari posisi normal", "Elemen tetap di tempat", "Elemen bergeser 20px ke atas", "Elemen menjadi absolute"], correct: 0, explanation: "relative menggeser elemen dari posisi normalnya, ruang asli tetap." },
    { text: "Elemen dengan position: absolute diposisikan relatif terhadap?", options: ["Viewport", "Parent terdekat yang non-static", "Elemen body", "Posisi normal"], correct: 1, explanation: "absolute diposisikan terhadap ancestor terdekat dengan position non-static." },
    { text: "Elemen dengan position: fixed akan?", options: ["Mengikuti scroll", "Tetap pada posisi relatif terhadap viewport", "Mengikuti parent", "Bergerak lambat"], correct: 1, explanation: "fixed tetap di posisi yang sama saat discroll." },
    { text: "Properti z-index mengatur?", options: ["Urutan tumpukan elemen", "Ukuran elemen", "Posisi horizontal", "Transparansi"], correct: 0, explanation: "z-index menentukan elemen mana yang tampil di atas." },
    { text: "Apa fungsi overflow: auto;?", options: ["Memotong konten berlebih", "Menampilkan scrollbar jika diperlukan", "Selalu menampilkan scrollbar", "Menyembunyikan konten"], correct: 1, explanation: "auto menampilkan scrollbar hanya jika konten melebihi ukuran." },
    { text: "Apa efek float: left; pada gambar?", options: ["Gambar di kiri, teks mengelilingi kanan", "Gambar di kanan", "Gambar menjadi block", "Gambar tersembunyi"], correct: 0, explanation: "float: left membuat gambar mengambang ke kiri dan teks mengelilinginya." },
    { text: "Properti clear: both; digunakan untuk?", options: ["Menghentikan efek float di kedua sisi", "Membersihkan margin", "Menghapus border", "Mengatur posisi"], correct: 0, explanation: "clear: both menghentikan efek float di kiri dan kanan." },
    { text: "Cara memusatkan elemen block (misal div) secara horizontal?", options: ["text-align: center", "margin: 0 auto", "align: center", "position: center"], correct: 1, explanation: "margin: 0 auto memusatkan elemen block jika lebar ditentukan." },
    { text: "Cara memusatkan elemen secara horizontal dan vertikal dengan flexbox?", options: ["display: flex; justify-content: center;", "display: flex; align-items: center;", "display: flex; justify-content: center; align-items: center;", "display: flex; text-align: center;"], correct: 2, explanation: "Kombinasi justify-content: center (horizontal) dan align-items: center (vertikal)." },
    { text: "Selector div p akan memilih?", options: ["Paragraf anak langsung div", "Semua paragraf di dalam div (termasuk yang di dalam elemen lain)", "Div yang berada di dalam paragraf", "Semua div dan paragraf"], correct: 1, explanation: "Spasi menunjukkan descendant selector: semua p di dalam div, di level mana pun." },
    { text: "Selector div > p akan memilih?", options: ["Semua paragraf di dalam div", "Paragraf yang merupakan anak langsung dari div", "Div yang merupakan anak langsung paragraf", "Semua div dan paragraf"], correct: 1, explanation: "> adalah child selector, hanya anak langsung." },
    { text: "Manakah pseudo-class untuk gaya saat mouse di atas elemen?", options: [":active", ":hover", ":focus", ":visited"], correct: 1, explanation: ":hover diterapkan saat kursor mouse berada di atas elemen." },
    { text: "Selector li:first-child akan memilih?", options: ["Semua elemen li", "Li pertama dari setiap parent", "Li terakhir", "Li yang memiliki kelas first-child"], correct: 1, explanation: ":first-child memilih elemen pertama di antara saudara-saudaranya." },
    { text: "Manakah sintaks untuk menambahkan konten sebelum elemen?", options: [":before", "::before", "before", "::after"], correct: 1, explanation: "::before (CSS3) atau :before (CSS2) menambahkan konten sebelum elemen." },
    { text: "Pseudo-element untuk menata baris pertama teks adalah?", options: ["::first-line", ":first-line", "::first-line-text", "first-line"], correct: 0, explanation: "::first-line menarget baris pertama dari sebuah blok teks." },
    { text: "Apa nilai opacity untuk elemen sepenuhnya transparan?", options: ["0", "1", "0.5", "transparent"], correct: 0, explanation: "opacity: 0 membuat elemen sepenuhnya transparan." },
    { text: "Properti untuk menambahkan bayangan pada kotak?", options: ["box-shadow", "text-shadow", "shadow", "drop-shadow"], correct: 0, explanation: "box-shadow menambahkan bayangan pada elemen kotak." },
    { text: "Properti untuk membuat perubahan properti secara halus?", options: ["animation", "transition", "transform", "keyframes"], correct: 1, explanation: "transition mengubah properti secara halus dalam durasi tertentu." },
    { text: "Apa fungsi media query?", options: ["Membuat animasi", "Desain responsif berdasarkan kondisi", "Mengimpor font", "Mengatur grid"], correct: 1, explanation: "Media query digunakan untuk desain responsif (berdasarkan lebar layar, dll)." },
    { text: "Properti apa yang menjadikan elemen sebagai flex container?", options: ["display: flex;", "display: block;", "position: flex;", "flex: container;"], correct: 0, explanation: "display: flex mengaktifkan flexbox pada container." },
    { text: "Properti untuk membuat layout grid?", options: ["display: grid;", "display: flex;", "display: inline-block;", "display: table;"], correct: 0, explanation: "display: grid digunakan untuk CSS Grid Layout." },
    { text: "Satuan vw berarti?", options: ["1% dari lebar viewport", "1% dari tinggi viewport", "1% dari lebar parent", "1% dari ukuran font"], correct: 0, explanation: "1vw = 1% dari lebar viewport." },
    { text: "Properti untuk menampilkan gambar latar belakang?", options: ["background-image", "background-color", "background-img", "image-background"], correct: 0, explanation: "background-image: url('gambar.jpg');" },
    { text: "Apa efek background-size: cover;?", options: ["Gambar memenuhi seluruh area, mungkin terpotong", "Gambar ditampilkan utuh", "Gambar diulang", "Gambar tidak berubah"], correct: 0, explanation: "cover membuat gambar memenuhi area, proporsional, bisa terpotong." },
    { text: "Properti untuk menghilangkan bullet pada list?", options: ["list-style: none;", "bullet: none;", "list-type: none;", "marker: none;"], correct: 0, explanation: "list-style: none; menghilangkan bullet atau numbering." },
    { text: "Properti CSS untuk mengubah kursor menjadi tangan saat hover?", options: ["cursor: hand;", "cursor: pointer;", "cursor: click;", "cursor: default;"], correct: 1, explanation: "cursor: pointer; menampilkan tangan seperti pada link." },
    { text: "Properti CSS untuk memutar elemen?", options: ["transform: rotate();", "transition: rotate;", "animation: rotate;", "rotate: 90deg;"], correct: 0, explanation: "transform: rotate(deg) digunakan untuk memutar elemen. Nilai deg dalam derajat." },

    // ========== C++ (101-150) ==========
    { text: "Apa output dari cout << (5 / 2);?", options: ["2.5", "2", "2.0", "Error"], correct: 1, explanation: "Pembagian integer (5/2) menghasilkan 2 karena pecahan dibuang." },
    { text: "Manakah yang benar untuk mendeklarasikan pointer ke integer?", options: ["int ptr;", "int* ptr;", "&int ptr;", "ptr int*;"], correct: 1, explanation: "Pointer ke integer dideklarasikan dengan int* ptr; atau int *ptr;" },
    { text: "Apa fungsi dari cin dalam C++?", options: ["Menampilkan output", "Membaca input dari keyboard", "Membuka file", "Menghapus variabel"], correct: 1, explanation: "cin adalah objek untuk membaca input dari pengguna." },
    { text: "Manakah yang merupakan loop dengan kondisi di awal?", options: ["do-while", "while", "for", "switch"], correct: 1, explanation: "Loop while mengecek kondisi di awal." },
    { text: "Apa output dari program berikut? int a=5; int &b=a; b=10; cout<<a;", options: ["5", "10", "Error", "0"], correct: 1, explanation: "b adalah reference ke a, mengubah b juga mengubah a." },
    { text: "Manakah keyword untuk alokasi memori dinamis di C++?", options: ["malloc", "new", "alloc", "create"], correct: 1, explanation: "Operator 'new' digunakan untuk alokasi memori dinamis." },
    { text: "Apa fungsi dari namespace std?", options: ["Mendefinisikan fungsi standar", "Memudahkan akses ke library standar", "Membuat variabel global", "Mengatur memori"], correct: 1, explanation: "using namespace std; memungkinkan kita menggunakan elemen standar tanpa std:: prefix." },
    { text: "Manakah tipe data untuk bilangan desimal presisi ganda?", options: ["float", "double", "int", "long"], correct: 1, explanation: "double memiliki presisi lebih tinggi dari float (15-16 digit)." },
    { text: "Apa output dari cout << (10 % 3);?", options: ["3", "1", "0", "3.33"], correct: 1, explanation: "Operator % (modulus) menghasilkan sisa bagi, 10 % 3 = 1." },
    { text: "Manakah cara benar mendefinisikan fungsi di C++?", options: ["function add(int a, int b) { return a+b; }", "int add(int a, int b) { return a+b; }", "add(int a, int b) => a+b", "def add(a,b): return a+b"], correct: 1, explanation: "Fungsi di C++ harus diawali tipe data return." },
    { text: "Apa fungsi dari #include <iostream>?", options: ["Memasukkan library input/output", "Mendefinisikan fungsi main", "Membuat objek cout", "Mengatur namespace"], correct: 0, explanation: "#include <iostream> menyertakan library standar untuk input/output." },
    { text: "Manakah operator perbandingan 'tidak sama dengan'?", options: ["=", "==", "!=", "<>"], correct: 2, explanation: "Operator != digunakan untuk membandingkan ketidaksamaan." },
    { text: "Apa output dari int x = 5; cout << ++x;?", options: ["5", "6", "Error", "++5"], correct: 1, explanation: "++x (pre-increment) menambah nilai x menjadi 6, lalu mencetak." },
    { text: "Manakah yang termasuk access modifier di C++?", options: ["public", "static", "final", "abstract"], correct: 0, explanation: "public, private, protected adalah access modifier." },
    { text: "Apa output dari int x = 5; cout << x++;?", options: ["5", "6", "Error", "++5"], correct: 0, explanation: "x++ (post-increment) mencetak nilai asli (5), lalu menambah." },
    { text: "Manakah cara menginisialisasi array 5 elemen?", options: ["int arr[5] = {1,2,3,4,5};", "int arr[5] = 1,2,3,4,5;", "int arr[] = 5;", "arr = [1,2,3,4,5];"], correct: 0, explanation: "Inisialisasi array dengan kurung kurawal." },
    { text: "Apa fungsi dari virtual dalam C++?", options: ["Membuat fungsi statis", "Membuat fungsi dapat di-override", "Membuat fungsi inline", "Membuat fungsi privat"], correct: 1, explanation: "virtual memungkinkan fungsi di-override di kelas turunan (polimorfisme)." },
    { text: "Manakah yang merupakan constructor?", options: ["~Class()", "Class()", "void Class()", "Class*()"], correct: 1, explanation: "Constructor memiliki nama sama dengan class, tanpa tipe return." },
    { text: "Apa output dari cout << (true && false);?", options: ["1", "0", "true", "false"], correct: 1, explanation: "true && false menghasilkan false (0)." },
    { text: "Manakah cara membuat konstanta di C++?", options: ["#define PI 3.14", "const double PI = 3.14;", "PI = 3.14", "constant PI = 3.14;"], correct: 1, explanation: "const adalah cara modern untuk mendeklarasikan konstanta." },
    { text: "Apa output dari cout << (3 > 2 ? \"Yes\" : \"No\");?", options: ["Yes", "No", "1", "0"], correct: 0, explanation: "Operator ternary: kondisi true, maka output 'Yes'." },
    { text: "Manakah yang termasuk STL container?", options: ["vector", "iostream", "string", "cmath"], correct: 0, explanation: "vector adalah container STL (Standard Template Library)." },
    { text: "Apa fungsi dari break dalam loop?", options: ["Melanjutkan iterasi", "Menghentikan loop", "Melompat ke fungsi lain", "Mengulang loop"], correct: 1, explanation: "break menghentikan loop sepenuhnya." },
    { text: "Manakah tipe data yang tepat untuk 'A'?", options: ["string", "char", "int", "bool"], correct: 1, explanation: "Karakter tunggal menggunakan tipe char." },
    { text: "Apa output dari cout << (5 == 5);?", options: ["true", "1", "5", "Error"], correct: 1, explanation: "Perbandingan true direpresentasikan sebagai 1." },
    { text: "Manakah yang merupakan loop tak terbatas?", options: ["for(;;)", "while(1)", "do{}while(1)", "Semua benar"], correct: 3, explanation: "Ketiga bentuk tersebut menghasilkan infinite loop." },
    { text: "Apa fungsi dari sizeof operator?", options: ["Mengubah ukuran variabel", "Mengembalikan ukuran dalam byte", "Mengalokasi memori", "Menghapus variabel"], correct: 1, explanation: "sizeof mengembalikan ukuran memori suatu tipe atau variabel." },
    { text: "Manakah yang merupakan reference?", options: ["int ptr", "int &ref", "int ref", "int& ref"], correct: 1, explanation: "Reference dideklarasikan dengan & setelah tipe." },
    { text: "Apa output dari cout << (3.0/2);?", options: ["1", "1.5", "1.0", "Error"], correct: 1, explanation: "Karena 3.0 adalah double, hasil pembagian adalah double (1.5)." },
    { text: "Manakah keyword untuk inheritance public?", options: [": public Base", "extends Base", "implements Base", "inherits Base"], correct: 0, explanation: "Sintaks inheritance: class Derived : public Base {};" },
    { text: "Apa output dari int a=5; int *p=&a; cout << *p;?", options: ["Alamat a", "5", "0", "Error"], correct: 1, explanation: "*p dereference pointer, mengakses nilai a." },
    { text: "Manakah fungsi untuk mengakhiri program?", options: ["exit(0)", "return 0", "break", "continue"], correct: 0, explanation: "exit(0) menghentikan program segera." },
    { text: "Apa output dari cout << (2 << 1);?", options: ["2", "4", "1", "0"], correct: 1, explanation: "Shift left: 2 (10) << 1 = 4 (100)." },
    { text: "Manakah yang termasuk tipe data unsigned?", options: ["int", "unsigned int", "float", "double"], correct: 1, explanation: "unsigned int hanya menyimpan nilai positif." },
    { text: "Apa fungsi dari friend function?", options: ["Membuat fungsi menjadi privat", "Mengizinkan akses ke private member", "Membuat fungsi statis", "Meng-overload operator"], correct: 1, explanation: "friend function dapat mengakses private member class." },
    { text: "Manakah cara menangani exception di C++?", options: ["try-catch", "if-else", "switch", "loop"], correct: 0, explanation: "try-catch digunakan untuk exception handling." },
    { text: "Apa output dari int x=10; int &y=x; y=20; cout<<x;?", options: ["10", "20", "Error", "0"], correct: 1, explanation: "y adalah reference ke x, mengubah y mengubah x." },
    { text: "Manakah operator untuk alamat memori?", options: ["&", "*", "->", "."], correct: 0, explanation: "Operator & mengembalikan alamat memori variabel." },
    { text: "Apa output dari cout << (5 | 3);?", options: ["5", "7", "3", "1"], correct: 1, explanation: "Bitwise OR: 5 (101) | 3 (011) = 7 (111)." },
    { text: "Manakah yang termasuk preprocessor directive?", options: ["#include", "using namespace", "int main", "return 0"], correct: 0, explanation: "#include adalah preprocessor directive." },
    { text: "Apa fungsi dari const pada parameter fungsi?", options: ["Mencegah perubahan parameter", "Membuat parameter default", "Membuat parameter statis", "Membuat parameter reference"], correct: 0, explanation: "const parameter tidak dapat diubah di dalam fungsi." },
    { text: "Manakah cara membuat array dinamis?", options: ["int arr = new int[5];", "int* arr = new int[5];", "int arr[5];", "int arr = malloc(5);"], correct: 1, explanation: "new mengembalikan pointer ke array dinamis." },
    { text: "Apa output dari cout << (5 && 3);?", options: ["1", "0", "5", "3"], correct: 0, explanation: "Operator logika AND mengembalikan true (1) karena keduanya non-nol." },
    { text: "Manakah yang merupakan destructor?", options: ["Class()", "Class()", "~Class", "Class::~Class"], correct: 0, explanation: "Destructor memiliki tanda tilde ()." },
    { text: "Apa output dari int x=5; cout << (x>3 ? x++ : x--);?", options: ["5", "6", "4", "Error"], correct: 0, explanation: "Kondisi true, maka x++ mengembalikan nilai asli (5)." },
    { text: "Manakah keyword untuk mewarisi secara private?", options: [": private Base", ": protected Base", ": public Base", "private Base"], correct: 0, explanation: "Inheritance private menggunakan : private Base." },
    { text: "Apa output dari cout << (0.1 + 0.2 == 0.3);?", options: ["true", "false", "1", "0"], correct: 1, explanation: "Karena presisi floating point, hasil bisa false." },
    { text: "Manakah yang termasuk compile-time polymorphism?", options: ["Function overloading", "Virtual function", "Inheritance", "Encapsulation"], correct: 0, explanation: "Function overloading diselesaikan saat kompilasi." },
    { text: "Manakah cara yang benar untuk mendeklarasikan vector di C++ (STL)?", options: ["vector<int> v;", "vector v;", "v<int> vector;", "int vector v;"], correct: 0, explanation: "Vector dideklarasikan dengan vector<tipe_data> nama_vector; dan memerlukan #include <vector>." },

    // ========== JavaScript (151-200) ==========
    { text: "Apa fungsi utama JavaScript dalam pengembangan web?", options: ["Mengatur struktur halaman", "Mengatur tampilan", "Membuat halaman dinamis dan interaktif", "Menyimpan data server"], correct: 2, explanation: "JavaScript membuat halaman web menjadi dinamis dan interaktif." },
    { text: "Manakah cara yang benar untuk menulis JavaScript eksternal?", options: ["<script src='script.js'>", "<script href='script.js'>", "<js src='script.js'>", "<link src='script.js'>"], correct: 0, explanation: "Tag <script> dengan atribut src digunakan untuk menghubungkan file JavaScript eksternal." },
    { text: "Apa output dari console.log(typeof 42)?", options: ["'number'", "'string'", "'object'", "'undefined'"], correct: 0, explanation: "typeof 42 menghasilkan 'number' karena 42 adalah tipe data number." },
    { text: "Manakah keyword untuk mendeklarasikan variabel yang nilainya tidak bisa diubah?", options: ["let", "var", "const", "constant"], correct: 2, explanation: "const digunakan untuk variabel yang nilainya tetap (konstan)." },
    { text: "Apa hasil dari '5' + 3 di JavaScript?", options: ["8", "53", "Error", "undefined"], correct: 1, explanation: "Operator + dengan string melakukan konkatenasi (penggabungan), sehingga '5' + 3 = '53'." },
    { text: "Manakah yang merupakan tipe data primitif di JavaScript?", options: ["Object", "Array", "Boolean", "Function"], correct: 2, explanation: "Boolean adalah tipe data primitif. Object, Array, Function adalah tipe referensi." },
    { text: "Apa fungsi dari addEventListener?", options: ["Mendaftarkan event handler", "Mengubah style CSS", "Membuat elemen baru", "Menghapus elemen"], correct: 0, explanation: "addEventListener digunakan untuk mendaftarkan fungsi yang akan dipanggil saat event tertentu terjadi." },
    { text: "Manakah cara mengakses elemen dengan id 'demo'?", options: ["document.getElementsByClassName('demo')", "document.getElementById('demo')", "document.querySelectorAll('.demo')", "document.getElementsByTagName('demo')"], correct: 1, explanation: "getElementById() adalah metode tercepat untuk mengakses elemen berdasarkan id." },
    { text: "Apa output dari console.log(2 == '2')?", options: ["true", "false", "Error", "undefined"], correct: 0, explanation: "Operator == melakukan konversi tipe, sehingga 2 == '2' menghasilkan true." },
    { text: "Manakah fungsi array untuk menambahkan elemen di akhir?", options: ["push()", "pop()", "shift()", "unshift()"], correct: 0, explanation: "push() menambahkan satu atau lebih elemen ke akhir array." },
    { text: "Apa hasil dari Boolean(0)?", options: ["true", "false", "0", "undefined"], correct: 1, explanation: "0 adalah falsy value di JavaScript, sehingga Boolean(0) menghasilkan false." },
    { text: "Manakah cara yang benar untuk membuat objek di JavaScript?", options: ["{nama: 'Andi'}", "['Andi']", "'Andi'", "new Object('Andi')"], correct: 0, explanation: "Objek literal {key: value} adalah cara paling umum membuat objek." },
    { text: "Apa fungsi dari setTimeout?", options: ["Menjalankan fungsi setelah jeda waktu", "Menjalankan fungsi berulang", "Menghentikan eksekusi", "Membuat interval"], correct: 0, explanation: "setTimeout menjalankan fungsi sekali setelah waktu yang ditentukan (dalam milidetik)." },
    { text: "Manakah loop yang digunakan untuk mengiterasi nilai array?", options: ["for...in", "for...of", "while", "do...while"], correct: 1, explanation: "for...of digunakan untuk mengiterasi nilai dari objek iterable seperti array, string, Map." },
    { text: "Apa hasil dari 3 === 3?", options: ["true", "false", "Error", "undefined"], correct: 0, explanation: "=== membandingkan nilai dan tipe data, 3 (number) === 3 (number) true." },
    { text: "Manakah yang merupakan event handler untuk klik mouse?", options: ["onclick", "onmouseover", "onchange", "onsubmit"], correct: 0, explanation: "onclick adalah event handler untuk klik mouse." },
    { text: "Apa output dari let x = 5; console.log(x++);?", options: ["5", "6", "Error", "undefined"], correct: 0, explanation: "x++ (post-increment) mengembalikan nilai asli (5), lalu menambah x menjadi 6." },
    { text: "Manakah cara menyimpan data permanen di browser?", options: ["sessionStorage", "localStorage", "cookie", "Semua benar"], correct: 3, explanation: "localStorage, sessionStorage, dan cookie dapat menyimpan data di browser dengan karakteristik berbeda." },
    { text: "Apa fungsi dari document.querySelector('.class')?", options: ["Mengambil elemen dengan class tertentu", "Mengambil elemen dengan id", "Mengambil semua elemen dengan tag", "Mengambil elemen pertama yang cocok dengan selector"], correct: 3, explanation: "querySelector() mengembalikan elemen pertama yang cocok dengan selector CSS." },
    { text: "Manakah yang merupakan operator logika AND?", options: ["&&", "||", "!", "&"], correct: 0, explanation: "&& adalah operator logika AND, bernilai true hanya jika kedua operand true." },
    { text: "Apa output dari console.log(5 > 3 ? 'Yes' : 'No');?", options: ["Yes", "No", "true", "false"], correct: 0, explanation: "Operator ternary: kondisi 5 > 3 true, maka output 'Yes'." },
    { text: "Manakah cara membuat fungsi di JavaScript?", options: ["function myFunc() {}", "def myFunc() {}", "create myFunc() {}", "func myFunc() {}"], correct: 0, explanation: "Fungsi dideklarasikan dengan keyword function diikuti nama dan parameter." },
    { text: "Apa hasil dari typeof null?", options: ["'null'", "'object'", "'undefined'", "'number'"], correct: 1, explanation: "typeof null mengembalikan 'object' karena kesalahan historis di JavaScript." },
    { text: "Manakah yang termasuk metode array untuk mengubah isi array?", options: ["map()", "filter()", "reduce()", "Semua benar"], correct: 3, explanation: "map(), filter(), reduce() adalah metode array untuk transformasi dan agregasi." },
    { text: "Apa fungsi dari preventDefault()?", options: ["Mencegah event bubbling", "Mencegah aksi default browser", "Menghentikan propagasi event", "Menghentikan eksekusi script"], correct: 1, explanation: "preventDefault() mencegah aksi default browser seperti submit form atau klik link." },
    { text: "Manakah yang merupakan cara mengubah konten HTML elemen?", options: ["element.innerHTML = 'teks'", "element.textContent = 'teks'", "element.innerText = 'teks'", "Semua benar"], correct: 3, explanation: "innerHTML, textContent, innerText dapat digunakan untuk mengubah konten elemen." },
    { text: "Apa output dari console.log(0.1 + 0.2 === 0.3);?", options: ["true", "false", "Error", "undefined"], correct: 1, explanation: "Karena presisi floating point, 0.1 + 0.2 tidak persis 0.3." },
    { text: "Manakah keyword untuk melempar error?", options: ["throw", "catch", "try", "error"], correct: 0, explanation: "throw digunakan untuk melempar exception secara manual." },
    { text: "Apa fungsi dari JSON.stringify()?", options: ["Mengubah string menjadi objek", "Mengubah objek menjadi string JSON", "Mengubah JSON menjadi array", "Mengubah array menjadi string"], correct: 1, explanation: "JSON.stringify() mengubah objek JavaScript menjadi string JSON." },
    { text: "Manakah yang merupakan cara mengubah warna latar elemen dengan JavaScript?", options: ["element.style.backgroundColor = 'red'", "element.style.background = 'red'", "element.style.bgcolor = 'red'", "Semua benar"], correct: 0, explanation: "element.style.backgroundColor adalah cara standar mengubah warna latar." },
    { text: "Apa output dari console.log(!!'hello');?", options: ["true", "false", "'hello'", "Error"], correct: 0, explanation: "!! (double NOT) mengkonversi nilai menjadi boolean, string non-kosong menjadi true." },
    { text: "Manakah yang termasuk event pada form?", options: ["submit", "change", "input", "Semua benar"], correct: 3, explanation: "submit, change, input adalah event yang umum pada elemen form." },
    { text: "Apa fungsi dari Array.isArray()?", options: ["Mengecek apakah suatu variabel adalah array", "Mengubah array menjadi string", "Menggabungkan array", "Memotong array"], correct: 0, explanation: "Array.isArray() mengembalikan true jika variabel adalah array." },
    { text: "Manakah cara menghentikan interval yang dibuat dengan setInterval()?", options: ["clearInterval()", "stopInterval()", "endInterval()", "removeInterval()"], correct: 0, explanation: "clearInterval() digunakan untuk menghentikan eksekusi setInterval()." },
    { text: "Apa output dari console.log(2 + '2' - 1);?", options: ["21", "3", "22", "Error"], correct: 0, explanation: "2 + '2' menghasilkan '22' (string), lalu '22' - 1 menghasilkan 21 (number)." },
    { text: "Manakah yang merupakan cara mengakses properti objek?", options: ["obj.prop", "obj['prop']", "Keduanya benar", "Tidak ada yang benar"], correct: 2, explanation: "Dot notation dan bracket notation sama-sama valid untuk mengakses properti objek." },
    { text: "Apa fungsi dari Promise dalam JavaScript?", options: ["Menangani operasi asynchronous", "Membuat array baru", "Mengubah tipe data", "Membuat fungsi"], correct: 0, explanation: "Promise digunakan untuk menangani operasi asynchronous (seperti fetch data)." },
    { text: "Manakah yang merupakan cara membuat elemen baru di DOM?", options: ["document.createElement()", "document.newElement()", "document.addElement()", "document.appendElement()"], correct: 0, explanation: "document.createElement() membuat elemen HTML baru." },
    { text: "Apa output dari console.log(5 + null);?", options: ["5", "null", "Error", "5null"], correct: 0, explanation: "null dikonversi menjadi 0 dalam operasi aritmatika, sehingga 5 + 0 = 5." },
    { text: "Manakah yang merupakan cara menulis komentar satu baris di JavaScript?", options: ["// komentar", "/* komentar */", "# komentar", "<!-- komentar -->"], correct: 0, explanation: "// digunakan untuk komentar satu baris di JavaScript." },
    { text: "Apa fungsi dari this dalam method objek?", options: ["Merujuk ke objek global", "Merujuk ke objek yang memanggil method", "Merujuk ke parent function", "Merujuk ke window"], correct: 1, explanation: "this dalam method objek merujuk ke objek tersebut." },
    { text: "Manakah yang merupakan operator rest parameter?", options: ["...", "..", "*", "&&"], correct: 0, explanation: "Rest parameter (...) memungkinkan fungsi menerima jumlah argumen tak terbatas." },
    { text: "Apa output dari console.log([] + []);?", options: ["[]", "'' (string kosong)", "Error", "0"], correct: 1, explanation: "Array kosong dikonversi menjadi string kosong, lalu digabung menjadi string kosong." },
    { text: "Manakah yang merupakan cara mengubah huruf menjadi kapital semua?", options: ["toUpperCase()", "toLowerCase()", "capitalize()", "toCapital()"], correct: 0, explanation: "toUpperCase() mengubah string menjadi huruf kapital semua." },
    { text: "Apa fungsi dari Math.random()?", options: ["Menghasilkan angka acak 0-1", "Menghasilkan angka acak 0-100", "Menghasilkan bilangan bulat acak", "Menghasilkan angka negatif"], correct: 0, explanation: "Math.random() menghasilkan angka floating-point acak antara 0 (inklusif) dan 1 (eksklusif)." },
    { text: "Manakah yang merupakan cara memeriksa apakah suatu variabel adalah array?", options: ["Array.isArray(var)", "typeof var === 'array'", "var instanceof Array", "A dan C benar"], correct: 3, explanation: "Array.isArray() dan instanceof Array dapat digunakan untuk mengecek array." },
    { text: "Apa output dari console.log(1 < 2 < 3);?", options: ["true", "false", "Error", "undefined"], correct: 0, explanation: "1 < 2 menghasilkan true (1), lalu true < 3 (1 < 3) menghasilkan true." },
    { text: "Manakah yang merupakan cara menghentikan eksekusi loop?", options: ["break", "continue", "return", "exit"], correct: 0, explanation: "break menghentikan loop sepenuhnya." },
    { text: "Apa fungsi dari localStorage.setItem(key, value)?", options: ["Menyimpan data dengan key-value", "Menghapus data", "Mengambil data", "Menghapus semua data"], correct: 0, explanation: "setItem() menyimpan data ke localStorage." },
    { text: "Apa fungsi dari fetch() dalam JavaScript?", options: ["Mengambil data dari server secara asinkron", "Mengubah style CSS", "Membuat elemen baru", "Menghapus data dari localStorage"], correct: 0, explanation: "fetch() digunakan untuk melakukan request HTTP ke server dan mengembalikan Promise, biasanya untuk mengambil data API." }
];

// ================= KONFIGURASI =================
const QUESTIONS_PER_SESSION = 50;
const LEADERBOARD_KEY = 'quiz_leaderboard';
const MAX_LEADERBOARD = 10;
let quizActive = true;
let scoreSaved = false;   // Pelacak penyimpanan skor

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
    const shuffledBank = shuffleArray([...questionBank]);
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
        window.location.href = "HOME.html";
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