/* ==========================================================
   TutorialHTML.js  —  Versi Final dengan Perbaikan Navbar Scroll
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

// ================= DEMO INTERAKTIF (GAMBAR, WARNA, FORM) =================
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
  // Reset background body
  document.body.style.removeProperty("background");
  // Reset warna teks body
  document.body.style.removeProperty("color");
  // Reset background semua section
  document.querySelectorAll("section").forEach(sec => {
    sec.style.removeProperty("background");
  });
  // Reset background image jika ada (dari fitur lain)
  document.body.style.removeProperty("background-image");
  document.body.style.removeProperty("background-size");
  document.body.style.removeProperty("background-position");
  // Opsional: reset juga warna teks dari palet (sudah di-removeProperty color)
}

// ================= MAIN INIT =================
document.addEventListener("DOMContentLoaded", function () {
  // Simpan last page
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
  const redirectOverlay = document.getElementById("redirectLoading");
  const loadingText = document.getElementById("loadingText");
  const searchMain = document.getElementById("searchInput");
  const searchMini = document.getElementById("searchMini");

  let isMoved = false;
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const displayName = localStorage.getItem("userName") || localStorage.getItem("userEmail") || "";

  // Avatar & dropdown
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
      if (!redirectOverlay || !loadingText) { window.location.href = "login.html"; return; }
      redirectOverlay.style.display = "flex";
      loadingText.textContent = "";
      typeEffect([
        "Checking authentication...",
        "User not logged in.",
        "Redirecting to login page..."
      ], loadingText, () => { window.location.href = "login.html"; });
    });
  }

  document.addEventListener("click", e => {
    if (wrapper && !wrapper.contains(e.target)) wrapper.classList.remove("active");
  });

  // Sync search
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

  // SCROLL HANDLER (Perbaikan: sembunyikan header DAN topnav)
  let lastScrollY = window.scrollY;
  let isHidden = false;
  const SCROLL_TRIGGER = 100;

  window.addEventListener("scroll", function () {
    const currentScroll = window.scrollY;
    if (currentScroll > SCROLL_TRIGGER && currentScroll > lastScrollY && !isHidden) {
      // Scroll ke bawah
      if (header) header.classList.add("hide-nav");
      if (topnav) topnav.classList.add("hide-nav");
      if (miniHeader) miniHeader.classList.add("active");
      isHidden = true;
      if (!isMoved && wrapper && miniAccount) {
        miniAccount.appendChild(wrapper);
        isMoved = true;
      }
    } else if (currentScroll <= 0 && isHidden) {
      // Scroll ke atas sampai posisi paling atas
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
              window.location.href = "login.html";
            }, 500);
          }, 18, 250);
        }, 50);
      });
    });
  }

  checkLoginAndDisplay();
  window.addEventListener("storage", checkLoginAndDisplay);

  // ===== FORM SISWA (tambahkan listener) =====
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

  // Fungsi bantu escape HTML
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