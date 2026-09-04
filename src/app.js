import { buildProposalSummary, formatCOP, getDefaultSelection, getSelectedModules } from "./calculations.js";
import { loadConfig } from "./storage.js";

const config = loadConfig();
let selectedIds = normalizeSelection(getDefaultSelection(config));
const categoryOrder = config.categoryOrder || [];
const categories = [...new Set(config.modules.filter((module) => module.active).map((module) => module.category))].sort(
  (a, b) => {
    const aIndex = categoryOrder.indexOf(a);
    const bIndex = categoryOrder.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b, "es");
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  }
);
let activeModuleCategory = categories.find((category) => category !== "Fase 0") || categories[0];
let activeConfigCategory = activeModuleCategory;
let activeModuleId = null;

const els = {
  heroTitle: document.querySelector("#hero-title"),
  heroSubtitle: document.querySelector("#hero-subtitle"),
  stageTrack: document.querySelector("#stage-track"),
  moduleGallery: document.querySelector("#module-gallery"),
  selector: document.querySelector("#module-selector"),
  externalOptions: document.querySelector("#external-options"),
  configTabs: document.querySelector("#config-tabs"),
  configSteps: document.querySelector("#config-steps"),
  configProgress: document.querySelector("#config-progress"),
  configProgressRing: document.querySelector("#config-progress-ring"),
  stickyCount: document.querySelector("#sticky-count"),
  stickySummary: document.querySelector("#sticky-summary"),
  configTotalPrice: document.querySelector("#config-total-price"),
  configTotalTimeline: document.querySelector("#config-total-timeline"),
  configTotalModules: document.querySelector("#config-total-modules"),
  mobileSummary: document.querySelector("#mobile-summary"),
  selectedCards: document.querySelector("#selected-cards"),
  finalSummary: document.querySelector("#final-summary"),
  roadmapList: document.querySelector("#roadmap-list"),
  printButton: document.querySelector("#print-button"),
  approveButton: document.querySelector("#approve-button"),
  onboardingButton: document.querySelector("#onboarding-button"),
  mobileToggle: document.querySelector("#mobile-quote-toggle"),
  mobileQuote: document.querySelector("#mobile-quote")
};

function normalizeSelection(ids) {
  const next = new Set(ids);
  config.modules.filter((module) => module.required).forEach((module) => next.add(module.id));
  config.modules.forEach((module) => {
    if (!module.active) next.delete(module.id);
  });
  return [...next];
}

function setSelected(id, value) {
  const module = config.modules.find((item) => item.id === id);
  if (!module || module.required) return;
  const next = new Set(selectedIds);
  if (value) {
    if (module.exclusiveGroup) {
      config.modules
        .filter((item) => item.exclusiveGroup === module.exclusiveGroup && item.id !== id)
        .forEach((item) => next.delete(item.id));
    }
    next.add(id);
  } else {
    next.delete(id);
  }
  selectedIds = normalizeSelection([...next]);
  renderDynamic();
}

function categoryIcon(category) {
  const map = {
    "Fase 0": "compass",
    Ventas: "cart",
    Gestión: "users",
    Canales: "message",
    "Estructura de negocio": "share",
    "Infraestructura web": "cloud",
    Marketing: "megaphone",
    Administración: "briefcase",
    Administrativo: "briefcase",
    "Facturación electrónica": "receipt"
  };
  return map[category] || "box";
}

function moduleIcon(module) {
  const map = {
    onboarding: "compass",
    ecommerce: "cart",
    "additional-gateway": "card",
    "crm-inhouse": "users",
    "crm-external": "users",
    automation: "zap",
    "business-structure": "share",
    "software-infrastructure": "cloud",
    domain: "target",
    "whatsapp-api": "message",
    chatbot: "bot",
    "meta-business": "megaphone",
    "admin-inhouse": "briefcase",
    "alegra-integration": "receipt",
    "electronic-invoice": "receipt",
    dashboard: "chart",
    "marketing-managed": "megaphone"
  };
  return map[module.id] || categoryIcon(module.category);
}

