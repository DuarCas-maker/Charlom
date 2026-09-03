import { defaultCommercialConfig } from "../config/commercial-config.js";

const CONFIG_KEY = "charlom-commercial-config";

export function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function getDefaultConfig() {
  return deepClone(defaultCommercialConfig);
}

function mergeById(defaultItems, customItems, key = "id") {
  const customMap = new Map((customItems || []).map((item) => [item[key], item]));
  return defaultItems.map((item) => {
    const override = customMap.get(item[key]);
    return override ? { ...item, ...override } : item;
  });
}

export function mergeConfig(defaultConfig, customConfig) {
  if (!customConfig) return deepClone(defaultConfig);
  const merged = {
    ...deepClone(defaultConfig),
    ...customConfig,
    meta: { ...defaultConfig.meta, ...(customConfig.meta || {}) },
    copy: { ...defaultConfig.copy, ...(customConfig.copy || {}) },
    discounts: { ...defaultConfig.discounts, ...(customConfig.discounts || {}) },
    recurring: { ...defaultConfig.recurring, ...(customConfig.recurring || {}) },
    infrastructurePlans: {
      ...defaultConfig.infrastructurePlans,
      ...(customConfig.infrastructurePlans || {})
    },
    alegraPlans: {
      ...defaultConfig.alegraPlans,
      ...(customConfig.alegraPlans || {})
    },
    paymentProviders: customConfig.paymentProviders || defaultConfig.paymentProviders,
    assumptions: customConfig.assumptions || defaultConfig.assumptions,
    stages: customConfig.stages || defaultConfig.stages,
    pipeline: customConfig.pipeline || defaultConfig.pipeline,
    modules: mergeById(defaultConfig.modules, customConfig.modules)
  };

  return merged;
}

export function loadConfig() {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    return mergeConfig(defaultCommercialConfig, raw ? JSON.parse(raw) : null);
  } catch (error) {
    console.warn("No se pudo cargar la configuración local.", error);
    return getDefaultConfig();
  }
}

export function saveConfig(config) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config, null, 2));
}

export function clearConfig() {
  localStorage.removeItem(CONFIG_KEY);
}

export function getConfigKey() {
  return CONFIG_KEY;
}
