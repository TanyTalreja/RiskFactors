/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [{
  //     source:'/',
  //     destination: '/',
  //     permanent: false
  //   }]
  // },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
