import nextConfig from 'eslint-config-next'

const config = [...nextConfig, { ignores: ['.open-next/**', '.wrangler/**'] }]

export default config
