/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    loader: "custom",
    loaderFile: "./src/utils/cloudinary-loader.ts",
  },
};

module.exports = nextConfig;
