import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

/** @type {import('next').NextConfig} */
const nextConfig = {}

// Exposes simulated Cloudflare bindings inside `next dev` (miniflare). No-op in
// production builds.
initOpenNextCloudflareForDev()

export default nextConfig
