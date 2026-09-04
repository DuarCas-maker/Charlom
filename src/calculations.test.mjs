import assert from "node:assert/strict";
import { defaultCommercialConfig } from "../config/commercial-config.js";
import {
  buildProposalSummary,
  calculateImplementationTotal,
  calculateThirdPartyAnnualTotal,
  calculateThirdPartyMonthlyTotal,
  getDefaultSelection
} from "./calculations.js";

const config = JSON.parse(JSON.stringify(defaultCommercialConfig));
const selected = getDefaultSelection(config);

assert.equal(selected.includes("onboarding"), true);
assert.equal(selected.includes("ecommerce"), true);
assert.equal(selected.includes("automation"), false);
assert.equal(selected.includes("dashboard"), false);
assert.equal(calculateImplementationTotal(config, selected), 8450000);
assert.equal(calculateThirdPartyMonthlyTotal(config, selected), 0);

const withAlegra = selected.filter((id) => id !== "admin-inhouse").concat("alegra-integration");
assert.equal(calculateThirdPartyMonthlyTotal(config, withAlegra), 163900);
assert.equal(calculateThirdPartyAnnualTotal(config, withAlegra), 1966800);
assert.equal(calculateImplementationTotal(config, withAlegra), 8716800);

const withInvoice = [...selected, "electronic-invoice"];
assert.equal(calculateThirdPartyMonthlyTotal(config, withInvoice), 99900);
assert.equal(calculateThirdPartyAnnualTotal(config, withInvoice), 899100);
assert.equal(calculateImplementationTotal(config, withInvoice), 9349100);

config.discounts.implementationPercent = 10;
assert.equal(calculateImplementationTotal(config, selected), 7605000);

const summary = buildProposalSummary(config, withAlegra);
assert.equal(summary.moduleCount, 9);
assert.equal(summary.inHouseImplementation, 6075000);
assert.equal(summary.implementation, 8041800);
assert.equal(summary.timeline.minWeeks > 0, true);

console.log("Calculation tests passed.");
