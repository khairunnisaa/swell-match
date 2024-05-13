/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://be-palmcode.octansidn.com/api/:path*' // No change needed for development mode
        }
      ];
    },
    async headers() {
      return [
        {
          source: "/api/:path*", // Match all API routes
          headers: [
            { key: "Access-Control-Allow-Origin", value: process.env.NEXT_PUBLIC_CORS_ORIGIN || "*" }, // Allow all origins (or specific origin)
            { key: "Access-Control-Allow-Methods", value: "GET,HEAD,PUT,PATCH,POST,DELETE" }, // Common HTTP methods
            { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Origin" }, // Common request headers
            { key: "Access-Control-Allow-Credentials", value: "true" }, // Allow cookies for authenticated requests
          ]
        }
      ];
    }
  };
  
  module.exports = nextConfig;
  