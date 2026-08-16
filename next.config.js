/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/snitchgram",
  assetPrefix: "/snitchgram/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
