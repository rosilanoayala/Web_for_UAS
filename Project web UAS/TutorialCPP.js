"use strict";

// ================= TYPE EFFECT =================
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

// ================= PENCARIAN =================
let searchTimeout = null;
let currentResults = [];
let currentIndex = 0;

function cariMateri() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(runSearch, 250);
}

function runSearch() {
  const input = document.getElementById("searchInput");
  if (!input) return;
  const keyword = input.value.trim();
  removeHighlight();
  currentResults = [];
  currentIndex = 0;
  if (!keyword) return;
  currentResults = highlightAll(keyword);
  if (currentResults.length > 0) focusResult(0);
}

function highlightAll(keyword) {
  const results = [];
  const root = document.getElementById("mainContent");
  if (!root) return results;
  const lowerKeyword = keyword.toLowerCase();
  const kwLen = keyword.length;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) {
    if (!node.nodeValue.trim()) continue;
    if (node.parentElement.closest(".code, pre, code, [data-hl]")) continue;
    if (!node.nodeValue.toLowerCase().includes(lowerKeyword)) continue;
    textNodes.push(node);
  }
  textNodes.forEach(textNode => {
    const text = textNode.nodeValue;
    const lower = text.toLowerCase();
    const parent = textNode.parentNode;
    if (!parent) return;
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let pos = lower.indexOf(lowerKeyword, 0);
    while (pos !== -1) {
      if (pos > lastIndex)
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, pos)));
      const mark = document.createElement("mark");
      mark.className = "highlight";
      mark.textContent = text.slice(pos, pos + kwLen);
      fragment.appendChild(mark);
      results.push(mark);
      lastIndex = pos + kwLen;
      pos = lower.indexOf(lowerKeyword, lastIndex);
    }
    if (lastIndex < text.length)
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    const wrapper = document.createElement("span");
    wrapper.dataset.hl = "1";
    wrapper.appendChild(fragment);
    parent.replaceChild(wrapper, textNode);
  });
  return results;
}

function removeHighlight() {
  const root = document.getElementById("mainContent");
  if (!root) return;
  root.querySelectorAll("mark.highlight").forEach(mark =>
    mark.replaceWith(document.createTextNode(mark.textContent))
  );
  root.querySelectorAll("span[data-hl]").forEach(span => {
    const parent = span.parentNode;
    if (!parent) return;
    while (span.firstChild) parent.insertBefore(span.firstChild, span);
    parent.removeChild(span);
  });
  root.normalize();
}

function focusResult(index) {
  const el = currentResults[index];
  if (!el) return;
  currentResults.forEach(m => m.classList.remove("active"));
  el.classList.add("active");
  setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
}

// ================= LOGIN WALL =================
function checkLoginAndDisplay() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const wall = document.getElementById("loginWall");
  const extra = document.getElementById("extraContent");
  if (isLoggedIn) {
    if (wall) wall.style.display = "none";
    if (extra) {
      extra.style.display = "block";
      addTryCppButtons();
    }
  } else {
    if (wall) wall.style.display = "block";
    if (extra) extra.style.display = "none";
  }
}

// ================= TOMBOL TRY CPP =================
function addTryCppButtons() {
  document.querySelectorAll('.code').forEach((codeBlock) => {
    if (codeBlock.nextElementSibling && codeBlock.nextElementSibling.classList && codeBlock.nextElementSibling.classList.contains('trycpp-btn')) return;
    let rawCode = codeBlock.innerText.trim();
    if (rawCode === "") return;
    
    function makeCompleteCode(code) {
      code = code.trim();
      const hasMain = /\bint\s+main\s*\(/.test(code);
      const needsIO = /\bcout\b|\bcin\b/.test(code);
      
      if (hasMain) {
        let hasInclude = code.includes('#include <iostream>');
        let hasUsing = code.includes('using namespace std;');
        if (needsIO && (!hasInclude || !hasUsing)) {
          let header = '';
          if (!hasInclude) header += '#include <iostream>\n';
          if (!hasUsing) header += 'using namespace std;\n';
          return header + code;
        }
        return code;
      }
      
      let header = '';
      let codeWithoutHeaders = code.replace(/^\s*#include\s*<[^>]+>\s*/gm, function(match) {
          header += match.trim() + '\n';
          return '';
      });
      codeWithoutHeaders = codeWithoutHeaders.replace(/^\s*using\s+namespace\s+[a-zA-Z_]+;\s*/gm, function(match) {
          header += match.trim() + '\n';
          return '';
      });
      
      if (needsIO) {
        if (!header.includes('<iostream>')) header += '#include <iostream>\n';
        if (!header.includes('using namespace std;')) header += 'using namespace std;\n';
      }
      
      if (header !== "") header += '\n';
      let indented = codeWithoutHeaders.trim().replace(/^/gm, '    ');
      return header + 'int main() {\n' + indented + '\n    return 0;\n}';
    }
    
    let fullCode = makeCompleteCode(rawCode);
    const btn = document.createElement('a');
    btn.textContent = '🧪 Coba kode ini di tryCPP';
    btn.href = `tryCPP.html?code=${encodeURIComponent(fullCode)}`;
    btn.target = '_blank';
    btn.className = 'trycpp-btn';
    btn.style.display = 'inline-block';
    btn.style.marginTop = '12px';
    btn.style.marginBottom = '8px';
    btn.style.padding = '6px 14px';
    btn.style.backgroundColor = '#2c5f8a';
    btn.style.color = 'white';
    btn.style.textDecoration = 'none';
    btn.style.borderRadius = '30px';
    btn.style.fontSize = '0.8rem';
    btn.style.fontWeight = '500';
    btn.style.transition = '0.2s';
    btn.onmouseover = () => btn.style.backgroundColor = '#1e4a6e';
    btn.onmouseout = () => btn.style.backgroundColor = '#2c5f8a';
    codeBlock.insertAdjacentElement('afterend', btn);
  });
}

