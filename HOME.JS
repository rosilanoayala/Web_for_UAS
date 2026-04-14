document.addEventListener("DOMContentLoaded", function () {

  // Simpan halaman terakhir yang dikunjungi
  const currentPage = window.location.href;
  const pageName = currentPage.split("/").pop();
  localStorage.setItem("lastPage", currentPage);
  localStorage.setItem("lastPageName", pageName);

  // Hapus redirectAfterLogin jika tidak login
  if (localStorage.getItem("isLoggedIn") !== "true") {
    localStorage.removeItem("redirectAfterLogin");
  }

  const authBtn = document.getElementById("authButton");
  const wrapper = document.getElementById("accountWrapper");
  const logoutBtn = document.getElementById("logoutBtn");
  const loadingScreen = document.getElementById("loadingScreen");
  const terminal = document.getElementById("terminalText");

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const displayName = userName || userEmail;

  // Fade in
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);

  // Jika sudah login, tampilkan avatar & dropdown
  if (isLoggedIn && displayName && authBtn) {
    const initial = displayName.charAt(0).toUpperCase();
    authBtn.innerHTML = `
      <span style="background:#0f6e3f; color:white; padding:6px 10px; border-radius:50%; margin-right:8px; display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; font-weight:bold;">${initial}</span>
      ${displayName} ▼`;
    authBtn.href = "#";
    authBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (wrapper) wrapper.classList.toggle("active");
    });
    if (logoutBtn) logoutBtn.style.display = "block";
  } else {
    // Guest: sembunyikan logout button
    if (logoutBtn) logoutBtn.style.display = "none";
    // Langsung redirect ke login tanpa gimmick
    if (authBtn && !isLoggedIn) {
      authBtn.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.setItem("redirectAfterLogin", window.location.href);
        window.location.href = "login.html";
      });
    }
  }

  // Tutup dropdown jika klik di luar
  document.addEventListener("click", function (e) {
    if (wrapper && !wrapper.contains(e.target)) {
      wrapper.classList.remove("active");
    }
  });

  // LOGOUT dengan efek terminal (hanya jika user login)
  if (logoutBtn && loadingScreen && terminal && isLoggedIn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (wrapper) wrapper.classList.remove("active");

      loadingScreen.style.display = "flex";
      terminal.textContent = "";

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

      let i = 0, j = 0;
      function type() {
        if (i >= lines.length) {
          setTimeout(() => {
            // Hapus semua data user
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userName");
            localStorage.removeItem("userPhone");
            localStorage.removeItem("userAddress");
            localStorage.removeItem("userGender");
            localStorage.removeItem("userPassword");
            localStorage.removeItem("userComplaints");
            localStorage.setItem("lastPage", window.location.href);
            localStorage.setItem("lastPageName", window.location.href.split("/").pop());
            window.location.href = "HOME.html";
          }, 1200);
          return;
        }
        if (j < lines[i].length) {
          terminal.textContent += lines[i][j];
          j++;
          setTimeout(type, 18);
        } else {
          terminal.textContent += "\n";
          i++;
          j = 0;
          setTimeout(type, 250);
        }
      }
      requestAnimationFrame(type);
    });
  }

  // PROTEKSI "Try it by Yourself" – semua link dengan class protected-link
  document.querySelectorAll(".protected-link").forEach(link => {
    link.addEventListener("click", function (e) {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!loggedIn) {
        e.preventDefault();
        localStorage.setItem("redirectAfterLogin", this.href);
        localStorage.setItem("loginMessage", "🔒 Silakan login untuk mengakses Try Editor.");
        window.location.href = "login.html";
      }
    });
  });
});