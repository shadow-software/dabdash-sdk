<p align="center">
  <img src=".github/assets/banner.svg" alt="@shadow-software/dabdash-sdk — by Shadow Software" width="880">
</p>

<h1 align="center">DabDash TypeScript SDK</h1>

<p align="center">
  <strong>Official TypeScript client for the
  <a href="https://dabdash.com/">DabDash</a> Tenant API.</strong><br>
  Typed with <code>openapi-typescript</code> + <code>openapi-fetch</code>.
  Same tools as the tenant MCP server — transport differs, behavior does not.
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue?style=flat-square">
  <a href="https://shadowsoftware.com/"><img alt="Shadow Software" src="https://img.shields.io/badge/by-Shadow%20Software-8a8a8a?style=flat-square"></a>
</p>

<p align="center">
  <b><a href="https://github.com/shadow-software/dabdash-sdk">GitHub →</a></b>
  &nbsp;·&nbsp;
  <a href="https://github.com/shadow-software/dabdash-php-sdk">PHP SDK</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/shadow-software/dabdash-for-woocommerce">WooCommerce plugin</a>
</p>

---

## Install

```bash
npm install github:shadow-software/dabdash-sdk
```

Git installs compile TypeScript through the package `prepare` script. When
`@shadow-software/dabdash-sdk` is published to the public npm registry:

```bash
npm install @shadow-software/dabdash-sdk
```

> **Not** [`@shadow-software/dabdash-rest`](https://www.npmjs.com/package/@shadow-software/dabdash-rest)
> — that package targeted the retired WordPress REST plugin and is deprecated.

## Usage

```ts
import { createDabDashTenantClient } from "@shadow-software/dabdash-sdk";

const client = createDabDashTenantClient({
  apiKey: process.env.DABDASH_API_KEY!,
  tenantSlug: "your-tenant",
  // baseUrl defaults to https://dabdash.com
});

// slug is threaded into every tool path for you
await client.callTool("/api/v1/dabdash/tenant/{slug}/tools/customer_lookup", {
  body: { /* … */ },
});
```

The OpenAPI surface is the tenant tool set (one POST per tool under
`/api/v1/dabdash/tenant/{slug}/tools/…`). `src/generated/` is regenerated from
the product OpenAPI spec — do not edit by hand. Releases are produced by
[`shadow-software/sdk-release`](https://github.com/shadow-software/sdk-release).

## License

[MIT](LICENSE) © [Shadow Software LLC](https://shadowsoftware.com/).

---

## Also by Shadow Software

| | |
|---|---|
| [`shadow-software/dabdash-php-sdk`](https://github.com/shadow-software/dabdash-php-sdk) | DabDash Tenant API (PHP) |
| [`@shadow-software/agt-sdk`](https://github.com/shadow-software/agt-sdk) | AGT Dealer API (TypeScript) |
| [DabDash for WooCommerce](https://github.com/shadow-software/dabdash-for-woocommerce) | WordPress / WooCommerce sync plugin |

<p align="center">
  <sub><a href="https://shadowsoftware.com/">shadowsoftware.com</a> · MIT · © 2026 Shadow Software LLC</sub>
</p>
