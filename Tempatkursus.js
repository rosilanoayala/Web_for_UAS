/* ============================================================
   Tempatkursus.js – Data, Filter, Proteksi Link, Rating & Review
   + Expand/Collapse Comments + Link Resmi Website & Medsos
   ============================================================ */

(function() {
  'use strict';

  // ---------- FUNGSI ANIMASI TERMINAL (typeEffect) ----------
  function typeEffect(lines, target, callback, charSpeed = 18, lineSpeed = 250) {
    let i = 0, j = 0;
    function type() {
      if (i >= lines.length) {
        if (typeof callback === "function") setTimeout(callback, 800);
        return;
      }
      if (j < lines[i].length) {
        target.textContent += lines[i][j++];
        setTimeout(type, charSpeed);
      } else {
        target.textContent += "\n";
        i++; j = 0;
        setTimeout(type, lineSpeed);
      }
    }
    type();
  }

  // ---------- DATA TEMPAT KURSUS (DENGAN LINK RESMI) ----------
  const coursePlaces = [
    // HTML, CSS, JS, C++
    { 
      id: 'timedoor', 
      name: 'Timedoor Academy', 
      address: 'Jl. Kapten A. Rivai, Palembang', 
      website: 'https://timedooracademy.com', 
      languages: ['html', 'css', 'js', 'cpp'], 
      offline: true, 
      icon: 'T' 
    },
    // HTML, CSS, JS
    { 
      id: 'palcom', 
      name: 'PalComTech', 
      address: 'Jl. Jend. Sudirman, Palembang (Pusat)', 
      website: 'https://palcomtech.ac.id', 
      languages: ['html', 'css', 'js'], 
      offline: true, 
      icon: 'P' 
    },
    // HTML, CSS, JS
    { 
      id: 'ttc', 
      name: 'LPK TTC', 
      address: 'Jl. Kolonel H. Burlian, Palembang', 
      website: 'https://ttc.web.id', 
      languages: ['html', 'css', 'js'], 
      offline: true, 
      icon: 'TTC' 
    },
    // HTML, CSS, JS, C++
    { 
      id: 'cyborg', 
      name: 'CYBORG IT Center', 
      address: 'Jl. Dr. Supomo No. A11, Palembang', 
      website: 'https://www.instagram.com/cyborgitcenter', 
      languages: ['html', 'css', 'js', 'cpp'], 
      offline: true, 
      icon: 'C' 
    },
    // HTML, CSS, JS
    { 
      id: 'syntaxlab', 
      name: 'SyntaxLab Palembang', 
      address: 'Jl. Basuki Rahmat, Palembang', 
      website: 'https://www.instagram.com/syntaxlab.palembang', 
      languages: ['html', 'css', 'js'], 
      offline: true, 
      icon: 'S' 
    },
    // JS, HTML, CSS
    { 
      id: 'kodingakademi', 
      name: 'Koding Akademi Palembang', 
      address: 'Jl. Veteran, Palembang (Online & Offline)', 
      website: 'https://www.kodingakademi.id', 
      languages: ['js', 'html', 'css'], 
      offline: true, 
      icon: 'KA' 
    },
    // JS, HTML, CSS
    { 
      id: 'devhouse', 
      name: 'DevHouse Palembang', 
      address: 'Jl. Radial, Palembang', 
      website: 'https://www.instagram.com/devhouse.palembang', 
      languages: ['js', 'html', 'css'], 
      offline: true, 
      icon: 'DH' 
    },
    // C++
    { 
      id: 'algocamp', 
      name: 'Algorithm Code Camp', 
      address: 'Online (berbasis di Palembang)', 
      website: 'https://www.instagram.com/algorithmcodecamp', 
      languages: ['cpp'], 
      offline: false, 
      icon: 'ACC' 
    },
    // C++, HTML, CSS
    { 
      id: 'mitrakarya', 
      name: 'Mitra Karya Sriwijaya', 
      address: 'Jl. Dr. M. Isa No.11, Palembang', 
      website: 'https://www.instagram.com/mitrakaryasriwijaya', 
      languages: ['cpp', 'html', 'css'], 
      offline: true, 
      icon: 'MKS' 
    },
    // C++, JS
    { 
      id: 'robotics', 
      name: 'Palembang Robotics Club', 
      address: 'Jl. POM IX, Palembang', 
      website: 'https://www.instagram.com/palembangrobotics', 
      languages: ['cpp', 'js'], 
      offline: true, 
      icon: 'PRC' 
    },
  ];

  // ---------- STORAGE UNTUK RATING & REVIEW ----------
  const STORAGE_KEY = 'courseReviews';
  let reviewsData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  
  function saveReviewsData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviewsData));
  }

  function getCourseReviews(courseId) {
    return reviewsData[courseId] || { ratings: [], comments: [] };
  }

  function calculateAverageRating(ratings) {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return (sum / ratings.length).toFixed(1);
  }

  function renderStars(ratingAvg, courseId) {
    const rounded = Math.round(parseFloat(ratingAvg) || 0);
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      const filled = i <= rounded ? 'filled' : '';
      starsHtml += `<span class="star ${filled}" data-rating="${i}" data-course-id="${courseId}">★</span>`;
    }
    return starsHtml;
  }

  // ---------- RENDER KARTU KURSUS ----------
  const container = document.getElementById('courseListContainer');
  const tabButtons = document.querySelectorAll('.tab-btn');
  let currentLang = 'html';

  function getIconColorClass(lang) {
    switch(lang) {
      case 'html': return 'html-bg';
      case 'css': return 'css-bg';
      case 'js': return 'js-bg';
      case 'cpp': return 'cpp-bg';
      default: return '';
    }
  }

  // Fungsi untuk menghasilkan HTML daftar komentar (bisa mode collapsed/expanded)
  function generateCommentsHTML(comments, courseId, expanded = false) {
    if (!comments || comments.length === 0) {
      return '<div class="empty-review">Belum ada komentar. Jadilah yang pertama!</div>';
    }
    
    const displayComments = expanded ? comments : comments.slice(-3);
    let html = displayComments.map(c => `<div class="review-item">“${c}”</div>`).join('');
    
    // Tambahkan tombol expand/collapse jika komentar > 3
    if (comments.length > 3) {
      if (!expanded) {
        html += `<button class="expand-comments-btn" data-course-id="${courseId}" data-action="expand">📋 Lihat semua komentar (${comments.length})</button>`;
      } else {
        html += `<button class="expand-comments-btn" data-course-id="${courseId}" data-action="collapse">🔼 Tutup komentar</button>`;
      }
    }
    return html;
  }

  function renderCourses(lang) {
    const filtered = coursePlaces.filter(place => place.languages.includes(lang));
    
    if (filtered.length === 0) {
      container.innerHTML = `<div class="empty-message">😕 Belum ada tempat kursus untuk ${lang.toUpperCase()}.<br>Segera hadir!</div>`;
      return;
    }

    let html = '';
    filtered.forEach(place => {
      const iconColorClass = getIconColorClass(place.languages[0]);
      const courseReviews = getCourseReviews(place.id);
      const avgRating = calculateAverageRating(courseReviews.ratings);
      const comments = courseReviews.comments || [];
      
      // Tentukan apakah link mengarah ke Instagram atau website biasa
      const isInstagram = place.website.includes('instagram.com');
      const linkText = isInstagram ? '📸 Instagram' : '🌐 Kunjungi Web';
      
      html += `
        <div class="course-card" data-course-id="${place.id}">
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
          
          <!-- Rating Bintang -->
          <div class="rating-container">
            <div class="stars" data-course-id="${place.id}">
              ${renderStars(avgRating, place.id)}
            </div>
            <span class="rating-value">${avgRating} (${courseReviews.ratings.length} ulasan)</span>
          </div>
          
          <!-- Komentar / Review -->
          <div class="review-section">
            <div class="review-list" id="review-list-${place.id}">
              ${generateCommentsHTML(comments, place.id, false)}
            </div>
            <div class="review-input-group">
              <input type="text" class="review-input" id="review-input-${place.id}" placeholder="Tulis komentar..." maxlength="100">
              <button class="review-send-btn" data-course-id="${place.id}">Kirim</button>
            </div>
          </div>
          
          <div class="card-footer">
            <a href="${place.website}" target="_blank" rel="noopener noreferrer" class="website-link protected-link">
              ${linkText} <span style="font-size:1.2rem;">↗</span>
            </a>
            ${place.offline ? '<span class="badge-offline">Offline</span>' : '<span class="badge-offline" style="background:#e2e8f0;">Online</span>'}
          </div>
        </div>
      `;
    });
    
    container.innerHTML = html;
    attachRatingAndReviewListeners();
  }

  // ---------- EVENT LISTENER UNTUK RATING, REVIEW, DAN EXPAND COMMENTS ----------
  function attachRatingAndReviewListeners() {
    // Klik pada bintang atau tombol (delegasi)
    container.addEventListener('click', function(e) {
      // Rating bintang
      if (e.target.classList.contains('star')) {
        const star = e.target;
        const rating = parseInt(star.dataset.rating);
        const courseId = star.dataset.courseId;
        if (!courseId) return;
        
        if (!reviewsData[courseId]) {
          reviewsData[courseId] = { ratings: [], comments: [] };
        }
        reviewsData[courseId].ratings.push(rating);
        saveReviewsData();
        
        const courseCard = star.closest('.course-card');
        const avgRating = calculateAverageRating(reviewsData[courseId].ratings);
        const starsContainer = courseCard.querySelector('.stars');
        const ratingValueSpan = courseCard.querySelector('.rating-value');
        
        starsContainer.innerHTML = renderStars(avgRating, courseId);
        ratingValueSpan.textContent = `${avgRating} (${reviewsData[courseId].ratings.length} ulasan)`;
        return;
      }
      
      // Kirim komentar
      if (e.target.classList.contains('review-send-btn')) {
        const btn = e.target;
        const courseId = btn.dataset.courseId;
        const input = document.getElementById(`review-input-${courseId}`);
        const comment = input.value.trim();
        if (!comment) return;
        
        if (!reviewsData[courseId]) {
          reviewsData[courseId] = { ratings: [], comments: [] };
        }
        reviewsData[courseId].comments.push(comment);
        saveReviewsData();
        
        const reviewList = document.getElementById(`review-list-${courseId}`);
        const comments = reviewsData[courseId].comments;
        // Selalu tampilkan collapsed (3 terbaru) setelah menambah komentar
        reviewList.innerHTML = generateCommentsHTML(comments, courseId, false);
        input.value = '';
        return;
      }
      
      // Expand / Collapse komentar
      if (e.target.classList.contains('expand-comments-btn')) {
        const btn = e.target;
        const courseId = btn.dataset.courseId;
        const action = btn.dataset.action;
        const reviewList = document.getElementById(`review-list-${courseId}`);
        const comments = reviewsData[courseId]?.comments || [];
        
        if (action === 'expand') {
          reviewList.innerHTML = generateCommentsHTML(comments, courseId, true);
        } else {
          reviewList.innerHTML = generateCommentsHTML(comments, courseId, false);
        }
        return;
      }
    });
  }

  // Ganti tab
  function switchTab(lang) {
    currentLang = lang;
    tabButtons.forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
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

  if (container) {
    switchTab('html');
  }

  // ---------- PROTEKSI LINK ----------
  document.addEventListener('click', function(e) {
    const link = e.target.closest('.protected-link');
    if (!link) return;
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedIn) {
      e.preventDefault();
      localStorage.setItem('redirectAfterLogin', link.href);
      localStorage.setItem('loginMessage', '🔒 Silakan login untuk mengakses konten ini.');
      window.location.href = 'login.html';
    }
  });

  // ---------- AUTENTIKASI & UI AKUN ----------
  const authBtn = document.getElementById('authButton');
  const wrapper = document.getElementById('accountWrapper');
  const logoutBtn = document.getElementById('logoutBtn');
  const loadingScreen = document.getElementById('loadingScreen');
  const terminal = document.getElementById('terminalText');

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const displayName = localStorage.getItem('userName') || localStorage.getItem('userEmail') || '';

  if (isLoggedIn && displayName && authBtn) {
    const initial = displayName.charAt(0).toUpperCase();
    authBtn.innerHTML = `
      <span style="background:#0f6e3f; color:white; padding:6px 10px; border-radius:50%; margin-right:8px; display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; font-weight:bold;">${initial}</span>
      ${displayName} ▼`;
    authBtn.href = '#';
    
    authBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (wrapper) wrapper.classList.toggle('active');
    });

    if (logoutBtn) logoutBtn.style.display = 'block';
    
    document.addEventListener('click', (e) => {
      if (wrapper && !wrapper.contains(e.target)) {
        wrapper.classList.remove('active');
      }
    });
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

  // ---------- LOGOUT DENGAN EFEK TERMINAL ----------
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (wrapper) wrapper.classList.remove('active');
      
      if (!loadingScreen || !terminal) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('userPhone');
        localStorage.removeItem('userAddress');
        localStorage.removeItem('userGender');
        localStorage.removeItem('userPassword');
        localStorage.removeItem('userComplaints');
        window.location.href = 'login.html';
        return;
      }

      loadingScreen.style.display = 'flex';
      terminal.textContent = '';

      const lines = [
        "#include <iostream>",
        "using namespace std;",
        "",
        "int main(){",
        '   cout << "Clearing session...";',
        '   cout << "Destroying token...";',
        '   cout << "Logging out user...";',
        "   return 0;",
        "}",
        "",
        "$ g++ logout.cpp -o logoutApp",
        "Compiling...",
        "Build successful.",
        "Running program...",
        "Session terminated successfully ✔"
      ];

      typeEffect(lines, terminal, () => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '0';
        setTimeout(() => {
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('userName');
          localStorage.removeItem('userPhone');
          localStorage.removeItem('userAddress');
          localStorage.removeItem('userGender');
          localStorage.removeItem('userPassword');
          localStorage.removeItem('userComplaints');
          window.location.href = 'login.html';
        }, 500);
      }, 18, 250);
    });
  }

  console.log('%c🗂️ CodeSumsel — direktori + rating & expandable comments', 'font-family:"Fira Code"; font-size:13px; background:#04aa6d; color:#fff; padding:4px 8px; border-radius:6px;');
})();