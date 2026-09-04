export function formatCOP(value, config) {
  return new Intl.NumberFormat(config.meta.locale, {
    style: "currency",
    currency: config.meta.currency,
    maximumFractionDigits: 0
  }).format(Math.round(value || 0));
}

export function getActiveModules(config) {
  return config.modules.filter((module) => module.active);
}

export function getDefaultSelection(config) {
  return getActiveModules(config)
    .filter((module) => module.defaultSelected || module.required)
    .map((module) => module.id);
}

export function getSelectedModules(config, selectedIds) {
  const selected = new Set(selectedIds);
  return getActiveModules(config).filter((module) => selected.has(module.id) || module.required);
}

function applyDiscount(value, percent) {
  return value * (1 - Math.max(0, Number(percent || 0)) / 100);
}

export function calculateInHouseImplementationTotal(config, selectedIds) {
  const subtotal = getSelectedModules(config, selectedIds).reduce(
    (sum, module) => sum + Number(module.implementationPrice || 0),
    0
  );
  return applyDiscount(subtotal, config.discounts.implementationPercent);
}

export function calculateImplementationTotal(config, selectedIds) {
  return calculateInHouseImplementationTotal(config, selectedIds) + calculateThirdPartyAnnualTotal(config, selectedIds);
}

export function calculateMonthlyTotal(config, selectedIds) {
  const subtotal = getSelectedModules(config, selectedIds).reduce(
    (sum, module) => sum + Number(module.monthlyPrice || 0),
    0
  );
  const recurring = Number(config.recurring.maintenanceMonthly || 0) + Number(config.recurring.supportMonthly || 0);
  return applyDiscount(subtotal + recurring, config.discounts.monthlyPercent);
}

export function calculateAnnualTotal(config, selectedIds) {
  const moduleAnnual = getSelectedModules(config, selectedIds).reduce(
    (sum, module) => sum + Number(module.annualPrice || 0),
    0
  );
  return moduleAnnual + Number(config.recurring.sslAnnual || 0);
}

function selectedPlanTotal(config, selectedIds, moduleId, plans, selectedPlanId, field) {
  const selected = new Set(selectedIds);
  if (!selected.has(moduleId)) return 0;
  const plan = plans?.[selectedPlanId];
  return plan ? Number(plan[field] || 0) : 0;
}

export function calculateThirdPartyMonthlyTotal(config, selectedIds) {
  const infrastructure = config.selectedInfrastructurePlan
    ? config.infrastructurePlans?.[config.selectedInfrastructurePlan]
    : null;
  const infrastructureMonthly = infrastructure ? Number(infrastructure.usdMonthly || 0) * Number(config.meta.usdToCop || 0) : 0;
  const alegraMonthly = selectedPlanTotal(
    config,
    selectedIds,
    "alegra-integration",
    config.alegraPlans,
    config.selectedAlegraPlan,
    "monthlyPrice"
  );
  const electronicInvoiceMonthly = selectedPlanTotal(
    config,
    selectedIds,
    "electronic-invoice",
    config.electronicInvoicePlans,
    config.selectedElectronicInvoicePlan,
    "monthlyPrice"
  );
  const moduleExternal = getSelectedModules(config, selectedIds).reduce(
    (sum, module) => sum + Number(module.thirdPartyMonthly || 0),
    0
  );
  return infrastructureMonthly + alegraMonthly + electronicInvoiceMonthly + moduleExternal;
}

export function calculateThirdPartyAnnualTotal(config, selectedIds) {
  const alegraAnnual = selectedPlanTotal(
    config,
    selectedIds,
    "alegra-integration",
    config.alegraPlans,
    config.selectedAlegraPlan,
    "annualPrice"
  );
  const electronicInvoiceAnnual = selectedPlanTotal(
    config,
    selectedIds,
    "electronic-invoice",
    config.electronicInvoicePlans,
    config.selectedElectronicInvoicePlan,
    "annualPrice"
  );
  const moduleExternalAnnual = getSelectedModules(config, selectedIds).reduce(
    (sum, module) => sum + Number(module.thirdPartyAnnual || 0),
    0
  );
  return alegraAnnual + electronicInvoiceAnnual + moduleExternalAnnual;
}

export function calculateThirdPartyTotal(config, selectedIds) {
  return getSelectedModules(config, selectedIds).reduce(
    (sum, module) => sum + Number(module.thirdPartyCost || 0),
    0
  );
}

export function calculateEstimatedTimeline(config, selectedIds) {
  const modules = getSelectedModules(config, selectedIds);
  const groups = modules.reduce((map, module) => {
    const group = module.timelineGroup || module.id;
    map[group] = Math.max(map[group] || 0, Number(module.estimatedDays || 0));
    return map;
  }, {});
  const totalWorkingDays = Object.values(groups).reduce((sum, days) => sum + days, 0);
  const minWeeks = Math.max(1, Math.ceil(totalWorkingDays / 5));
  const complexityBuffer = Math.ceil(Math.max(0, modules.length - 3) / 3);
  return {
    minWeeks,
    maxWeeks: minWeeks + complexityBuffer,
    days: totalWorkingDays
  };
}

export function buildProposalSummary(config, selectedIds) {
  const selectedModules = getSelectedModules(config, selectedIds);
  const timeline = calculateEstimatedTimeline(config, selectedIds);
  return {
    selectedModules,
    moduleCount: selectedModules.length,
    inHouseImplementation: calculateInHouseImplementationTotal(config, selectedIds),
    implementation: calculateImplementationTotal(config, selectedIds),
    monthly: calculateMonthlyTotal(config, selectedIds),
    annual: calculateAnnualTotal(config, selectedIds),
    thirdPartyOneTime: calculateThirdPartyTotal(config, selectedIds),
    thirdPartyMonthly: calculateThirdPartyMonthlyTotal(config, selectedIds),
    thirdPartyAnnual: calculateThirdPartyAnnualTotal(config, selectedIds),
    timeline,
    timelineLabel: `${timeline.minWeeks}-${timeline.maxWeeks} semanas`
  };
}
