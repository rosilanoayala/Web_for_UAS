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

// ================= SIDEBAR & COLLAPSIBLE SECTIONS (WIZARD MODE) =================
function initSidebarAndCollapse() {
  const mainContent = document.getElementById("mainContent");
  if (!mainContent) return;

  const sections = mainContent.querySelectorAll("section");
  const sidebarNav = document.getElementById("sidebarNav");
  if (!sidebarNav || sections.length === 0) return;

  sidebarNav.innerHTML = "";

  function toggleSection(section, forceExpand) {
    const willCollapse = (forceExpand !== undefined) ? !forceExpand : !section.classList.contains("collapsed");
    if (willCollapse) {
      section.classList.add("collapsed");
    } else {
      section.classList.remove("collapsed");
    }
  }

  sections.forEach((section, index) => {
    const h2 = section.querySelector("h2");
    if (!h2) return;

    const title = h2.textContent.trim();
    const sectionId = section.id || `section-${index}`;
    section.id = sectionId;

    const link = document.createElement("a");
    link.href = `#${sectionId}`;
    link.textContent = title;
    link.addEventListener("click", (e) => {
      e.preventDefault();
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      document.querySelectorAll(".sidebar-nav a").forEach(a => a.classList.remove("active"));
      link.classList.add("active");
      if (section.classList.contains("collapsed")) toggleSection(section, true);
    });
    sidebarNav.appendChild(link);

    const contentWrapper = document.createElement("div");
    contentWrapper.className = "section-content";
    const childrenAfterH2 = [];
    let next = h2.nextSibling;
    while (next) {
      childrenAfterH2.push(next);
      next = next.nextSibling;
    }
    childrenAfterH2.forEach(child => contentWrapper.appendChild(child));
    section.appendChild(contentWrapper);

    const headerDiv = document.createElement("div");
    headerDiv.className = "section-header";
    h2.parentNode.insertBefore(headerDiv, h2);
    headerDiv.appendChild(h2);
    const toggleIcon = document.createElement("span");
    toggleIcon.className = "toggle-icon";
    toggleIcon.textContent = "▼";
    headerDiv.appendChild(toggleIcon);
    headerDiv.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleSection(section);
    });

    section.classList.add("collapsed");
  });

  if (sections.length > 0) toggleSection(sections[0], true);

  sections.forEach((section, index) => {
    if (index === sections.length - 1) return;
    const nextSection = sections[index + 1];
    const nextH2 = nextSection.querySelector("h2");
    const nextTitle = nextH2 ? nextH2.textContent.trim() : "Berikutnya";
    const btnContainer = document.createElement("div");
    btnContainer.className = "section-next-container";
    const nextBtn = document.createElement("button");
    nextBtn.className = "section-next-btn";
    nextBtn.innerHTML = `▶ Lanjut ke: ${nextTitle}`;
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleSection(nextSection, true);
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    btnContainer.appendChild(nextBtn);
    const contentWrapper = section.querySelector(".section-content");
    if (contentWrapper) contentWrapper.appendChild(btnContainer);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`.sidebar-nav a[href="#${id}"]`);
      if (link) {
        if (entry.isIntersecting) {
          document.querySelectorAll(".sidebar-nav a").forEach(a => a.classList.remove("active"));
          link.classList.add("active");
        }
      }
    });
  }, { rootMargin: "-20% 0px -70% 0px" });
  sections.forEach(s => observer.observe(s));
}

