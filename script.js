// ===== constants =====
const COMPANY_TEL_INTL = "33758878125"; // wa.me format
const COMPANY_TEL_SMS = "+33758878125";

// ===== SIV Vehicle Database =====
const VEHICLES_DATABASE = [
  { id: "clio5_10_tce", brand: "Renault", model: "Clio V", engine: "1.0 TCe 100 ch", fuel: "essence", turbo: true, hp_orig: 100, hp_mod: 125, tq_orig: 160, tq_mod: 205, e85: true, price_st1: 300, price_e85: 300 },
  { id: "208_12_puretech", brand: "Peugeot", model: "208 II", engine: "1.2 PureTech 100 ch", fuel: "essence", turbo: true, hp_orig: 100, hp_mod: 130, tq_orig: 205, tq_mod: 240, e85: true, price_st1: 300, price_e85: 300 },
  { id: "golf7_20_tdi", brand: "Volkswagen", model: "Golf VII", engine: "2.0 TDI 150 ch", fuel: "diesel", turbo: true, hp_orig: 150, hp_mod: 190, tq_orig: 320, tq_mod: 400, e85: false, price_st1: 300, price_e85: 0 },
  { id: "bmw_320d_f30", brand: "BMW", model: "Série 3 (F30)", engine: "320d 184 ch", fuel: "diesel", turbo: true, hp_orig: 184, hp_mod: 220, tq_orig: 380, tq_mod: 440, e85: false, price_st1: 300, price_e85: 0 },
  { id: "audi_a3_20_tdi", brand: "Audi", model: "A3 (8V)", engine: "2.0 TDI 150 ch", fuel: "diesel", turbo: true, hp_orig: 150, hp_mod: 190, tq_orig: 320, tq_mod: 400, e85: false, price_st1: 300, price_e85: 0 },
  { id: "mercedes_a200d", brand: "Mercedes-Benz", model: "Classe A", engine: "200d 150 ch", fuel: "diesel", turbo: true, hp_orig: 150, hp_mod: 190, tq_orig: 320, tq_mod: 420, e85: false, price_st1: 300, price_e85: 0 },
  { id: "clio4_12_16v", brand: "Renault", model: "Clio IV", engine: "1.2 16V 75 ch (Atmo)", fuel: "essence", turbo: false, hp_orig: 75, hp_mod: 82, tq_orig: 107, tq_mod: 115, e85: true, price_st1: 300, price_e85: 300 },
  { id: "308_12_puretech", brand: "Peugeot", model: "308 II", engine: "1.2 PureTech 130 ch", fuel: "essence", turbo: true, hp_orig: 130, hp_mod: 150, tq_orig: 230, tq_mod: 270, e85: true, price_st1: 300, price_e85: 300 },
  { id: "megane4_13_tce", brand: "Renault", model: "Megane IV", engine: "1.3 TCe 140 ch", fuel: "essence", turbo: true, hp_orig: 140, hp_mod: 175, tq_orig: 240, tq_mod: 280, e85: true, price_st1: 300, price_e85: 300 },
  { id: "fiesta_10_ecoboost", brand: "Ford", model: "Fiesta", engine: "1.0 EcoBoost 100 ch", fuel: "essence", turbo: true, hp_orig: 100, hp_mod: 140, tq_orig: 170, tq_mod: 210, e85: true, price_st1: 300, price_e85: 300 },
  { id: "3008_15_bluehdi", brand: "Peugeot", model: "3008 II", engine: "1.5 BlueHDi 130 ch", fuel: "diesel", turbo: true, hp_orig: 130, hp_mod: 155, tq_orig: 300, tq_mod: 350, e85: false, price_st1: 300, price_e85: 0 },
  { id: "duster_15_dci", brand: "Dacia", model: "Duster", engine: "1.5 dCi 115 ch", fuel: "diesel", turbo: true, hp_orig: 115, hp_mod: 140, tq_orig: 260, tq_mod: 310, e85: false, price_st1: 300, price_e85: 0 },
  { id: "audi_a1_10_tfsi", brand: "Audi", model: "A1", engine: "1.0 TFSI 95 ch", fuel: "essence", turbo: true, hp_orig: 95, hp_mod: 125, tq_orig: 160, tq_mod: 200, e85: true, price_st1: 300, price_e85: 300 },
  { id: "polo_10_tsi", brand: "Volkswagen", model: "Polo VI", engine: "1.0 TSI 95 ch", fuel: "essence", turbo: true, hp_orig: 95, hp_mod: 120, tq_orig: 175, tq_mod: 210, e85: true, price_st1: 300, price_e85: 300 },
  { id: "clio4_15_dci", brand: "Renault", model: "Clio IV", engine: "1.5 dCi 90 ch", fuel: "diesel", turbo: true, hp_orig: 90, hp_mod: 115, tq_orig: 220, tq_mod: 260, e85: false, price_st1: 300, price_e85: 0 }
];

