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

// ================= SEARCH =================
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
    
    // Fungsi cerdas untuk melengkapi kode
    function makeCompleteCode(code) {
      code = code.trim();
      const hasMain = /\bint\s+main\s*\(/.test(code);
      const needsIO = /\bcout\b|\bcin\b/.test(code);
      const hasInclude = code.includes('#include <iostream>');
      const hasUsing = code.includes('using namespace std;');
      
      // Jika sudah punya main
      if (hasMain) {
        if (needsIO && (!hasInclude || !hasUsing)) {
          let header = '';
          if (!hasInclude) header += '#include <iostream>\n';
          if (!hasUsing) header += 'using namespace std;\n';
          return header + code;
        }
        return code;
      }
      
      // Belum punya main: bungkus dengan main()
      let finalCode = code;
      if (needsIO) {
        if (!hasInclude) finalCode = '#include <iostream>\n' + finalCode;
        if (!hasUsing) {
          if (finalCode.includes('#include <iostream>')) {
            finalCode = finalCode.replace('#include <iostream>', '#include <iostream>\nusing namespace std;');
          } else {
            finalCode = '#include <iostream>\nusing namespace std;\n' + finalCode;
          }
        }
      }
      let indented = finalCode.replace(/^/gm, '    ');
      return 'int main() {\n' + indented + '\n    return 0;\n}';
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
  const redirectOverlay = document.getElementById("redirectLoading");
  const loadingText = document.getElementById("loadingText");
  const searchMain = document.getElementById("searchInput");
  const searchMini = document.getElementById("searchMini");

  let lastScrollY = window.scrollY;
  let isHidden = false;
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

  let ticking = false;
  const SCROLL_TRIGGER = 100;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        const currentScroll = window.scrollY;
        if (currentScroll > SCROLL_TRIGGER && currentScroll > lastScrollY && !isHidden) {
          header.classList.add("hide-nav");
          topnav.classList.add("hide-nav");
          miniHeader.classList.add("active");
          isHidden = true;
          if (!isMoved && wrapper && miniAccount) {
            miniAccount.appendChild(wrapper);
            isMoved = true;
          }
        } else if (currentScroll <= 0 && isHidden) {
          header.classList.remove("hide-nav");
          topnav.classList.remove("hide-nav");
          miniHeader.classList.remove("active");
          isHidden = false;
          if (isMoved && wrapper && navRight) {
            navRight.appendChild(wrapper);
            isMoved = false;
          }
        }
        lastScrollY = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
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
            '    cout << "Destroying session...\\n";',
            '    cout << "Freeing memory...\\n";',
            '    cout << "User logged out...\\n";',
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
  addTryCppButtons();
});