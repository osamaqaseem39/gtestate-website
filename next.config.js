/** @type {import('next').NextConfig} */
function mediaUploadsPattern(url) {
  if (!url) return null
  try {
    const u = new URL(url)
    return {
      protocol: u.protocol.replace(':', ''),
      hostname: u.hostname,
      ...(u.port ? { port: u.port } : {}),
      pathname: '/uploads/**',
    }
  } catch {
    return null
  }
}

const mediaPattern = mediaUploadsPattern(process.env.NEXT_PUBLIC_MEDIA_URL || 'https://gt.osamaqaseem.online')
const apiPattern = mediaUploadsPattern(process.env.NEXT_PUBLIC_API_URL || 'https://gt-estate-server.vercel.app')

const nextConfig = {
  // Careers form uploads CV via server action (same SMTP/API path as contact).
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'via.placeholder.com', pathname: '/**' },
      ...(mediaPattern ? [mediaPattern] : []),
      ...(apiPattern ? [apiPattern] : []),
    ],
  },
}

module.exports = nextConfig