// ===== helpers =====
function openWhatsApp(text) {
  const encoded = encodeURIComponent(text);
  const whatsapp = `https://wa.me/${COMPANY_TEL_INTL}?text=${encoded}`;
  window.open(whatsapp, "_blank", "noopener,noreferrer");
}

function openSMS(text) {
  const encoded = encodeURIComponent(text);
  const sms = `sms:${COMPANY_TEL_SMS}?&body=${encoded}`;
  window.location.href = sms;
}

function openEmail(subject, body) {
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(body);
  window.location.href = `mailto:contact@hmd-performance.fr?subject=${s}&body=${b}`;
}

function sendViaChoice(via, subject, text) {
  if (via === "sms") return openSMS(text);
  if (via === "email") return openEmail(subject, text);
  return openWhatsApp(text); // défaut
}

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
document.getElementById("year")?.setAttribute("textContent", new Date().getFullYear());
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

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

function openQuote(preset = "", carPreset = "") {
  quoteModal?.classList.add("open");
  quoteModal?.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  
  if (preset && qService) qService.value = preset;
  
  if (carPreset) {
    const carInput = quoteForm?.querySelector('input[name="car"]');
    if (carInput) carInput.value = carPreset;
  }
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

  const via = String(fd.get("sendViaLead") || "whatsapp").trim(); // whatsapp | sms | email

  const text =
`Bonjour HMD PERFORMANCE,
Je m'appelle ${name}.
Mon tél: ${phone}
Véhicule: ${car}
Prestation: ${service}

Message: ${msg}

Adresse: 15 rue de Carlovingiens, 68000 Colmar`;

  sendViaChoice(via, `Message — ${service}`, text);
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

  const via = String(fd.get("sendVia") || "whatsapp").trim(); // whatsapp | sms | email

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

  sendViaChoice(via, `Demande de devis — ${serviceLabel}`, text);
  closeQuote();
});

// ===== FAQ Accordion =====
document.querySelectorAll(".faq-item").forEach(item => {
  const question = item.querySelector(".faq-question");
  question?.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    // Close other FAQ items
    document.querySelectorAll(".faq-item").forEach(i => {
      if (i !== item) i.classList.remove("open");
    });
    item.classList.toggle("open", !isOpen);
  });
});

// ===== SIV Plate & Model Lookup System =====
const tabPlaque = document.getElementById("tabPlaque");
const tabModele = document.getElementById("tabModele");
const formPlaque = document.getElementById("formPlaque");
const formModele = document.getElementById("formModele");
const inputPlaque = document.getElementById("inputPlaque");

// Tab Switching
tabPlaque?.addEventListener("click", () => {
  tabPlaque.classList.add("active");
  tabModele?.classList.remove("active");
  formPlaque?.classList.remove("hidden");
  formModele?.classList.add("hidden");
});

tabModele?.addEventListener("click", () => {
  tabModele.classList.add("active");
  tabPlaque?.classList.remove("active");
  formModele?.classList.remove("hidden");
  formPlaque?.classList.add("hidden");
});