function categorySortValue(category) {
  const index = categoryOrder.indexOf(category);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function sortModulesByCategoryOrder(modules) {
  return [...modules].sort((a, b) => {
    const categoryDelta = categorySortValue(a.category) - categorySortValue(b.category);
    if (categoryDelta !== 0) return categoryDelta;
    return config.modules.findIndex((module) => module.id === a.id) - config.modules.findIndex((module) => module.id === b.id);
  });
}

function iconSvg(name) {
  const icons = {
    compass: `<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z"/></svg>`,
    cart: `<svg viewBox="0 0 24 24"><path d="M4 5h2l2.2 10.4a2 2 0 0 0 2 1.6h6.7a2 2 0 0 0 1.9-1.4L21 8H7"/><path d="M10 21h.01M18 21h.01"/></svg>`,
    card: `<svg viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/><path d="M3 10h18"/></svg>`,
    users: `<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><path d="M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/></svg>`,
    zap: `<svg viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 10-13h-7l0-7Z"/></svg>`,
    message: `<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-8 8H5l-2 2v-8a8 8 0 1 1 18-2Z"/><path d="M8 10h8M8 14h5"/></svg>`,
    megaphone: `<svg viewBox="0 0 24 24"><path d="M3 11v2a2 2 0 0 0 2 2h2l3 5h3l-2.4-5H13l8 3V6l-8 3H5a2 2 0 0 0-2 2Z"/></svg>`,
    briefcase: `<svg viewBox="0 0 24 24"><path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1"/><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="M3 13h18"/></svg>`,
    chart: `<svg viewBox="0 0 24 24"><path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 16v-5M12 16V8M16 16v-7"/></svg>`,
    bot: `<svg viewBox="0 0 24 24"><path d="M12 8V4"/><path d="M8 4h8"/><path d="M5 11a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-5Z"/><path d="M9 13h.01M15 13h.01M10 17h4"/></svg>`,
    receipt: `<svg viewBox="0 0 24 24"><path d="M6 3h12v18l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2L6 21V3Z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>`,
    box: `<svg viewBox="0 0 24 24"><path d="m3 7 9-4 9 4-9 4-9-4Z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></svg>`,
    cloud: `<svg viewBox="0 0 24 24"><path d="M17.5 18H8a5 5 0 1 1 1.2-9.86A6 6 0 0 1 20 12a3 3 0 0 1-2.5 6Z"/></svg>`,
    share: `<svg viewBox="0 0 24 24"><path d="M4 12h5"/><path d="M15 6h5v5"/><path d="m20 6-7 7"/><path d="M20 18h-5v-5"/><path d="m20 18-7-7"/></svg>`,
    target: `<svg viewBox="0 0 24 24"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/><path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/><path d="m15 9 4-4"/></svg>`,
    clipboard: `<svg viewBox="0 0 24 24"><path d="M9 4h6l1 2h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l1-2Z"/><path d="M9 4h6v4H9V4Z"/><path d="m8 13 2 2 4-4M8 18h7"/></svg>`,
    code: `<svg viewBox="0 0 24 24"><path d="m8 9-4 3 4 3"/><path d="m16 9 4 3-4 3"/><path d="m14 5-4 14"/></svg>`,
    settings: `<svg viewBox="0 0 24 24"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.8 1.8 0 0 0 .36 2l.05.05a2.1 2.1 0 0 1-3 3l-.05-.05a1.8 1.8 0 0 0-2-.36 1.8 1.8 0 0 0-1.1 1.65V21a2.1 2.1 0 0 1-4.2 0v-.08a1.8 1.8 0 0 0-1.1-1.65 1.8 1.8 0 0 0-2 .36l-.05.05a2.1 2.1 0 0 1-3-3l.05-.05a1.8 1.8 0 0 0 .36-2 1.8 1.8 0 0 0-1.65-1.1H3a2.1 2.1 0 0 1 0-4.2h.08a1.8 1.8 0 0 0 1.65-1.1 1.8 1.8 0 0 0-.36-2l-.05-.05a2.1 2.1 0 0 1 3-3l.05.05a1.8 1.8 0 0 0 2 .36A1.8 1.8 0 0 0 10.5 2H12a2.1 2.1 0 0 1 2.1 2.1v.08a1.8 1.8 0 0 0 1.1 1.65 1.8 1.8 0 0 0 2-.36l.05-.05a2.1 2.1 0 0 1 3 3l-.05.05a1.8 1.8 0 0 0-.36 2 1.8 1.8 0 0 0 1.65 1.1H21a2.1 2.1 0 0 1 0 4.2h-.08A1.8 1.8 0 0 0 19.4 15Z"/></svg>`,
    rocket: `<svg viewBox="0 0 24 24"><path d="M13 14 10 11c.8-3.7 3.6-6.8 8.4-8.4.6 4.8-1.2 8.8-5.4 11.4Z"/><path d="M10 11 5 10l-2 2 5 2M13 14l1 5-2 2-2-5"/><path d="M6 18c-1.4.2-2.4 1.2-3 3 1.8-.6 2.8-1.6 3-3Z"/><path d="M16 7h.01"/></svg>`
  };
  return icons[name] || icons.box;
}

function installStaticIcons() {
  document.querySelectorAll("[data-icon]").forEach((item) => {
    item.innerHTML = iconSvg(item.dataset.icon);
  });
}

function moneyLine(label, value, suffix = "") {
  return `<div><dt>${label}</dt><dd>${formatCOP(value, config)}${suffix}</dd></div>`;
}

function modulePriceLabel(module) {
  if (module.externalPlanKey) return "Según plan";
  return formatCOP(module.implementationPrice, config);
}

function modulesByCategory(category) {
  return config.modules.filter((module) => module.active && module.category === category);
}

function resolveActiveModule() {
  const modules = modulesByCategory(activeModuleCategory);
  if (!modules.length) return null;
  if (!activeModuleId || !modules.some((module) => module.id === activeModuleId)) {
    activeModuleId = modules.find((module) => selectedIds.includes(module.id))?.id || modules[0].id;
  }
  return modules.find((module) => module.id === activeModuleId) || modules[0];
}

function previewModules(currentId) {
  const modules = sortModulesByCategoryOrder(config.modules.filter((module) => module.active));
  const currentIndex = modules.findIndex((module) => module.id === currentId);
  if (currentIndex < 0) return modules.slice(0, 4);
  return [...modules.slice(currentIndex + 1), ...modules.slice(0, currentIndex)]
    .filter((module) => module.id !== currentId)
    .slice(0, 4);
}

function implementationWindow(days) {
  if (days <= 4) return "1 semana";
  if (days <= 8) return "1 - 2 semanas";
  if (days <= 14) return "2 - 3 semanas";
  return "3 - 4 semanas";
}

function moduleImpact(module) {
  if (module.required) return { label: "Base", bars: 3 };
  if (selectedIds.includes(module.id)) return { label: "Alto", bars: 4 };
  if (module.estimatedDays >= 10) return { label: "Estratégico", bars: 4 };
  return { label: "Incremental", bars: 3 };
}

function levelBars(count) {
  return Array.from({ length: 4 }, (_, index) => `<i class="${index < count ? "filled" : ""}"></i>`).join("");
}

function renderStatic() {
  els.heroTitle.textContent = config.copy.heroTitle;
  els.heroSubtitle.textContent = config.copy.heroSubtitle;
  els.stageTrack.innerHTML = getStageData()
    .map(
      (stage, index) => `
        <article class="stage-step">
          <span class="stage-number">${String(index + 1).padStart(2, "0")}</span>
          <span class="stage-orb">${iconSvg(stage.icon)}</span>
          <strong>${stage.title}</strong>
          <small>${stage.description}</small>
        </article>
      `
    )
    .join("");
  installStaticIcons();
  renderModuleShowcase();
  renderConfigTabs();
  renderSelector();
  renderExternalOptions();
  setupReveal();
}

function getStageData() {
  const fallback = [
    ["Entender", "Analizamos el negocio a fondo.", "users"],
    ["Diseñar", "Planeamos la solución a la medida.", "target"],
    ["Validar", "Validamos procesos, reglas y alcance.", "clipboard"],
    ["Implementar", "Construimos la infraestructura.", "code"],
    ["Automatizar", "Conectamos y automatizamos.", "settings"],
    ["Medir", "Medimos resultados reales.", "chart"],
    ["Escalar", "Evolucionamos con el negocio.", "rocket"]
  ];

  return (config.stages || fallback).map((stage, index) => {
    if (typeof stage === "string") {
      const fallbackStage = fallback[index] || [stage, "", "box"];
      return { title: stage, description: fallbackStage[1], icon: fallbackStage[2] };
    }
    return stage;
  });
}

function renderModuleShowcase() {
  const activeModule = resolveActiveModule();
  if (!activeModule) return;
  const impact = moduleImpact(activeModule);
  const selected = selectedIds.includes(activeModule.id);
  const canToggle = !activeModule.required;
  const metricCards = [
    {
      icon: "target",
      eyebrow: "Impacto",
      title: impact.label,
      bars: impact.bars,
      label: "Enfoque",
      value: activeModule.category,
      details: activeModule.highlights
    },
    {
      icon: "settings",
      eyebrow: "Implementación",
      title: "Guiada",
      bars: activeModule.estimatedDays > 10 ? 4 : 3,
      label: "Ritmo estimado",
      value: implementationWindow(activeModule.estimatedDays),
      details: ["Validación previa", "Entrega por etapas", "Control operativo"]
    },
    {
      icon: "chart",
      eyebrow: "Impacto en negocio",
      title: selected ? "Prioritario" : "Incremental",
      bars: selected ? 4 : 3,
      label: "Mejora esperada",
      value: `+${Math.min(42, 16 + activeModule.estimatedDays + activeModule.highlights.length * 3)}%`,
      details: [`Área: ${activeModule.category}`]
    }
  ];

  els.moduleGallery.innerHTML = `
    <div class="module-tabs">
      ${categories
        .map(
          (category) => `
            <button class="${category === activeModuleCategory ? "active" : ""}" type="button" data-module-category="${category}">
              <span class="icon">${iconSvg(categoryIcon(category))}</span>${category}
            </button>
          `
        )
        .join("")}
    </div>
    <div class="module-explorer">
      <article class="module-main-card ${selected ? "selected" : ""}">
        <span class="module-main-icon">${iconSvg(moduleIcon(activeModule))}</span>
        <div>
          <p>${activeModule.category}</p>
          <h3>${activeModule.shortName}</h3>
          <i></i>
          <small>${activeModule.description}</small>
        </div>
        <footer>
          <button class="module-detail-button" type="button" data-toggle-module="${activeModule.id}" ${canToggle ? "" : "aria-disabled=\"true\""}>
            ${activeModule.required ? "Obligatorio" : selected ? "Quitar módulo" : "Agregar módulo"} <b>→</b>
          </button>
        </footer>
      </article>
      <div class="module-metrics">
        ${metricCards
          .map(
            (card) => `
              <article class="module-metric-card">
                <span class="metric-icon">${iconSvg(card.icon)}</span>
                <p>${card.eyebrow}</p>
                <h3>${card.title}</h3>
                <div class="metric-bars">${levelBars(card.bars)}</div>
                <hr />
                <dl>
                  <dt>${card.label}</dt>
                  <dd>${card.value}</dd>
                </dl>
                <hr />
                <ul>${card.details.slice(0, 3).map((item) => `<li>${item}</li>`).join("")}</ul>
                <span class="metric-check">✓</span>
              </article>
            `
          )
          .join("")}
      </div>
      <button class="module-next-control" type="button" data-preview-module="${previewModules(activeModule.id)[0]?.id || activeModule.id}" aria-label="Ver siguiente módulo">→</button>
    </div>
  `;

  els.moduleGallery.querySelectorAll("[data-module-category]").forEach((button) => {
    button.addEventListener("click", () => {
      activeModuleCategory = button.dataset.moduleCategory;
      activeModuleId = modulesByCategory(activeModuleCategory).find((module) => selectedIds.includes(module.id))?.id || null;
      renderModuleShowcase();
    });
  });

  els.moduleGallery.querySelectorAll("[data-toggle-module]").forEach((button) => {
    button.addEventListener("click", () => {
      const module = config.modules.find((item) => item.id === button.dataset.toggleModule);
      if (!module || module.required) return;
      setSelected(module.id, !selectedIds.includes(module.id));
      renderModuleShowcase();
    });
  });

  els.moduleGallery.querySelectorAll("[data-preview-module]").forEach((button) => {
    button.addEventListener("click", () => {
      const module = config.modules.find((item) => item.id === button.dataset.previewModule);
      if (!module) return;
      activeModuleCategory = module.category;
      activeModuleId = module.id;
      renderModuleShowcase();
    });
  });
}

function renderConfigTabs() {
  els.configTabs.innerHTML = categories
    .map((category) => {
      const selectedInCategory = config.modules.filter(
        (module) => module.active && module.category === category && selectedIds.includes(module.id)
      ).length;
      return `
        <button class="${category === activeConfigCategory ? "active" : ""}" type="button" data-config-category="${category}">
          <span class="icon">${iconSvg(categoryIcon(category))}</span>
          <strong>${category}</strong>
          <small>${selectedInCategory} activos</small>
        </button>
      `;
    })
    .join("");

  els.configTabs.querySelectorAll("[data-config-category]").forEach((button) => {
    button.addEventListener("click", () => {
      activeConfigCategory = button.dataset.configCategory;
      renderConfigTabs();
      renderConfigSteps();
      renderSelector();
    });
  });
}

function renderConfigSteps(summary = buildProposalSummary(config, selectedIds)) {
  els.configSteps.innerHTML = categories
    .map((category) => {
      const modules = config.modules.filter((module) => module.active && module.category === category);
      const selectedCount = modules.filter((module) => selectedIds.includes(module.id)).length;
      const complete = selectedCount > 0;
      return `
        <button class="${complete ? "complete" : ""} ${category === activeConfigCategory ? "active" : ""}" type="button" data-step-category="${category}">
          <span class="icon">${iconSvg(categoryIcon(category))}</span>
          <span><strong>${category}</strong><small>${complete ? `${selectedCount} módulo${selectedCount > 1 ? "s" : ""}` : "Pendiente"}</small></span>
          <i>${complete ? "✓" : ""}</i>
          <em aria-hidden="true"></em>
        </button>
      `;
    })
    .join("");

  els.configSteps.querySelectorAll("[data-step-category]").forEach((button) => {
    button.addEventListener("click", () => {
      activeConfigCategory = button.dataset.stepCategory;
      renderConfigTabs();
      renderConfigSteps();
      renderSelector();
      document.querySelector("#configurador").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function getExternalPlanConfig(module) {
  if (module.externalPlanKey === "alegra") {
    return {
      label: "Planes Alegra",
      selectedField: "selectedAlegraPlan",
      plans: config.alegraPlans,
      note: "Licencia de tercero. Cálculo mensual y anual."
    };
  }
  if (module.externalPlanKey === "electronicInvoice") {
    return {
      label: "Facturación electrónica",
      selectedField: "selectedElectronicInvoicePlan",
      plans: config.electronicInvoicePlans,
      note: "No incluye módulo contable. Anual estimado con 25% OFF."
    };
  }
  return null;
}

function selectedExternalPlan(module) {
  const planConfig = getExternalPlanConfig(module);
  if (!planConfig) return null;
  return planConfig.plans?.[config[planConfig.selectedField]] || null;
}

function renderExternalPlans(module) {
  const planConfig = getExternalPlanConfig(module);
  if (!planConfig) return "";
  const selectedPlan = config[planConfig.selectedField];
  return `
    <div class="allegra-plan-list" aria-label="${planConfig.label}">
      <p>${planConfig.note}</p>
      ${Object.values(planConfig.plans || {})
        .map(
          (plan) => `
            <span class="allegra-plan ${selectedPlan === plan.id ? "selected" : ""}" data-external-plan="${plan.id}" data-external-module="${module.id}" role="button" tabindex="0">
              <i aria-hidden="true"></i>
              <em>${plan.name}${plan.recommended ? " · recomendado" : ""}</em>
              ${plan.description ? `<small>${plan.description}</small>` : ""}
              <small>${formatCOP(plan.monthlyPrice, config)} / mes</small>
              <small>${formatCOP(plan.annualPrice, config)} / año</small>
            </span>
          `
        )
        .join("")}
    </div>
  `;
}

function renderSelector() {
  const modules = config.modules.filter((module) => module.active && module.category === activeConfigCategory);
  const activeVariant =
    modules.find((module) => selectedIds.includes(module.id)) ||
    modules.find((module) => module.defaultSelected) ||
    modules[0];
  const variants = [activeVariant, ...modules.filter((module) => module.id !== activeVariant.id)];
  const variantLayout = variants.length === 1 ? "single" : variants.length === 2 ? "duo" : "multi";
  els.selector.innerHTML = `
    <section class="selector-group">
      <div class="selector-heading">
        <span class="icon">${iconSvg(categoryIcon(activeConfigCategory))}</span>
        <div>
          <h3>${activeConfigCategory}</h3>
          <p>Activa, compara o descarta los componentes de esta etapa.</p>
        </div>
        <button class="selector-help" type="button" aria-label="Qué incluye esta etapa">
          <span class="inline-icon">${iconSvg("compass")}</span>¿Qué incluye esta etapa?
        </button>
      </div>
      <div class="selector-card-grid ${variantLayout}">
        ${variants
          .map(
            (module, index) => `
              <article class="selector-row variant-card ${index === 0 ? "featured" : ""} ${selectedIds.includes(module.id) ? "selected" : ""}" data-module="${module.id}" role="button" tabindex="0" aria-pressed="${selectedIds.includes(module.id)}" ${module.required ? "aria-disabled=\"true\"" : ""}>
                <span class="control"></span>
                <span class="module-icon">${iconSvg(moduleIcon(module))}</span>
                ${index === 0 ? `<span class="module-visual" aria-hidden="true"><i></i><i></i><i></i><b>${iconSvg(moduleIcon(module))}</b></span>` : ""}
                <span class="selector-copy">
                  ${module.defaultSelected || module.required ? "<mark>Recomendado</mark>" : ""}
                  <strong>${module.name}</strong>
                  <small>${module.description}</small>
                  <em>${module.highlights.slice(0, 3).join(" · ")}</em>
                  ${renderExternalPlans(module)}
                </span>
                <b>${modulePriceLabel(module)}</b>
                <span class="variant-link">Ver detalles <i>→</i></span>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;

  els.selector.querySelectorAll("[data-module]").forEach((card) => {
    const toggle = () => {
      const module = config.modules.find((item) => item.id === card.dataset.module);
      if (!module || module.required) return;
      setSelected(module.id, !selectedIds.includes(module.id));
      renderSelector();
    };
    card.addEventListener("click", toggle);
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      toggle();
    });
  });

  els.selector.querySelectorAll("[data-external-plan]").forEach((input) => {
    input.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const module = config.modules.find((item) => item.id === event.currentTarget.dataset.externalModule);
      const planConfig = module ? getExternalPlanConfig(module) : null;
      if (!module || !planConfig) return;
      config[planConfig.selectedField] = event.currentTarget.dataset.externalPlan;
      if (selectedIds.includes(module.id)) {
        renderDynamic();
        renderSelector();
      } else {
        setSelected(module.id, true);
        renderSelector();
      }
    });
    input.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      event.currentTarget.click();
    });
  });
}

