/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for bcryptjs, nodemailer, sharp to work in server components
  experimental: {
    serverComponentsExternalPackages: ["bcryptjs", "nodemailer", "@prisma/client"],
  },

  images: {
    remotePatterns: [],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      // Prevent search engines indexing uploaded user documents
      {
        source: "/uploads/(.*)",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
