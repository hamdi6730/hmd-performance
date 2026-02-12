// ===== Helpers =====
const COMPANY_TEL_INTL = "33658878125"; // wa.me expects country code
const COMPANY_TEL_SMS = "+33658878125";

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

// ===== Mobile menu =====
const hamburger = document.getElementById("hamburger");
const drawer = document.getElementById("drawer");
const drawerClose = document.getElementById("drawerClose");

function openDrawer() {
  drawer?.classList.add("open");
  drawer?.setAttribute("aria-hidden", "false");
  hamburger?.setAttribute("aria-expanded", "true");
}
function closeDrawer() {
  drawer?.classList.remove("open");
  drawer?.setAttribute("aria-hidden", "true");
  hamburger?.setAttribute("aria-expanded", "false");
}

hamburger?.addEventListener("click", openDrawer);
drawerClose?.addEventListener("click", closeDrawer);
drawer?.addEventListener("click", (e) => { if (e.target === drawer) closeDrawer(); });
document.querySelectorAll(".drawer-link").forEach((a) => a.addEventListener("click", closeDrawer));

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Hero meter animation (visuel) =====
const meterFill = document.getElementById("meterFill");
const meterValue = document.getElementById("meterValue");

let target = 86; // visuel plus "wow"
let current = 0;

function animateMeter() {
  const tick = () => {
    current += Math.max(1, Math.round((target - current) * 0.08));
    if (current > target) current = target;
    if (meterFill) meterFill.style.width = current + "%";
    if (meterValue) meterValue.textContent = current + "%";
    if (current < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

if (meterFill) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { animateMeter(); io.disconnect(); }
    });
  }, { threshold: 0.3 });
  io.observe(meterFill);
}

// ===== Devis instant modal =====
const quoteModal = document.getElementById("quoteModal");
const quoteClose = document.getElementById("quoteClose");
const quoteForm = document.getElementById("quoteForm");

const quotePrice = document.getElementById("quotePrice");
const quoteBadges = document.getElementById("quoteBadges");

const qService = document.getElementById("qService");
const qGoal = document.getElementById("qGoal");
const qFuel = document.getElementById("qFuel");
const qGearbox = document.getElementById("qGearbox");
const qMileage = document.getElementById("qMileage");

function openQuote(presetServiceValue = "") {
  quoteModal?.classList.add("open");
  quoteModal?.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  if (presetServiceValue && qService) {
    qService.value = presetServiceValue;
  }
  updateQuoteUI();
}

