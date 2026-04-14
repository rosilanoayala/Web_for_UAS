/* ==========================================================
   TutorialHTML.js — Versi Final dengan Sidebar & Wizard Mode
   ========================================================== */

"use strict";

// ================= TYPE EFFECT (LOGOUT) =================
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
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const wall = document.getElementById("loginWall");
  const extra = document.getElementById("extraContent");
  if (isLoggedIn) {
    if (wall) wall.style.display = "none";
    if (extra) extra.style.display = "block";
  } else {
    if (wall) wall.style.display = "block";
    if (extra) extra.style.display = "none";
  }
}

// ================= DEMO INTERAKTIF =================
function applyImage() {
  const img = document.getElementById("gambarInteraktif");
  if (!img) return;

  const size = document.getElementById("sizeInput")?.value.trim();
  const position = document.getElementById("positionInput")?.value.trim();
  const float = document.getElementById("floatInput")?.value.trim();
  const radius = document.getElementById("radiusInput")?.value.trim();

  if (size) img.style.width = size;
  else img.style.removeProperty("width");

  if (position === "center") {
    img.style.display = "block";
    img.style.margin = "20px auto";
  } else if (position === "left") {
    img.style.display = "block";
    img.style.margin = "20px 0";
  } else if (position === "right") {
    img.style.display = "block";
    img.style.margin = "20px 0 20px auto";
  }

  if (float) img.style.float = float;
  else img.style.removeProperty("float");

  if (radius) img.style.borderRadius = radius;
  else img.style.removeProperty("border-radius");
}

