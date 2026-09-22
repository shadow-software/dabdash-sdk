import assert from "node:assert/strict";
import { test } from "node:test";
import { createDabDashTenantClient } from "../dist/index.js";

test("createDabDashTenantClient wires tenant slug into callTool", () => {
  const client = createDabDashTenantClient({
    apiKey: "smoke-test-key",
    tenantSlug: "demo",
  });

  assert.equal(typeof client.callTool, "function");
  assert.ok(client.raw);
});
