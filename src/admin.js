import { clearConfig, getDefaultConfig, loadConfig, saveConfig } from "./storage.js";

let config = loadConfig();
const form = document.querySelector("#admin-form");
const status = document.querySelector("#save-status");

function getPathValue(source, path) {
  return path.split(".").reduce((value, key) => value?.[key], source);
}

function setPathValue(target, path, value) {
  const keys = path.split(".");
  const last = keys.pop();
  const parent = keys.reduce((obj, key) => (obj[key] = obj[key] || {}), target);
  parent[last] = value;
}

function fillNamedFields() {
  form.querySelectorAll("[name]").forEach((field) => {
    const value = getPathValue(config, field.name);
    if (field.type === "checkbox") field.checked = Boolean(value);
    else field.value = value ?? "";
  });
}

function renderInfraAdmin() {
  document.querySelector("#infra-admin").innerHTML = Object.values(config.infrastructurePlans)
    .map(
      (plan) => `
        <article class="admin-edit-card">
          <h3>${plan.name}</h3>
          <label>Nombre<input name="infrastructurePlans.${plan.id}.name" value="${plan.name}" /></label>
          <label>USD mensual<input type="number" min="0" step="1" name="infrastructurePlans.${plan.id}.usdMonthly" value="${plan.usdMonthly}" /></label>
          <label>Descripción<textarea rows="2" name="infrastructurePlans.${plan.id}.description">${plan.description}</textarea></label>
        </article>
      `
    )
    .join("");
}

function renderAlegraAdmin() {
  document.querySelector("#alegra-admin").innerHTML = Object.values(config.alegraPlans)
    .map(
      (plan) => `
        <article class="admin-edit-card">
          <h3>${plan.name}</h3>
          <label>Nombre<input name="alegraPlans.${plan.id}.name" value="${plan.name}" /></label>
          <label>Valor mensual<input type="number" min="0" step="1000" name="alegraPlans.${plan.id}.monthlyPrice" value="${plan.monthlyPrice}" /></label>
          <label>Valor anual<input type="number" min="0" step="1000" name="alegraPlans.${plan.id}.annualPrice" value="${plan.annualPrice || 0}" /></label>
          <label>Descripción<textarea rows="2" name="alegraPlans.${plan.id}.description">${plan.description || ""}</textarea></label>
        </article>
      `
    )
    .join("");
}

function renderElectronicInvoiceAdmin() {
  document.querySelector("#electronic-invoice-admin").innerHTML = Object.values(config.electronicInvoicePlans)
    .map(
      (plan) => `
        <article class="admin-edit-card">
          <h3>${plan.name}</h3>
          <label>Nombre<input name="electronicInvoicePlans.${plan.id}.name" value="${plan.name}" /></label>
          <label>Valor mensual<input type="number" min="0" step="1000" name="electronicInvoicePlans.${plan.id}.monthlyPrice" value="${plan.monthlyPrice}" /></label>
          <label>Valor anual<input type="number" min="0" step="1000" name="electronicInvoicePlans.${plan.id}.annualPrice" value="${plan.annualPrice || 0}" /></label>
          <label>Descripción<textarea rows="2" name="electronicInvoicePlans.${plan.id}.description">${plan.description || ""}</textarea></label>
        </article>
      `
    )
    .join("");
}

function renderModulesAdmin() {
  document.querySelector("#modules-admin").innerHTML = config.modules
    .map(
      (module, index) => `
        <article class="admin-module">
          <div class="admin-module-head">
            <div>
              <p>${module.category}</p>
              <h3>${module.name}</h3>
            </div>
            <label class="switch-label">Activo <input type="checkbox" name="modules.${index}.active" ${module.active ? "checked" : ""} /></label>
          </div>
          <div class="form-grid compact">
            <label>Nombre<input name="modules.${index}.name" value="${module.name}" /></label>
            <label>Nombre corto<input name="modules.${index}.shortName" value="${module.shortName}" /></label>
            <label>Categoría<input name="modules.${index}.category" value="${module.category}" /></label>
            <label>Precio implementación<input type="number" min="0" step="50000" name="modules.${index}.implementationPrice" value="${module.implementationPrice}" /></label>
            <label>Precio mensual<input type="number" min="0" step="50000" name="modules.${index}.monthlyPrice" value="${module.monthlyPrice}" /></label>
            <label>Precio anual<input type="number" min="0" step="50000" name="modules.${index}.annualPrice" value="${module.annualPrice}" /></label>
            <label>Costos terceros únicos<input type="number" min="0" step="50000" name="modules.${index}.thirdPartyCost" value="${module.thirdPartyCost}" /></label>
            <label>Duración días<input type="number" min="0" step="1" name="modules.${index}.estimatedDays" value="${module.estimatedDays}" /></label>
          </div>
          <label>Descripción<textarea rows="3" name="modules.${index}.description">${module.description}</textarea></label>
        </article>
      `
    )
    .join("");
}

function fieldValue(field) {
  if (field.type === "checkbox") return field.checked;
  if (field.type === "number") return Number(field.value || 0);
  return field.value;
}

function collectForm() {
  const next = structuredClone(config);
  form.querySelectorAll("[name]").forEach((field) => {
    setPathValue(next, field.name, fieldValue(field));
  });
  return next;
}

function render() {
  renderInfraAdmin();
  renderAlegraAdmin();
  renderElectronicInvoiceAdmin();
  renderModulesAdmin();
  fillNamedFields();
}

form.addEventListener("input", () => {
  status.textContent = "Cambios pendientes";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  config = collectForm();
  saveConfig(config);
  status.textContent = "Configuración guardada";
});

document.querySelector("#restore-config").addEventListener("click", () => {
  if (!confirm("¿Restaurar la configuración original y eliminar cambios locales?")) return;
  clearConfig();
  config = getDefaultConfig();
  render();
  status.textContent = "Configuración original restaurada";
});

document.querySelector("#export-config").addEventListener("click", () => {
  const next = collectForm();
  const blob = new Blob([JSON.stringify(next, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = config.meta.exportedFileName || "charlom-commercial-config.json";
  anchor.click();
  URL.revokeObjectURL(url);
  status.textContent = "Configuración exportada";
});

document.querySelector("#import-config").addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) return;
  try {
    config = JSON.parse(await file.text());
    saveConfig(config);
    render();
    status.textContent = "Configuración importada";
  } catch {
    status.textContent = "El JSON importado no es válido";
  } finally {
    event.target.value = "";
  }
});

render();