function renderExternalOptions() {
  if (!els.externalOptions) return;
  const infraOptions = Object.values(config.infrastructurePlans)
    .map(
      (plan) => `
        <label>
          <input type="radio" name="infra" value="${plan.id}" ${config.selectedInfrastructurePlan === plan.id ? "checked" : ""} />
          <span><strong>${plan.name}</strong><small>USD ${plan.usdMonthly}/mes - ${plan.description}</small></span>
        </label>
      `
    )
    .join("");

  els.externalOptions.innerHTML = `
    <div><h4>Infraestructura administrada</h4>${infraOptions}</div>
  `;

  els.externalOptions.querySelectorAll('input[name="infra"]').forEach((input) => {
    input.addEventListener("change", (event) => {
      config.selectedInfrastructurePlan = event.target.value;
      renderDynamic();
    });
  });

}

function renderDynamic() {
  const summary = buildProposalSummary(config, selectedIds);
  const summaryRows = [
    moneyLine("Total implementación", summary.implementation),
    summary.thirdPartyAnnual > 0 ? moneyLine("Anualidades incluidas", summary.thirdPartyAnnual, " / año") : "",
    summary.monthly > 0 ? moneyLine("Recurrente propio", summary.monthly, " / mes") : "",
    summary.thirdPartyMonthly > 0 ? moneyLine("Referencia mensual terceros", summary.thirdPartyMonthly, " / mes") : "",
    summary.thirdPartyOneTime > 0 ? moneyLine("Servicios externos únicos", summary.thirdPartyOneTime) : "",
    summary.annual > 0 ? moneyLine("Propio anual", summary.annual, " / año") : "",
    `<div><dt>Tiempo estimado</dt><dd>${summary.timelineLabel}</dd></div>`
  ].filter(Boolean);
  const summaryHtml = summaryRows.join("");

  const activeModuleCount = config.modules.filter((module) => module.active).length;
  els.stickyCount.textContent = `${summary.moduleCount} / ${activeModuleCount}`;
  els.stickySummary.innerHTML = summaryHtml;
  if (els.configTotalPrice) els.configTotalPrice.textContent = formatCOP(summary.implementation, config);
  if (els.configTotalTimeline) els.configTotalTimeline.textContent = `${summary.timelineLabel} estimadas`;
  if (els.configTotalModules) els.configTotalModules.textContent = `${summary.moduleCount} módulos seleccionados`;
  els.mobileSummary.innerHTML = summaryHtml;
  const progress = Math.round((summary.moduleCount / config.modules.filter((module) => module.active).length) * 100);
  els.configProgress.textContent = `${progress}%`;
  els.configProgressRing.style.setProperty("--progress", `${progress}%`);
  els.finalSummary.innerHTML = summaryHtml;

  els.selectedCards.innerHTML = sortModulesByCategoryOrder(summary.selectedModules)
    .map(
      (module) => {
        const externalPlan = selectedExternalPlan(module);
        const externalPlanHtml = externalPlan
          ? `<p class="selected-plan">Plan seleccionado: ${externalPlan.name} · ${formatCOP(externalPlan.monthlyPrice, config)} / mes · ${formatCOP(externalPlan.annualPrice, config)} / año</p>`
          : "";
        return `
        <article class="selected-card">
          <span>${module.category}</span>
          <h3>${module.name}</h3>
          <p>${module.description}</p>
          ${externalPlanHtml}
          <ul>${module.highlights.map((item) => `<li>${item}</li>`).join("")}</ul>
        </article>
      `;
      }
    )
    .join("");

  if (els.roadmapList) els.roadmapList.innerHTML = buildRoadmap(summary.selectedModules);
  renderConfigSteps(summary);
  renderConfigTabs();
  syncSelectorState();
}