function applyBgImage() {
  const url = document.getElementById("bgImageInput")?.value.trim();
  if (url) {
    document.body.style.backgroundImage = `url('${url}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  } else {
    document.body.style.removeProperty("background-image");
  }
}

function applyColor() {
  const bg = document.getElementById("bgInput")?.value.trim();
  const section = document.getElementById("sectionInput")?.value.trim();
  const text = document.getElementById("textInput")?.value.trim();

  if (bg) document.body.style.setProperty("background", bg, "important");
  else document.body.style.removeProperty("background");

  document.querySelectorAll("section").forEach(sec => {
    if (section) sec.style.setProperty("background", section, "important");
    else sec.style.removeProperty("background");
  });

  if (text) document.body.style.setProperty("color", text, "important");
  else document.body.style.removeProperty("color");
}

function setTextColor(color) {
  document.body.style.setProperty("color", color, "important");
}

function resetColors() {
  document.body.style.removeProperty("background");
  document.body.style.removeProperty("color");
  document.querySelectorAll("section").forEach(sec => {
    sec.style.removeProperty("background");
  });
  document.body.style.removeProperty("background-image");
  document.body.style.removeProperty("background-size");
  document.body.style.removeProperty("background-position");
}

// ================= SIDEBAR & COLLAPSIBLE SECTIONS (WIZARD MODE) =================
function initSidebarAndCollapse() {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    const sections = mainContent.querySelectorAll('section');
    const sidebarNav = document.getElementById('sidebarNav');
    if (!sidebarNav || sections.length === 0) return;

    sidebarNav.innerHTML = '';

    function toggleSection(section, forceExpand) {
        const willCollapse = (forceExpand !== undefined) ? !forceExpand : !section.classList.contains('collapsed');
        if (willCollapse) {
            section.classList.add('collapsed');
        } else {
            section.classList.remove('collapsed');
        }
    }

    sections.forEach((section, index) => {
        const h2 = section.querySelector('h2');
        if (!h2) return;

        const title = h2.textContent.trim();
        const sectionId = section.id || `section-${index}`;
        section.id = sectionId;

        const link = document.createElement('a');
        link.href = `#${sectionId}`;
        link.textContent = title;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
            if (section.classList.contains('collapsed')) {
                toggleSection(section, true);
            }
        });
        sidebarNav.appendChild(link);

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

        section.classList.add('collapsed');
    });

    if (sections.length > 0) {
        toggleSection(sections[0], true);
    }

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
  const currentPage = window.location.href;
  const pageName = currentPage.split("/").pop();
  localStorage.setItem("lastPage", currentPage);
  localStorage.setItem("lastPageName", pageName);
  if (localStorage.getItem("isLoggedIn") !== "true") {
    localStorage.removeItem("redirectAfterLogin");
  }

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

  let isMoved = false;
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const displayName = localStorage.getItem("userName") || localStorage.getItem("userEmail") || "";

  if (displayName && authBtn) {
    const initial = displayName.charAt(0).toUpperCase();
    authBtn.innerHTML = `
      <span style="background:#16a34a;color:white;padding:6px 10px;border-radius:50%;
        margin-right:6px;display:inline-flex;align-items:center;justify-content:center;
        width:24px;height:24px;font-weight:bold;">${initial}</span>
      <span>${displayName}</span> ▼`;
    authBtn.href = "#";
    authBtn.addEventListener("click", e => {
      e.preventDefault();
      if (wrapper) wrapper.classList.toggle("active");
    });
  } else if (authBtn) {
    authBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.setItem("redirectAfterLogin", window.location.href);
      window.location.href = "login.html";
    });
  }

  document.addEventListener("click", e => {
    if (wrapper && !wrapper.contains(e.target)) wrapper.classList.remove("active");
  });

  if (searchMain) {
    searchMain.addEventListener("input", () => {
      if (searchMini) searchMini.value = searchMain.value;
      cariMateri();
    });
  }
  if (searchMini) {
    searchMini.addEventListener("input", () => {
      if (searchMain) searchMain.value = searchMini.value;
      cariMateri();
    });
  }

  document.addEventListener("keydown", e => {
    if (e.key === "Enter" && currentResults.length > 0) {
      currentIndex = (currentIndex + 1) % currentResults.length;
      focusResult(currentIndex);
    }
  });

  let lastScrollY = window.scrollY;
  let isHidden = false;
  const SCROLL_TRIGGER = 100;

  window.addEventListener("scroll", function () {
    const currentScroll = window.scrollY;
    if (currentScroll > SCROLL_TRIGGER && currentScroll > lastScrollY && !isHidden) {
      if (header) header.classList.add("hide-nav");
      if (topnav) topnav.classList.add("hide-nav");
      if (miniHeader) miniHeader.classList.add("active");
      isHidden = true;
      if (!isMoved && wrapper && miniAccount) {
        miniAccount.appendChild(wrapper);
        isMoved = true;
      }
    } else if (currentScroll <= 0 && isHidden) {
      if (header) header.classList.remove("hide-nav");
      if (topnav) topnav.classList.remove("hide-nav");
      if (miniHeader) miniHeader.classList.remove("active");
      isHidden = false;
      if (isMoved && wrapper && navRight) {
        navRight.appendChild(wrapper);
        isMoved = false;
      }
    }
    lastScrollY = currentScroll;
  }, { passive: true });

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
          ], terminal, () => {
            document.body.style.transition = "opacity 0.5s ease";
            document.body.style.opacity = "0";
            setTimeout(() => {
              localStorage.removeItem("isLoggedIn");
              localStorage.removeItem("userEmail");
              localStorage.removeItem("userName");
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

  // Inisialisasi sidebar & collapsible sections (WIZARD MODE)
  initSidebarAndCollapse();

  // Form Siswa
  const studentForm = document.getElementById("studentForm");
  if (studentForm) {
    studentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const nama = document.getElementById("nama")?.value.trim();
      const nis = document.getElementById("nis")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const kelas = document.getElementById("kelas")?.value;
      const validasi = document.getElementById("validasi")?.checked;
      const jk = document.querySelector('input[name="jk"]:checked');
      const msg = document.getElementById("formMessage");

      if (!nama || !nis || !email || !kelas || !jk) {
        if (msg) msg.textContent = "❌ Semua data harus diisi";
        if (msg) msg.style.color = "red";
        return;
      }
      if (!validasi) {
        if (msg) msg.textContent = "❌ Harap konfirmasi bahwa data benar";
        if (msg) msg.style.color = "red";
        return;
      }

      if (msg) {
        msg.textContent = "⏳ Memproses data...";
        msg.style.color = "orange";
      }

      setTimeout(() => {
        if (msg) {
          msg.textContent = "✅ Data berhasil ditambahkan!";
          msg.style.color = "green";
        }
        const resultTable = document.getElementById("resultTable");
        const tableTitle = document.getElementById("tableTitle");
        const tbody = document.getElementById("tableBody");
        if (resultTable) resultTable.style.display = "table";
        if (tableTitle) tableTitle.style.display = "block";
        if (tbody) {
          tbody.innerHTML += `
            <tr>
              <td>${escapeHtml(nama)}</td>
              <td>${escapeHtml(nis)}</td>
              <td>${escapeHtml(email)}</td>
              <td>${escapeHtml(kelas)}</td>
              <td>${escapeHtml(jk.value)}</td>
            </tr>`;
        }
        studentForm.reset();
      }, 800);
    });
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }
});