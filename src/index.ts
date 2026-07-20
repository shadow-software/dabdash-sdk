import createClient from "openapi-fetch";
import type { paths } from "./generated/schema.js";

/**
 * Thin wrapper around openapi-fetch, typed from the DabDash tenant OpenAPI spec
 * (see dabdash.com's dabdash:generate-tenant-api-spec — src/generated/schema.ts
 * is regenerated on every release with a spec change, never hand-edited).
 *
 * Every operation here dispatches into the exact same handler the tenant MCP
 * server (/mcp/tenant/{slug}) calls, so this client and MCP tool calls can
 * never drift apart in behavior — only in transport.
 *
 * Every generated path is templated as .../tenant/{slug}/tools/{tool} — `slug`
 * is a REQUIRED path parameter on every single operation, not something
 * openapi-fetch lets a client bake into baseUrl (its params substitution runs
 * before any request middleware sees the URL, so there is no hook to inject a
 * missing path param after the fact). Rather than fight that, this wrapper
 * takes tenantSlug once and threads it into every call for you.
 */
export function createDabDashTenantClient(options: { apiKey: string; tenantSlug: string; baseUrl?: string }) {
  const client = createClient<paths>({
    baseUrl: options.baseUrl ?? "https://dabdash.com",
    headers: {
      Authorization: `Bearer ${options.apiKey}`,
    },
  });

  type PathParams<P> = P extends { parameters: { path: infer Path } } ? Omit<Path, "slug"> : never;

  return {
    /** The raw openapi-fetch client, for operations not yet covered by a convenience method. */
    raw: client,

    /**
     * Call any tenant tool by its OpenAPI path, with `slug` pre-filled from
     * the options this client was created with.
     */
    callTool<Path extends keyof paths & `${string}/tools/${string}`>(
      path: Path,
      init: {
        body?: paths[Path] extends { post: { requestBody?: { content: { "application/json": infer Body } } } } ? Body : never;
        params?: PathParams<paths[Path]["post"]>;
      } = {},
    ) {
      return client.POST(path, {
        params: { path: { slug: options.tenantSlug, ...(init.params ?? {}) } },
        body: init.body ?? ({} as never),
      } as never);
    },
  };
}

export type { paths as DabDashTenantApiPaths };
