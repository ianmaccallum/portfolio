import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Default config: no incremental cache. The site is fully static marketing
// pages, so ISR/"use cache" storage isn't needed. Add an R2 incremental cache
// here if that ever changes.
export default defineCloudflareConfig();