// ================= DEMO FUNCTIONS (semua interaktivitas JS) =================
function setupDemos() {
  // Demo 1: Intro
  document.getElementById("runDemo1")?.addEventListener("click", () => {
    document.getElementById("demo1").innerHTML = "✅ Wah, robotnya hidup! JavaScript berhasil merespons dan mengubah teks ini secara instan.";
  });

  // Output: innerHTML, alert, console
  document.getElementById("runInnerHTML")?.addEventListener("click", () => {
    const msg = document.getElementById("outputMsg")?.value || "Halo!";
    document.getElementById("outputDemo").innerHTML = msg;
  });
  document.getElementById("runAlert")?.addEventListener("click", () => {
    const msg = document.getElementById("outputMsg")?.value || "Alert!";
    alert(msg);
  });
  document.getElementById("runConsole")?.addEventListener("click", () => {
    const msg = document.getElementById("outputMsg")?.value || "Console log!";
    console.log(msg);
    document.getElementById("outputDemo").innerHTML = "Pesan telah dikirim ke Console (tekan F12 untuk melihat).";
  });

  // Variabel
  document.getElementById("runVariabel")?.addEventListener("click", () => {
    const nama = document.getElementById("varNama")?.value || "Andi";
    const umur = document.getElementById("varUmur")?.value || "16";
    document.getElementById("varResult").innerHTML = `Nama: ${nama}, Umur: ${umur}`;
  });

  // Tipe Data
  document.getElementById("runTipeData")?.addEventListener("click", () => {
    const str = "Halo", num = 100, bool = true, arr = [1,2,3], obj = {nama:"Budi"};
    document.getElementById("tipeResult").innerHTML = `
      string: ${typeof str}<br>number: ${typeof num}<br>boolean: ${typeof bool}<br>
      array: ${Array.isArray(arr)}<br>object: ${typeof obj}
    `;
  });

  // Operator
  document.getElementById("runOperator")?.addEventListener("click", () => {
    const expr = document.getElementById("opExpr")?.value || "10 + 5 * 2";
    try {
      const result = Function(`"use strict"; return (${expr})`)();
      document.getElementById("operatorResult").innerHTML = `${expr} = ${result}`;
    } catch { document.getElementById("operatorResult").innerHTML = "Error: ekspresi tidak valid"; }
  });

  // Percabangan
  document.getElementById("runIf")?.addEventListener("click", () => {
    const nilai = parseInt(document.getElementById("ifNilai")?.value) || 0;
    const status = nilai >= 75 ? "Lulus" : "Tidak lulus";
    document.getElementById("ifResult").innerHTML = `Nilai ${nilai} → ${status}`;
  });

  // Loop
  document.getElementById("runLoop")?.addEventListener("click", () => {
    const max = parseInt(document.getElementById("loopMax")?.value) || 5;
    let out = "";
    for (let i = 1; i <= max; i++) out += i + " ";
    document.getElementById("loopResult").innerHTML = out;
  });

  // Fungsi
  document.getElementById("runFungsi")?.addEventListener("click", () => {
    const nama = document.getElementById("funcNama")?.value || "Andi";
    document.getElementById("fungsiResult").innerHTML = `Halo selamat datang, Tuan ${nama}!`;
  });

  // DOM Manipulation
  document.getElementById("runDOM")?.addEventListener("click", () => {
    const el = document.getElementById("domDemo");
    const text = document.getElementById("domText")?.value || "Diubah!";
    const color = document.getElementById("domColor")?.value || "#e67e22";
    el.innerHTML = text;
    el.style.color = color;
    el.style.fontWeight = "bold";
  });
  document.getElementById("resetDOM")?.addEventListener("click", () => {
    const el = document.getElementById("domDemo");
    el.innerHTML = "Saya adalah Teks HTML biasa yang tidak berdaya.";
    el.style.color = "";
    el.style.fontWeight = "";
  });

  // Event Handler
  const hoverBtn = document.getElementById("hoverBtn");
  if (hoverBtn) {
    hoverBtn.addEventListener("mouseover", () => { hoverBtn.style.background = "#f97316"; hoverBtn.innerHTML = "Awas Panas! 🔥"; });
    hoverBtn.addEventListener("mouseout", () => { hoverBtn.style.background = "#f7b32b"; hoverBtn.innerHTML = "Hover ke sini (Sentuh)"; });
  }
  document.getElementById("clickEventBtn")?.addEventListener("click", () => {
    document.getElementById("eventDemo").innerHTML = "Tombol telah diklik! 🎉";
  });

  // Array & Object
  document.getElementById("runArray")?.addEventListener("click", () => {
    document.getElementById("arrayResult").innerHTML = ["Apel", "Mangga", "Jeruk"].join(", ");
  });
  document.getElementById("runObject")?.addEventListener("click", () => {
    document.getElementById("arrayResult").innerHTML = "Nama: Budi, Umur: 17, Kelas: XII";
  });

  // LocalStorage (tetap menggunakan localStorage untuk menyimpan data pengguna, tidak untuk session)
  document.getElementById("saveStorage")?.addEventListener("click", () => {
    const val = document.getElementById("storageInput")?.value;
    if (val) { localStorage.setItem("myData", val); document.getElementById("storageResult").innerHTML = "Data tersimpan!"; }
    else document.getElementById("storageResult").innerHTML = "Isi dulu!";
  });
  document.getElementById("loadStorage")?.addEventListener("click", () => {
    const data = localStorage.getItem("myData");
    document.getElementById("storageResult").innerHTML = data ? `Data: ${data}` : "Belum ada data";
  });
  document.getElementById("clearStorage")?.addEventListener("click", () => {
    localStorage.removeItem("myData");
    document.getElementById("storageResult").innerHTML = "Data dihapus";
  });
}

