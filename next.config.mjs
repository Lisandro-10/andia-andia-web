const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL

if (process.env.NODE_ENV === 'production' && !cdnUrl) {
  throw new Error('NEXT_PUBLIC_CDN_URL is required in production builds')
}

const cdnHostname = cdnUrl ? new URL(cdnUrl).hostname : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/pages/index.html', destination: '/', permanent: true },
      { source: '/pages/casafdm', destination: '/proyectos/casa-fdm', permanent: true },
      { source: '/pages/benditapiedra', destination: '/proyectos/bendita-piedra', permanent: true },
      { source: '/pages/casapm', destination: '/proyectos/casa-pm', permanent: true },
      { source: '/pages/casavl', destination: '/proyectos/casa-vl', permanent: true },
      { source: '/pages/casaga', destination: '/proyectos/casa-ga', permanent: true },
    ]
  },
  async headers(){
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|webp|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Nota: Next 16 ya aplica `immutable` a /_next/static (chunks con hash) y
      // gestiona el cache de /_next/image vía images.minimumCacheTTL. Setear
      // Cache-Control custom en esas rutas internas rompe el dev → se quitaron.
    ]
  },
  images: {
    remotePatterns: cdnHostname
      ? [{ protocol: 'https', hostname: cdnHostname, pathname: '/**' }]
      : [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 año - imágenes de arquitectura son inmutables
  },
};

export default nextConfig;