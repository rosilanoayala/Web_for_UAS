/* ============================================================
   Tempatkursus.js – Data & Interaktivitas Direktori
   ============================================================ */

(function() {
  'use strict';

  // ---------- DATA TEMPAT KURSUS (minimal 3 per bahasa) ----------
  const coursePlaces = [
    // HTML (setidaknya 3)
    { name: 'Timedoor Academy', address: 'Jl. Kapten A. Rivai, Palembang', website: 'https://timedooracademy.com', languages: ['html', 'css', 'js', 'cpp'], offline: true, icon: 'T' },
    { name: 'PalComTech', address: 'Jl. Jend. Sudirman, Palembang (Pusat)', website: 'https://palcomtech.ac.id', languages: ['html', 'css', 'js'], offline: true, icon: 'P' },
    { name: 'LPK TTC', address: 'Jl. Kolonel H. Burlian, Palembang', website: 'https://ttc.web.id', languages: ['html', 'css', 'js'], offline: true, icon: 'TTC' },
    { name: 'CYBORG IT Center', address: 'Jl. Dr. Supomo No. A11, Palembang', website: '#', languages: ['html', 'css', 'js', 'cpp'], offline: true, icon: 'C' },
    
    // CSS (tambahan khusus)
    { name: 'SyntaxLab Palembang', address: 'Jl. Basuki Rahmat, Palembang', website: '#', languages: ['html', 'css', 'js'], offline: true, icon: 'S' },
    
    // JavaScript (tambahan)
    { name: 'Koding Akademi Palembang', address: 'Jl. Veteran, Palembang (Online & Offline)', website: '#', languages: ['js', 'html', 'css'], offline: true, icon: 'KA' },
    
    // C++ (tambahan khusus)
    { name: 'Algorithm Code Camp', address: 'Online (berbasis di Palembang)', website: '#', languages: ['cpp'], offline: false, icon: 'ACC' },
    { name: 'Mitra Karya Sriwijaya', address: 'Jl. Dr. M. Isa No.11, Palembang', website: '#', languages: ['cpp', 'html', 'css'], offline: true, icon: 'MKS' },
  ];

  // Pastikan setiap bahasa punya minimal 3 (sudah terpenuhi dari data di atas)

  // ---------- DOM Elements ----------
  const container = document.getElementById('courseListContainer');
  const tabButtons = document.querySelectorAll('.tab-btn');
  let currentLang = 'html'; // default

  // ---------- Render Cards berdasarkan bahasa ----------
  function renderCourses(lang) {
    const filtered = coursePlaces.filter(place => place.languages.includes(lang));
    
    if (filtered.length === 0) {
      container.innerHTML = `<div class="empty-message">😕 Belum ada tempat kursus untuk ${lang.toUpperCase()}.<br>Segera hadir!</div>`;
      return;
    }

    let html = '';
    filtered.forEach(place => {
      // Tentukan warna ikon berdasarkan bahasa utama (opsional)
      const iconColorClass = getIconColorClass(place.languages[0]);
      
      html += `
        <div class="course-card">
          <div class="card-header">
            <span class="card-icon ${iconColorClass}">${place.icon || place.name.charAt(0)}</span>
            <span class="card-title">${place.name}</span>
          </div>
          <div class="card-tags">
            ${place.languages.map(l => `<span class="lang-tag">${l.toUpperCase()}</span>`).join('')}
          </div>
          <div class="card-address">
            <span>📍</span> ${place.address}
          </div>
          <div class="card-footer">
            <a href="${place.website}" target="_blank" rel="noopener noreferrer" class="website-link">
              Kunjungi Web <span style="font-size:1.2rem;">↗</span>
            </a>
            ${place.offline ? '<span class="badge-offline">Offline</span>' : '<span class="badge-offline" style="background:#e2e8f0;">Online</span>'}
          </div>
        </div>
      `;
    });
    
    container.innerHTML = html;
  }

  // Helper: beri kelas warna ikon
  function getIconColorClass(lang) {
    switch(lang) {
      case 'html': return 'html-bg';
      case 'css': return 'css-bg';
      case 'js': return 'js-bg';
      case 'cpp': return 'cpp-bg';
      default: return '';
    }
  }

  // ---------- Event Listener Tabs ----------
  function switchTab(lang) {
    currentLang = lang;
    
    // Update active class
    tabButtons.forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    renderCourses(lang);
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      switchTab(lang);
    });
  });

  // ---------- Initialize ----------
  switchTab('html'); // tampilkan HTML pertama kali

  // Tambahan: jika link website '#' maka dianggap placeholder
  // Tapi biarkan saja, pengguna bisa lihat.

  // Efek console (sentuhan programmer)
  console.log('%c🗂️ KursusKode.sumsel — direktori tempat belajar coding', 'font-family:"Fira Code"; font-size:13px; background:#04aa6d; color:#fff; padding:4px 8px; border-radius:6px;');
  console.log('%c📍 Data mitra tersedia untuk HTML, CSS, JavaScript, dan C++', 'color:#04aa6d;');
})();