// Plate formatting (e.g. AA-123-AA)
inputPlaque?.addEventListener("input", (e) => {
  let val = e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  if (val.length > 7) val = val.substring(0, 7);
  
  let formatted = '';
  if (val.length > 0) {
    formatted += val.substring(0, Math.min(val.length, 2));
  }
  if (val.length > 2) {
    formatted += '-' + val.substring(2, Math.min(val.length, 5));
  }
  if (val.length > 5) {
    formatted += '-' + val.substring(5, Math.min(val.length, 7));
  }
  e.target.value = formatted;
});

// Populate dropdowns for Model Search
const selectBrand = document.getElementById("selectBrand");
const selectModel = document.getElementById("selectModel");
const selectEngine = document.getElementById("selectEngine");

if (selectBrand) {
  // Get unique brands
  const brands = [...new Set(VEHICLES_DATABASE.map(v => v.brand))].sort();
  brands.forEach(brand => {
    const opt = document.createElement("option");
    opt.value = brand;
    opt.textContent = brand;
    selectBrand.appendChild(opt);
  });

  selectBrand.addEventListener("change", () => {
    selectModel.innerHTML = '<option value="" disabled selected>Modèle</option>';
    selectEngine.innerHTML = '<option value="" disabled selected>Motorisation</option>';
    selectModel.disabled = false;
    selectEngine.disabled = true;

    const filteredModels = [...new Set(VEHICLES_DATABASE.filter(v => v.brand === selectBrand.value).map(v => v.model))].sort();
    filteredModels.forEach(model => {
      const opt = document.createElement("option");
      opt.value = model;
      opt.textContent = model;
      selectModel.appendChild(opt);
    });
  });

  selectModel?.addEventListener("change", () => {
    selectEngine.innerHTML = '<option value="" disabled selected>Motorisation</option>';
    selectEngine.disabled = false;

    const filteredEngines = VEHICLES_DATABASE.filter(v => v.brand === selectBrand.value && v.model === selectModel.value);
    filteredEngines.forEach(v => {
      const opt = document.createElement("option");
      opt.value = v.id;
      opt.textContent = v.engine;
      selectEngine.appendChild(opt);
    });
  });
}

// Result Display Logic
const lookupLoader = document.getElementById("lookupLoader");
const lookupResults = document.getElementById("lookupResults");
const selectPlaqueConfirm = document.getElementById("selectPlaqueConfirm");
const plaqueConfirmArea = document.getElementById("plaqueConfirmArea");

function showLoaderAndExecute(onComplete) {
  if (lookupResults) lookupResults.classList.add("hidden");
  if (plaqueConfirmArea) plaqueConfirmArea.classList.add("hidden");
  if (lookupLoader) {
    lookupLoader.classList.remove("hidden");
    const progressFill = lookupLoader.querySelector(".progress-fill");
    const loaderText = lookupLoader.querySelector(".loader-text");
    
    let progress = 0;
    progressFill.style.width = "0%";
    
    const steps = [
      "Connexion serveur SIV...",
      "Identification du châssis...",
      "Lecture des tables calculateurs...",
      "Simulation des gains moteur..."
    ];
    
    const interval = setInterval(() => {
      progress += 5;
      if (progressFill) progressFill.style.width = `${progress}%`;
      
      const stepIndex = Math.floor((progress / 100) * steps.length);
      if (loaderText && steps[stepIndex]) {
        loaderText.textContent = steps[stepIndex];
      }
      
      if (progress >= 100) {
        clearInterval(interval);
        lookupLoader.classList.add("hidden");
        onComplete();
      }
    }, 100);
  } else {
    onComplete();
  }
}

