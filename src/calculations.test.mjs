import assert from "node:assert/strict";
import { defaultCommercialConfig } from "../config/commercial-config.js";
import {
  buildProposalSummary,
  calculateImplementationTotal,
  calculateThirdPartyMonthlyTotal,
  getDefaultSelection
} from "./calculations.js";

const config = JSON.parse(JSON.stringify(defaultCommercialConfig));
const selected = getDefaultSelection(config);

assert.equal(selected.includes("onboarding"), true);
assert.equal(selected.includes("ecommerce"), true);
assert.equal(calculateImplementationTotal(config, selected), 7000000);
assert.equal(calculateThirdPartyMonthlyTotal(config, selected), 61500);

const withAlegra = [...selected, "alegra-integration"];
assert.equal(calculateThirdPartyMonthlyTotal(config, withAlegra), 225400);

config.discounts.implementationPercent = 10;
assert.equal(calculateImplementationTotal(config, selected), 6300000);

const summary = buildProposalSummary(config, withAlegra);
assert.equal(summary.moduleCount, 7);
assert.equal(summary.timeline.minWeeks > 0, true);

console.log("Calculation tests passed.");
