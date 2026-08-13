import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Matikan strict mode kalau ngga mau dapet error dobel pas development
  reactStrictMode: false,

  // Konfigurasi eksperimental kalau dibutuhin ke depannya
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
