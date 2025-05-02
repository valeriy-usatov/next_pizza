/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.dodostatic.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.dodostatic.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.inappstory.ru",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
