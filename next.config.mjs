/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb', // or '5mb'
    },
  },
};


export default nextConfig;
