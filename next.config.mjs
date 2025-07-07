/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "Content-Security-Policy",
  //           value: `
  //             default-src 'self';
  //             script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.paypal.com https://www.sandbox.paypal.com https://www.paypalobjects.com;
  //             style-src 'self' 'unsafe-inline' https://www.paypal.com https://www.sandbox.paypal.com https://www.paypalobjects.com;
  //             frame-src 'self' https://www.paypal.com https://www.sandbox.paypal.com https://www.paypalobjects.com;
  //             connect-src 'self' https://www.paypal.com https://www.sandbox.paypal.com https://mmzzwxzikyjaxjnhofys.supabase.co wss://mmzzwxzikyjaxjnhofys.supabase.co;
  //             img-src 'self' https://*.paypal.com ...
  //           `
  //             .replace(/\s+/g, " ")
  //             .trim(),
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
