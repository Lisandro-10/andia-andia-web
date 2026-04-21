const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL

if (process.env.NODE_ENV === 'production' && !cdnUrl) {
  throw new Error('NEXT_PUBLIC_CDN_URL is required in production builds')
}

const cdnHostname = cdnUrl ? new URL(cdnUrl).hostname : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
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
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      }
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