function buildRoadmap(modules) {
  const phaseMap = {
    discovery: "Fase 0 - Descubrimiento",
    commerce: "Fase 1 - Base digital / E-commerce",
    data: "Fase 2 - Inventario, CRM y datos",
    automation: "Fase 3 - WhatsApp y automatización",
    admin: "Fase 4 - Administración",
    marketing: "Fase 5 - Marketing y optimización"
  };
  const groups = modules.reduce((map, module) => {
    const key = module.timelineGroup || "otros";
    map[key] = map[key] || [];
    map[key].push(module.shortName);
    return map;
  }, {});

  return Object.entries(phaseMap)
    .filter(([key]) => groups[key])
    .map(
      ([key, label], index) => `
        <article>
          <span>${String(index).padStart(2, "0")}</span>
          <h3>${label}</h3>
          <p>${groups[key].join(" + ")}</p>
        </article>
      `
    )
    .join("");
}

function syncSelectorState() {
  els.selector.querySelectorAll("[data-module]").forEach((card) => {
    const selected = selectedIds.includes(card.dataset.module);
    card.classList.toggle("selected", selected);
    card.setAttribute("aria-pressed", String(selected));
  });
  els.selector.querySelectorAll("[data-external-plan]").forEach((input) => {
    const module = config.modules.find((item) => item.id === input.dataset.externalModule);
    const planConfig = module ? getExternalPlanConfig(module) : null;
    input.classList.toggle("selected", Boolean(planConfig && config[planConfig.selectedField] === input.dataset.externalPlan));
  });
  els.moduleGallery.querySelectorAll("[data-toggle-module]").forEach((button) => {
    button.classList.toggle("selected", selectedIds.includes(button.dataset.toggleModule));
  });
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.12 }
  );
  document
    .querySelectorAll(".reveal, .band, .split-band, .chaos-section, .vision-flow-section, .summary-section")
    .forEach((item) => observer.observe(item));
}

function setupActions() {
  els.printButton.addEventListener("click", () => window.print());
  els.approveButton.addEventListener("click", () => {
    location.href = "mailto:?subject=Aprobación alcance inicial Charlom&body=Quiero aprobar el alcance inicial de la propuesta Charlom y avanzar con onboarding.";
  });
  els.onboardingButton.addEventListener("click", () => {
    location.href = "mailto:?subject=Sesión de onboarding Charlom&body=Quiero agendar la sesión de onboarding para validar alcance y primera fase.";
  });
  els.mobileToggle.addEventListener("click", () => {
    const open = els.mobileQuote.getAttribute("aria-hidden") === "false";
    els.mobileQuote.setAttribute("aria-hidden", String(open));
    els.mobileToggle.setAttribute("aria-expanded", String(!open));
    els.mobileToggle.textContent = open ? "Ver propuesta" : "Ocultar propuesta";
  });
}

renderStatic();
renderDynamic();
setupActions();

document.body.appendChild(document.querySelector("#print-date-template").content.cloneNode(true));
document.querySelector(".print-date").textContent = `Fecha de impresión: ${new Date().toLocaleDateString("es-CO")}`;
