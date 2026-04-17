/** @type {import('next').NextConfig} */
function apiUploadsPattern() {
  const raw =
    process.env.NEXT_PUBLIC_API_URL || 'https://gt.osamaqaseem.online'
  if (!raw) return null
  try {
    const u = new URL(raw)
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

const apiPattern = apiUploadsPattern()

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'via.placeholder.com', pathname: '/**' },
      ...(apiPattern ? [apiPattern] : []),
    ],
  },
}

module.exports = nextConfig