function closeQuote() {
  quoteModal?.classList.remove("open");
  quoteModal?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.getElementById("quoteBtn")?.addEventListener("click", () => openQuote());
document.getElementById("quoteBtn2")?.addEventListener("click", () => openQuote());
document.getElementById("quoteHero")?.addEventListener("click", () => openQuote());
document.getElementById("quoteCard")?.addEventListener("click", () => openQuote());
document.getElementById("quoteContact")?.addEventListener("click", () => openQuote());
document.getElementById("quotePanel")?.addEventListener("click", () => openQuote());

document.getElementById("quoteE85")?.addEventListener("click", () => openQuote("E85"));
document.getElementById("quoteStage1")?.addEventListener("click", () => openQuote("STAGE1"));
document.getElementById("quoteFRM")?.addEventListener("click", () => openQuote("FRM3"));

quoteClose?.addEventListener("click", closeQuote);
quoteModal?.addEventListener("click", (e) => { if (e.target === quoteModal) closeQuote(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeQuote(); });

// ===== Estimation (simple, non-contractuelle) =====
function basePriceForService(service) {
  if (service === "E85") return 300;
  if (service === "STAGE1") return 300;
  if (service === "DIAG") return 50;
  if (service === "FRM3") return null; // sur devis
  return null;
}

function mileageModifier(mileageStr) {
  const m = parseInt(String(mileageStr || "").replace(/\D/g, ""), 10);
  if (!Number.isFinite(m)) return 0;
  if (m >= 220000) return 30;
  if (m >= 160000) return 20;
  if (m >= 120000) return 10;
  return 0;
}

function gearboxModifier(gearbox) {
  // juste indicatif : autos/DSG peuvent demander plus de checks
  if (!gearbox) return 0;
  if (gearbox.includes("Automatique")) return 20;
  if (gearbox.includes("DSG")) return 20;
  return 0;
}

function goalModifier(goal) {
  // indicatif : pas de surcoût réel obligatoire, c’est juste une estimation "à partir de"
  if (!goal) return 0;
  if (goal === "issue") return 20; // cas "problème/voyant" → souvent diag plus poussé
  return 0;
}

function updateBadges(service, fuel, gearbox, goal) {
  if (!quoteBadges) return;
  const b = [];

  b.push("🔒 Origine sauvegardée");
  b.push("🧪 Vérifs");

  if (service === "E85") b.push("⛽ E85");
  if (service === "STAGE1") b.push("🚀 Stage 1");
  if (service === "DIAG") b.push("🧰 Diagnostic");
  if (service === "FRM3") b.push("🧠 FRM3 BMW");

  if (fuel) b.push(`⛽ ${fuel}`);
  if (gearbox) b.push(`⚙️ ${gearbox}`);
  if (goal === "eco") b.push("💸 Économie");
  if (goal === "torque") b.push("🔥 Reprises");
  if (goal === "smooth") b.push("✨ Agrément");
  if (goal === "issue") b.push("🚨 Voyant / souci");

  b.push("📍 Colmar");

  quoteBadges.innerHTML = b.slice(0, 7).map(x => `<span class="qbadge">${x}</span>`).join("");
}

function updateQuoteUI() {
  const service = qService?.value || "";
  const fuel = qFuel?.value || "";
  const gearbox = qGearbox?.value || "";
  const goal = qGoal?.value || "";
  const mileage = qMileage?.value || "";

  const base = basePriceForService(service);

  if (base == null) {
    quotePrice.textContent = "Sur devis";
  } else {
    const est =
      base +
      mileageModifier(mileage) +
      gearboxModifier(gearbox) +
      goalModifier(goal);

    quotePrice.textContent = `À partir de ${est}€`;
  }

  updateBadges(service, fuel, gearbox, goal);
}

[qService, qGoal, qFuel, qGearbox, qMileage].forEach((el) => {
  el?.addEventListener("input", updateQuoteUI);
  el?.addEventListener("change", updateQuoteUI);
});

// Default state
updateQuoteUI();

// ===== Send quote =====
quoteForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(quoteForm);

  const name = (fd.get("name") || "").toString().trim();
  const phone = (fd.get("phone") || "").toString().trim();
  const car = (fd.get("car") || "").toString().trim();

  const serviceValue = (fd.get("service") || "").toString().trim();
  const goal = (fd.get("goal") || "").toString().trim();
  const fuel = (fd.get("fuel") || "").toString().trim();
  const gearbox = (fd.get("gearbox") || "").toString().trim();
  const mileage = (fd.get("mileage") || "").toString().trim();
  const when = (fd.get("when") || "").toString().trim();
  const msg = (fd.get("msg") || "").toString().trim();

  const serviceLabel =
    serviceValue === "E85" ? "Conversion E85" :
    serviceValue === "STAGE1" ? "Stage 1" :
    serviceValue === "DIAG" ? "Diagnostic" :
    serviceValue === "FRM3" ? "Réparation FRM3 BMW" :
    "Autre / Conseil";

  const goalLabel =
    goal === "eco" ? "Économie carburant" :
    goal === "torque" ? "Plus de couple / reprises" :
    goal === "smooth" ? "Conduite plus agréable" :
    goal === "issue" ? "Problème / voyant" : goal;

  const priceText = quotePrice?.textContent || "—";

  const text =
`Bonjour HMD PERFORMANCE,
Je m'appelle ${name}.
Mon tél: ${phone}

Véhicule: ${car}
Prestation: ${serviceLabel}
Objectif: ${goalLabel}
Carburant: ${fuel}
Boîte: ${gearbox}
Kilométrage: ${mileage}
Quand: ${when}

Estimation affichée: ${priceText}

Détails: ${msg}

Adresse: 15 rue de Carlovingiens, 68000 Colmar`;

  openWhatsAppOrFallbackSMS(text);
  closeQuote();
});

// ===== Contact form quick message =====
const leadForm = document.getElementById("leadForm");
leadForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(leadForm);

  const name = (fd.get("name") || "").toString().trim();
  const phone = (fd.get("phone") || "").toString().trim();
  const car = (fd.get("car") || "").toString().trim();
  const service = (fd.get("service") || "").toString().trim();
  const msg = (fd.get("msg") || "").toString().trim();

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