// ================= MAIN INIT =================
document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("lastPage", window.location.href);
  localStorage.setItem("lastPageName", window.location.href.split("/").pop());
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
    authBtn.innerHTML = `<span style="background:#16a34a;color:white;padding:6px 10px;border-radius:50%;margin-right:6px;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;font-weight:bold;">${initial}</span><span>${displayName}</span> ▼`;
    authBtn.href = "#";
    authBtn.addEventListener("click", e => { e.preventDefault(); wrapper?.classList.toggle("active"); });
  } else if (authBtn) {
    authBtn.addEventListener("click", e => { e.preventDefault(); localStorage.setItem("redirectAfterLogin", window.location.href); window.location.href = "login.html"; });
  }

  document.addEventListener("click", e => { if (wrapper && !wrapper.contains(e.target)) wrapper.classList.remove("active"); });

  if (searchMain) searchMain.addEventListener("input", () => { if (searchMini) searchMini.value = searchMain.value; cariMateri(); });
  if (searchMini) searchMini.addEventListener("input", () => { if (searchMain) searchMain.value = searchMini.value; cariMateri(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Enter" && currentResults.length > 0) {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % currentResults.length;
      focusResult(currentIndex);
    }
  });

  // Scroll handler untuk mini header
  window.addEventListener("scroll", () => {
    const current = window.scrollY;
    if (current > 100 && current > lastScrollY && !isHidden) {
      header?.classList.add("hide-nav");
      topnav?.classList.add("hide-nav");
      miniHeader?.classList.add("active");
      isHidden = true;
      if (!isMoved && wrapper && miniAccount) { miniAccount.appendChild(wrapper); isMoved = true; }
    } else if (current <= 0 && isHidden) {
      header?.classList.remove("hide-nav");
      topnav?.classList.remove("hide-nav");
      miniHeader?.classList.remove("active");
      isHidden = false;
      if (isMoved && wrapper && navRight) { navRight.appendChild(wrapper); isMoved = false; }
    }
    lastScrollY = current;
  }, { passive: true });

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", e => {
      e.preventDefault();
      wrapper?.classList.remove("active");
      if (!loadingScreen || !terminal) return;
      loadingScreen.style.display = "flex";
      terminal.textContent = "";
      const lines = [
        "#include <iostream>", "using namespace std;", "", "int main(){",
        '    cout << "Destroying session...\\n";', '    cout << "Freeing memory...\\n";',
        '    cout << "User logged out...\\n";', "    return 0;", "}", "",
        "$ g++ logout.cpp -o logoutApp", "Compiling...", "Build successful.",
        "Running program...", "Session terminated successfully ✔"
      ];
      typeEffect(lines, terminal, () => {
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
    });
  }

  checkLoginAndDisplay();
  window.addEventListener("storage", checkLoginAndDisplay);
  initSidebarAndCollapse();
  setupDemos();
});