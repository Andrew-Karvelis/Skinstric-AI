import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Add other configuration options here if needed */
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Proxy all requests starting with /api
        destination: 'https://wk7wmfz7x8.execute-api.us-east-2.amazonaws.com/live/:path*', // Target API URL
      },
    ];
  },
};

export default nextConfig;