// ================= SIDEBAR & COLLAPSIBLE SECTIONS (WIZARD MODE) =================
function initSidebarAndCollapse() {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    const sections = mainContent.querySelectorAll('section');
    const sidebarNav = document.getElementById('sidebarNav');
    if (!sidebarNav || sections.length === 0) return;

    sidebarNav.innerHTML = '';

    // Fungsi untuk toggle section (expand/collapse)
    function toggleSection(section, forceExpand) {
        const willCollapse = (forceExpand !== undefined) ? !forceExpand : !section.classList.contains('collapsed');
        if (willCollapse) {
            section.classList.add('collapsed');
        } else {
            section.classList.remove('collapsed');
        }
    }

    // Proses setiap section
    sections.forEach((section, index) => {
        const h2 = section.querySelector('h2');
        if (!h2) return;

        const title = h2.textContent.trim();
        const sectionId = section.id || `section-${index}`;
        section.id = sectionId;

        // 1. Buat link di sidebar
        const link = document.createElement('a');
        link.href = `#${sectionId}`;
        link.textContent = title;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
            // Jika section collapsed, expand
            if (section.classList.contains('collapsed')) {
                toggleSection(section, true);
            }
        });
        sidebarNav.appendChild(link);

        // 2. Bungkus konten setelah h2 ke dalam div.section-content
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'section-content';
        
        const childrenAfterH2 = [];
        let next = h2.nextSibling;
        while (next) {
            childrenAfterH2.push(next);
            next = next.nextSibling;
        }
        childrenAfterH2.forEach(child => contentWrapper.appendChild(child));
        section.appendChild(contentWrapper);

        // 3. Header dengan toggle icon
        const headerDiv = document.createElement('div');
        headerDiv.className = 'section-header';
        h2.parentNode.insertBefore(headerDiv, h2);
        headerDiv.appendChild(h2);
        
        const toggleIcon = document.createElement('span');
        toggleIcon.className = 'toggle-icon';
        toggleIcon.textContent = '▼';
        toggleIcon.setAttribute('aria-hidden', 'true');
        headerDiv.appendChild(toggleIcon);

        headerDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSection(section);
        });

        // 4. Semua section default COLLAPSED
        section.classList.add('collapsed');
    });

    // --- Buka section pertama secara otomatis ---
    if (sections.length > 0) {
        toggleSection(sections[0], true);
    }

    // --- Tambahkan tombol "Lanjut" di setiap section (kecuali terakhir) ---
    sections.forEach((section, index) => {
        if (index === sections.length - 1) return;

        const nextSection = sections[index + 1];
        const nextH2 = nextSection.querySelector('h2');
        const nextTitle = nextH2 ? nextH2.textContent.trim() : 'Berikutnya';

        const btnContainer = document.createElement('div');
        btnContainer.className = 'section-next-container';
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'section-next-btn';
        nextBtn.innerHTML = `▶ Lanjut ke: ${nextTitle}`;
        
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSection(nextSection, true);
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        btnContainer.appendChild(nextBtn);
        
        const contentWrapper = section.querySelector('.section-content');
        if (contentWrapper) {
            contentWrapper.appendChild(btnContainer);
        }
    });

    // Intersection Observer untuk highlight sidebar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const link = document.querySelector(`.sidebar-nav a[href="#${id}"]`);
            if (link) {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }, { rootMargin: '-20% 0px -70% 0px' });
    
    sections.forEach(s => observer.observe(s));
}