// Handle Plate Form Submission
formPlaque?.addEventListener("submit", (e) => {
  e.preventDefault();
  const plateValue = inputPlaque?.value.trim();
  if (plateValue.length < 9) {
    alert("Veuillez saisir une plaque complète au format AA-123-AA.");
    return;
  }

  showLoaderAndExecute(() => {
    // Show SIV Confirm dropdown
    if (plaqueConfirmArea && selectPlaqueConfirm) {
      plaqueConfirmArea.classList.remove("hidden");
      // Populate SIV confirmation dropdown with all vehicles
      selectPlaqueConfirm.innerHTML = '<option value="" disabled selected>-- Choisir votre motorisation --</option>';
      VEHICLES_DATABASE.forEach(v => {
        const opt = document.createElement("option");
        opt.value = v.id;
        opt.textContent = `${v.brand} ${v.model} - ${v.engine}`;
        selectPlaqueConfirm.appendChild(opt);
      });
      // Scroll to SIV confirmation area
      plaqueConfirmArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});

selectPlaqueConfirm?.addEventListener("change", () => {
  const selectedVehicle = VEHICLES_DATABASE.find(v => v.id === selectPlaqueConfirm.value);
  if (selectedVehicle) {
    displayVehicleGains(selectedVehicle);
  }
});

// Handle Model Form Submission
formModele?.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectedId = selectEngine?.value;
  if (!selectedId) {
    alert("Veuillez sélectionner votre véhicule complet.");
    return;
  }

  showLoaderAndExecute(() => {
    const selectedVehicle = VEHICLES_DATABASE.find(v => v.id === selectedId);
    if (selectedVehicle) {
      displayVehicleGains(selectedVehicle);
    }
  });
});

// Display Gains Function
function displayVehicleGains(vehicle) {
  if (!lookupResults) return;

  // Set titles
  const resultTitle = lookupResults.querySelector(".result-title");
  if (resultTitle) resultTitle.textContent = `${vehicle.brand} ${vehicle.model}`;
  
  const resultEngine = lookupResults.querySelector(".result-engine");
  if (resultEngine) resultEngine.textContent = vehicle.engine;

  // Power & Torque numbers
  const valHpOrig = lookupResults.querySelector(".val-hp-orig");
  const valHpMod = lookupResults.querySelector(".val-hp-mod");
  const valHpGain = lookupResults.querySelector(".val-hp-gain");
  const barHp = lookupResults.querySelector(".bar-hp");

  const valTqOrig = lookupResults.querySelector(".val-tq-orig");
  const valTqMod = lookupResults.querySelector(".val-tq-mod");
  const valTqGain = lookupResults.querySelector(".val-tq-gain");
  const barTq = lookupResults.querySelector(".bar-tq");

  if (valHpOrig) valHpOrig.textContent = `${vehicle.hp_orig} ch`;
  if (valHpMod) valHpMod.textContent = `${vehicle.hp_mod} ch`;
  if (valHpGain) valHpGain.textContent = `+${vehicle.hp_mod - vehicle.hp_orig} ch`;
  if (barHp) {
    const origPct = (vehicle.hp_orig / 300) * 100;
    const modPct = (vehicle.hp_mod / 300) * 100;
    barHp.style.setProperty('--orig-pct', `${origPct}%`);
    barHp.style.setProperty('--mod-pct', `${modPct}%`);
  }

  if (valTqOrig) valTqOrig.textContent = `${vehicle.tq_orig} Nm`;
  if (valTqMod) valTqMod.textContent = `${vehicle.tq_mod} Nm`;
  if (valTqGain) valTqGain.textContent = `+${vehicle.tq_mod - vehicle.tq_orig} Nm`;
  if (barTq) {
    const origPct = (vehicle.tq_orig / 500) * 100;
    const modPct = (vehicle.tq_mod / 500) * 100;
    barTq.style.setProperty('--orig-pct', `${origPct}%`);
    barTq.style.setProperty('--mod-pct', `${modPct}%`);
  }

  // Action Buttons Wrapper
  const resultActions = lookupResults.querySelector(".result-actions");
  if (resultActions) {
    resultActions.innerHTML = ""; // Clear old buttons

    const carFullName = `${vehicle.brand} ${vehicle.model} - ${vehicle.engine}`;

    // Conditional render based on Fuel & Turbo type
    if (vehicle.fuel === "essence") {
      // 1. Proposed E85 conversion button (Highlighted)
      if (vehicle.e85) {
        const btnE85 = document.createElement("button");
        btnE85.className = "btn btn-red w100 pulse-glow";
        btnE85.innerHTML = `⛽ Conversion Flexfuel E85 (${vehicle.price_e85}€) <span class="badge">Rentabilité Max</span>`;
        btnE85.addEventListener("click", () => {
          // Open WhatsApp with E85 details
          const waText = `Bonjour HMD PERFORMANCE, j'ai simulé ma plaque d'immatriculation. Je souhaiterais prendre RDV pour une conversion Flexfuel E85 sur mon véhicule : ${carFullName}.`;
          openWhatsApp(waText);
        });
        resultActions.appendChild(btnE85);
      }

      // 2. Propose Stage 1 if it is a turbo engine
      if (vehicle.turbo) {
        const btnSt1 = document.createElement("button");
        btnSt1.className = "btn btn-red w100";
        btnSt1.innerHTML = `🚀 Reprogrammation Stage 1 (${vehicle.price_st1}€) [+${vehicle.hp_mod - vehicle.hp_orig}ch]`;
        btnSt1.addEventListener("click", () => {
          const waText = `Bonjour HMD PERFORMANCE, j'ai fait une simulation de plaque. Je souhaiterais obtenir un devis pour une reprogrammation Stage 1 sur ma : ${carFullName} (+${vehicle.hp_mod - vehicle.hp_orig} ch).`;
          openWhatsApp(waText);
        });
        resultActions.appendChild(btnSt1);

        // Add a combo option
        if (vehicle.e85) {
          const btnCombo = document.createElement("button");
          btnCombo.className = "btn btn-ghost w100";
          btnCombo.innerHTML = `🔥 Combo Stage 1 + E85 (Sur Devis)`;
          btnCombo.addEventListener("click", () => {
            openQuote("STAGE1", carFullName);
          });
          resultActions.appendChild(btnCombo);
        }
      } else {
        // Atmospheric engine info notice
        const infoNotice = document.createElement("div");
        infoNotice.className = "info-notice";
        infoNotice.innerHTML = `💡 *Moteur atmosphérique (sans turbo) : les gains en puissance pure sont limités sur ce modèle (+${vehicle.hp_mod - vehicle.hp_orig}ch), nous vous recommandons fortement la conversion E85 pour maximiser vos économies à la pompe.*`;
        resultActions.appendChild(infoNotice);
      }

    } else if (vehicle.fuel === "diesel") {
      // 1. Propose Stage 1 (Highlighted)
      const btnSt1 = document.createElement("button");
      btnSt1.className = "btn btn-red w100 pulse-glow";
      btnSt1.innerHTML = `🚀 Reprogrammation Stage 1 (${vehicle.price_st1}€) [+${vehicle.hp_mod - vehicle.hp_orig}ch]`;
      btnSt1.addEventListener("click", () => {
        const waText = `Bonjour HMD PERFORMANCE, j'ai fait une simulation de plaque. Je souhaiterais prendre RDV pour une reprogrammation Stage 1 sur mon véhicule diesel : ${carFullName} (+${vehicle.hp_mod - vehicle.hp_orig} ch, +${vehicle.tq_mod - vehicle.tq_orig} Nm).`;
        openWhatsApp(waText);
      });
      resultActions.appendChild(btnSt1);

      // 2. Propose Contact Button
      const btnContact = document.createElement("button");
      btnContact.className = "btn btn-ghost w100";
      btnContact.innerHTML = `✉️ Me Contacter / Devis Personnalisé`;
      btnContact.addEventListener("click", () => {
        openQuote("STAGE1", carFullName);
      });
      resultActions.appendChild(btnContact);
    }
  }

  // Unhide results card
  lookupResults.classList.remove("hidden");
  
  // Smooth scroll to results
  lookupResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
