/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://udaradev.me',
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/_next/*', '/portfolio-studio/*'],
  
  // Robots.txt configuration
  robotsTxtOptions: {
    additionalSitemaps: [],
    // Add Algolia verification as a comment
    transformRobotsTxt: async (_, robotsTxt) => {
      return robotsTxt.replace(
        '# *',
        '# *\n# Algolia Crawler Verification\n# Algolia-Crawler-Verif: 402DDA736720E37C'
      );
    },
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/portfolio-studio/'],
      },
      // OpenAI GPT Bot
      {
        userAgent: 'GPTBot',
        allow: '/',
        crawlDelay: 1,
      },
      // ChatGPT User Agent
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      // Anthropic Claude
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      // Google Bard/Gemini
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      // Common Crawl (used by many AI systems)
      {
        userAgent: 'CCBot',
        allow: '/',
        crawlDelay: 2,
      },
      // Cohere AI
      {
        userAgent: 'cohere-ai',
        allow: '/',
      },
      // Facebook/Meta AI
      {
        userAgent: 'FacebookBot',
        allow: '/',
      },
      // Perplexity AI
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      // Bing AI
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      // Applebot (used by Siri and Spotlight)
      {
        userAgent: 'Applebot',
        allow: '/',
      },
      // Diffbot (knowledge graph)
      {
        userAgent: 'Diffbot',
        allow: '/',
      },
    ],
    // Add custom lines to robots.txt
    additionalPaths: async (config) => {
      return [
        {
          loc: config.siteUrl,
          changefreq: 'weekly',
          priority: 1.0,
          lastmod: new Date().toISOString(),
        },
      ];
    },
  },
  
  // Transform function to customize sitemap entries
  transform: async (config, path) => {
    // Custom priority and changefreq based on path
    let priority = 0.7;
    let changefreq = 'monthly';
    
    if (path === '/') {
      priority = 1.0;
      changefreq = 'weekly';
    } else if (path === '/blog') {
      priority = 0.8;
      changefreq = 'daily';
    } else if (path.startsWith('/blog/')) {
      priority = 0.7;
      changefreq = 'monthly';
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [],
    };
  },
};
