/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://estudioandia.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Solo un sitemap (sitio pequeño)
  changefreq: 'monthly',
  priority: 0.7,
  exclude: ['/api/*', '/_not-found'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    additionalSitemaps: [],
  },
  transform: async (config, path) => {
    // Prioridades personalizadas por tipo de página
    let priority = config.priority
    let changefreq = config.changefreq

    if (path === '/') {
      priority = 1.0
      changefreq = 'weekly'
    } else if (path === '/portfolio') {
      priority = 0.9
      changefreq = 'weekly'
    } else if (path.startsWith('/proyectos/')) {
      priority = 0.8
      changefreq = 'monthly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
