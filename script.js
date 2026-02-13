// ===== constants =====
const COMPANY_TEL_INTL = "33658878125"; // wa.me format
const COMPANY_TEL_SMS = "+33658878125";

// ===== helpers =====
function openWhatsAppOrFallbackSMS(text) {
  const encoded = encodeURIComponent(text);
  const whatsapp = `https://wa.me/${COMPANY_TEL_INTL}?text=${encoded}`;
  const sms = `sms:${COMPANY_TEL_SMS}?&body=${encoded}`;

  window.open(whatsapp, "_blank", "noopener,noreferrer");

  setTimeout(() => {
    const ok = confirm("Si WhatsApp ne s'est pas ouvert, veux-tu envoyer par SMS ?");
    if (ok) window.location.href = sms;
  }, 650);
}

// ===== nav scroll effect =====
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) nav?.classList.add("scrolled");
  else nav?.classList.remove("scrolled");
});

// ===== year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== mobile drawer =====
const burger = document.getElementById("burger");
const drawer = document.getElementById("drawer");
const drawerClose = document.getElementById("drawerClose");

function openDrawer() {
  drawer?.classList.add("open");
  drawer?.setAttribute("aria-hidden", "false");
  burger?.setAttribute("aria-expanded", "true");
}
function closeDrawer() {
  drawer?.classList.remove("open");
  drawer?.setAttribute("aria-hidden", "true");
  burger?.setAttribute("aria-expanded", "false");
}

burger?.addEventListener("click", openDrawer);
drawerClose?.addEventListener("click", closeDrawer);
drawer?.addEventListener("click", (e) => { if (e.target === drawer) closeDrawer(); });
document.querySelectorAll(".drawer-link").forEach((a) => a.addEventListener("click", closeDrawer));

// ===== reveal on scroll =====
const reveals = Array.from(document.querySelectorAll(".reveal"));
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("in");
  });
}, { threshold: 0.15 });

reveals.forEach(el => io.observe(el));

// ===== quote modal =====
const quoteModal = document.getElementById("quoteModal");
const quoteClose = document.getElementById("quoteClose");
const quoteForm = document.getElementById("quoteForm");
const qService = document.getElementById("qService");

function openQuote(preset = "") {
  quoteModal?.classList.add("open");
  quoteModal?.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  if (preset && qService) qService.value = preset;
}
function closeQuote() {
  quoteModal?.classList.remove("open");
  quoteModal?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.getElementById("quoteBtn")?.addEventListener("click", () => openQuote());
document.getElementById("quoteBtn2")?.addEventListener("click", () => openQuote());
document.getElementById("quoteFloat")?.addEventListener("click", () => openQuote());
document.getElementById("quoteHero")?.addEventListener("click", () => openQuote());
document.getElementById("quoteCard")?.addEventListener("click", () => openQuote());
document.getElementById("quoteContact")?.addEventListener("click", () => openQuote());

document.querySelectorAll("[data-open-quote]").forEach((btn) => {
  btn.addEventListener("click", () => openQuote(btn.getAttribute("data-open-quote") || ""));
});

quoteClose?.addEventListener("click", closeQuote);
quoteModal?.addEventListener("click", (e) => { if (e.target === quoteModal) closeQuote(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeQuote(); });

// ===== lead form (contact) =====
const leadForm = document.getElementById("leadForm");
leadForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(leadForm);

  const name = String(fd.get("name") || "").trim();
  const phone = String(fd.get("phone") || "").trim();
  const car = String(fd.get("car") || "").trim();
  const service = String(fd.get("service") || "").trim();
  const msg = String(fd.get("msg") || "").trim();

  const text =
`Bonjour HMD PERFORMANCE,
Je m'appelle ${name}.
Mon tél: ${phone}
Véhicule: ${car}
Prestation: ${service}

Message: ${msg}

Adresse: 15 rue de Carlovingiens, 68000 Colmar`;

  openWhatsAppOrFallbackSMS(text);
});

// ===== quote form =====
quoteForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(quoteForm);

  const name = String(fd.get("name") || "").trim();
  const phone = String(fd.get("phone") || "").trim();
  const car = String(fd.get("car") || "").trim();
  const service = String(fd.get("service") || "").trim();
  const when = String(fd.get("when") || "").trim();
  const msg = String(fd.get("msg") || "").trim();

  const serviceLabel =
    service === "STAGE1" ? "Stage 1 (300€)" :
    service === "E85" ? "Conversion E85 (300€)" :
    service === "EGR" ? "EGR off (dès 99€)" :
    service === "FAP" ? "FAP off (dès 149€)" :
    service === "ADB" ? "AdBlue off (dès 199€)" :
    service === "FRM3" ? "FRM3 BMW (99€)" :
    service === "DIAG" ? "Diagnostic (sur demande)" :
    service;

  const text =
`Bonjour HMD PERFORMANCE,
Je m'appelle ${name}.
Mon tél: ${phone}

Véhicule: ${car}
Prestation: ${serviceLabel}
Quand: ${when}

Détails: ${msg}

Adresse: 15 rue de Carlovingiens, 68000 Colmar`;

  openWhatsAppOrFallbackSMS(text);
  closeQuote();
});
