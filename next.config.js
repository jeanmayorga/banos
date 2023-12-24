/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "custom",
    loaderFile: "./src/utils/cloudinary-loader.ts",
  },
};

module.exports = nextConfig;
