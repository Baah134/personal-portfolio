import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://princebaah.vercel.app';

  // Dynamic routes
  const projectSlugs = ['lumina', 'coastal-odes', 'whisper', 'hydrogel', 'aquablue'];
  const projectUrls = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Static routes
  const staticUrls = [
    '',
    '/research',
    '/projects',
    '/leadership',
    '/experience',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...staticUrls, ...projectUrls];
}
