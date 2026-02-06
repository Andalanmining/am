// === 1. Status Login Supervisor ===
let isLoggedIn = false;

function checkPassword() {
  const input = document.getElementById("password-input").value;
  const error = document.getElementById("login-error");

  if (input === "am") {
    isLoggedIn = true;
    unlockMenus();
    error.textContent = "✅ Akses Supervisor aktif.";
    error.style.color = "green";
  } else {
    error.textContent = "❌ Password salah. Coba lagi.";
    error.style.color = "red";
  }
}

function unlockMenus() {
  document.querySelectorAll(".menu-card.locked").forEach((card) => {
    card.classList.remove("locked");
    card.innerHTML = card.innerHTML.replace("🔒", "✅");
    card.style.opacity = "1";
    card.style.cursor = "pointer";
    // Jika ada link yang dinonaktifkan, bisa diaktifkan di sini
  });
}

// === 2. Fungsi Utama (Dijalankan setelah halaman siap) ===
document.addEventListener("DOMContentLoaded", () => {
  // --- Script Accordion ---
  const toggles = document.querySelectorAll(".accordion-toggle");
  toggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const content = this.nextElementSibling;

      // Tutup accordion lain agar tidak berantakan (Opsional)
      document.querySelectorAll(".accordion-content").forEach((item) => {
        if (item !== content) {
          item.style.display = "none";
        }
      });

      // Logika Buka Tutup
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });

  // --- Service Worker untuk Offline Mode ---
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("sw.js")
      .then(() => console.log("✅ Service Worker terdaftar"))
      .catch((error) => console.log("❌ Gagal daftar Service Worker:", error));
  }
});

// === 3. Fitur PDF & Google Form ===
function openPdf(pdfFile) {
  const timestamp = new Date().getTime();
  const pdfUrl = `docs/${pdfFile}?v=${timestamp}`;
  const container = document.getElementById("pdf-container");
  if (container) {
    container.innerHTML = `<iframe src="${pdfUrl}" class="pdf-viewer" title="PDF Viewer"></iframe>`;
  }
}

const formUrls = {
  LV: "https://docs.google.com/forms/d/e/1FAIpQLSdixtguSKPFOP4SJFzRD_-ExZoSgPUQyfSlHnsL_IThWA0lTA/viewform?embedded=true",
  // Tambahkan kendaraan lain di sini
};

function openForm(vehicleName) {
  const formUrl = formUrls[vehicleName];
  const frame = document.getElementById("google-form-frame");
  const title = document.getElementById("form-title");

  if (formUrl && frame) {
    title.textContent = `PRE START CHECK - ${vehicleName}`;
    frame.src = formUrl;
  } else {
    alert("Form untuk " + vehicleName + " belum tersedia.");
  }
}

// === 4. Fitur Pencarian (SOP) ===
function filterSop() {
  let input = document.getElementById("sopSearch").value.toLowerCase();
  let lists = document.querySelectorAll(".sop-list");

  lists.forEach((list) => {
    let items = list.getElementsByClassName("sop-item");
    let hasVisibleItem = false;

    for (let item of items) {
      let text = item.textContent.toLowerCase();
      if (text.includes(input)) {
        item.style.display = "";
        hasVisibleItem = true;
      } else {
        item.style.display = "none";
      }
    }

    // Sembunyikan judul kategori jika tidak ada isi yang cocok
    let divider = list.previousElementSibling;
    if (divider && divider.classList.contains("category-divider")) {
      divider.style.display = hasVisibleItem ? "" : "none";
    }
  });
}

// === 5. Navigasi & Tampilan ===
function scrollToCategory(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function filterSop() {
  // 1. Ambil input dari user
  let input = document.getElementById("sopSearch").value.toLowerCase();

  // 2. Ambil semua item SOP
  let items = document.getElementsByClassName("sop-item");

  // 3. Ambil semua judul kategori (h3)
  let categories = document.getElementsByClassName("category-divider");

  // 4. Looping untuk filter SOP
  for (let i = 0; i < items.length; i++) {
    let text = items[i].textContent.toLowerCase();
    if (text.includes(input)) {
      items[i].style.display = "flex";
    } else {
      items[i].style.display = "none";
    }
  }

  // 5. Sembunyikan judul kategori jika kolom pencarian diisi
  for (let j = 0; j < categories.length; j++) {
    if (input.length > 0) {
      categories[j].classList.add("hidden");
    } else {
      categories[j].classList.remove("hidden");
    }
  }
}
