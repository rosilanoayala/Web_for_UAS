/* ==========================================================
   TutorialCSS.js — Versi Final dengan Sidebar & Wizard Mode
   Semua perbaikan: sessionStorage, search, collapsible, demo
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

// ================= PENCARIAN (HIGHLIGHT SYSTEM) =================
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
    if (extra) extra.style.display = "block";
  } else {
    if (wall) wall.style.display = "block";
    if (extra) extra.style.display = "none";
  }
}

// ================= SEMUA DEMO INTERAKTIF (dari file asli) =================
function initDemos() {
  // 1. Demo Colors
  const colorPicker = document.getElementById('colorPicker');
  const opacitySliderColor = document.getElementById('opacitySlider');
  const demoColorBox = document.getElementById('demoColorBox');
  const colorCodeSpan = document.getElementById('colorCode');
  const resetColorBtn = document.getElementById('resetColorBtn');
  if (colorPicker && opacitySliderColor && demoColorBox) {
    function updateColor() {
      let hex = colorPicker.value;
      let r = parseInt(hex.slice(1,3), 16);
      let g = parseInt(hex.slice(3,5), 16);
      let b = parseInt(hex.slice(5,7), 16);
      let opacity = opacitySliderColor.value;
      demoColorBox.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      if (colorCodeSpan) colorCodeSpan.textContent = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    colorPicker.addEventListener('input', updateColor);
    opacitySliderColor.addEventListener('input', updateColor);
    if (resetColorBtn) resetColorBtn.addEventListener('click', () => {
      colorPicker.value = '#3498db';
      opacitySliderColor.value = '1';
      updateColor();
    });
    updateColor();
  }

  // 2. Demo Border
  const borderWidth = document.getElementById('borderWidth');
  const borderRadius = document.getElementById('borderRadius');
  const borderStyle = document.getElementById('borderStyle');
  const borderColor = document.getElementById('borderColor');
  const demoBorderBox = document.getElementById('demoBorderBox');
  const borderCodeSpan = document.getElementById('borderCode');
  if (borderWidth && demoBorderBox) {
    function updateBorder() {
      let w = borderWidth.value + 'px';
      let s = borderStyle ? borderStyle.value : 'solid';
      let c = borderColor ? borderColor.value : '#000000';
      let r = borderRadius ? borderRadius.value + 'px' : '0px';
      demoBorderBox.style.border = `${w} ${s} ${c}`;
      demoBorderBox.style.borderRadius = r;
      if (borderCodeSpan) borderCodeSpan.textContent = `${w} ${s} ${c}, border-radius: ${r}`;
    }
    borderWidth.addEventListener('input', updateBorder);
    if (borderRadius) borderRadius.addEventListener('input', updateBorder);
    if (borderStyle) borderStyle.addEventListener('change', updateBorder);
    if (borderColor) borderColor.addEventListener('input', updateBorder);
    updateBorder();
  }

  // 3. Demo Margin
  const marginSlider = document.getElementById('marginSlider');
  const demoMarginBox = document.getElementById('demoMarginBox');
  const marginValueDisplay = document.getElementById('marginValueDisplay');
  if (marginSlider && demoMarginBox) {
    marginSlider.addEventListener('input', () => {
      let val = marginSlider.value + 'px';
      demoMarginBox.style.marginBottom = val;
      if (marginValueDisplay) marginValueDisplay.textContent = val;
    });
    marginSlider.dispatchEvent(new Event('input'));
  }

  // 4. Demo Padding
  const paddingSlider = document.getElementById('paddingSlider');
  const demoPaddingBox = document.getElementById('demoPaddingBox');
  const paddingValueDisplay = document.getElementById('paddingValueDisplay');
  if (paddingSlider && demoPaddingBox) {
    paddingSlider.addEventListener('input', () => {
      let val = paddingSlider.value + 'px';
      demoPaddingBox.style.padding = val;
      if (paddingValueDisplay) paddingValueDisplay.textContent = val;
    });
    paddingSlider.dispatchEvent(new Event('input'));
  }

  // 5. Text Styling
  const demoText = document.getElementById('demoText');
  const textBtns = document.querySelectorAll('.text-btn');
  const resetTextBtn = document.getElementById('resetTextBtn');
  const letterSpacing = document.getElementById('letterSpacing');
  const lineHeight = document.getElementById('lineHeight');
  if (demoText) {
    function resetTextStyle() {
      demoText.style.textAlign = '';
      demoText.style.textDecoration = '';
      demoText.style.textTransform = '';
      demoText.style.letterSpacing = '';
      demoText.style.lineHeight = '';
      if (letterSpacing) letterSpacing.value = '0';
      if (lineHeight) lineHeight.value = '1.5';
      demoText.style.letterSpacing = '0px';
      demoText.style.lineHeight = '1.5';
    }
    textBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        let prop = btn.dataset.prop;
        let val = btn.dataset.value;
        demoText.style[prop] = val;
      });
    });
    if (resetTextBtn) resetTextBtn.addEventListener('click', resetTextStyle);
    if (letterSpacing) letterSpacing.addEventListener('input', () => demoText.style.letterSpacing = letterSpacing.value + 'px');
    if (lineHeight) lineHeight.addEventListener('input', () => demoText.style.lineHeight = lineHeight.value);
  }

  // 6. Font Demo
  const demoFontText = document.getElementById('demoFontText');
  const fontSelect = document.getElementById('fontSelect');
  const fontSizeSlider = document.getElementById('fontSizeSlider');
  const fontSizeValue = document.getElementById('fontSizeValue');
  const boldBtn = document.getElementById('boldBtn');
  const italicBtn = document.getElementById('italicBtn');
  const resetFontBtn = document.getElementById('resetFontBtn');
  if (demoFontText) {
    if (fontSelect) fontSelect.addEventListener('change', () => demoFontText.style.fontFamily = fontSelect.value);
    if (fontSizeSlider) fontSizeSlider.addEventListener('input', () => {
      let val = fontSizeSlider.value + 'px';
      demoFontText.style.fontSize = val;
      if (fontSizeValue) fontSizeValue.textContent = val;
    });
    if (boldBtn) boldBtn.addEventListener('click', () => demoFontText.style.fontWeight = demoFontText.style.fontWeight === 'bold' ? 'normal' : 'bold');
    if (italicBtn) italicBtn.addEventListener('click', () => demoFontText.style.fontStyle = demoFontText.style.fontStyle === 'italic' ? 'normal' : 'italic');
    if (resetFontBtn) resetFontBtn.addEventListener('click', () => {
      demoFontText.style.fontFamily = '';
      demoFontText.style.fontSize = '';
      demoFontText.style.fontWeight = '';
      demoFontText.style.fontStyle = '';
      if (fontSelect) fontSelect.value = 'Arial, sans-serif';
      if (fontSizeSlider) fontSizeSlider.value = '18';
      if (fontSizeValue) fontSizeValue.textContent = '18px';
    });
  }

  // 7. Display Demo
  const demoDisplayBox = document.getElementById('demoDisplayBox');
  const displayBlockBtn = document.getElementById('displayBlockBtn');
  const displayInlineBtn = document.getElementById('displayInlineBtn');
  const displayInlineBlockBtn = document.getElementById('displayInlineBlockBtn');
  const displayNoneBtn = document.getElementById('displayNoneBtn');
  const resetDisplayBtn = document.getElementById('resetDisplayBtn');
  if (demoDisplayBox) {
    if (displayBlockBtn) displayBlockBtn.addEventListener('click', () => demoDisplayBox.style.display = 'block');
    if (displayInlineBtn) displayInlineBtn.addEventListener('click', () => demoDisplayBox.style.display = 'inline');
    if (displayInlineBlockBtn) displayInlineBlockBtn.addEventListener('click', () => demoDisplayBox.style.display = 'inline-block');
    if (displayNoneBtn) displayNoneBtn.addEventListener('click', () => demoDisplayBox.style.display = 'none');
    if (resetDisplayBtn) resetDisplayBtn.addEventListener('click', () => demoDisplayBox.style.display = 'block');
  }

  // 8. Position Demo
  const demoPositionBox = document.getElementById('demoPositionBox');
  const posStatic = document.getElementById('posStatic');
  const posRelative = document.getElementById('posRelative');
  const posAbsolute = document.getElementById('posAbsolute');
  const posFixed = document.getElementById('posFixed');
  const resetPosBtn = document.getElementById('resetPosBtn');
  if (demoPositionBox) {
    if (posStatic) posStatic.addEventListener('click', () => {
      demoPositionBox.style.position = 'static';
      demoPositionBox.style.top = 'auto';
      demoPositionBox.style.left = 'auto';
      demoPositionBox.style.bottom = 'auto';
      demoPositionBox.style.right = 'auto';
    });
    if (posRelative) posRelative.addEventListener('click', () => {
      demoPositionBox.style.position = 'relative';
      demoPositionBox.style.top = '20px';
      demoPositionBox.style.left = '20px';
      demoPositionBox.style.bottom = 'auto';
      demoPositionBox.style.right = 'auto';
    });
    if (posAbsolute) posAbsolute.addEventListener('click', () => {
      demoPositionBox.style.position = 'absolute';
      demoPositionBox.style.bottom = '10px';
      demoPositionBox.style.right = '10px';
      demoPositionBox.style.top = 'auto';
      demoPositionBox.style.left = 'auto';
    });
    if (posFixed) posFixed.addEventListener('click', () => {
      demoPositionBox.style.position = 'fixed';
      demoPositionBox.style.bottom = '20px';
      demoPositionBox.style.right = '20px';
      demoPositionBox.style.top = 'auto';
      demoPositionBox.style.left = 'auto';
      alert('Elemen sekarang fixed di viewport. Scroll untuk melihat efeknya.');
    });
    if (resetPosBtn) resetPosBtn.addEventListener('click', () => {
      demoPositionBox.style.position = 'static';
      demoPositionBox.style.top = 'auto';
      demoPositionBox.style.left = 'auto';
      demoPositionBox.style.bottom = 'auto';
      demoPositionBox.style.right = 'auto';
    });
  }

  // 9. Z-Index Demo
  const box1 = document.getElementById('box1');
  const box2 = document.getElementById('box2');
  const z1Slider = document.getElementById('z1Slider');
  const z2Slider = document.getElementById('z2Slider');
  const z1val = document.getElementById('z1val');
  const z2val = document.getElementById('z2val');
  if (box1 && box2 && z1Slider && z2Slider) {
    z1Slider.addEventListener('input', () => {
      let v = z1Slider.value;
      box1.style.zIndex = v;
      if (z1val) z1val.textContent = v;
    });
    z2Slider.addEventListener('input', () => {
      let v = z2Slider.value;
      box2.style.zIndex = v;
      if (z2val) z2val.textContent = v;
    });
  }

  // 10. Combinators Demo (global function)
  window.demoCombinator = function(type) {
    const combinatorParent = document.querySelector('#combinatorDemo .parent');
    if (!combinatorParent) return;
    const nextP = combinatorParent.nextElementSibling;
    if (type === 'child') {
      combinatorParent.querySelectorAll(':scope > p').forEach(p => p.style.color = 'blue');
    } else if (type === 'descendant') {
      combinatorParent.querySelectorAll('p').forEach(p => p.style.color = 'green');
    } else if (type === 'adjacent') {
      if (nextP && nextP.tagName === 'P') nextP.style.color = 'red';
    } else if (type === 'reset') {
      combinatorParent.querySelectorAll('p').forEach(p => p.style.color = '');
      if (nextP && nextP.tagName === 'P') nextP.style.color = '';
    }
  };

  // 11. Opacity Demo
  const opacitySliderImg = document.getElementById('opacitySlider');
  const opacityImg = document.getElementById('opacityImg');
  const resetOpacityBtn = document.getElementById('resetOpacityBtn');
  if (opacitySliderImg && opacityImg) {
    const updateOpacity = () => {
      opacityImg.style.opacity = opacitySliderImg.value;
    };
    opacitySliderImg.addEventListener('input', updateOpacity);
    if (resetOpacityBtn) resetOpacityBtn.addEventListener('click', () => {
      opacitySliderImg.value = '1';
      updateOpacity();
    });
    updateOpacity();
  }
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
  // Simpan last page
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

  let lastScrollY = window.scrollY;
  let isHidden = false;
  let isMoved = false;
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

  // SCROLL HANDLER untuk mini header
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
  initSidebarAndCollapse();
  initDemos();
});