// ================= MAIN INIT =================
document.addEventListener("DOMContentLoaded", function () {
  // Simpan halaman terakhir
  const currentPage = window.location.href;
  const pageName = currentPage.split("/").pop();
  localStorage.setItem("lastPage", currentPage);
  localStorage.setItem("lastPageName", pageName);
  if (sessionStorage.getItem("isLoggedIn") !== "true") localStorage.removeItem("redirectAfterLogin");

  const header = document.querySelector("header");
  const topnav = document.querySelector(".topnav");
  const miniHeader = document.getElementById("miniHeader");
  const wrapper = document.getElementById("accountWrapper");
  const navRight = document.querySelector(".nav-right");
  const miniAccount = document.getElementById("miniAccount");
  const authBtn = document.getElementById("authButton");
  const logoutBtn = document.getElementById("logoutBtn");
  const loadingScreen = document.getElementById("loadingScreen");
  const terminal = document.getElementById("terminalText");
  const searchMain = document.getElementById("searchInput");
  const searchMini = document.getElementById("searchMini");

  let lastScrollY = window.scrollY, isHidden = false, isMoved = false;
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const displayName = sessionStorage.getItem("userName") || sessionStorage.getItem("userEmail") || "";

  // Avatar & dropdown
  if (displayName && authBtn) {
    const initial = displayName.charAt(0).toUpperCase();
    authBtn.innerHTML = `
      <span style="background:#16a34a;color:white;padding:6px 10px;border-radius:50%;
        margin-right:6px;display:inline-flex;align-items:center;justify-content:center;
        width:24px;height:24px;font-weight:bold;">${initial}</span>
      <span>${displayName}</span> ▼`;
    authBtn.href = "#";
    authBtn.addEventListener("click", e => { e.preventDefault(); if (wrapper) wrapper.classList.toggle("active"); });
  } else if (authBtn) {
    authBtn.addEventListener("click", function (e) { e.preventDefault(); localStorage.setItem("redirectAfterLogin", window.location.href); window.location.href = "login.html"; });
  }

  document.addEventListener("click", e => { if (wrapper && !wrapper.contains(e.target)) wrapper.classList.remove("active"); });

  // Sinkronisasi search input
  if (searchMain) searchMain.addEventListener("input", () => { if (searchMini) searchMini.value = searchMain.value; cariMateri(); });
  if (searchMini) searchMini.addEventListener("input", () => { if (searchMain) searchMain.value = searchMini.value; cariMateri(); });
  document.addEventListener("keydown", e => { if (e.key === "Enter" && currentResults.length > 0) { currentIndex = (currentIndex + 1) % currentResults.length; focusResult(currentIndex); } });

  // Scroll handler untuk mini header
  let ticking = false;
  const SCROLL_TRIGGER = 100;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        const currentScroll = window.scrollY;
        if (currentScroll > SCROLL_TRIGGER && currentScroll > lastScrollY && !isHidden) {
          if (header) header.classList.add("hide-nav");
          if (topnav) topnav.classList.add("hide-nav");
          if (miniHeader) miniHeader.classList.add("active");
          isHidden = true;
          if (!isMoved && wrapper && miniAccount) { miniAccount.appendChild(wrapper); isMoved = true; }
        } else if (currentScroll <= 0 && isHidden) {
          if (header) header.classList.remove("hide-nav");
          if (topnav) topnav.classList.remove("hide-nav");
          if (miniHeader) miniHeader.classList.remove("active");
          isHidden = false;
          if (isMoved && wrapper && navRight) { navRight.appendChild(wrapper); isMoved = false; }
        }
        lastScrollY = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (wrapper) wrapper.classList.remove("active");
      if (!loadingScreen || !terminal) return;
      loadingScreen.style.display = "flex";
      terminal.textContent = "";
      requestAnimationFrame(() => {
        setTimeout(() => {
          typeEffect([
            "#include <iostream>", "using namespace std;", "", "int main(){",
            '    cout << "Destroying session...\\n";', '    cout << "Freeing memory...\\n";',
            '    cout << "User logged out...\\n";', "    return 0;", "}", "",
            "$ g++ logout.cpp -o logoutApp", "Compiling...", "Build successful.",
            "Running program...", "Session terminated successfully ✔"
          ], terminal, () => {
            document.body.style.transition = "opacity 0.5s ease";
            document.body.style.opacity = "0";
            setTimeout(() => {
              sessionStorage.removeItem("isLoggedIn");
              sessionStorage.removeItem("userEmail");
              sessionStorage.removeItem("userName");
              localStorage.removeItem("userPhone");
              localStorage.removeItem("userAddress");
              localStorage.removeItem("userGender");
              localStorage.removeItem("userPassword");
              localStorage.removeItem("userComplaints");
              window.location.href = "login.html";
            }, 500);
          }, 18, 250);
        }, 50);
      });
    });
  }

  checkLoginAndDisplay();
  window.addEventListener("storage", checkLoginAndDisplay);
  addTryCppButtons();
  initSidebarAndCollapse();  // Memanggil sidebar & collapsible
});