import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    remotePatterns: [new URL('https://netflixfeitoaqui.com.br/**')],
  },
};

export default nextConfig;
